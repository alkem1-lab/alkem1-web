import { useState, useEffect, useMemo, useCallback } from 'react';
import './SecretVault.css';

const PLAINTEXT = 'SECRET';
const KEY = 'ALKEM1';

const STEP_DELAYS = [
  300, 300, 300, 400,           // breach 1-5
  600, 700, 350, 600,           // theory 6-9
  600, 400,                     // encrypt setup 10-11
  450, 280, 280, 280, 280, 280, // encrypt chars 12-17
  500,                          // cipher result 18
  650,                          // decrypt header 19
  380, 280, 280, 280, 280, 280, // decrypt chars 20-25
  550,                          // restored 26
  700, 400, 600,                // fingerprint 27-29
  700, 600, 900, 400,           // reveal 30-33
];
const TOTAL_STEPS = 33;

function quickHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
  return (h >>> 0).toString(16).toUpperCase().padStart(8, '0');
}

function parseUA(ua) {
  let os = '?', browser = '?';
  if (/iPhone/.test(ua)) os = 'iOS ' + (ua.match(/OS (\d+_\d+)/)?.[1]?.replace('_', '.') || '');
  else if (/iPad/.test(ua)) os = 'iPadOS ' + (ua.match(/OS (\d+_\d+)/)?.[1]?.replace('_', '.') || '');
  else if (/Android ([\d.]+)/.test(ua)) os = 'Android ' + RegExp.$1;
  else if (/Mac OS X ([\d_.]+)/.test(ua)) os = 'macOS ' + RegExp.$1.replace(/_/g, '.');
  else if (/Windows NT ([\d.]+)/.test(ua)) os = 'Windows ' + ({ '10.0': '10/11', '6.3': '8.1', '6.1': '7' }[RegExp.$1] || RegExp.$1);
  else if (/Linux/.test(ua)) os = 'Linux';
  if (/Edg\/([\d.]+)/.test(ua)) browser = 'Edge ' + RegExp.$1;
  else if (/OPR\/([\d.]+)/.test(ua)) browser = 'Opera ' + RegExp.$1;
  else if (/Chrome\/([\d.]+)/.test(ua)) browser = 'Chrome ' + RegExp.$1;
  else if (/Version\/([\d.]+).*Safari/.test(ua)) browser = 'Safari ' + RegExp.$1;
  else if (/Firefox\/([\d.]+)/.test(ua)) browser = 'Firefox ' + RegExp.$1;
  return { os, browser };
}

// Canvas scene generators for multi-hash
function canvasScene1(ctx) {
  ctx.fillStyle = '#f60'; ctx.fillRect(0, 0, 240, 60);
  ctx.fillStyle = '#069'; ctx.font = '14px Arial'; ctx.textBaseline = 'top';
  ctx.fillText('XOR::fingerprint::0xSEAL', 2, 15);
  ctx.strokeStyle = 'rgba(102,204,0,0.7)'; ctx.arc(100, 30, 20, 0, Math.PI * 2); ctx.stroke();
}
function canvasScene2(ctx) {
  const g = ctx.createLinearGradient(0, 0, 240, 60);
  g.addColorStop(0, '#ff0000'); g.addColorStop(1, '#0000ff');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 240, 60);
  ctx.fillStyle = '#fff'; ctx.font = 'italic 18px Georgia'; ctx.fillText('Ψ∑∞', 80, 35);
}
function canvasScene3(ctx) {
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 60);
  ctx.shadowColor = '#0f0'; ctx.shadowBlur = 10;
  ctx.fillStyle = '#0f0'; ctx.font = 'bold 12px Courier New'; ctx.fillText('SIGNAL', 90, 35);
  ctx.beginPath(); ctx.moveTo(10, 50); ctx.bezierCurveTo(50, 10, 190, 10, 230, 50); ctx.strokeStyle = '#0ff'; ctx.stroke();
}

function makeCanvasHash(sceneFn) {
  try {
    const c = document.createElement('canvas'); c.width = 240; c.height = 60;
    const ctx = c.getContext('2d'); sceneFn(ctx);
    return quickHash(c.toDataURL());
  } catch (_) { return '?'; }
}

// 50 font probes
const FONT_LIST = [
  'Helvetica Neue', 'Helvetica', 'Arial', 'Verdana', 'Futura', 'Avenir',
  'Comic Sans MS', 'Menlo', 'Courier New', 'Georgia', 'Palatino', 'Didot',
  'Trebuchet MS', 'Impact', 'Gill Sans', 'Times New Roman', 'Lucida Console',
  'Monaco', 'Optima', 'American Typewriter', 'Copperplate', 'Rockwell',
  'Baskerville', 'Papyrus', 'Brush Script MT', 'Segoe UI', 'Tahoma',
  'Lucida Grande', 'Lucida Sans', 'Century Gothic', 'Garamond', 'Bookman Old Style',
  'Candara', 'Consolas', 'Cambria', 'Calibri', 'Franklin Gothic Medium',
  'Goudy Old Style', 'Big Caslon', 'Bodoni 72', 'Futura PT', 'Hoefler Text',
  'Iowan Old Style', 'Marion', 'Cochin', 'Savoye LET', 'Snell Roundhand',
  'Zapfino', 'Apple Chancery', 'Noteworthy', 'Chalkduster',
];

function detectFonts() {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  const test = 'mmmmmmmmlli';
  ctx.font = '72px monospace';
  const baseW = ctx.measureText(test).width;
  return FONT_LIST.filter(f => {
    ctx.font = `72px '${f}', monospace`;
    return ctx.measureText(test).width !== baseW;
  });
}

export default function SecretVault({ onClose }) {
  const [phase, setPhase] = useState('flash');
  const [step, setStep] = useState(0);

  const [fingerprint, setFingerprint] = useState(() => {
    const ua = parseUA(navigator.userAgent);

    // GPU + WebGL extended
    let gpu = '?', gpuVendor = '?', glMaxTex = '?', glAA = '?', glMaxVA = '?', glMaxVV = '?';
    let shaderPrecision = '?';
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (gl) {
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        if (ext) { gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL); gpuVendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL); }
        glMaxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        glAA = gl.getContextAttributes()?.antialias ? 'on' : 'off';
        glMaxVA = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
        glMaxVV = gl.getParameter(gl.MAX_VARYING_VECTORS);
        const hp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
        if (hp) shaderPrecision = `${hp.precision}bit (${hp.rangeMin}-${hp.rangeMax})`;
      }
    } catch (_) {}

    // Multi canvas hash
    const ch1 = makeCanvasHash(canvasScene1);
    const ch2 = makeCanvasHash(canvasScene2);
    const ch3 = makeCanvasHash(canvasScene3);
    const canvasMulti = `${ch1}·${ch2}·${ch3}`;

    // Fonts
    const detected = detectFonts();

    // Sync browser probes
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const darkMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const p3 = window.matchMedia?.('(color-gamut: p3)').matches;
    const hdr = window.matchMedia?.('(dynamic-range: high)').matches;
    const pointer = window.matchMedia?.('(pointer: coarse)').matches ? 'coarse' : 'fine';
    const hover = window.matchMedia?.('(hover: hover)').matches ? 'yes' : 'no';
    const standalone = window.matchMedia?.('(display-mode: standalone)').matches;
    const orientation = screen.orientation?.type || '?';
    const gamepads = navigator.getGamepads?.()?.filter(Boolean).length || 0;
    const mem = performance.memory;
    const jsHeap = mem ? `${Math.round(mem.usedJSHeapSize / 1048576)}MB / ${Math.round(mem.jsHeapSizeLimit / 1048576)}MB` : '?';
    const notifPerm = typeof Notification !== 'undefined' ? Notification.permission : '?';
    const plugins = navigator.plugins ? navigator.plugins.length : 0;

    // Visit tracking
    const visitCount = parseInt(localStorage.getItem('_vault_visits') || '0') + 1;
    const firstVisit = localStorage.getItem('_vault_first') || new Date().toISOString();
    localStorage.setItem('_vault_visits', visitCount.toString());
    if (visitCount === 1) localStorage.setItem('_vault_first', firstVisit);

    // Adblock detection
    let adblock = '?';
    try {
      const ad = document.createElement('div');
      ad.className = 'adsbox ad-banner textAd'; ad.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;';
      document.body.appendChild(ad);
      adblock = (ad.offsetHeight === 0 || getComputedStyle(ad).display === 'none') ? 'detected' : 'none';
      document.body.removeChild(ad);
    } catch (_) {}

    return {
      os: ua.os, browser: ua.browser,
      device: ('ontouchstart' in window) ? 'Mobile' : 'Desktop',
      screen: `${window.screen.width}×${window.screen.height}`,
      viewport: `${window.innerWidth}×${window.innerHeight}`,
      pixelRatio: `${window.devicePixelRatio}x`,
      colorDepth: `${screen.colorDepth}bit`,
      orientation,
      gamut: p3 ? 'P3' : 'sRGB', hdr: hdr ? 'yes' : 'no',
      cores: navigator.hardwareConcurrency || '?',
      memory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : '?',
      jsHeap,
      gpu, gpuVendor,
      glMaxTex: `${glMaxTex}px`, glAA,
      glMaxVA, glMaxVV, shaderPrecision,
      battery: 'reading...',
      connection: conn ? `${conn.effectiveType || '?'} · ↓${conn.downlink || '?'}Mbps · ${conn.rtt || '?'}ms` : '?',
      saveData: conn?.saveData ? 'on' : 'off',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      languages: navigator.languages?.join(', ') || navigator.language,
      touchPoints: navigator.maxTouchPoints || 0,
      pointer, hover,
      darkMode: darkMode ? 'yes' : 'no',
      reducedMotion: reducedMotion ? 'yes' : 'no',
      dnt: navigator.doNotTrack === '1' ? 'on' : 'off',
      cookies: navigator.cookieEnabled ? 'yes' : 'no',
      notifPerm,
      standalone: standalone ? 'yes' : 'no',
      plugins: `${plugins}`,
      adblock,
      fonts: detected.join(', '),
      fontsCount: `${detected.length}/${FONT_LIST.length}`,
      canvasMulti,
      audioHash: '?',
      audioLatency: '?',
      mediaDevices: '?',
      localIP: 'probing...',
      geo: 'probing...',
      motion: '?',
      gamepads: gamepads > 0 ? `${gamepads}` : 'none',
      historyLen: window.history.length,
      pageLoad: `${Math.round(performance.now())}ms`,
      visitCount: `${visitCount}`,
      firstVisit: firstVisit.split('T')[0],
    };
  });

  // ── Async probes ──
  useEffect(() => {
    // Battery
    navigator.getBattery?.().then(b => {
      const ch = b.charging && b.chargingTime !== Infinity ? ` · full ${Math.round(b.chargingTime / 60)}m` : '';
      const dis = !b.charging && b.dischargingTime !== Infinity ? ` · ${Math.round(b.dischargingTime / 60)}m left` : '';
      setFingerprint(p => ({ ...p, battery: `${Math.round(b.level * 100)}%${b.charging ? ' ⚡' : ''}${ch}${dis}` }));
    }).catch(() => {});

    // Audio fingerprint (OfflineAudioContext)
    try {
      const actx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100);
      const osc = actx.createOscillator(); osc.type = 'triangle'; osc.frequency.value = 10000;
      const comp = actx.createDynamicsCompressor();
      comp.threshold.value = -50; comp.knee.value = 40; comp.ratio.value = 12; comp.attack.value = 0; comp.release.value = 0.25;
      osc.connect(comp); comp.connect(actx.destination); osc.start(0);
      actx.startRendering().then(buf => {
        const d = buf.getChannelData(0); let sum = 0;
        for (let i = 4500; i < 5000; i++) sum += Math.abs(d[i]);
        setFingerprint(p => ({ ...p, audioHash: `0x${quickHash(sum.toString())}` }));
      }).catch(() => {});
    } catch (_) {}

    // Audio latency
    try {
      const a = new (window.AudioContext || window.webkitAudioContext)();
      setFingerprint(p => ({
        ...p,
        audioLatency: `${a.sampleRate}Hz · ${a.destination.maxChannelCount}ch · ${Math.round((a.baseLatency || 0) * 1000)}ms lat`,
      }));
      a.close();
    } catch (_) {}

    // Media devices
    navigator.mediaDevices?.enumerateDevices?.().then(devs => {
      const mic = devs.filter(d => d.kind === 'audioinput').length;
      const cam = devs.filter(d => d.kind === 'videoinput').length;
      const spk = devs.filter(d => d.kind === 'audiooutput').length;
      const labels = devs.filter(d => d.label).map(d => d.label).slice(0, 3);
      const labStr = labels.length > 0 ? ` [${labels.join(', ')}]` : '';
      setFingerprint(p => ({ ...p, mediaDevices: `${mic} mic · ${cam} cam · ${spk} spk${labStr}` }));
    }).catch(() => {});

    // WebRTC local IP
    try {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel('');
      pc.createOffer().then(o => pc.setLocalDescription(o)).catch(() => {});
      const ips = new Set();
      pc.onicecandidate = (e) => {
        if (!e.candidate) { pc.close(); return; }
        const m = e.candidate.candidate.match(/(\d+\.\d+\.\d+\.\d+)/);
        if (m && !ips.has(m[1])) { ips.add(m[1]); setFingerprint(p => ({ ...p, localIP: [...ips].join(' · ') })); }
      };
      setTimeout(() => { try { pc.close(); } catch (_) {} }, 3000);
    } catch (_) {}

    // Geolocation — GPS first, IP fallback
    const ipGeoFallback = () => {
      fetch('https://ipapi.co/json/').then(r => r.json()).then(d => {
        if (d.latitude) {
          setFingerprint(p => ({ ...p, geo: `${d.latitude}, ${d.longitude} · ${d.city}, ${d.region}, ${d.country_name} (IP)` }));
        } else {
          setFingerprint(p => ({ ...p, geo: 'unavailable' }));
        }
      }).catch(() => setFingerprint(p => ({ ...p, geo: 'unavailable' })));
    };

    if (navigator.geolocation && window.isSecureContext) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy, altitude, speed } = pos.coords;
          let geo = `${latitude.toFixed(5)}, ${longitude.toFixed(5)} ±${Math.round(accuracy)}m`;
          if (altitude != null) geo += ` · alt ${Math.round(altitude)}m`;
          if (speed != null && speed > 0) geo += ` · ${(speed * 3.6).toFixed(1)}km/h`;
          setFingerprint(p => ({ ...p, geo }));
        },
        () => ipGeoFallback(),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      ipGeoFallback();
    }

    // Device orientation / motion
    const handleOrientation = (e) => {
      if (e.alpha != null) {
        setFingerprint(p => ({
          ...p,
          motion: `α${Math.round(e.alpha)}° β${Math.round(e.beta)}° γ${Math.round(e.gamma)}°`,
        }));
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
    // iOS requires permission
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().then(r => {
        if (r === 'granted') window.addEventListener('deviceorientation', handleOrientation);
      }).catch(() => {});
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  // XOR data
  const xorData = useMemo(() => {
    return PLAINTEXT.split('').map((c, i) => {
      const p = c.charCodeAt(0), k = KEY.charCodeAt(i % KEY.length), r = p ^ k;
      return { plainChar: c, keyChar: KEY[i % KEY.length], resultHex: r.toString(16).toUpperCase().padStart(2, '0') };
    });
  }, []);

  // Phase management
  useEffect(() => { const t = setTimeout(() => { setPhase('active'); setStep(1); }, 500); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (phase !== 'active' || step < 1) return;
    if (step >= TOTAL_STEPS) { const t = setTimeout(() => setPhase('dissolve'), 4000); return () => clearTimeout(t); }
    const t = setTimeout(() => setStep(s => s + 1), STEP_DELAYS[step - 1] || 300);
    return () => clearTimeout(t);
  }, [phase, step]);
  useEffect(() => { if (phase !== 'dissolve') return; const t = setTimeout(() => onClose(), 1500); return () => clearTimeout(t); }, [phase, onClose]);

  const dismiss = useCallback(() => { if (phase === 'dissolve' || phase === 'flash') return; setPhase('dissolve'); }, [phase]);
  useEffect(() => { window.addEventListener('keydown', dismiss); return () => window.removeEventListener('keydown', dismiss); }, [dismiss]);

  const cipherStr = xorData.map(d => d.resultHex).join('  ');
  const fp = fingerprint;

  return (
    <div className={`vault-overlay vault-${phase}`} onClick={dismiss}>
      <div className="vault-content">

        {step >= 1 && <div className="v-sys">[UNLISTED ROUTE DETECTED]</div>}
        {step >= 2 && <div className="v-sys">[TRACE SUPPRESSED]</div>}
        {step >= 3 && <div className="v-sys">[HISTORY BYPASSED]</div>}
        {step >= 4 && <div className="v-sys">[ENTERING SEALED LAYER]</div>}
        {step >= 5 && <div className="v-vault-title">VAULT::SYMMETRIC_CIPHER</div>}

        {step >= 6 && <div className="v-theory">XOR is not magic. It is reversibility under the same key.</div>}
        {step >= 7 && <div className="v-formula"><span className="v-f-plain">input</span><span className="v-f-op">⊕</span><span className="v-f-key">key</span><span className="v-f-eq">=</span><span className="v-f-cipher">cipher</span></div>}
        {step >= 8 && <div className="v-formula"><span className="v-f-cipher">cipher</span><span className="v-f-op">⊕</span><span className="v-f-key">key</span><span className="v-f-eq">=</span><span className="v-f-plain">input</span></div>}
        {step >= 9 && <div className="v-theory v-theory-accent">Same transform. Same key. Truth returns.</div>}

        {step >= 10 && <div className="v-sep">{'─'.repeat(40)}</div>}
        {step >= 11 && (
          <div className="v-meta-block">
            <div className="v-meta"><span className="v-meta-label">SOURCE</span><span className="v-meta-val v-color-plain">{PLAINTEXT}</span></div>
            <div className="v-meta"><span className="v-meta-label">KEY</span><span className="v-meta-val v-color-key">{KEY}</span></div>
            <div className="v-meta"><span className="v-meta-label">MODE</span><span className="v-meta-val v-color-xor">XOR</span></div>
          </div>
        )}
        {xorData.map((d, i) => step >= 12 + i && (
          <div key={`e${i}`} className="v-xor-line"><span className="v-xl-plain">{d.plainChar}</span><span className="v-xl-op">⊕</span><span className="v-xl-key">{d.keyChar}</span><span className="v-xl-arrow">→</span><span className="v-xl-result">{d.resultHex}</span></div>
        ))}
        {step >= 18 && <div className="v-cipher-row"><span className="v-cipher-label">CIPHER</span><span className="v-cipher-val">{cipherStr}</span></div>}

        {step >= 19 && <div className="v-reverse-header">── REVERSE PASS ──</div>}
        {xorData.map((d, i) => step >= 20 + i && (
          <div key={`d${i}`} className="v-xor-line v-xor-reverse"><span className="v-xl-cipher">{d.resultHex}</span><span className="v-xl-op">⊕</span><span className="v-xl-key">{d.keyChar}</span><span className="v-xl-arrow">→</span><span className="v-xl-restored">{d.plainChar}</span></div>
        ))}
        {step >= 26 && <div className="v-restored-row"><span className="v-restored-label">RESTORED</span><span className="v-restored-val">{PLAINTEXT}</span></div>}

        {/* ═══ FINGERPRINT ═══ */}
        {step >= 27 && <div className="v-fingerprint-header">── YOUR SIGNAL ──</div>}
        {step >= 28 && (
          <div className="v-fingerprint-block">
            <div className="v-fp"><span className="v-fp-label">OS</span><span className="v-fp-val">{fp.os}</span></div>
            <div className="v-fp"><span className="v-fp-label">BROWSER</span><span className="v-fp-val">{fp.browser}</span></div>
            <div className="v-fp"><span className="v-fp-label">DEVICE</span><span className="v-fp-val">{fp.device}</span></div>
            <div className="v-fp"><span className="v-fp-label">SCREEN</span><span className="v-fp-val">{fp.screen} · {fp.pixelRatio} · {fp.colorDepth}</span></div>
            <div className="v-fp"><span className="v-fp-label">VIEWPORT</span><span className="v-fp-val">{fp.viewport} · {fp.orientation}</span></div>
            <div className="v-fp"><span className="v-fp-label">GAMUT</span><span className="v-fp-val">{fp.gamut} · HDR {fp.hdr}</span></div>
            <div className="v-fp"><span className="v-fp-label">CPU</span><span className="v-fp-val">{fp.cores} cores</span></div>
            <div className="v-fp"><span className="v-fp-label">RAM</span><span className="v-fp-val">{fp.memory}</span></div>
            <div className="v-fp"><span className="v-fp-label">JS HEAP</span><span className="v-fp-val">{fp.jsHeap}</span></div>
            <div className="v-fp"><span className="v-fp-label">GPU</span><span className="v-fp-val">{fp.gpu}</span></div>
            <div className="v-fp"><span className="v-fp-label">GPU VENDOR</span><span className="v-fp-val">{fp.gpuVendor}</span></div>
            <div className="v-fp"><span className="v-fp-label">GL TEXTURE</span><span className="v-fp-val">{fp.glMaxTex} · AA {fp.glAA}</span></div>
            <div className="v-fp"><span className="v-fp-label">GL VERTEX</span><span className="v-fp-val">{fp.glMaxVA} attribs · {fp.glMaxVV} varying</span></div>
            <div className="v-fp"><span className="v-fp-label">GL SHADER</span><span className="v-fp-val">{fp.shaderPrecision}</span></div>
            <div className="v-fp"><span className="v-fp-label">BATTERY</span><span className="v-fp-val">{fp.battery}</span></div>
            <div className="v-fp"><span className="v-fp-label">NETWORK</span><span className="v-fp-val">{fp.connection}</span></div>
            <div className="v-fp"><span className="v-fp-label">SAVE DATA</span><span className="v-fp-val">{fp.saveData}</span></div>
            <div className="v-fp"><span className="v-fp-label">LOCAL IP</span><span className="v-fp-val">{fp.localIP}</span></div>
            <div className="v-fp"><span className="v-fp-label">LOCATION</span><span className="v-fp-val">{fp.geo}</span></div>
            <div className="v-fp"><span className="v-fp-label">MOTION</span><span className="v-fp-val">{fp.motion}</span></div>
            <div className="v-fp"><span className="v-fp-label">TIMEZONE</span><span className="v-fp-val">{fp.timezone}</span></div>
            <div className="v-fp"><span className="v-fp-label">LANGUAGES</span><span className="v-fp-val">{fp.languages}</span></div>
            <div className="v-fp"><span className="v-fp-label">INPUT</span><span className="v-fp-val">{fp.touchPoints} pts · {fp.pointer} · hover {fp.hover}</span></div>
            <div className="v-fp"><span className="v-fp-label">MEDIA</span><span className="v-fp-val">{fp.mediaDevices}</span></div>
            <div className="v-fp"><span className="v-fp-label">AUDIO HW</span><span className="v-fp-val">{fp.audioLatency}</span></div>
            <div className="v-fp"><span className="v-fp-label">AUDIO ID</span><span className="v-fp-val">{fp.audioHash}</span></div>
            <div className="v-fp"><span className="v-fp-label">CANVAS ID</span><span className="v-fp-val">{fp.canvasMulti}</span></div>
            <div className="v-fp"><span className="v-fp-label">FONTS</span><span className="v-fp-val">{fp.fontsCount} detected</span></div>
            <div className="v-fp"><span className="v-fp-label">DARK MODE</span><span className="v-fp-val">{fp.darkMode}</span></div>
            <div className="v-fp"><span className="v-fp-label">REDUCED</span><span className="v-fp-val">{fp.reducedMotion}</span></div>
            <div className="v-fp"><span className="v-fp-label">DNT</span><span className="v-fp-val">{fp.dnt}</span></div>
            <div className="v-fp"><span className="v-fp-label">COOKIES</span><span className="v-fp-val">{fp.cookies}</span></div>
            <div className="v-fp"><span className="v-fp-label">NOTIF</span><span className="v-fp-val">{fp.notifPerm}</span></div>
            <div className="v-fp"><span className="v-fp-label">PWA</span><span className="v-fp-val">{fp.standalone}</span></div>
            <div className="v-fp"><span className="v-fp-label">PLUGINS</span><span className="v-fp-val">{fp.plugins}</span></div>
            <div className="v-fp"><span className="v-fp-label">ADBLOCK</span><span className="v-fp-val">{fp.adblock}</span></div>
            <div className="v-fp"><span className="v-fp-label">GAMEPAD</span><span className="v-fp-val">{fp.gamepads}</span></div>
            <div className="v-fp"><span className="v-fp-label">HISTORY</span><span className="v-fp-val">{fp.historyLen} pages</span></div>
            <div className="v-fp"><span className="v-fp-label">VISITS</span><span className="v-fp-val">{fp.visitCount}× since {fp.firstVisit}</span></div>
            <div className="v-fp"><span className="v-fp-label">LOAD TIME</span><span className="v-fp-val">{fp.pageLoad}</span></div>
          </div>
        )}
        {step >= 29 && <div className="v-theory">This was visible the moment you connected.</div>}

        {step >= 30 && <div className="v-heavy-sep">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>}
        {step >= 31 && <div className="v-reveal">Most people see mystery. Operators see transforms.</div>}
        {step >= 32 && <div className="v-sealed-label">[SEALED MESSAGE]</div>}
        {step >= 33 && <div className="v-sealed-msg">Nothing vanished. You just lacked the key.</div>}
      </div>
    </div>
  );
}

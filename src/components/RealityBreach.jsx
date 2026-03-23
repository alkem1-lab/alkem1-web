import { useState, useEffect, useRef, useCallback } from 'react';
import './RealityBreach.css';

function getPersonalizedLine() {
  const hour = new Date().getHours();
  const device = /iPhone|iPad/.test(navigator.userAgent) ? 'iPhone' :
    /Android/.test(navigator.userAgent) ? 'Android' :
    /Mac/.test(navigator.platform) ? 'Mac' : 'machine';
  const timeWord = hour < 6 ? 'the dark hours' : hour < 12 ? 'the morning signal' :
    hour < 18 ? 'daylight exposure' : 'the night watch';
  return `Your ${device} during ${timeWord}. Signal locked.`;
}

export default function RealityBreach({ onClose, onTerminalMessage }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('freeze');
  const [corruptChars, setCorruptChars] = useState([]);
  const [personalLine, setPersonalLine] = useState('');
  const [witnessHash, setWitnessHash] = useState('');
  const [imageReady, setImageReady] = useState(false);
  const animRef = useRef(null);
  const imgRef = useRef(null);
  const realDataRef = useRef(null);
  const keyDataRef = useRef(null);
  const timersRef = useRef([]);

  // Generate witness hash + personal line
  useEffect(() => {
    const ts = Date.now().toString(36);
    const r = Math.random().toString(36).slice(2, 8);
    setWitnessHash(`0x${ts}${r}`.toUpperCase().slice(0, 16));
    setPersonalLine(getPersonalizedLine());
  }, []);

  // Corruption characters
  useEffect(() => {
    if (phase === 'corrupt') {
      const chars = [];
      for (let i = 0; i < 60; i++) {
        chars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          char: Math.random().toString(16).slice(2, 4).toUpperCase(),
          opacity: Math.random() * 0.6 + 0.2,
          size: Math.random() * 12 + 8,
        });
      }
      setCorruptChars(chars);
    }
  }, [phase]);

  // Load image FIRST, then prepare canvas data, then start phases
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;

      // Prepare canvas data immediately
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      const scale = Math.max(w / img.width, h / img.height);
      const sw = img.width * scale;
      const sh = img.height * scale;
      ctx.drawImage(img, (w - sw) / 2, (h - sh) / 2, sw, sh);

      realDataRef.current = ctx.getImageData(0, 0, w, h);

      // Generate XOR key noise
      const keyData = ctx.createImageData(w, h);
      for (let i = 0; i < keyData.data.length; i += 4) {
        keyData.data[i]     = Math.random() * 255 | 0;
        keyData.data[i + 1] = Math.random() * 255 | 0;
        keyData.data[i + 2] = Math.random() * 255 | 0;
        keyData.data[i + 3] = 255;
      }
      keyDataRef.current = keyData;

      // Clear canvas (don't show image yet)
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      setImageReady(true);
    };
    img.onerror = () => {
      // Image failed — still run phases but skip canvas
      setImageReady(true);
    };
    img.src = '/photo.jpg';

    return () => { timersRef.current.forEach(clearTimeout); };
  }, []);

  // Start phase timers ONLY after image is ready
  useEffect(() => {
    if (!imageReady) return;

    const t = (fn, ms) => { const id = setTimeout(fn, ms); timersRef.current.push(id); };

    t(() => setPhase('corrupt'), 300);
    t(() => setPhase('void'), 1800);
    t(() => setPhase('noise'), 2500);
    t(() => setPhase('reconstruct'), 3500);
    t(() => setPhase('reveal'), 5500);
    t(() => setPhase('seal'), 7000);
    t(() => {
      if (onTerminalMessage) onTerminalMessage('operator recognized');
      onClose();
    }, 8500);
  }, [imageReady, onClose, onTerminalMessage]);

  // Canvas animation — noise → reconstruct
  useEffect(() => {
    if (phase !== 'noise' && phase !== 'reconstruct') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const real = realDataRef.current;
    const key = keyDataRef.current;
    if (!real || !key) return;

    let startTime = null;
    const duration = phase === 'noise' ? 1000 : 2000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const display = ctx.createImageData(w, h);

      if (phase === 'noise') {
        for (let i = 0; i < display.data.length; i += 4) {
          const xorR = real.data[i] ^ key.data[i];
          const xorG = real.data[i+1] ^ key.data[i+1];
          const xorB = real.data[i+2] ^ key.data[i+2];
          const t = progress;
          display.data[i]     = key.data[i] * (1-t) + xorR * t | 0;
          display.data[i + 1] = key.data[i+1] * (1-t) + xorG * t | 0;
          display.data[i + 2] = key.data[i+2] * (1-t) + xorB * t | 0;
          display.data[i + 3] = 255;
        }
      } else {
        for (let i = 0; i < display.data.length; i += 4) {
          const px = (i / 4) % w;
          const py = Math.floor(i / 4 / w);
          const scanProgress = py / h;
          const centerDist = Math.sqrt(
            Math.pow((px - w/2) / w, 2) + Math.pow((py - h/2) / h, 2)
          );
          const localProgress = progress * 1.5 - scanProgress * 0.3 - centerDist * 0.2;
          const t = Math.max(0, Math.min(1, localProgress));
          const edgeNoise = t > 0.1 && t < 0.9 ? (Math.random() - 0.5) * 30 * (1 - t) : 0;

          const xorR = real.data[i] ^ key.data[i];
          const xorG = real.data[i+1] ^ key.data[i+1];
          const xorB = real.data[i+2] ^ key.data[i+2];

          display.data[i]     = Math.max(0, Math.min(255, xorR * (1-t) + real.data[i] * t + edgeNoise)) | 0;
          display.data[i + 1] = Math.max(0, Math.min(255, xorG * (1-t) + real.data[i+1] * t + edgeNoise)) | 0;
          display.data[i + 2] = Math.max(0, Math.min(255, xorB * (1-t) + real.data[i+2] * t + edgeNoise)) | 0;
          display.data[i + 3] = 255;
        }
        // Scanlines
        for (let y = 0; y < h; y += 3) {
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            display.data[i]     = display.data[i] * 0.85 | 0;
            display.data[i + 1] = display.data[i+1] * 0.85 | 0;
            display.data[i + 2] = display.data[i+2] * 0.85 | 0;
          }
        }
      }

      ctx.putImageData(display, 0, 0);
      if (progress < 1) animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [phase]);

  // Final reveal — show clean image
  useEffect(() => {
    if (phase !== 'reveal' && phase !== 'seal') return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const real = realDataRef.current;
    if (ctx && real) ctx.putImageData(real, 0, 0);
  }, [phase]);

  return (
    <div className={`breach-overlay phase-${phase}`}>
      {phase === 'corrupt' && (
        <div className="breach-corrupt">
          {corruptChars.map((c, i) => (
            <span key={i} className="corrupt-char" style={{
              left: `${c.x}%`, top: `${c.y}%`,
              opacity: c.opacity, fontSize: `${c.size}px`
            }}>{c.char}</span>
          ))}
          <div className="corrupt-text">
            <div className="corrupt-line">[SIGNAL INTERCEPT]</div>
            <div className="corrupt-line delay1">[LAYER BREACH DETECTED]</div>
            <div className="corrupt-line delay2">[RECONSTRUCTING...]</div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className={`breach-canvas ${
        phase === 'noise' || phase === 'reconstruct' || phase === 'reveal' || phase === 'seal' ? 'visible' : ''
      }`} />

      {(phase === 'reveal' || phase === 'seal') && (
        <div className="breach-reveal-text">
          <div className="reveal-line main">You did not discover the system.</div>
          <div className="reveal-line main delay1">The system detected you.</div>
          <div className="reveal-line sub delay2">{personalLine}</div>
        </div>
      )}

      {phase === 'seal' && (
        <div className="breach-seal">
          <div className="seal-line">witness created · {witnessHash}</div>
          <div className="seal-line">event sealed · {new Date().toISOString().split('T')[0]}</div>
        </div>
      )}

      {phase === 'void' && (
        <div className="breach-void">
          <span className="void-cursor">█</span>
        </div>
      )}
    </div>
  );
}

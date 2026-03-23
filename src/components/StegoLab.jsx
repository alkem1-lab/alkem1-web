import { useState, useRef, useEffect, useCallback } from 'react';
import './StegoLab.css';

const W = 320, H = 160;

function generateCarrier(ctx) {
  const img = ctx.createImageData(W, H);
  for (let i = 0; i < img.data.length; i += 4) {
    const x = (i / 4) % W, y = Math.floor(i / 4 / W);
    const gx = Math.sin(x * 0.02) * 40 + 60;
    const gy = Math.cos(y * 0.03) * 30 + 50;
    const noise = Math.random() * 15;
    img.data[i]     = Math.min(255, gx + noise);
    img.data[i + 1] = Math.min(255, gy + noise * 0.5);
    img.data[i + 2] = Math.min(255, (gx + gy) * 0.4 + noise);
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

function xorEncrypt(text, key) {
  return text.split('').map((c, i) => c.charCodeAt(0) ^ key.charCodeAt(i % key.length));
}

function encodeLSB(ctx, bytes) {
  const img = ctx.getImageData(0, 0, W, H);
  const bits = [];
  // Length header (16 bits)
  for (let i = 15; i >= 0; i--) bits.push((bytes.length >> i) & 1);
  // Data bits
  for (const b of bytes) for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1);

  const modified = [];
  for (let i = 0; i < bits.length && i < img.data.length; i++) {
    const idx = i * 4; // Use R channel only
    if (idx < img.data.length) {
      const old = img.data[idx];
      img.data[idx] = (old & 0xFE) | bits[i];
      if ((old & 1) !== bits[i]) modified.push(Math.floor(idx / 4));
    }
  }
  ctx.putImageData(img, 0, 0);
  return modified;
}

function decodeLSB(ctx, key) {
  const img = ctx.getImageData(0, 0, W, H);
  // Read length (16 bits from R channel)
  let len = 0;
  for (let i = 0; i < 16; i++) len = (len << 1) | (img.data[i * 4] & 1);
  if (len <= 0 || len > 1000) return null;
  // Read bytes
  const bytes = [];
  for (let b = 0; b < len; b++) {
    let byte = 0;
    for (let i = 0; i < 8; i++) {
      const idx = (16 + b * 8 + i) * 4;
      byte = (byte << 1) | (img.data[idx] & 1);
    }
    bytes.push(byte);
  }
  // XOR decrypt
  return bytes.map((b, i) => String.fromCharCode(b ^ key.charCodeAt(i % key.length))).join('');
}

export default function StegoLab() {
  const canvasRef = useRef(null);
  const heatRef = useRef(null);
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('ALKEM1');
  const [status, setStatus] = useState('IDLE');
  const [decoded, setDecoded] = useState('');
  const [modCount, setModCount] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [phase, setPhase] = useState('encode'); // encode | encoded | decoded

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      generateCarrier(ctx);
      setCapacity(Math.floor((W * H - 16) / 8));
    }
  }, []);

  const handleEncode = useCallback(() => {
    if (!message || !key) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Reset carrier
    generateCarrier(ctx);

    // XOR encrypt + LSB encode
    const encrypted = xorEncrypt(message, key);
    const modified = encodeLSB(ctx, encrypted);
    setModCount(modified.length);
    setStatus('ENCODED');
    setPhase('encoded');

    // Draw heatmap
    const hCtx = heatRef.current?.getContext('2d');
    if (hCtx) {
      hCtx.fillStyle = '#0a0a0a';
      hCtx.fillRect(0, 0, W, H);
      hCtx.fillStyle = 'rgba(255, 60, 60, 0.8)';
      for (const px of modified) {
        const x = px % W, y = Math.floor(px / W);
        hCtx.fillRect(x, y, 1, 1);
      }
    }
  }, [message, key]);

  const handleDecode = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const result = decodeLSB(ctx, key);
    if (result) {
      setDecoded(result);
      setStatus('DECODED');
      setPhase('decoded');
    } else {
      setDecoded('[ CORRUPTION — wrong key or no data ]');
      setStatus('FAILED');
    }
  }, [key]);

  const handleReset = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) generateCarrier(ctx);
    const hCtx = heatRef.current?.getContext('2d');
    if (hCtx) { hCtx.fillStyle = '#0a0a0a'; hCtx.fillRect(0, 0, W, H); }
    setMessage('');
    setDecoded('');
    setModCount(0);
    setStatus('IDLE');
    setPhase('encode');
  }, []);

  return (
    <div className="stego-lab">
      <div className="lab-header">
        <span className="lab-tag">LAB</span>
        <span className="lab-title">STEGANOGRAPHY — LSB ENCODER</span>
      </div>

      <div className="lab-desc">
        Hide data inside images using Least Significant Bit manipulation.
        Each pixel's R channel carries 1 bit. XOR encrypts before embedding.
      </div>

      <div className="stego-grid">
        <div className="stego-panel">
          <div className="panel-label">CARRIER IMAGE</div>
          <canvas ref={canvasRef} width={W} height={H} className="stego-canvas" />
          <div className="panel-meta">
            {W}×{H} · capacity: {capacity} bytes · status: <span className={`st-${status.toLowerCase()}`}>{status}</span>
          </div>
        </div>

        <div className="stego-panel">
          <div className="panel-label">MODIFICATION HEATMAP</div>
          <canvas ref={heatRef} width={W} height={H} className="stego-canvas heat" />
          <div className="panel-meta">
            {modCount > 0 ? `${modCount} pixels modified (${(modCount / (W * H) * 100).toFixed(2)}%)` : 'No modifications yet'}
          </div>
        </div>
      </div>

      <div className="stego-controls">
        <div className="control-row">
          <label>MESSAGE</label>
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Text to hide..."
            className="stego-input"
            maxLength={capacity}
            onClick={e => e.stopPropagation()}
          />
        </div>
        <div className="control-row">
          <label>XOR KEY</label>
          <input
            type="text"
            value={key}
            onChange={e => setKey(e.target.value)}
            placeholder="Encryption key..."
            className="stego-input key"
            onClick={e => e.stopPropagation()}
          />
        </div>
        <div className="control-buttons">
          <button onClick={handleEncode} className="lab-btn encode" disabled={!message || !key}>
            ENCODE
          </button>
          <button onClick={handleDecode} className="lab-btn decode" disabled={phase === 'encode'}>
            DECODE
          </button>
          <button onClick={handleReset} className="lab-btn reset">
            RESET
          </button>
        </div>
      </div>

      {decoded && (
        <div className={`stego-result ${status === 'FAILED' ? 'failed' : ''}`}>
          <div className="result-label">EXTRACTED MESSAGE</div>
          <div className="result-text">{decoded}</div>
        </div>
      )}

      <div className="lab-footer">
        LSB steganography modifies the least significant bit of each pixel.
        Human eye cannot detect the change. Without the XOR key, data is noise.
      </div>
    </div>
  );
}

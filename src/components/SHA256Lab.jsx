import { useState, useCallback, useRef } from 'react';
import './SHA256Lab.css';

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function hexToBits(hex) {
  return hex.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join('');
}

function hammingDistance(a, b) {
  let diff = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff++;
  return diff;
}

export default function SHA256Lab() {
  const [input1, setInput1] = useState('ALKEM1');
  const [input2, setInput2] = useState('ALKEM2');
  const [hash1, setHash1] = useState('');
  const [hash2, setHash2] = useState('');
  const [bits1, setBits1] = useState('');
  const [bits2, setBits2] = useState('');
  const [distance, setDistance] = useState(null);
  const [mode, setMode] = useState('avalanche'); // avalanche | mine
  const [minePrefix, setMinePrefix] = useState('00');
  const [mining, setMining] = useState(false);
  const [mineResult, setMineResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const miningRef = useRef(false);

  const runAvalanche = useCallback(async () => {
    const h1 = await sha256(input1);
    const h2 = await sha256(input2);
    const b1 = hexToBits(h1);
    const b2 = hexToBits(h2);
    setHash1(h1);
    setHash2(h2);
    setBits1(b1);
    setBits2(b2);
    setDistance(hammingDistance(b1, b2));
  }, [input1, input2]);

  const startMining = useCallback(async () => {
    setMining(true);
    setMineResult(null);
    setAttempts(0);
    miningRef.current = true;

    let nonce = 0;
    const base = `ALKEM1::${Date.now()}::`;
    const target = minePrefix;

    const mine = async () => {
      const batchSize = 500;
      for (let i = 0; i < batchSize && miningRef.current; i++) {
        nonce++;
        const text = base + nonce;
        const h = await sha256(text);
        if (h.startsWith(target)) {
          setMineResult({ nonce, hash: h, input: text });
          setAttempts(nonce);
          setMining(false);
          miningRef.current = false;
          return;
        }
      }
      setAttempts(nonce);
      if (miningRef.current) requestAnimationFrame(mine);
    };
    mine();
  }, [minePrefix]);

  const stopMining = useCallback(() => {
    miningRef.current = false;
    setMining(false);
  }, []);

  return (
    <div className="sha-lab">
      <div className="lab-header">
        <span className="lab-tag">LAB</span>
        <span className="lab-title">SHA-256 — AVALANCHE & PROOF OF WORK</span>
      </div>

      <div className="sha-tabs">
        <button
          className={`sha-tab ${mode === 'avalanche' ? 'active' : ''}`}
          onClick={() => setMode('avalanche')}
        >AVALANCHE</button>
        <button
          className={`sha-tab ${mode === 'mine' ? 'active' : ''}`}
          onClick={() => setMode('mine')}
        >MINING</button>
      </div>

      {mode === 'avalanche' && (
        <div className="sha-section">
          <div className="sha-desc">
            Change 1 character. Watch ~128 of 256 bits flip.
            This is the avalanche effect — small input change, massive output change.
          </div>

          <div className="sha-inputs">
            <div className="sha-row">
              <label>A</label>
              <input value={input1} onChange={e => setInput1(e.target.value)}
                className="sha-input" onClick={e => e.stopPropagation()} />
            </div>
            <div className="sha-row">
              <label>B</label>
              <input value={input2} onChange={e => setInput2(e.target.value)}
                className="sha-input" onClick={e => e.stopPropagation()} />
            </div>
            <button onClick={runAvalanche} className="lab-btn encode">HASH BOTH</button>
          </div>

          {hash1 && (
            <div className="sha-results">
              <div className="hash-block">
                <div className="hash-label">SHA-256(A)</div>
                <div className="hash-value">{hash1}</div>
              </div>
              <div className="hash-block">
                <div className="hash-label">SHA-256(B)</div>
                <div className="hash-value">{hash2}</div>
              </div>

              <div className="bit-grid">
                <div className="bit-label">BIT COMPARISON — 256 bits</div>
                <div className="bits-row">
                  {bits1.split('').map((b, i) => (
                    <span key={i} className={`bit ${b !== bits2[i] ? 'flipped' : 'same'}`}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="avalanche-stat">
                <span className="stat-num">{distance}</span>
                <span className="stat-label"> / 256 bits flipped ({((distance / 256) * 100).toFixed(1)}%)</span>
                <span className="stat-note">
                  {distance > 115 && distance < 140 ? ' — near ideal 50%' :
                   distance >= 140 ? ' — strong avalanche' : ' — below ideal'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {mode === 'mine' && (
        <div className="sha-section">
          <div className="sha-desc">
            Find a nonce that produces a hash starting with "{minePrefix}".
            This is how Bitcoin mining works — brute force search for rare hashes.
          </div>

          <div className="mine-controls">
            <label>TARGET PREFIX</label>
            <select value={minePrefix} onChange={e => setMinePrefix(e.target.value)}
              className="sha-select" onClick={e => e.stopPropagation()}>
              <option value="0">0 (easy ~16 tries)</option>
              <option value="00">00 (medium ~256 tries)</option>
              <option value="000">000 (hard ~4,096 tries)</option>
              <option value="0000">0000 (brutal ~65,536 tries)</option>
            </select>
            {!mining ? (
              <button onClick={startMining} className="lab-btn encode">MINE</button>
            ) : (
              <button onClick={stopMining} className="lab-btn reset">STOP</button>
            )}
          </div>

          <div className="mine-status">
            <div className="mine-counter">
              ATTEMPTS: <span className="mine-num">{attempts.toLocaleString()}</span>
              {mining && <span className="mine-spinner"> ⠋</span>}
            </div>
          </div>

          {mineResult && (
            <div className="mine-result">
              <div className="mine-found">HASH FOUND</div>
              <div className="mine-row">
                <span className="mine-label">NONCE</span>
                <span className="mine-val">{mineResult.nonce}</span>
              </div>
              <div className="mine-row">
                <span className="mine-label">INPUT</span>
                <span className="mine-val">{mineResult.input}</span>
              </div>
              <div className="mine-row">
                <span className="mine-label">HASH</span>
                <span className="mine-val">
                  <span className="mine-prefix">{mineResult.hash.slice(0, minePrefix.length)}</span>
                  {mineResult.hash.slice(minePrefix.length)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="lab-footer">
        SHA-256 is a one-way function. Easy to compute, impossible to reverse.
        Avalanche ensures no pattern leaks. Mining proves computational work.
      </div>
    </div>
  );
}

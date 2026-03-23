import { useState, useEffect, useMemo, useCallback } from 'react';
import './SecretVault.css';

const PLAINTEXT = 'SIGNAL';
const KEY = 'ALKEM1';

// Delays (ms) between each step appearing
const STEP_DELAYS = [
  300,  // 1→2: subtitle
  500,  // 2→3: plaintext row
  350,  // 3→4: key row
  250,  // 4→5: separator
  500,  // 5→6: section header
  280,  // 6→7: plain binary
  280,  // 7→8: key binary
  180,  // 8→9: binary separator
  650,  // 9→10: XOR result (dramatic)
  650,  // 10→11: encrypted result
  700,  // 11→12: reverse header
  280,  // 12→13: encrypted binary
  280,  // 13→14: key binary again
  180,  // 14→15: binary separator
  650,  // 15→16: XOR reverse result
  650,  // 16→17: decrypted result
  500,  // 17→18: heavy separator
  400,  // 18→19: reveal 1
  350,  // 19→20: reveal 2
  350,  // 20→21: reveal 3
  400,  // 21→22: footer 1
  350,  // 22→23: footer 2
];

const TOTAL_STEPS = 23;

export default function SecretVault({ onClose }) {
  const [phase, setPhase] = useState('flash');
  const [step, setStep] = useState(0);

  // Compute XOR data dynamically
  const xorData = useMemo(() => {
    return PLAINTEXT.split('').map((char, i) => {
      const pCode = char.charCodeAt(0);
      const kChar = KEY[i % KEY.length];
      const kCode = kChar.charCodeAt(0);
      const result = pCode ^ kCode;
      return {
        plainChar: char,
        keyChar: kChar,
        plainBin: pCode.toString(2).padStart(8, '0'),
        keyBin: kCode.toString(2).padStart(8, '0'),
        resultBin: result.toString(2).padStart(8, '0'),
        resultHex: result.toString(16).toUpperCase().padStart(2, '0'),
        resultCode: result,
      };
    });
  }, []);

  const first = xorData[0];

  // Flash → demo transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('demo');
      setStep(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Step progression during demo phase
  useEffect(() => {
    if (phase !== 'demo' || step < 1) return;

    if (step >= TOTAL_STEPS) {
      // All content shown — hold 5s then dissolve
      const timer = setTimeout(() => setPhase('dissolve'), 5000);
      return () => clearTimeout(timer);
    }

    const delay = STEP_DELAYS[step - 1] || 300;
    const timer = setTimeout(() => setStep(s => s + 1), delay);
    return () => clearTimeout(timer);
  }, [phase, step]);

  // Dissolve → close
  useEffect(() => {
    if (phase !== 'dissolve') return;
    const timer = setTimeout(() => onClose(), 1200);
    return () => clearTimeout(timer);
  }, [phase, onClose]);

  // Dismiss on key or click (not during flash)
  const dismiss = useCallback(() => {
    if (phase === 'dissolve' || phase === 'flash') return;
    setPhase('dissolve');
  }, [phase]);

  useEffect(() => {
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [dismiss]);

  // Render XOR result bits with hot/cold highlighting
  const renderBits = (binary, highlightMode) => {
    return binary.split('').map((bit, i) => (
      <span
        key={i}
        style={{ '--bit-i': i }}
        className={
          highlightMode === 'xor'
            ? (bit === '1' ? 'v-bit v-bit-hot' : 'v-bit v-bit-cold')
            : 'v-bit v-bit-normal'
        }
      >
        {bit}
      </span>
    ));
  };

  return (
    <div className={`vault-overlay vault-${phase}`} onClick={dismiss}>
      {/* Background effects */}
      <div className="vault-glitch-bar" />
      <div className="vault-glitch-bar vault-glitch-bar-2" />
      <div className="vault-glitch-bar vault-glitch-bar-3" />

      <div className="vault-content">
        {/* ── Title ── */}
        {step >= 1 && <div className="v-title">⊕ XOR CIPHER</div>}
        {step >= 2 && <div className="v-subtitle">LIVE DEMONSTRATION</div>}

        {/* ── Plaintext + Key rows ── */}
        {step >= 3 && (
          <div className="v-row">
            <span className="v-label">PLAINTEXT</span>
            <span className="v-chars">
              {PLAINTEXT.split('').map((c, i) => (
                <span key={i} className="v-char v-char-plain">{c}</span>
              ))}
            </span>
          </div>
        )}
        {step >= 4 && (
          <div className="v-row">
            <span className="v-label">KEY</span>
            <span className="v-chars">
              {KEY.split('').map((c, i) => (
                <span key={i} className="v-char v-char-key">{c}</span>
              ))}
            </span>
          </div>
        )}
        {step >= 5 && <div className="v-sep">{'─'.repeat(38)}</div>}

        {/* ── Binary breakdown: encrypt ── */}
        {step >= 6 && (
          <div className="v-section-header">
            ── ENCRYPT: {first.plainChar} ⊕ {first.keyChar} ──
          </div>
        )}
        {step >= 7 && (
          <div className="v-bin-row">
            <span className="v-bin-label v-color-plain">{first.plainChar}</span>
            <span className="v-bin-eq">=</span>
            <span className="v-bin-digits">{renderBits(first.plainBin, 'normal')}</span>
          </div>
        )}
        {step >= 8 && (
          <div className="v-bin-row">
            <span className="v-bin-label v-color-key">{first.keyChar}</span>
            <span className="v-bin-eq">=</span>
            <span className="v-bin-digits">{renderBits(first.keyBin, 'normal')}</span>
          </div>
        )}
        {step >= 9 && (
          <div className="v-bin-row v-bin-sep-row">
            <span className="v-bin-label"> </span>
            <span className="v-bin-eq"> </span>
            <span className="v-bin-sep-line">────────</span>
          </div>
        )}
        {step >= 10 && (
          <div className="v-bin-row v-result-row">
            <span className="v-bin-label v-color-xor">⊕</span>
            <span className="v-bin-eq">=</span>
            <span className="v-bin-digits v-bin-result">{renderBits(first.resultBin, 'xor')}</span>
            <span className="v-arrow">→</span>
            <span className="v-hex">0x{first.resultHex}</span>
          </div>
        )}

        {/* ── Full encrypted result ── */}
        {step >= 11 && (
          <div className="v-row v-encrypted-row">
            <span className="v-label">ENCRYPTED</span>
            <span className="v-chars">
              {xorData.map((d, i) => (
                <span key={i} className="v-char v-char-enc">{d.resultHex}</span>
              ))}
            </span>
          </div>
        )}

        {/* ── Binary breakdown: decrypt ── */}
        {step >= 12 && (
          <div className="v-section-header v-section-reverse">
            ── DECRYPT: SAME KEY ──
          </div>
        )}
        {step >= 13 && (
          <div className="v-bin-row">
            <span className="v-bin-label v-color-enc">0x{first.resultHex}</span>
            <span className="v-bin-eq">=</span>
            <span className="v-bin-digits">{renderBits(first.resultBin, 'normal')}</span>
          </div>
        )}
        {step >= 14 && (
          <div className="v-bin-row">
            <span className="v-bin-label v-color-key">{first.keyChar}</span>
            <span className="v-bin-eq">=</span>
            <span className="v-bin-digits">{renderBits(first.keyBin, 'normal')}</span>
          </div>
        )}
        {step >= 15 && (
          <div className="v-bin-row v-bin-sep-row">
            <span className="v-bin-label"> </span>
            <span className="v-bin-eq"> </span>
            <span className="v-bin-sep-line">────────</span>
          </div>
        )}
        {step >= 16 && (
          <div className="v-bin-row v-result-row v-success-row">
            <span className="v-bin-label v-color-xor">⊕</span>
            <span className="v-bin-eq">=</span>
            <span className="v-bin-digits v-bin-success">{renderBits(first.plainBin, 'normal')}</span>
            <span className="v-arrow">→</span>
            <span className="v-char-restored">{first.plainChar} ✓</span>
          </div>
        )}

        {/* ── Full decrypted result ── */}
        {step >= 17 && (
          <div className="v-row v-decrypted-row">
            <span className="v-label">DECRYPTED</span>
            <span className="v-chars">
              {PLAINTEXT.split('').map((c, i) => (
                <span key={i} className="v-char v-char-dec">{c}</span>
              ))}
            </span>
            <span className="v-check">✓</span>
          </div>
        )}

        {/* ── Reveal ── */}
        {step >= 18 && <div className="v-heavy-sep">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>}
        {step >= 19 && <div className="v-reveal">Same key encrypts and decrypts.</div>}
        {step >= 20 && <div className="v-reveal">One operation. Perfect symmetry.</div>}
        {step >= 21 && <div className="v-reveal v-reveal-accent">This is the atom of all cryptography.</div>}
        {step >= 22 && <div className="v-footer">You found the signal.</div>}
        {step >= 23 && <div className="v-footer">The noise was always optional.</div>}
      </div>

      <div className="vault-scanline" />
    </div>
  );
}

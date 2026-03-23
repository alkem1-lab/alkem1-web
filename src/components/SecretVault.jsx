import { useState, useEffect, useMemo, useCallback } from 'react';
import './SecretVault.css';

const PLAINTEXT = 'SECRET';
const KEY = 'ALKEM1';

// Step delays (ms) — each entry is the pause AFTER step N before step N+1 appears
const STEP_DELAYS = [
  // ── Breach labels (steps 1-5) ──
  300,  // 1→2
  300,  // 2→3
  300,  // 3→4
  400,  // 4→5: VAULT title
  // ── Theory (steps 6-9) ──
  600,  // 5→6: XOR explanation
  700,  // 6→7: formula line 1
  350,  // 7→8: formula line 2
  600,  // 8→9: "Same transform..."
  // ── Encrypt (steps 10-17) ──
  600,  // 9→10: separator
  400,  // 10→11: SOURCE/KEY/MODE block
  450,  // 11→12: char 1
  280,  // 12→13: char 2
  280,  // 13→14: char 3
  280,  // 14→15: char 4
  280,  // 15→16: char 5
  280,  // 16→17: char 6
  500,  // 17→18: CIPHER result
  // ── Decrypt (steps 19-27) ──
  650,  // 18→19: reverse header
  380,  // 19→20: reverse char 1
  280,  // 20→21: char 2
  280,  // 21→22: char 3
  280,  // 22→23: char 4
  280,  // 23→24: char 5
  280,  // 24→25: char 6
  550,  // 25→26: RESTORED result
  // ── Reveal (steps 27-30) ──
  700,  // 26→27: separator
  600,  // 27→28: philosophical line
  900,  // 28→29: [SEALED MESSAGE] label
  400,  // 29→30: final message
];

const TOTAL_STEPS = 30;

export default function SecretVault({ onClose }) {
  const [phase, setPhase] = useState('flash');
  const [step, setStep] = useState(0);

  // Compute XOR dynamically
  const xorData = useMemo(() => {
    return PLAINTEXT.split('').map((char, i) => {
      const pCode = char.charCodeAt(0);
      const kChar = KEY[i % KEY.length];
      const kCode = kChar.charCodeAt(0);
      const result = pCode ^ kCode;
      return {
        plainChar: char,
        keyChar: kChar,
        resultHex: result.toString(16).toUpperCase().padStart(2, '0'),
        resultCode: result,
      };
    });
  }, []);

  // Flash → active
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('active');
      setStep(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Step progression
  useEffect(() => {
    if (phase !== 'active' || step < 1) return;

    if (step >= TOTAL_STEPS) {
      const timer = setTimeout(() => setPhase('dissolve'), 4000);
      return () => clearTimeout(timer);
    }

    const delay = STEP_DELAYS[step - 1] || 300;
    const timer = setTimeout(() => setStep(s => s + 1), delay);
    return () => clearTimeout(timer);
  }, [phase, step]);

  // Dissolve → close
  useEffect(() => {
    if (phase !== 'dissolve') return;
    const timer = setTimeout(() => onClose(), 1500);
    return () => clearTimeout(timer);
  }, [phase, onClose]);

  // Dismiss
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

        {/* ═══ PHASE 1: BREACH ═══ */}
        {step >= 1 && <div className="v-sys">[UNLISTED ROUTE DETECTED]</div>}
        {step >= 2 && <div className="v-sys">[TRACE SUPPRESSED]</div>}
        {step >= 3 && <div className="v-sys">[HISTORY BYPASSED]</div>}
        {step >= 4 && <div className="v-sys">[ENTERING SEALED LAYER]</div>}
        {step >= 5 && <div className="v-vault-title">VAULT::SYMMETRIC_CIPHER</div>}

        {/* ═══ PHASE 2: THEORY ═══ */}
        {step >= 6 && (
          <div className="v-theory">
            XOR is not magic. It is reversibility under the same key.
          </div>
        )}
        {step >= 7 && (
          <div className="v-formula">
            <span className="v-f-plain">input</span>
            <span className="v-f-op">⊕</span>
            <span className="v-f-key">key</span>
            <span className="v-f-eq">=</span>
            <span className="v-f-cipher">cipher</span>
          </div>
        )}
        {step >= 8 && (
          <div className="v-formula">
            <span className="v-f-cipher">cipher</span>
            <span className="v-f-op">⊕</span>
            <span className="v-f-key">key</span>
            <span className="v-f-eq">=</span>
            <span className="v-f-plain">input</span>
          </div>
        )}
        {step >= 9 && (
          <div className="v-theory v-theory-accent">
            Same transform. Same key. Truth returns.
          </div>
        )}

        {/* ═══ PHASE 3: ENCRYPT ═══ */}
        {step >= 10 && <div className="v-sep">{'─'.repeat(40)}</div>}
        {step >= 11 && (
          <div className="v-meta-block">
            <div className="v-meta"><span className="v-meta-label">SOURCE</span><span className="v-meta-val v-color-plain">{PLAINTEXT}</span></div>
            <div className="v-meta"><span className="v-meta-label">KEY</span><span className="v-meta-val v-color-key">{KEY}</span></div>
            <div className="v-meta"><span className="v-meta-label">MODE</span><span className="v-meta-val v-color-xor">XOR</span></div>
          </div>
        )}

        {/* XOR encrypt — char by char */}
        {xorData.map((d, i) => (
          step >= 12 + i && (
            <div key={`enc-${i}`} className="v-xor-line">
              <span className="v-xl-plain">{d.plainChar}</span>
              <span className="v-xl-op">⊕</span>
              <span className="v-xl-key">{d.keyChar}</span>
              <span className="v-xl-arrow">→</span>
              <span className="v-xl-result">{d.resultHex}</span>
            </div>
          )
        ))}

        {step >= 18 && (
          <div className="v-cipher-row">
            <span className="v-cipher-label">CIPHER</span>
            <span className="v-cipher-val">{cipherStr}</span>
          </div>
        )}

        {/* ═══ PHASE 4: DECRYPT ═══ */}
        {step >= 19 && (
          <div className="v-reverse-header">── REVERSE PASS ──</div>
        )}

        {/* XOR decrypt — char by char */}
        {xorData.map((d, i) => (
          step >= 20 + i && (
            <div key={`dec-${i}`} className="v-xor-line v-xor-reverse">
              <span className="v-xl-cipher">{d.resultHex}</span>
              <span className="v-xl-op">⊕</span>
              <span className="v-xl-key">{d.keyChar}</span>
              <span className="v-xl-arrow">→</span>
              <span className="v-xl-restored">{d.plainChar}</span>
            </div>
          )
        ))}

        {step >= 26 && (
          <div className="v-restored-row">
            <span className="v-restored-label">RESTORED</span>
            <span className="v-restored-val">{PLAINTEXT}</span>
          </div>
        )}

        {/* ═══ PHASE 5: REVEAL ═══ */}
        {step >= 27 && <div className="v-heavy-sep">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>}
        {step >= 28 && (
          <div className="v-reveal">
            Most people see mystery. Operators see transforms.
          </div>
        )}
        {step >= 29 && (
          <div className="v-sealed-label">[SEALED MESSAGE]</div>
        )}
        {step >= 30 && (
          <div className="v-sealed-msg">
            Nothing vanished. You just lacked the key.
          </div>
        )}
      </div>

    </div>
  );
}

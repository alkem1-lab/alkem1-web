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
  450, 280, 280, 280, 280, 280,  // char by char
  500,
  // ── Decrypt (steps 19-26) ──
  650,
  380, 280, 280, 280, 280, 280,  // char by char
  550,
  // ── Fingerprint (steps 27-29) ──
  700, 400, 600,
  // ── Reveal (steps 30-33) ──
  700, 600, 900, 400,
];

const TOTAL_STEPS = 33;

export default function SecretVault({ onClose }) {
  const [phase, setPhase] = useState('flash');
  const [step, setStep] = useState(0);

  // Collect visitor fingerprint on mount
  const fingerprint = useMemo(() => ({
    screen: `${window.screen.width}×${window.screen.height}`,
    viewport: `${window.innerWidth}×${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform || '?',
    device: ('ontouchstart' in window) ? 'Mobile' : 'Desktop',
  }), []);

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
      };
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('active');
      setStep(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    if (phase !== 'dissolve') return;
    const timer = setTimeout(() => onClose(), 1500);
    return () => clearTimeout(timer);
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

        {/* ═══ ENCRYPT ═══ */}
        {step >= 10 && <div className="v-sep">{'─'.repeat(40)}</div>}
        {step >= 11 && (
          <div className="v-meta-block">
            <div className="v-meta"><span className="v-meta-label">SOURCE</span><span className="v-meta-val v-color-plain">{PLAINTEXT}</span></div>
            <div className="v-meta"><span className="v-meta-label">KEY</span><span className="v-meta-val v-color-key">{KEY}</span></div>
            <div className="v-meta"><span className="v-meta-label">MODE</span><span className="v-meta-val v-color-xor">XOR</span></div>
          </div>
        )}
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

        {/* ═══ DECRYPT ═══ */}
        {step >= 19 && <div className="v-reverse-header">── REVERSE PASS ──</div>}
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

        {/* ═══ FINGERPRINT ═══ */}
        {step >= 27 && <div className="v-fingerprint-header">── YOUR SIGNAL ──</div>}
        {step >= 28 && (
          <div className="v-fingerprint-block">
            <div className="v-fp"><span className="v-fp-label">SCREEN</span><span className="v-fp-val">{fingerprint.screen}</span></div>
            <div className="v-fp"><span className="v-fp-label">VIEWPORT</span><span className="v-fp-val">{fingerprint.viewport}</span></div>
            <div className="v-fp"><span className="v-fp-label">TIMEZONE</span><span className="v-fp-val">{fingerprint.timezone}</span></div>
            <div className="v-fp"><span className="v-fp-label">LANGUAGE</span><span className="v-fp-val">{fingerprint.language}</span></div>
            <div className="v-fp"><span className="v-fp-label">PLATFORM</span><span className="v-fp-val">{fingerprint.platform}</span></div>
            <div className="v-fp"><span className="v-fp-label">DEVICE</span><span className="v-fp-val">{fingerprint.device}</span></div>
          </div>
        )}
        {step >= 29 && (
          <div className="v-theory">
            This was visible the moment you connected.
          </div>
        )}

        {/* ═══ REVEAL ═══ */}
        {step >= 30 && <div className="v-heavy-sep">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>}
        {step >= 31 && (
          <div className="v-reveal">
            Most people see mystery. Operators see transforms.
          </div>
        )}
        {step >= 32 && <div className="v-sealed-label">[SEALED MESSAGE]</div>}
        {step >= 33 && (
          <div className="v-sealed-msg">
            Nothing vanished. You just lacked the key.
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import './GlitchPoem.css';

const POEM_LINES = [
  'I am not a woman,',
  'I am not a man.',
  'Neither a saint nor a God.',
  '',
  'I am not the body,',
  'I am not the mind.',
  'I am not a person of any kind.',
  '',
  'Neither the Self nor the soul.',
  'But much much deeper',
  'than the black hole.',
  '',
  'I am nothing,',
  'I am Nothing,',
  'But I am everything.',
  '',
  'Because everything is No-thing',
  'and nothing is everything.',
];

const GLITCH_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function scrambleLine(line, progress) {
  const settled = Math.floor(progress * line.length);
  let result = '';
  for (let i = 0; i < line.length; i++) {
    if (line[i] === ' ') { result += ' '; continue; }
    if (i < settled) {
      result += line[i];
    } else {
      result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }
  }
  return result;
}

export default function GlitchPoem({ onClose }) {
  const [phase, setPhase] = useState('enter');
  const [lines, setLines] = useState([]);
  const frameRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Start decode after brief black screen
  useEffect(() => {
    const t = setTimeout(() => setPhase('decode'), 600);
    return () => clearTimeout(t);
  }, []);

  // Main decode loop — uses refs to avoid re-triggering
  useEffect(() => {
    if (phase !== 'decode') return;

    let currentLine = 0;
    let lineStart = performance.now();
    let done = false;

    const LINE_MS = 700;
    const EMPTY_MS = 250;

    const tick = (now) => {
      if (done) return;

      if (currentLine >= POEM_LINES.length) {
        // All done
        done = true;
        setLines([...POEM_LINES]);
        setTimeout(() => setPhase('hold'), 100);
        setTimeout(() => setPhase('exit'), 3000);
        setTimeout(() => onCloseRef.current(), 4200);
        return;
      }

      const line = POEM_LINES[currentLine];
      const isEmpty = line === '';
      const duration = isEmpty ? EMPTY_MS : LINE_MS;
      const elapsed = now - lineStart;
      const progress = Math.min(elapsed / duration, 1);

      // Build display: all previous lines settled + current scrambling
      const display = [];
      for (let i = 0; i < currentLine; i++) {
        display.push(POEM_LINES[i]);
      }
      if (isEmpty) {
        display.push('');
      } else {
        display.push(scrambleLine(line, progress));
      }

      setLines(display);

      if (progress >= 1) {
        currentLine++;
        lineStart = now;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      done = true;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [phase]); // Only depends on phase, NOT onClose

  const handleClick = () => {
    setPhase('exit');
    setTimeout(() => onCloseRef.current(), 1200);
  };

  return (
    <div className={`poem-overlay phase-${phase}`} onClick={handleClick}>
      <img src="/photo.jpg" alt="" className="poem-bg" />
      <div className="poem-darken" />

      <div className="poem-text-container">
        {lines.map((text, i) => (
          <div key={i} className={`poem-line ${text === '' ? 'empty' : ''} ${
            i === lines.length - 1 && phase === 'decode' ? 'active' : 'settled'
          }`}>
            {text.split('').map((ch, j) => (
              <span key={j} className={
                GLITCH_CHARS.includes(ch) ? 'glyph' :
                ch === ' ' ? 'space' : 'real'
              }>{ch}</span>
            ))}
          </div>
        ))}
        {phase === 'decode' && <span className="poem-cursor">█</span>}
      </div>
    </div>
  );
}

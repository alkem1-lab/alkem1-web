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

function scrambleWord(word, progress) {
  // progress 0→1: characters settle left to right
  const settled = Math.floor(progress * word.length);
  let result = '';
  for (let i = 0; i < word.length; i++) {
    if (word[i] === ' ') { result += ' '; continue; }
    if (i < settled) {
      result += word[i];
    } else if (i === settled && progress < 1) {
      // Currently decoding character — flicker between glitch and real
      result += Math.random() > 0.3
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : word[i];
    } else {
      result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }
  }
  return result;
}

export default function GlitchPoem({ onClose }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [lineProgress, setLineProgress] = useState(0); // 0→1 for current line decode
  const [displayTexts, setDisplayTexts] = useState([]);
  const [phase, setPhase] = useState('enter'); // enter → decode → hold → exit
  const frameRef = useRef(null);
  const startRef = useRef(null);

  // Phase timing
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('decode'), 600);
    return () => clearTimeout(t1);
  }, []);

  // Decode animation — line by line
  useEffect(() => {
    if (phase !== 'decode') return;

    let currentLine = 0;
    let lineStart = performance.now();
    const LINE_DURATION = 600; // ms per line
    const EMPTY_DURATION = 200; // ms for empty lines (pauses)

    const tick = (now) => {
      if (currentLine >= POEM_LINES.length) {
        // All lines done — hold then exit
        setVisibleLines(POEM_LINES.length);
        setDisplayTexts(POEM_LINES.map(l => l));
        setTimeout(() => setPhase('hold'), 100);
        setTimeout(() => setPhase('exit'), 3000);
        setTimeout(() => onClose(), 4200);
        return;
      }

      const line = POEM_LINES[currentLine];
      const isEmptyLine = line === '';
      const duration = isEmptyLine ? EMPTY_DURATION : LINE_DURATION;
      const elapsed = now - lineStart;
      const progress = Math.min(elapsed / duration, 1);

      // Update display
      setVisibleLines(currentLine + 1);
      setDisplayTexts(prev => {
        const next = [...POEM_LINES.slice(0, currentLine)];
        if (isEmptyLine) {
          next.push('');
        } else {
          next.push(scrambleWord(line, progress));
        }
        return next;
      });

      if (progress >= 1) {
        // Line complete — move to next
        currentLine++;
        lineStart = now;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [phase, onClose]);

  // Glitch refresh for settled lines (subtle ongoing scramble on non-settled chars)
  useEffect(() => {
    if (phase !== 'decode') return;
    // The main tick handles everything via rAF
  }, [phase]);

  return (
    <div className={`poem-overlay phase-${phase}`} onClick={() => { setPhase('exit'); setTimeout(onClose, 1200); }}>
      <img src="/photo.jpg" alt="" className="poem-bg" />
      <div className="poem-darken" />

      <div className="poem-text-container">
        {displayTexts.map((text, i) => (
          <div key={i} className={`poem-line ${text === '' ? 'empty' : ''} ${i === displayTexts.length - 1 && phase === 'decode' ? 'active' : 'settled'}`}>
            {text.split('').map((ch, j) => (
              <span key={j} className={
                GLITCH_CHARS.includes(ch) ? 'glyph' :
                ch === ' ' ? 'space' : 'real'
              }>{ch}</span>
            ))}
          </div>
        ))}
        {phase === 'decode' && (
          <span className="poem-cursor">█</span>
        )}
      </div>
    </div>
  );
}

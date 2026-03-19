import { useState, useEffect, useRef } from 'react';
import { BOOT_LINES } from '../data/bootSequence';

export default function BootScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    let timeout;
    let currentIndex = 0;
    let totalDelay = 0;

    const addLine = (index) => {
      if (index >= BOOT_LINES.length) {
        // Boot complete — wait a beat then transition
        timeout = setTimeout(() => {
          onComplete();
        }, 800);
        return;
      }

      const line = BOOT_LINES[index];
      totalDelay = line.delay;

      timeout = setTimeout(() => {
        setLines(prev => [...prev, line]);
        addLine(index + 1);
      }, totalDelay);
    };

    // Start after a brief delay
    timeout = setTimeout(() => addLine(0), 400);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [onComplete]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const getLineClass = (type) => {
    switch (type) {
      case 'ok': return 'boot-ok';
      case 'warn': return 'boot-warn';
      case 'error': return 'boot-error';
      case 'blank': return 'boot-blank';
      default: return 'boot-info';
    }
  };

  return (
    <div className="boot-screen" ref={containerRef}>
      <div className="boot-content">
        {lines.map((line, i) => (
          <div key={i} className={`boot-line ${getLineClass(line.type)}`}>
            {line.text}
          </div>
        ))}
        <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>█</span>
      </div>
      <div className="boot-skip" onClick={onComplete}>
        [press any key or click to skip]
      </div>
    </div>
  );
}

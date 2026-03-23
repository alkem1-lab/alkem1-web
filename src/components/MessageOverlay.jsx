import { useState, useEffect, useCallback } from 'react';
import './MessageOverlay.css';

export default function MessageOverlay({ message, onClose }) {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 50);
    const t2 = setTimeout(() => setPhase('exit'), 6000);
    const t3 = setTimeout(() => onClose(), 7200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onClose]);

  const dismiss = useCallback(() => {
    if (phase === 'exit') return;
    setPhase('exit');
    setTimeout(() => onClose(), 1200);
  }, [phase, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [dismiss]);

  return (
    <div className={`msg-overlay msg-${phase}`} onClick={dismiss}>
      <div className="msg-content">{message}</div>
    </div>
  );
}

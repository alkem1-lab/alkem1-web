import { useState, useEffect, useCallback } from 'react';
import './PhotoReveal.css';

export default function PhotoReveal({ onClose }) {
  const [phase, setPhase] = useState('enter'); // enter → visible → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 50);
    const t2 = setTimeout(() => setPhase('exit'), 4000);
    const t3 = setTimeout(() => onClose(), 5200);
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
    <div className={`photo-overlay photo-${phase}`} onClick={dismiss}>
      <img src="/photo.jpg" alt="" className="photo-img" />
    </div>
  );
}

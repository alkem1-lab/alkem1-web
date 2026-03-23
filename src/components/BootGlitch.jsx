import { useState, useEffect } from 'react';
import './BootGlitch.css';

export default function BootGlitch() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle → flash → gone

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem('_boot_glitch')) return;
    sessionStorage.setItem('_boot_glitch', '1');

    // Small delay so terminal renders first
    const t1 = setTimeout(() => { setVisible(true); setPhase('flash'); }, 800);
    const t2 = setTimeout(() => setPhase('gone'), 1200);
    const t3 = setTimeout(() => setVisible(false), 1600);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!visible) return null;

  return (
    <div className={`boot-glitch ${phase}`}>
      <img src="/photo.jpg" alt="" className="boot-img" />
    </div>
  );
}

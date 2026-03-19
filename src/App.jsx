import { useState, useCallback, useEffect } from 'react';
import BootScreen from './components/BootScreen';
import Terminal from './components/Terminal';
import './App.css';

export default function App() {
  const [phase, setPhase] = useState('boot');
  const [fadeIn, setFadeIn] = useState(false);

  const handleBootComplete = useCallback(() => {
    setPhase('transition');
    setTimeout(() => {
      setPhase('terminal');
      setTimeout(() => setFadeIn(true), 50);
    }, 300);
  }, []);

  // Allow skip with any key during boot
  useEffect(() => {
    if (phase !== 'boot') return;
    const handler = (e) => {
      if (e.key) handleBootComplete();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, handleBootComplete]);

  return (
    <div className="app">
      <div className="scanlines"></div>
      {phase === 'boot' && (
        <BootScreen onComplete={handleBootComplete} />
      )}
      {(phase === 'terminal' || phase === 'transition') && (
        <div className={`terminal-container ${fadeIn ? 'fade-in' : ''}`}>
          <Terminal />
        </div>
      )}
    </div>
  );
}

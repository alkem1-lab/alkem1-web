import { useState, useEffect } from 'react';
import './AnimatedLogo.css';

export default function AnimatedLogo({ state = 'idle' }) {
  const [phase, setPhase] = useState('hidden'); // hidden -> draw-left -> draw-right -> flicker -> idle

  useEffect(() => {
    const timers = [];
    // Boot sequence
    timers.push(setTimeout(() => setPhase('draw-left'), 200));
    timers.push(setTimeout(() => setPhase('draw-right'), 550));
    timers.push(setTimeout(() => setPhase('flicker'), 900));
    timers.push(setTimeout(() => setPhase('idle'), 1100));
    return () => timers.forEach(clearTimeout);
  }, []);

  const stateClass = phase === 'idle' ? `state-${state}` : '';

  return (
    <div className={`animated-logo phase-${phase} ${stateClass}`}>
      <svg
        viewBox="0 0 2000 2000"
        className="logo-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left path — L */}
        <path
          className="logo-path path-left"
          transform="translate(293,152)"
          d="m0 0h319l1 1460 370 1 1 1v270l-1 1h-690l-1-1724z"
        />

        {/* Right path — 1 */}
        <path
          className="logo-path path-right"
          transform="translate(985,151)"
          d="m0 0h691v1732l-5 1h-314l-1-8v-1452l-370-1-1-1z"
        />

        {/* Scan line overlay */}
        <rect className="scan-line" x="0" y="0" width="2000" height="4" />
      </svg>
    </div>
  );
}

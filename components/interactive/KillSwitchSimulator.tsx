"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SystemState = "NOMINAL" | "ELEVATED" | "WARNING" | "CRITICAL" | "KILLED";

const stateConfig: Record<SystemState, {
  color: string;
  bg: string;
  border: string;
  message: string;
  defcon: number;
}> = {
  NOMINAL: {
    color: "text-phosphor",
    bg: "bg-phosphor/10",
    border: "border-phosphor/30",
    message: "All systems operational",
    defcon: 5,
  },
  ELEVATED: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    message: "Minor anomaly detected",
    defcon: 4,
  },
  WARNING: {
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    message: "Suspicious pattern identified",
    defcon: 3,
  },
  CRITICAL: {
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    message: "Threat confirmed - Preparing countermeasures",
    defcon: 2,
  },
  KILLED: {
    color: "text-crimson",
    bg: "bg-crimson/20",
    border: "border-crimson/50",
    message: "SYSTEM HALTED - Kill switch activated",
    defcon: 1,
  },
};

export function KillSwitchSimulator() {
  const [threatLevel, setThreatLevel] = useState(0);
  const [state, setState] = useState<SystemState>("NOMINAL");
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [killTimestamp, setKillTimestamp] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Determine state based on threat level
  useEffect(() => {
    let newState: SystemState;
    if (threatLevel < 20) newState = "NOMINAL";
    else if (threatLevel < 40) newState = "ELEVATED";
    else if (threatLevel < 60) newState = "WARNING";
    else if (threatLevel < 80) newState = "CRITICAL";
    else newState = "KILLED";

    if (newState !== state) {
      setState(newState);

      // Add log entry
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [`[${timestamp}] State: ${state} → ${newState}`, ...prev.slice(0, 9)]);

      // Simulate response time when killed
      if (newState === "KILLED") {
        const time = Math.floor(Math.random() * 20) + 35; // 35-55ms
        setResponseTime(time);
        setKillTimestamp(new Date().toISOString());
      } else {
        setResponseTime(null);
        setKillTimestamp(null);
      }
    }
  }, [threatLevel, state]);

  const config = stateConfig[state];

  const resetSystem = () => {
    setThreatLevel(0);
    setLogs([`[${new Date().toLocaleTimeString()}] System reset initiated`]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-crimson/30 bg-crimson/5 mb-4">
          <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
          <span className="text-xs font-mono text-crimson uppercase tracking-wider">
            Interactive Demo
          </span>
        </div>
        <h3
          className="text-2xl md:text-3xl text-text-bright font-display"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Kill Switch Simulator
        </h3>
        <p className="text-text-ghost text-sm mt-2">
          Drag the slider to simulate a threat. Watch the system respond.
        </p>
      </div>

      {/* Status Display */}
      <motion.div
        className={`p-6 rounded-xl border-2 ${config.border} ${config.bg} mb-8 transition-all duration-300`}
        animate={state === "KILLED" ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className={`w-4 h-4 rounded-full ${config.color} bg-current`}
              animate={state === "KILLED" ? { scale: [1, 1.5, 1] } : { opacity: [0.5, 1, 0.5] }}
              transition={{ duration: state === "KILLED" ? 0.2 : 2, repeat: Infinity }}
            />
            <span className={`font-mono font-bold text-lg ${config.color}`}>
              {state}
            </span>
          </div>
          <div className={`font-mono text-sm ${config.color}`}>
            DEFCON {config.defcon}
          </div>
        </div>

        <p className={`${config.color} text-sm`}>{config.message}</p>

        {/* Response time badge */}
        <AnimatePresence>
          {responseTime && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center gap-4"
            >
              <div className="px-3 py-1 rounded bg-crimson/20 border border-crimson/50">
                <span className="text-crimson font-mono text-sm">
                  Response: {responseTime}ms
                </span>
              </div>
              <div className="text-xs text-text-ghost font-mono">
                {killTimestamp}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Threat Level Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-mono text-text-ghost uppercase tracking-wider">
            Threat Level
          </label>
          <span className={`font-mono text-lg ${config.color}`}>
            {threatLevel}%
          </span>
        </div>

        <div className="relative">
          {/* Track background with zones */}
          <div className="absolute inset-0 h-3 rounded-full overflow-hidden flex">
            <div className="w-[20%] bg-phosphor/30" />
            <div className="w-[20%] bg-emerald-400/30" />
            <div className="w-[20%] bg-amber-400/30" />
            <div className="w-[20%] bg-orange-500/30" />
            <div className="w-[20%] bg-crimson/30" />
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={threatLevel}
            onChange={(e) => setThreatLevel(Number(e.target.value))}
            className="relative w-full h-3 appearance-none bg-transparent cursor-pointer z-10
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-6
                       [&::-webkit-slider-thumb]:h-6
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-white
                       [&::-webkit-slider-thumb]:border-2
                       [&::-webkit-slider-thumb]:border-text-ghost
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-webkit-slider-thumb]:cursor-grab
                       [&::-webkit-slider-thumb]:active:cursor-grabbing
                       [&::-webkit-slider-thumb]:transition-transform
                       [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>

        {/* Zone labels */}
        <div className="flex justify-between mt-2 text-[10px] font-mono text-text-ghost">
          <span>SAFE</span>
          <span>ELEVATED</span>
          <span>WARNING</span>
          <span>CRITICAL</span>
          <span>KILL</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setThreatLevel(100)}
          className="flex-1 px-4 py-3 bg-crimson/10 border border-crimson/30 rounded-lg
                     text-crimson font-mono text-sm hover:bg-crimson/20 transition-colors"
        >
          🚨 Trigger Kill Switch
        </button>
        <button
          onClick={resetSystem}
          className="flex-1 px-4 py-3 bg-surface-1 border border-border-subtle rounded-lg
                     text-text-body font-mono text-sm hover:border-phosphor/30 transition-colors"
        >
          ↺ Reset System
        </button>
      </div>

      {/* Live Logs */}
      <div>
        <label className="block text-xs font-mono text-text-ghost uppercase tracking-wider mb-2">
          System Logs
        </label>
        <div className="h-40 overflow-y-auto p-4 bg-surface-2 rounded-lg border border-border-subtle font-mono text-xs">
          {logs.length === 0 ? (
            <span className="text-text-ghost">Waiting for events...</span>
          ) : (
            logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`mb-1 ${i === 0 ? "text-text-bright" : "text-text-ghost"}`}
              >
                {log}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Educational note */}
      <div className="mt-6 p-4 border border-crimson/20 rounded-lg bg-crimson/5">
        <p className="text-sm text-text-body">
          <span className="text-crimson font-semibold">Real-world behavior:</span>{" "}
          In production, ALKEM1's XCK module monitors dozens of threat signals simultaneously.
          When thresholds are breached, the kill switch activates in under 50ms—faster than
          a human can blink. All actions are logged to an immutable evidence chain.
        </p>
      </div>
    </div>
  );
}

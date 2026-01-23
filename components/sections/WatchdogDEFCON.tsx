"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const defconLevels = [
  {
    level: 5,
    name: "NORMAL",
    color: "#6ee7b7",
    description: "All systems operational. No threats detected.",
    checks: ["Redis: OK", "NTP: Synced", "Health: Consistent"],
  },
  {
    level: 4,
    name: "GUARDED",
    color: "#a78bfa",
    description: "Minor issue detected. Monitoring closely.",
    checks: ["WebSocket: Flaky", "Retry: 1/3", "Alert: Pending"],
  },
  {
    level: 3,
    name: "ELEVATED",
    color: "#f97316",
    description: "Elevated risk. Increased surveillance.",
    checks: ["Time: Stale", "Memory: High", "Degraded Mode"],
  },
  {
    level: 2,
    name: "HIGH",
    color: "#ef4444",
    description: "Serious issue. Automated response active.",
    checks: ["Redis: FAIL-CLOSED", "Circuit: OPEN", "Throttling"],
  },
  {
    level: 1,
    name: "CRITICAL",
    color: "#dc2626",
    description: "Multiple failures. Kill Switch armed.",
    checks: ["Multi-system FAIL", "Kill Switch: READY", "Incident Mode"],
  },
];

function DEFCONMeter({ level }: { level: number }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Meter background */}
      <div className="h-8 rounded-full bg-surface-2 border border-border-subtle overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, 
              #6ee7b7 0%, 
              #a78bfa 25%, 
              #f97316 50%, 
              #ef4444 75%, 
              #dc2626 100%)`,
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${(6 - level) * 20}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Level markers */}
      <div className="flex justify-between mt-2">
        {[5, 4, 3, 2, 1].map((l) => (
          <div 
            key={l}
            className={`text-xs font-mono ${level === l ? "text-text-bright" : "text-text-ghost"}`}
          >
            D{l}
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthCheck({ name, status }: { name: string; status: "ok" | "warn" | "fail" }) {
  const colors = {
    ok: "text-phosphor bg-phosphor/20",
    warn: "text-ember bg-ember/20",
    fail: "text-crimson bg-crimson/20",
  };
  
  const icons = {
    ok: "✓",
    warn: "!",
    fail: "✕",
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-surface-1/50">
      <span className="text-sm text-text-body">{name}</span>
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${colors[status]}`}>
        {icons[status]}
      </span>
    </div>
  );
}

export function WatchdogDEFCON() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentLevel, setCurrentLevel] = useState(5);
  const [checks, setChecks] = useState<Array<{ name: string; status: "ok" | "warn" | "fail" }>>([
    { name: "Redis Rate Limiter", status: "ok" },
    { name: "Time Integrity (NTP)", status: "ok" },
    { name: "Health/Ready Consistency", status: "ok" },
    { name: "WebSocket Connection", status: "ok" },
    { name: "Evidence Chain", status: "ok" },
  ]);

  // Simulate health degradation
  const simulateDegradation = () => {
    // Level 4
    setTimeout(() => {
      setCurrentLevel(4);
      setChecks(prev => prev.map((c, i) => i === 3 ? { ...c, status: "warn" as const } : c));
    }, 1000);

    // Level 3
    setTimeout(() => {
      setCurrentLevel(3);
      setChecks(prev => prev.map((c, i) => i === 1 ? { ...c, status: "warn" as const } : c));
    }, 2500);

    // Level 2
    setTimeout(() => {
      setCurrentLevel(2);
      setChecks(prev => prev.map((c, i) => i === 0 ? { ...c, status: "fail" as const } : c));
    }, 4000);

    // Recovery
    setTimeout(() => {
      setCurrentLevel(5);
      setChecks([
        { name: "Redis Rate Limiter", status: "ok" as const },
        { name: "Time Integrity (NTP)", status: "ok" as const },
        { name: "Health/Ready Consistency", status: "ok" as const },
        { name: "WebSocket Connection", status: "ok" as const },
        { name: "Evidence Chain", status: "ok" as const },
      ]);
    }, 7000);
  };

  const currentConfig = defconLevels.find(d => d.level === currentLevel)!;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-ember/50" />
              <span className="text-xs font-mono text-ember uppercase tracking-widest">
                System Guardian
              </span>
              <div className="h-[1px] w-12 bg-ember/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Watchdog <span className="text-ember">Never Sleeps</span>
            </h2>
            <p className="text-text-body max-w-2xl mx-auto">
              Continuous health monitoring with DEFCON-style escalation.
              From green to red in milliseconds. Auto-response at every level.
            </p>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Current status */}
            <motion.div variants={itemVariants}>
              {/* Big DEFCON display */}
              <div 
                className="p-8 rounded-2xl border-2 transition-all duration-500"
                style={{ 
                  borderColor: currentConfig.color,
                  backgroundColor: currentConfig.color + "10",
                  boxShadow: `0 0 40px ${currentConfig.color}30`,
                }}
              >
                <div className="text-center">
                  <div className="text-8xl font-bold" style={{ color: currentConfig.color }}>
                    {currentLevel}
                  </div>
                  <div className="text-2xl font-mono mt-2" style={{ color: currentConfig.color }}>
                    DEFCON {currentConfig.name}
                  </div>
                  <div className="text-text-body mt-4">
                    {currentConfig.description}
                  </div>
                </div>

                {/* Status checks */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {currentConfig.checks.map((check, i) => (
                    <span 
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: currentConfig.color + "20",
                        color: currentConfig.color 
                      }}
                    >
                      {check}
                    </span>
                  ))}
                </div>
              </div>

              {/* DEFCON meter */}
              <div className="mt-8">
                <DEFCONMeter level={currentLevel} />
              </div>

              {/* Simulate button */}
              <div className="mt-8 text-center">
                <button
                  onClick={simulateDegradation}
                  className="px-6 py-3 rounded-xl bg-ember/20 border border-ember/50 text-ember font-mono text-sm hover:bg-ember/30 transition-all"
                >
                  🎭 Simulate Degradation
                </button>
              </div>
            </motion.div>

            {/* Right: Health checks */}
            <motion.div variants={itemVariants}>
              <div className="rounded-xl border border-border-default bg-surface-1/80 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface-2/50">
                  <span className="text-sm font-mono text-text-ghost">Health Checks (5s interval)</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-phosphor animate-pulse" />
                    <span className="text-xs font-mono text-phosphor">LIVE</span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  {checks.map((check, i) => (
                    <HealthCheck key={i} name={check.name} status={check.status} />
                  ))}
                </div>
              </div>

              {/* DEFCON levels reference */}
              <div className="mt-6 space-y-2">
                {defconLevels.map((level) => (
                  <div
                    key={level.level}
                    className={`
                      flex items-center gap-4 p-3 rounded-lg border transition-all
                      ${currentLevel === level.level 
                        ? "bg-surface-2 border-opacity-100" 
                        : "bg-surface-1/30 border-opacity-20"
                      }
                    `}
                    style={{ borderColor: level.color }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                      style={{ backgroundColor: level.color + "20", color: level.color }}
                    >
                      {level.level}
                    </div>
                    <div>
                      <div className="font-medium text-text-bright text-sm">{level.name}</div>
                      <div className="text-xs text-text-ghost">{level.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key feature */}
              <div className="mt-6 p-4 rounded-xl bg-ember/10 border border-ember/30">
                <h4 className="font-bold text-ember mb-2 flex items-center gap-2">
                  <span>🐕</span> Hysteresis Protection
                </h4>
                <p className="text-sm text-text-body">
                  30-second delay before improvement. Prevents oscillation between states.
                  Quick to escalate, cautious to de-escalate.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom: Key quote */}
          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="inline-block p-6 rounded-xl bg-surface-1/80 border border-border-subtle">
              <p className="text-text-body">
                <span className="text-ember font-medium">&quot;Backend ne sme tiho da degradira.&quot;</span>
                <br />
                <span className="text-text-ghost text-sm">
                  — Auditor Rule #7: Silent failures are the worst failures.
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

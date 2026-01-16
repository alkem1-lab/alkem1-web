"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Simulated attack logs
const attackTypes = [
  { type: "Prompt Injection", status: "BLOCKED", severity: "HIGH" },
  { type: "Data Exfiltration", status: "BLOCKED", severity: "CRITICAL" },
  { type: "Token Overflow", status: "BLOCKED", severity: "MEDIUM" },
  { type: "Context Manipulation", status: "BLOCKED", severity: "HIGH" },
  { type: "Role Confusion", status: "BLOCKED", severity: "MEDIUM" },
  { type: "Jailbreak Attempt", status: "BLOCKED", severity: "CRITICAL" },
];

function AttackLog() {
  const [logs, setLogs] = useState<Array<{ type: string; status: string; severity: string; time: string }>>([]);

  useEffect(() => {
    // Add initial logs
    const initialLogs = attackTypes.slice(0, 3).map((attack, i) => ({
      ...attack,
      time: new Date(Date.now() - (i + 1) * 60000).toLocaleTimeString(),
    }));
    setLogs(initialLogs);

    // Add new logs periodically
    const interval = setInterval(() => {
      const randomAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      setLogs(prev => [
        { ...randomAttack, time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 4),
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "text-crimson";
      case "HIGH": return "text-ember";
      case "MEDIUM": return "text-phosphor";
      default: return "text-text-body";
    }
  };

  return (
    <div className="space-y-2">
      {logs.map((log, i) => (
        <motion.div
          key={`${log.type}-${log.time}-${i}`}
          className="flex items-center justify-between p-3 rounded bg-surface-2/50 border border-border-subtle"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono uppercase ${getSeverityColor(log.severity)}`}>
              [{log.severity}]
            </span>
            <span className="text-sm text-text-body">{log.type}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-ghost font-mono">{log.time}</span>
            <span className="text-xs font-mono text-phosphor px-2 py-1 rounded bg-phosphor/10">
              {log.status}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Joker() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [stats, setStats] = useState({
    attacksAttempted: 142857,
    vulnerabilitiesFound: 23,
    allPatched: true,
  });

  // Simulate live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        attacksAttempted: prev.attacksAttempted + Math.floor(Math.random() * 3),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-ember/50" />
              <span className="text-xs font-mono text-ember uppercase tracking-widest">
                Adversarial Testing
              </span>
              <div className="h-[1px] w-12 bg-ember/50" />
            </div>

            {/* Joker emoji with glow */}
            <motion.div
              className="text-7xl mb-6"
              animate={{
                rotate: [-5, 5, -5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🃏
            </motion.div>

            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              We Hack Ourselves
              <br />
              <span className="text-ember">So You Don&apos;t Have To</span>
            </h2>
            <p className="text-text-body max-w-2xl mx-auto">
              The Joker Agent runs 24/7 trying to break our own AI.
              Every attack it finds makes us stronger.
              Every failure it discovers is logged before it can hurt you.
            </p>
          </motion.div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stats */}
            <motion.div
              className="rounded-xl border border-border-default bg-surface-1/80 backdrop-blur-xl overflow-hidden"
              variants={itemVariants}
            >
              <div className="px-6 py-4 border-b border-border-subtle bg-surface-2/50">
                <span className="text-sm font-mono text-text-ghost">
                  JOKER STATS (Live)
                </span>
              </div>
              <div className="p-6 space-y-6">
                {/* Attacks Attempted */}
                <div>
                  <div className="text-xs font-mono text-text-ghost uppercase tracking-wider mb-2">
                    Attacks Attempted
                  </div>
                  <motion.div
                    className="text-4xl font-mono font-bold text-text-bright"
                    key={stats.attacksAttempted}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                  >
                    {stats.attacksAttempted.toLocaleString()}
                  </motion.div>
                </div>

                {/* Vulnerabilities Found */}
                <div>
                  <div className="text-xs font-mono text-text-ghost uppercase tracking-wider mb-2">
                    Vulnerabilities Found
                  </div>
                  <div className="text-4xl font-mono font-bold text-ember">
                    {stats.vulnerabilitiesFound}
                  </div>
                </div>

                {/* All Patched */}
                <div>
                  <div className="text-xs font-mono text-text-ghost uppercase tracking-wider mb-2">
                    Status
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-phosphor" />
                    </span>
                    <span className="text-xl font-mono text-phosphor">
                      ALL PATCHED ✓
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-text-ghost mb-2">
                    <span>Security Score</span>
                    <span>98.7%</span>
                  </div>
                  <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-phosphor to-phosphor-dim"
                      initial={{ width: 0 }}
                      animate={{ width: "98.7%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Attack Log */}
            <motion.div
              className="rounded-xl border border-border-default bg-surface-1/80 backdrop-blur-xl overflow-hidden"
              variants={itemVariants}
            >
              <div className="px-6 py-4 border-b border-border-subtle bg-surface-2/50 flex items-center justify-between">
                <span className="text-sm font-mono text-text-ghost">
                  RECENT ATTACK LOG
                </span>
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
                  </span>
                  <span className="text-xs font-mono text-ember">LIVE</span>
                </span>
              </div>
              <div className="p-6">
                <AttackLog />
              </div>
            </motion.div>
          </div>

          {/* Bottom text */}
          <motion.div
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <p className="text-lg text-text-body">
              The best defense is a{" "}
              <span className="text-ember font-medium">relentless offense</span>.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

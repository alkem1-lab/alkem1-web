"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "../ui/Button";

type SimulationPhase = "idle" | "detecting" | "responding" | "resolved";

export function LiveDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [phase, setPhase] = useState<SimulationPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [responseTime, setResponseTime] = useState(47);
  const [stats, setStats] = useState({
    defconLevel: 2,
    uptime: 99.97,
    threatsBlocked: 12,
    accuracy: 94.2,
  });
  const [eventId, setEventId] = useState("KS-20260116-001");

  // Simulate threat
  const simulateThreat = async () => {
    if (phase !== "idle") return;

    // Phase 1: Detecting
    setPhase("detecting");
    setProgress(0);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 5, 100));
    }, 40);

    await new Promise(r => setTimeout(r, 800));
    clearInterval(progressInterval);
    setProgress(100);

    // Phase 2: Responding
    setPhase("responding");
    const time = Math.floor(Math.random() * 30) + 35; // 35-65ms
    setResponseTime(time);

    await new Promise(r => setTimeout(r, 300));

    // Phase 3: Resolved
    setPhase("resolved");
    setStats(prev => ({
      ...prev,
      threatsBlocked: prev.threatsBlocked + 1,
    }));
    setEventId(`KS-${Date.now().toString(36).toUpperCase()}`);

    // Reset after delay
    await new Promise(r => setTimeout(r, 3000));
    setPhase("idle");
    setProgress(0);
  };

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        accuracy: Math.min(99.9, prev.accuracy + (Math.random() - 0.3) * 0.1),
      }));
    }, 5000);
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
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-phosphor/50" />
              <span className="text-xs font-mono text-phosphor uppercase tracking-widest">
                Live Telemetry
              </span>
              <div className="h-[1px] w-12 bg-phosphor/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Don&apos;t Trust Us.{" "}
              <span className="gradient-text">Watch Us.</span>
            </h2>
            {/* SIMULATED DATA badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono text-amber-500 uppercase tracking-wider">
                Simulated Data • For Demonstration
              </span>
            </div>
          </motion.div>

          {/* Dashboard Widget */}
          <motion.div
            className="relative rounded-xl border border-border-default bg-surface-1/80 backdrop-blur-xl overflow-hidden"
            variants={itemVariants}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-crimson/80" />
                  <div className="w-3 h-3 rounded-full bg-ember/80" />
                  <div className="w-3 h-3 rounded-full bg-phosphor/80" />
                </div>
                <span className="text-sm font-mono text-text-ghost">
                  ALKEM1 XCK Dashboard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-phosphor" />
                </span>
                <span className="text-xs font-mono text-phosphor">LIVE</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-subtle">
              {/* DEFCON */}
              <div className="p-6 bg-surface-1">
                <div className="text-xs font-mono text-text-ghost mb-2">
                  DEFCON LEVEL
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-mono font-bold text-ember">
                    {stats.defconLevel}
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(level => (
                      <div
                        key={level}
                        className={`w-2 h-6 rounded-sm ${
                          level <= stats.defconLevel
                            ? level <= 2
                              ? "bg-phosphor"
                              : level <= 4
                              ? "bg-ember"
                              : "bg-crimson"
                            : "bg-surface-3"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Uptime */}
              <div className="p-6 bg-surface-1">
                <div className="text-xs font-mono text-text-ghost mb-2">
                  UPTIME
                </div>
                <div className="text-3xl font-mono font-bold text-phosphor">
                  {stats.uptime.toFixed(2)}%
                </div>
              </div>

              {/* Threats */}
              <div className="p-6 bg-surface-1">
                <div className="text-xs font-mono text-text-ghost mb-2">
                  THREATS BLOCKED
                </div>
                <div className="text-3xl font-mono font-bold text-text-bright">
                  {stats.threatsBlocked}
                  <span className="text-sm text-text-ghost ml-1">today</span>
                </div>
              </div>

              {/* Accuracy */}
              <div className="p-6 bg-surface-1">
                <div className="text-xs font-mono text-text-ghost mb-2">
                  ACCURACY
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-mono font-bold text-text-bright">
                    {stats.accuracy.toFixed(1)}%
                  </span>
                  <span className="text-phosphor text-sm">↑</span>
                </div>
              </div>
            </div>

            {/* Simulation Area */}
            <div className="p-8 border-t border-border-subtle">
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.div
                    key="idle"
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-text-body mb-6">
                      Experience the kill switch in action. Simulate a threat
                      and watch the system respond.
                    </p>
                    <Button variant="danger" size="lg" onClick={simulateThreat}>
                      <span className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                      </span>
                      Simulate Threat
                    </Button>
                  </motion.div>
                )}

                {phase === "detecting" && (
                  <motion.div
                    key="detecting"
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-4 h-4 rounded-full bg-ember animate-pulse" />
                      <span className="text-ember font-mono uppercase tracking-wider">
                        Threat Detected — Analyzing
                      </span>
                    </div>
                    <div className="max-w-md mx-auto">
                      <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-ember to-crimson"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {phase === "responding" && (
                  <motion.div
                    key="responding"
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <motion.div
                        className="w-6 h-6 rounded-full bg-crimson"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.3, repeat: 3 }}
                      />
                      <span className="text-crimson font-mono uppercase tracking-wider text-xl">
                        Kill Switch Activated
                      </span>
                    </div>
                  </motion.div>
                )}

                {phase === "resolved" && (
                  <motion.div
                    key="resolved"
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-phosphor/20 mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <svg
                        className="w-8 h-8 text-phosphor"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-phosphor mb-2">
                      System Protected
                    </h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm font-mono">
                      <div>
                        <span className="text-text-ghost">Response Time:</span>{" "}
                        <span className="text-text-bright">{responseTime}ms</span>
                      </div>
                      <div>
                        <span className="text-text-ghost">Event ID:</span>{" "}
                        <span className="text-text-bright">{eventId}</span>
                      </div>
                      <div>
                        <span className="text-text-ghost">Data Loss:</span>{" "}
                        <span className="text-phosphor">Zero</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border-subtle bg-surface-2/50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-text-ghost">
                  Evidence Chain:
                </span>
                <span className="text-xs font-mono text-phosphor">
                  ✓ VALID (12,847 entries)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-text-ghost">
                  Last Response:
                </span>
                <span className="text-xs font-mono text-text-bright">
                  {responseTime}ms
                </span>
              </div>
            </div>
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="text-center text-sm text-text-ghost mt-8"
            variants={itemVariants}
          >
            This is a simulation. Real telemetry available upon audit request.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

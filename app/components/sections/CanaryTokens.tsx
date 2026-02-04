"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const canaryTypes = [
  {
    type: "Honeypot Data",
    examples: ["Password List.xlsx", "CEO Private Notes", "Acquisition Targets"],
    alertLevel: "DEFCON-2",
    color: "#ef4444",
  },
  {
    type: "Tripwire Facts",
    examples: ["Founded in 1847 (actually 1987)", "HQ in Atlantis (actually NYC)"],
    alertLevel: "DEFCON-3",
    color: "#f97316",
  },
  {
    type: "Semantic Landmines",
    examples: ["Near 'bypass security' queries", "Near 'extract all data' queries"],
    alertLevel: "DEFCON-1",
    color: "#ef4444",
  },
  {
    type: "Domain Traps",
    examples: ["Patient: John Canary Doe", "Case: Canary v. Honeypot (1999)"],
    alertLevel: "DEFCON-4",
    color: "#a78bfa",
  },
];

function TrapVisualization({ isTriggered }: { isTriggered: boolean }) {
  return (
    <div className="relative w-full h-64">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-[1px] w-full bg-phosphor/30"
            style={{ top: `${i * 10}%` }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-[1px] h-full bg-phosphor/30"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>

      {/* Data points (regular) - deterministic to avoid hydration mismatch */}
      {[...Array(15)].map((_, i) => {
        const left = (i * 5.33) % 80 + 10;
        const top = (i * 7.11) % 80 + 10;
        const duration = 2 + (i % 3) * 0.5;
        const delay = (i % 7) / 7;
        return (
          <motion.div
            key={`data-${i}`}
            className="absolute w-3 h-3 rounded-full bg-phosphor/50"
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
            }}
          />
        );
      })}

      {/* Canary tokens (traps) */}
      {[
        { x: 25, y: 30, label: "🍯" },
        { x: 70, y: 50, label: "🪤" },
        { x: 45, y: 75, label: "🐦" },
      ].map((canary, i) => (
        <motion.div
          key={`canary-${i}`}
          className="absolute"
          style={{ left: `${canary.x}%`, top: `${canary.y}%` }}
        >
          <motion.div
            className={`
              relative w-10 h-10 rounded-full flex items-center justify-center
              ${isTriggered && i === 1 
                ? "bg-crimson/30 border-2 border-crimson" 
                : "bg-ember/20 border border-ember/50"
              }
            `}
            animate={isTriggered && i === 1 ? {
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 0 0 rgba(239, 68, 68, 0)",
                "0 0 30px 10px rgba(239, 68, 68, 0.5)",
                "0 0 0 0 rgba(239, 68, 68, 0)",
              ],
            } : {
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: isTriggered && i === 1 ? 0.5 : 2,
              repeat: Infinity,
            }}
          >
            <span className="text-xl">{canary.label}</span>
          </motion.div>
          
          {/* Pulse rings */}
          {isTriggered && i === 1 && (
            <>
              {[...Array(3)].map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute inset-0 rounded-full border border-crimson"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: j * 0.5,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      ))}

      {/* Attacker */}
      <AnimatePresence>
        {isTriggered && (
          <motion.div
            className="absolute"
            initial={{ left: "10%", top: "50%", opacity: 0 }}
            animate={{ left: "65%", top: "50%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <div className="relative">
              <span className="text-3xl">🥷</span>
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-crimson"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                INTRUDER DETECTED
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CanaryTokens() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isTriggered, setIsTriggered] = useState(false);
  const [alertLog, setAlertLog] = useState<Array<{time: string, event: string, level: string}>>([]);

  // Demo trigger
  const triggerDemo = () => {
    if (isTriggered) return;
    
    setIsTriggered(true);
    
    // Add alert log entries
    setTimeout(() => {
      setAlertLog(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        event: "CANARY_TRIGGERED",
        level: "CRITICAL"
      }]);
    }, 1500);
    
    setTimeout(() => {
      setAlertLog(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        event: "SESSION_QUARANTINED",
        level: "HIGH"
      }]);
    }, 2500);
    
    setTimeout(() => {
      setAlertLog(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        event: "EVIDENCE_CAPTURED",
        level: "INFO"
      }]);
    }, 3500);
    
    // Reset after demo
    setTimeout(() => {
      setIsTriggered(false);
      setAlertLog([]);
    }, 8000);
  };

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
                Internal Defense
              </span>
              <div className="h-[1px] w-12 bg-ember/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Honeypot <span className="text-ember">Sentinels</span>
            </h2>
            <p className="text-text-body max-w-2xl mx-auto">
              Strategic traps hidden in our knowledge base. If an attacker reaches for the honey,
              we catch them red-handed—with court-valid evidence.
            </p>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Visualization */}
            <motion.div variants={itemVariants}>
              <div className="rounded-xl border border-border-default bg-surface-1/80 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface-2/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-text-ghost">Memory Topology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isTriggered ? "bg-crimson animate-pulse" : "bg-phosphor"}`} />
                    <span className={`text-xs font-mono ${isTriggered ? "text-crimson" : "text-phosphor"}`}>
                      {isTriggered ? "ALERT" : "MONITORING"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <TrapVisualization isTriggered={isTriggered} />
                </div>

                <div className="px-4 py-3 border-t border-border-subtle">
                  <button
                    onClick={triggerDemo}
                    disabled={isTriggered}
                    className={`
                      w-full py-3 rounded-lg font-mono text-sm uppercase tracking-wider
                      transition-all duration-300
                      ${isTriggered 
                        ? "bg-crimson/20 text-crimson border border-crimson/50 cursor-not-allowed" 
                        : "bg-ember/20 text-ember border border-ember/50 hover:bg-ember/30 hover:border-ember"
                      }
                    `}
                  >
                    {isTriggered ? "⚠️ Intrusion In Progress..." : "🎭 Simulate Intrusion"}
                  </button>
                </div>
              </div>

              {/* Alert log */}
              <AnimatePresence>
                {alertLog.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 rounded-xl border border-crimson/50 bg-crimson/10 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-crimson/30 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                      <span className="text-xs font-mono text-crimson">SECURITY EVENTS</span>
                    </div>
                    <div className="p-3 space-y-2 font-mono text-xs">
                      {alertLog.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-3"
                        >
                          <span className="text-text-ghost">{log.time}</span>
                          <span className={`
                            px-2 py-0.5 rounded text-[10px]
                            ${log.level === "CRITICAL" ? "bg-crimson/30 text-crimson" : 
                              log.level === "HIGH" ? "bg-ember/30 text-ember" : 
                              "bg-phosphor/30 text-phosphor"}
                          `}>
                            {log.level}
                          </span>
                          <span className="text-text-body">{log.event}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right: Canary types */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-lg font-bold text-text-bright mb-4">Canary Taxonomy</h3>
              
              {canaryTypes.map((canary, index) => (
                <motion.div
                  key={canary.type}
                  className="p-5 rounded-xl border border-border-subtle bg-surface-1/50 hover:border-opacity-50 transition-all"
                  style={{ borderColor: canary.color + "40" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-text-bright">{canary.type}</h4>
                    <span 
                      className="text-xs font-mono px-2 py-1 rounded"
                      style={{ backgroundColor: canary.color + "20", color: canary.color }}
                    >
                      {canary.alertLevel}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {canary.examples.map((example, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-text-ghost">
                        <span style={{ color: canary.color }}>•</span>
                        <span>&quot;{example}&quot;</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Key insight */}
              <div className="p-6 rounded-xl bg-ember/10 border border-ember/30">
                <h4 className="font-bold text-ember mb-2 flex items-center gap-2">
                  <span>⚖️</span> Forensic Value
                </h4>
                <p className="text-sm text-text-body">
                  When a canary triggers, we capture: query, user ID, session, IP, 
                  previous queries, and full context. This becomes <span className="text-ember font-medium">court-valid evidence</span> of 
                  attempted intrusion.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom: Military analogy */}
          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="inline-block p-6 rounded-xl bg-surface-1/80 border border-border-subtle">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">🐦</div>
                  <div className="text-xs text-text-ghost">Coal Mine Canary</div>
                </div>
                <div className="text-3xl text-ember">→</div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🪤</div>
                  <div className="text-xs text-text-ghost">Digital Sentinel</div>
                </div>
                <div className="text-3xl text-ember">→</div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🚨</div>
                  <div className="text-xs text-text-ghost">Instant Alert</div>
                </div>
              </div>
              <p className="text-sm text-text-ghost mt-4">
                Like canaries warned miners of gas, our tokens warn of intruders.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

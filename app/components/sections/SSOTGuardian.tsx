"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type SystemState = "RUN" | "READ_ONLY" | "LOCKDOWN";

const stateConfig = {
  RUN: {
    color: "#6ee7b7",
    bg: "bg-phosphor/20",
    border: "border-phosphor",
    icon: "✅",
    label: "Normal Operations",
    description: "Hash matches manifest. All systems operational.",
  },
  READ_ONLY: {
    color: "#f97316",
    bg: "bg-ember/20",
    border: "border-ember",
    icon: "⏳",
    label: "Deploy In Progress",
    description: "Authorized deployment detected. Monitoring active.",
  },
  LOCKDOWN: {
    color: "#ef4444",
    bg: "bg-crimson/20",
    border: "border-crimson",
    icon: "🛑",
    label: "Security Lockdown",
    description: "Unauthorized modification detected. Kill Switch activated.",
  },
};

function StateIndicator({ state, onClick }: { state: SystemState; onClick: () => void }) {
  const config = stateConfig[state];
  
  return (
    <motion.button
      className={`
        relative p-6 rounded-2xl border-2 ${config.border} ${config.bg}
        cursor-pointer transition-all duration-300 w-full
      `}
      style={{ 
        boxShadow: `0 0 30px ${config.color}40`,
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Pulse effect for LOCKDOWN */}
      {state === "LOCKDOWN" && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-crimson"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      
      <div className="flex items-center gap-4">
        <div className="text-5xl">{config.icon}</div>
        <div className="text-left">
          <div className="text-2xl font-bold" style={{ color: config.color }}>
            {state}
          </div>
          <div className="text-sm text-text-ghost">{config.label}</div>
        </div>
      </div>
    </motion.button>
  );
}

function MathFormula({ state }: { state: SystemState }) {
  return (
    <div className="font-mono text-sm p-4 rounded-xl bg-surface-2/50 border border-border-subtle">
      <div className="text-text-ghost mb-2">STATE(t) = f(H(S), M, T)</div>
      <div className="space-y-1">
        <div className={`${state === "RUN" ? "text-phosphor" : "text-text-ghost"}`}>
          {state === "RUN" ? "→" : "  "} RUN: H(S) = M ∧ T = ∅
        </div>
        <div className={`${state === "READ_ONLY" ? "text-ember" : "text-text-ghost"}`}>
          {state === "READ_ONLY" ? "→" : "  "} READ_ONLY: H(S) ≠ M ∧ Verify(T) = 1
        </div>
        <div className={`${state === "LOCKDOWN" ? "text-crimson" : "text-text-ghost"}`}>
          {state === "LOCKDOWN" ? "→" : "  "} LOCKDOWN: H(S) ≠ M ∧ Verify(T) = 0
        </div>
      </div>
    </div>
  );
}

function Timeline({ scenario }: { scenario: "normal" | "deploy" | "attack" }) {
  const events = {
    normal: [
      { time: "00:00", event: "System boot", state: "RUN" as SystemState },
      { time: "01:00", event: "Hash check: MATCH", state: "RUN" as SystemState },
      { time: "02:00", event: "Hash check: MATCH", state: "RUN" as SystemState },
    ],
    deploy: [
      { time: "00:00", event: "Deploy token issued", state: "RUN" as SystemState },
      { time: "00:01", event: "Files modified", state: "READ_ONLY" as SystemState },
      { time: "00:05", event: "Manifest updated", state: "RUN" as SystemState },
    ],
    attack: [
      { time: "00:00", event: "System normal", state: "RUN" as SystemState },
      { time: "00:01", event: "Unauthorized modification", state: "LOCKDOWN" as SystemState },
      { time: "00:01", event: "Kill Switch ACTIVE", state: "LOCKDOWN" as SystemState },
    ],
  };

  return (
    <div className="space-y-3">
      {events[scenario].map((event, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          <span className="text-xs font-mono text-text-ghost w-12">{event.time}</span>
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: stateConfig[event.state].color }}
          />
          <span className="text-sm text-text-body">{event.event}</span>
          <span 
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{ 
              backgroundColor: stateConfig[event.state].color + "20",
              color: stateConfig[event.state].color
            }}
          >
            {event.state}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function SSOTGuardian() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentState, setCurrentState] = useState<SystemState>("RUN");
  const [scenario, setScenario] = useState<"normal" | "deploy" | "attack">("normal");

  // Simulate state changes based on scenario
  const runScenario = (type: "normal" | "deploy" | "attack") => {
    setScenario(type);
    
    if (type === "normal") {
      setCurrentState("RUN");
    } else if (type === "deploy") {
      setCurrentState("RUN");
      setTimeout(() => setCurrentState("READ_ONLY"), 1000);
      setTimeout(() => setCurrentState("RUN"), 3000);
    } else if (type === "attack") {
      setCurrentState("RUN");
      setTimeout(() => setCurrentState("LOCKDOWN"), 1000);
    }
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
              <div className="h-[1px] w-12 bg-phosphor/50" />
              <span className="text-xs font-mono text-phosphor uppercase tracking-widest">
                Crown Jewel Innovation
              </span>
              <div className="h-[1px] w-12 bg-phosphor/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Deploy Without{" "}
              <span className="text-phosphor">Blind Spots</span>
            </h2>
            <p className="text-text-body max-w-2xl mx-auto">
              Most companies have to &quot;turn off security&quot; during deployment. 
              We don&apos;t. Our two-phase transition maintains continuous protection.
            </p>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: State visualization */}
            <motion.div variants={itemVariants} className="space-y-6">
              <StateIndicator 
                state={currentState} 
                onClick={() => {}} 
              />
              
              <MathFormula state={currentState} />

              {/* State explanation */}
              <div className={`p-4 rounded-xl ${stateConfig[currentState].bg} border ${stateConfig[currentState].border}`}>
                <p className="text-sm text-text-body">
                  {stateConfig[currentState].description}
                </p>
              </div>

              {/* Problem vs Solution */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-crimson/10 border border-crimson/30">
                  <h4 className="text-crimson font-bold mb-2 text-sm">❌ Traditional</h4>
                  <ul className="text-xs text-text-ghost space-y-1">
                    <li>• 2-4h maintenance window</li>
                    <li>• Security monitoring OFF</li>
                    <li>• Attackers wait for this</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-phosphor/10 border border-phosphor/30">
                  <h4 className="text-phosphor font-bold mb-2 text-sm">✅ SSOT Guardian</h4>
                  <ul className="text-xs text-text-ghost space-y-1">
                    <li>• 0s maintenance window</li>
                    <li>• Security ALWAYS ON</li>
                    <li>• Only signed deploys pass</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right: Scenarios */}
            <motion.div variants={itemVariants}>
              <div className="rounded-xl border border-border-default bg-surface-1/80 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface-2/50">
                  <span className="text-sm font-mono text-text-ghost">Scenario Simulator</span>
                </div>

                {/* Scenario buttons */}
                <div className="p-4 border-b border-border-subtle">
                  <div className="flex gap-2">
                    {[
                      { id: "normal", label: "Normal Ops", icon: "🟢" },
                      { id: "deploy", label: "Deploy", icon: "🟡" },
                      { id: "attack", label: "Attack", icon: "🔴" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => runScenario(s.id as any)}
                        className={`
                          flex-1 py-2 px-3 rounded-lg text-sm font-mono transition-all
                          ${scenario === s.id 
                            ? "bg-surface-3 text-text-bright border border-border-default" 
                            : "bg-surface-1 text-text-ghost hover:bg-surface-2"
                          }
                        `}
                      >
                        <span className="mr-2">{s.icon}</span>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-6">
                  <h4 className="text-sm font-mono text-text-ghost mb-4">Event Timeline</h4>
                  <Timeline scenario={scenario} />
                </div>
              </div>

              {/* Key insight */}
              <div className="mt-6 p-6 rounded-xl bg-surface-1/50 border border-phosphor/30">
                <h4 className="font-bold text-phosphor mb-3 flex items-center gap-2">
                  <span>💎</span> Why This is Revolutionary
                </h4>
                <p className="text-sm text-text-body leading-relaxed">
                  <span className="text-text-bright font-medium">The token doesn&apos;t say &quot;anyone can modify&quot;.</span>
                  {" "}It says <span className="text-phosphor">&quot;THIS specific deployer can modify, and I&apos;m still watching.&quot;</span>
                </p>
                <p className="text-sm text-text-body leading-relaxed mt-3">
                  If anyone else tries to modify during a deploy—even with the same file changes—
                  <span className="text-crimson"> they trigger LOCKDOWN</span> because they don&apos;t have the signed token.
                </p>
              </div>

              {/* SSOT Canon Section */}
              <div className="mt-6 p-6 rounded-xl bg-neural-1/10 border border-neural-1/30">
                <h4 className="font-bold text-neural-1 mb-3 flex items-center gap-2">
                  <span>📜</span> SSOT Canon (Compiled Truth)
                </h4>
                <p className="text-sm text-text-body leading-relaxed mb-3">
                  SSOT is <span className="text-text-bright font-medium">compiled</span>, not just documented.
                  <code className="text-xs font-mono text-phosphor ml-1">services.truth.yml → canon.json</code>
                </p>
                <div className="space-y-2 text-xs font-mono text-text-ghost">
                  <div>• CI blocks merge if drift detected</div>
                  <div>• Ledger event: <code className="text-phosphor">ssot.canon.changed</code></div>
                  <div>• Machine-readable truth (not documentation)</div>
                </div>
              </div>

              {/* Q.E.D. proof */}
              <div className="mt-4 p-4 rounded-xl bg-neural-2/10 border border-neural-2/30 font-mono text-xs">
                <div className="text-neural-2 mb-2">Q.E.D. - Mathematical Proof:</div>
                <div className="text-text-ghost">
                  ∀ attacker: Verify(T_attacker) = 0<br/>
                  ∴ H(S) ≠ M → STATE = LOCKDOWN<br/>
                  <span className="text-phosphor">Unauthorized modification impossible without LOCKDOWN.</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom quote */}
          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <blockquote className="text-xl text-text-body italic max-w-3xl mx-auto">
              &quot;We didn&apos;t want to choose between Security and Agility.
              <br />
              <span className="text-phosphor not-italic font-medium">
                We used cryptography to get both.
              </span>&quot;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

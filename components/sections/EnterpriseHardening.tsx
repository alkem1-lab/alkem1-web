"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const securityFeatures = [
  {
    id: "two-phase",
    name: "Two-Phase Signed Transition",
    icon: "🔐",
    category: "SSOT Protection",
    description: "Distinguishes legitimate deploys from attacks. Deploy token (60s TTL) enables PENDING_DEPLOY state - system enters read-only mode during transition.",
    flow: [
      { step: "1", action: "CI issues deploy token", state: "PENDING_DEPLOY" },
      { step: "2", action: "SSOT hash mismatch detected", state: "READ_ONLY" },
      { step: "3", action: "Manifest regenerated & signed", state: "NONE (OK)" },
    ],
    attackFlow: [
      { step: "!", action: "Attacker modifies SSOT", state: "STOP" },
      { step: "×", action: "No valid token", state: "KILL SWITCH" },
    ],
    color: "#6ee7b7",
  },
  {
    id: "merkle",
    name: "Merkle Checkpoints",
    icon: "🌳",
    category: "Forensic Integrity",
    description: "Unified Ledger with Operational (fast, rotating) and Forensic (WORM) layers. Merkle roots + Ed25519 signatures for tamper-evident audit trail.",
    components: [
      { name: "Operational Ledger", desc: "Max 10K entries, real-time dashboard" },
      { name: "Forensic Segments", desc: ".jsonl.gz archives, immutable" },
      { name: "Checkpoint", desc: "Merkle root + signature every M segments" },
    ],
    color: "#818cf8",
  },
  {
    id: "kill-switch",
    name: "Kill Switch 2-Step Clear",
    icon: "🛑",
    category: "Human Override",
    description: "Sub-100ms emergency shutdown with 2-step verification to prevent accidental deactivation. Challenge → Confirm pattern like nuclear launch codes.",
    steps: [
      { phase: "Challenge", action: "POST /challenge → returns confirm_phrase (120s TTL)" },
      { phase: "Confirm", action: "POST /clear with challenge_id + phrase + reason" },
    ],
    metrics: [
      { value: "47ms", label: "Average response" },
      { value: "2-step", label: "Verification" },
      { value: "120s", label: "Challenge TTL" },
    ],
    color: "#ef4444",
  },
  {
    id: "gatekeeper",
    name: "Gatekeeper",
    icon: "🛡️",
    category: "Diplomatic Courier",
    description: "Single privileged mediator between all components. Sanitizes inputs, routes requests, and maintains complete audit trail.",
    responsibilities: [
      "Prompt injection scanning",
      "Rate limiting & validation",
      "Privileged mediation (Ledger write, Kill Switch)",
      "Complete audit logging",
    ],
    color: "#f97316",
  },
];

export function EnterpriseHardening() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState<string>("two-phase");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const activeData = securityFeatures.find((f) => f.id === activeFeature)!;

  return (
    <section ref={ref} className="relative py-32 px-6 bg-surface-1/30">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-crimson/50" />
              <span className="text-xs font-mono text-crimson uppercase tracking-widest">
                XCK Security Platform
              </span>
              <div className="h-[1px] w-12 bg-crimson/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Enterprise Hardening
            </h2>
            <p className="text-text-body max-w-2xl mx-auto">
              Production-grade security infrastructure. Not an afterthought - built into the foundation.
            </p>
          </motion.div>

          {/* Feature selector + detail */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Feature list */}
            <motion.div className="space-y-3" variants={itemVariants}>
              {securityFeatures.map((feature) => {
                const isActive = activeFeature === feature.id;
                
                return (
                  <button
                    key={feature.id}
                    className={`
                      w-full p-4 rounded-xl text-left transition-all duration-300
                      ${isActive 
                        ? "bg-surface-2 border-2" 
                        : "bg-surface-1/50 border border-border-subtle hover:border-phosphor/30"
                      }
                    `}
                    style={{
                      borderColor: isActive ? feature.color : undefined,
                    }}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <div className="font-semibold text-text-bright">
                          {feature.name}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: feature.color }}
                        >
                          {feature.category}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {/* Right: Detail panel */}
            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
              key={activeFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="p-8 rounded-2xl bg-surface-2 border-2"
                style={{ borderColor: `${activeData.color}50` }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${activeData.color}20` }}
                  >
                    {activeData.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-bright">
                      {activeData.name}
                    </h3>
                    <span 
                      className="text-sm font-mono"
                      style={{ color: activeData.color }}
                    >
                      {activeData.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-body mb-8 leading-relaxed">
                  {activeData.description}
                </p>

                {/* Feature-specific content */}
                {activeData.id === "two-phase" && activeData.flow && (
                  <div className="space-y-6">
                    {/* Legitimate flow */}
                    <div>
                      <div className="text-sm text-text-ghost uppercase tracking-wider mb-3">
                        Legitimate Deploy Flow
                      </div>
                      <div className="space-y-2">
                        {activeData.flow.map((item, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-4 p-3 rounded-lg bg-surface-1/50"
                          >
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                              style={{ backgroundColor: `${activeData.color}30`, color: activeData.color }}
                            >
                              {item.step}
                            </div>
                            <div className="flex-1 text-text-body text-sm">
                              {item.action}
                            </div>
                            <div 
                              className="px-3 py-1 rounded-full text-xs font-mono"
                              style={{ 
                                backgroundColor: `${activeData.color}20`,
                                color: activeData.color,
                              }}
                            >
                              {item.state}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Attack flow */}
                    <div>
                      <div className="text-sm text-text-ghost uppercase tracking-wider mb-3">
                        Attack Scenario
                      </div>
                      <div className="space-y-2">
                        {activeData.attackFlow?.map((item, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-4 p-3 rounded-lg bg-crimson/10 border border-crimson/30"
                          >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-crimson/30 text-crimson">
                              {item.step}
                            </div>
                            <div className="flex-1 text-text-body text-sm">
                              {item.action}
                            </div>
                            <div className="px-3 py-1 rounded-full text-xs font-mono bg-crimson/20 text-crimson">
                              {item.state}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeData.id === "merkle" && activeData.components && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeData.components.map((comp, i) => (
                      <div 
                        key={i}
                        className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle"
                      >
                        <div className="text-lg mb-2" style={{ color: activeData.color }}>
                          📁
                        </div>
                        <div className="font-semibold text-text-bright text-sm mb-1">
                          {comp.name}
                        </div>
                        <div className="text-xs text-text-ghost">
                          {comp.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeData.id === "kill-switch" && (
                  <div className="space-y-6">
                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeData.steps?.map((step, i) => (
                        <div 
                          key={i}
                          className="p-4 rounded-xl bg-surface-1/50 border border-crimson/30"
                        >
                          <div className="text-xs text-crimson font-mono mb-2">
                            STEP {i + 1}: {step.phase}
                          </div>
                          <div className="text-sm text-text-body font-mono">
                            {step.action}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Metrics */}
                    <div className="flex justify-center gap-8">
                      {activeData.metrics?.map((m, i) => (
                        <div key={i} className="text-center">
                          <div 
                            className="text-3xl font-bold"
                            style={{ color: activeData.color }}
                          >
                            {m.value}
                          </div>
                          <div className="text-xs text-text-ghost">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeData.id === "gatekeeper" && activeData.responsibilities && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeData.responsibilities.map((resp, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-surface-1/50"
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: activeData.color }}
                        />
                        <span className="text-text-body text-sm">{resp}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Analogy box */}
                <div className="mt-8 p-4 rounded-xl bg-surface-1/30 border border-border-subtle">
                  <div className="text-xs text-text-ghost uppercase tracking-wider mb-2">
                    💡 Analogy
                  </div>
                  <p className="text-text-body text-sm italic">
                    {activeData.id === "two-phase" && 
                      "Like a bank vault - authorized worker has the key (token), but everything is locked (read-only) while vault is open."}
                    {activeData.id === "merkle" && 
                      "Like accounting - daily cashbook (operational) + main ledger (forensic) + certified statement (checkpoint)."}
                    {activeData.id === "kill-switch" && 
                      "Like nuclear launch - two keys, two operators, must match."}
                    {activeData.id === "gatekeeper" && 
                      "Like a diplomatic courier - only one with the passport to cross all borders."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom summary */}
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={itemVariants}
          >
            {[
              { value: "47ms", label: "Kill Switch", icon: "⚡" },
              { value: "SHA-256", label: "Hash Chain", icon: "🔗" },
              { value: "Ed25519", label: "Signatures", icon: "✍️" },
              { value: "WORM", label: "Forensic Storage", icon: "📦" },
            ].map((stat, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle text-center"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xl font-bold text-phosphor">{stat.value}</div>
                <div className="text-xs text-text-ghost">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

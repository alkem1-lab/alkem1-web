"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

// ═══════════════════════════════════════════════════════════════
// CUSTOM SVG ICONS
// ═══════════════════════════════════════════════════════════════

const QEDIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    <motion.circle
      cx="30" cy="30" r="25"
      fill="none" stroke="currentColor" strokeWidth="2"
      opacity={0.3}
    />
    <motion.path
      d="M18 30 L26 38 L42 22"
      fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: active ? 1 : 0.5 }}
      transition={{ duration: 0.6 }}
    />
    <motion.text
      x="30" y="48" textAnchor="middle"
      fill="currentColor" fontSize="8" fontFamily="serif" fontStyle="italic"
      animate={{ opacity: active ? 1 : 0.4 }}
    >
      Q.E.D.
    </motion.text>
  </svg>
);

const StateMachineIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 60" className="w-full h-full">
    {/* States */}
    <motion.circle cx="20" cy="30" r="12" fill="currentColor" opacity={0.2} />
    <motion.circle cx="50" cy="30" r="12" fill="currentColor" opacity={0.2} />
    <motion.circle cx="80" cy="30" r="12" fill="currentColor" opacity={0.2} />
    
    {/* Active state highlight */}
    <motion.circle
      cx="20" cy="30" r="12"
      fill="none" stroke="currentColor" strokeWidth="2"
      animate={{ 
        cx: active ? [20, 50, 80, 20] : 20,
        opacity: active ? [1, 1, 1, 1] : 0.5 
      }}
      transition={{ duration: 3, repeat: active ? Infinity : 0, ease: "easeInOut" }}
    />
    
    {/* Arrows */}
    <motion.path
      d="M34 30 L44 30 M64 30 L74 30"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round"
      opacity={0.5}
    />
    <motion.path
      d="M42 27 L46 30 L42 33 M72 27 L76 30 L72 33"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      opacity={0.5}
    />
    
    {/* Labels */}
    <text x="20" y="50" textAnchor="middle" fill="currentColor" fontSize="6" opacity={0.6}>RUN</text>
    <text x="50" y="50" textAnchor="middle" fill="currentColor" fontSize="6" opacity={0.6}>READ</text>
    <text x="80" y="50" textAnchor="middle" fill="currentColor" fontSize="6" opacity={0.6}>STOP</text>
  </svg>
);

const HashChainIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <motion.rect
          x={10 + i * 22} y="10" width="18" height="20" rx="2"
          fill="currentColor"
          animate={{ 
            opacity: active ? [0.2, 0.4, 0.2] : 0.2,
          }}
          transition={{ duration: 1, delay: i * 0.2, repeat: active ? Infinity : 0 }}
        />
        {i < 3 && (
          <motion.line
            x1={28 + i * 22} y1="20" x2={32 + i * 22} y2="20"
            stroke="currentColor" strokeWidth="2"
            animate={{ opacity: active ? [0.3, 0.7, 0.3] : 0.3 }}
            transition={{ duration: 1, delay: i * 0.2, repeat: active ? Infinity : 0 }}
          />
        )}
        <text x={19 + i * 22} y="23" textAnchor="middle" fill="currentColor" fontSize="6" opacity={0.8}>
          H{i}
        </text>
      </g>
    ))}
  </svg>
);

const FlywheelIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <motion.circle
      cx="40" cy="40" r="30"
      fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4"
      animate={{ rotate: active ? 360 : 0 }}
      transition={{ duration: 8, repeat: active ? Infinity : 0, ease: "linear" }}
      style={{ transformOrigin: "40px 40px" }}
    />
    {[0, 72, 144, 216, 288].map((angle, i) => {
      const labels = ["S", "M", "A", "F", "F"];
      const x = 40 + 30 * Math.cos((angle - 90) * Math.PI / 180);
      const y = 40 + 30 * Math.sin((angle - 90) * Math.PI / 180);
      return (
        <motion.g key={i}>
          <motion.circle
            cx={x} cy={y} r="8"
            fill="currentColor"
            animate={{ opacity: active ? [0.3, 0.7, 0.3] : 0.3 }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: active ? Infinity : 0 }}
          />
          <text x={x} y={y + 3} textAnchor="middle" fill="currentColor" fontSize="7" opacity={0.9}>
            {labels[i]}
          </text>
        </motion.g>
      );
    })}
    {/* Center */}
    <motion.circle
      cx="40" cy="40" r="12"
      fill="currentColor" opacity={0.15}
      animate={{ scale: active ? [1, 1.1, 1] : 1 }}
      transition={{ duration: 2, repeat: active ? Infinity : 0 }}
    />
  </svg>
);

const WatchdogIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    {/* Eye */}
    <motion.ellipse
      cx="30" cy="30" rx="20" ry="12"
      fill="none" stroke="currentColor" strokeWidth="2"
      opacity={0.4}
    />
    <motion.circle
      cx="30" cy="30" r="8"
      fill="currentColor"
      animate={{ 
        scale: active ? [1, 0.8, 1] : 1,
        opacity: active ? [0.6, 0.9, 0.6] : 0.6 
      }}
      transition={{ duration: 2, repeat: active ? Infinity : 0 }}
    />
    <motion.circle
      cx="30" cy="30" r="3"
      fill="currentColor"
      animate={{ opacity: active ? [0.8, 1, 0.8] : 0.8 }}
      transition={{ duration: 1, repeat: active ? Infinity : 0 }}
    />
    {/* Scan lines */}
    <motion.line
      x1="10" y1="30" x2="50" y2="30"
      stroke="currentColor" strokeWidth="1"
      animate={{ 
        y1: active ? [25, 35, 25] : 30,
        y2: active ? [25, 35, 25] : 30,
        opacity: active ? [0.2, 0.5, 0.2] : 0.2 
      }}
      transition={{ duration: 2, repeat: active ? Infinity : 0 }}
    />
  </svg>
);

const ShieldIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 60 70" className="w-full h-full">
    <motion.path
      d="M30 5 L55 15 L55 35 Q55 55 30 65 Q5 55 5 35 L5 15 Z"
      fill="currentColor"
      opacity={0.15}
      animate={{ opacity: active ? [0.1, 0.2, 0.1] : 0.15 }}
      transition={{ duration: 2, repeat: active ? Infinity : 0 }}
    />
    <motion.path
      d="M30 5 L55 15 L55 35 Q55 55 30 65 Q5 55 5 35 L5 15 Z"
      fill="none" stroke="currentColor" strokeWidth="2"
      opacity={0.5}
    />
    {/* Layers */}
    {[0, 1, 2, 3].map((i) => (
      <motion.line
        key={i}
        x1="15" y1={22 + i * 10} x2="45" y2={22 + i * 10}
        stroke="currentColor" strokeWidth="1.5"
        animate={{ opacity: active ? [0.2, 0.6, 0.2] : 0.3 }}
        transition={{ duration: 1.5, delay: i * 0.2, repeat: active ? Infinity : 0 }}
      />
    ))}
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// TIER DATA
// ═══════════════════════════════════════════════════════════════

const tiers = [
  {
    id: "tier1",
    tier: "TIER 1",
    title: "Mathematical Proofs",
    subtitle: "State Machines with Q.E.D.",
    color: "#6ee7b7",
    Icon: QEDIcon,
    description: "Not 'trust me' — we prove it mathematically. Every security claim has a formal proof.",
    innovations: [
      {
        name: "SSOT Two-Phase Transition",
        proof: "Q.E.D.",
        description: "Impossible to change system state from 'Valid' to 'Compromised' without Kill Switch, unless attacker has private key.",
        formula: "F(S,M,T) = { RUN if H(S)=M, READ_ONLY if H(S)≠M ∧ Verify(T)=1, STOP otherwise }",
      },
      {
        name: "Evidence Chain (Hash-Linked)",
        proof: "Q.E.D.",
        description: "Impossible to change the past without breaking the present. Court-valid tamper-evident audit trail.",
        formula: "H_n = SHA256( D_n ∥ T_n ∥ H_{n-1} )",
      },
      {
        name: "Kill Switch 2-Step Clear",
        proof: "Protocol",
        description: "Fat-finger protection. Like nuclear launch codes — two keys, two operators, must match.",
        formula: "Challenge(120s TTL) → Confirm(phrase + reason) → Clear",
      },
    ],
  },
  {
    id: "tier2",
    tier: "TIER 2",
    title: "Unified Architecture",
    subtitle: "Self-Protecting Organism",
    color: "#818cf8",
    Icon: StateMachineIcon,
    description: "ALKEM1 is a living organism: Soul (Valkyrie), Mind (Brain), Immune System (XCK).",
    innovations: [
      {
        name: "Unified Theory (Soul/Mind/Immune)",
        proof: "Architectural",
        description: "When AI hallucinates → Circuit Breaker → Kill Switch (reflex) → entire organism protects itself.",
        formula: "Soul (purpose) → Mind (learns) → Immune (reacts)",
      },
      {
        name: "Gatekeeper (Diplomatic Courier)",
        proof: "Protocol",
        description: "Single privileged mediator. Only one with the passport to cross all borders.",
        formula: "Sanitize → Route → Mediate → Audit",
      },
      {
        name: "Unified Ledger (Op + Forensic + Merkle)",
        proof: "Merkle",
        description: "Like accounting: daily cashbook (operational) + main ledger (forensic) + certified statement (checkpoint).",
        formula: "Operational(10K) → Forensic(WORM) → Checkpoint(Merkle + Ed25519)",
      },
    ],
  },
  {
    id: "tier3",
    tier: "TIER 3",
    title: "Anti-Drift & Liveness",
    subtitle: "No Silent Degradation",
    color: "#f97316",
    Icon: WatchdogIcon,
    description: "Backend cannot silently degrade. Watchdog is the guard dog — it barks when something's wrong.",
    innovations: [
      {
        name: "Dual Heartbeat (JSON TTL + Redis)",
        proof: "TTL Logic",
        description: "No 'hope-driven behavior'. JSON is source of truth, Redis is accelerator.",
        formula: "if now() - write_timestamp > ttl_seconds → STALE",
      },
      {
        name: "Timeline Event Pipeline",
        proof: "Contract",
        description: "Like a 'film' of every book from arrival to Golden Set. 12 canonical event types.",
        formula: "HARVEST → SPICE → SUPERVISION → GOLDEN",
      },
      {
        name: "Watchdog Engine (DEFCON)",
        proof: "FSM",
        description: "DEFCON 5 (Normal) → DEFCON 1 (Critical). Hysteresis prevents oscillation.",
        formula: "DEFCON = f(Redis, Time, Health) with 30s hysteresis",
      },
    ],
  },
  {
    id: "tier4",
    tier: "TIER 4",
    title: "AI Self-Improvement",
    subtitle: "Data Flywheel",
    color: "#ec4899",
    Icon: FlywheelIcon,
    description: "The system improves itself in a continuous loop. Like a student who never stops learning.",
    innovations: [
      {
        name: "SPICE Self-Play Learning",
        proof: "ML Pattern",
        description: "8 parallel solvers (Hydra), shortest valid code wins (Sniper), execution verified (Judge Dredd).",
        formula: "SPICE → Memory → Arena → Factory → Forge → loop",
      },
      {
        name: "Cortex Habituation",
        proof: "Statistical",
        description: "Frequent patterns get lower weight. Prevents overfitting to common solutions.",
        formula: "w = 1/√(1+f) where f = frequency",
      },
      {
        name: "Knowledge Gap Loop + DLQ",
        proof: "Protocol",
        description: "Harvester finds gaps, Arena verifies quality, DLQ handles failures. Never poisons Memory.",
        formula: "Gap → Search → Arena → Memory | DLQ",
      },
    ],
  },
  {
    id: "tier5",
    tier: "TIER 5",
    title: "Zero Trust Enterprise",
    subtitle: "Defense in Depth",
    color: "#ef4444",
    Icon: ShieldIcon,
    description: "Trust nothing, verify everything. Four layers of security, from HMAC to Break Glass.",
    innovations: [
      {
        name: "Zero Trust Stack (4 Layers)",
        proof: "Crypto",
        description: "Layer 1: HMAC Identity. Layer 2: mTLS. Layer 3: RBAC. Layer 4: JIT + Break Glass.",
        formula: "HMAC → mTLS → RBAC → JIT",
      },
      {
        name: "Joker Adversarial Agent",
        proof: "Heuristic",
        description: "10 attack vectors tested continuously. When bypass succeeds → auto-suggests fix.",
        formula: "Attack → Detect → (Fail | Fix)",
      },
      {
        name: "Supply Chain Gate",
        proof: "SBOM",
        description: "Main blocked if HIGH/CRITICAL CVE introduced. SBOM + provenance attached to releases.",
        formula: "SBOM → Trivy → Pass | Block",
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// STATE MACHINE VISUALIZER
// ═══════════════════════════════════════════════════════════════

function StateMachineVisualizer() {
  const [mode, setMode] = useState<"deploy" | "attack">("deploy");
  const [step, setStep] = useState(0);

  const deploySteps = [
    { state: "RUN", label: "Normal operation", color: "#6ee7b7" },
    { state: "PENDING", label: "CI issues deploy token", color: "#fbbf24" },
    { state: "READ_ONLY", label: "Hash mismatch + valid token", color: "#818cf8" },
    { state: "RUN", label: "Manifest regenerated", color: "#6ee7b7" },
  ];

  const attackSteps = [
    { state: "RUN", label: "Normal operation", color: "#6ee7b7" },
    { state: "???", label: "Attacker modifies SSOT", color: "#fbbf24" },
    { state: "STOP", label: "No valid token → Kill Switch", color: "#ef4444" },
  ];

  const steps = mode === "deploy" ? deploySteps : attackSteps;
  const currentStep = steps[step];

  return (
    <div className="p-8 rounded-2xl bg-surface-1/30 border border-border-subtle">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-lg font-light text-text-bright">SSOT Two-Phase Transition</h4>
        <div className="flex gap-2">
          <button
            onClick={() => { setMode("deploy"); setStep(0); }}
            className={`px-4 py-2 text-xs font-mono rounded-lg transition-all ${
              mode === "deploy" 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" 
                : "bg-surface-2 text-text-ghost hover:text-text-body"
            }`}
          >
            Legitimate Deploy
          </button>
          <button
            onClick={() => { setMode("attack"); setStep(0); }}
            className={`px-4 py-2 text-xs font-mono rounded-lg transition-all ${
              mode === "attack" 
                ? "bg-red-500/20 text-red-400 border border-red-500/50" 
                : "bg-surface-2 text-text-ghost hover:text-text-body"
            }`}
          >
            Attack Scenario
          </button>
        </div>
      </div>

      {/* State visualization */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              className="w-20 h-20 rounded-xl flex flex-col items-center justify-center"
              animate={{
                backgroundColor: i === step ? `${s.color}30` : "rgba(255,255,255,0.05)",
                borderColor: i === step ? s.color : "rgba(255,255,255,0.1)",
                scale: i === step ? 1.1 : 1,
              }}
              style={{ border: "2px solid" }}
            >
              <span 
                className="text-xs font-mono font-bold"
                style={{ color: i === step ? s.color : "rgba(255,255,255,0.4)" }}
              >
                {s.state}
              </span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div 
                className="w-8 h-0.5 mx-2"
                animate={{ backgroundColor: i < step ? currentStep.color : "rgba(255,255,255,0.2)" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current step info */}
      <div className="text-center mb-6">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-text-body"
        >
          Step {step + 1}: {currentStep.label}
        </motion.p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 text-sm font-mono bg-surface-2 rounded-lg text-text-ghost hover:text-text-body disabled:opacity-30"
        >
          ← Previous
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="px-4 py-2 text-sm font-mono bg-surface-2 rounded-lg text-text-ghost hover:text-text-body disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HASH CHAIN VISUALIZER
// ═══════════════════════════════════════════════════════════════

function HashChainVisualizer() {
  const [tampered, setTampered] = useState(false);
  const blocks = [
    { id: 0, data: "Genesis", hash: "0000..." },
    { id: 1, data: "Event A", hash: "a1b2..." },
    { id: 2, data: tampered ? "TAMPERED!" : "Event B", hash: tampered ? "XXXX" : "c3d4..." },
    { id: 3, data: "Event C", hash: tampered ? "INVALID" : "e5f6..." },
  ];

  return (
    <div className="p-8 rounded-2xl bg-surface-1/30 border border-border-subtle">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-lg font-light text-text-bright">Evidence Chain (Hash-Linked)</h4>
        <button
          onClick={() => setTampered(!tampered)}
          className={`px-4 py-2 text-xs font-mono rounded-lg transition-all ${
            tampered 
              ? "bg-red-500/20 text-red-400 border border-red-500/50" 
              : "bg-surface-2 text-text-ghost hover:text-text-body"
          }`}
        >
          {tampered ? "Reset Chain" : "Try to Tamper Block 2"}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4">
        {blocks.map((block, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              className="w-28 p-3 rounded-lg border"
              animate={{
                backgroundColor: tampered && i >= 2 ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.05)",
                borderColor: tampered && i >= 2 ? "#ef4444" : "rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-[10px] font-mono text-text-ghost mb-1">Block {block.id}</div>
              <div className="text-xs font-mono text-text-body mb-2 truncate">{block.data}</div>
              <div 
                className={`text-[10px] font-mono ${tampered && i >= 2 ? "text-red-400" : "text-phosphor"}`}
              >
                {block.hash}
              </div>
            </motion.div>
            {i < blocks.length - 1 && (
              <motion.div 
                className="w-6 flex items-center justify-center"
                animate={{ color: tampered && i >= 1 ? "#ef4444" : "rgba(255,255,255,0.3)" }}
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {tampered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-center"
        >
          <p className="text-red-400 text-sm font-mono">
            ⚠️ CHAIN BROKEN: Tampering Block 2 invalidates all subsequent blocks!
          </p>
          <p className="text-text-ghost text-xs mt-2">
            H_n depends on H_{'{'}n-1{'}'} — cascading failure is mathematically guaranteed.
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TIER SECTION
// ═══════════════════════════════════════════════════════════════

function TierSection({ 
  tier, 
  isActive, 
  onActivate 
}: { 
  tier: typeof tiers[0]; 
  isActive: boolean;
  onActivate: () => void;
}) {
  const Icon = tier.Icon;

  return (
    <motion.div
      className="cursor-pointer"
      onClick={onActivate}
    >
      <motion.div
        className="p-8 md:p-12 rounded-2xl border transition-all duration-300"
        animate={{
          backgroundColor: isActive ? `${tier.color}08` : "rgba(255,255,255,0.02)",
          borderColor: isActive ? `${tier.color}40` : "rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-start gap-6">
          {/* Icon */}
          <div 
            className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
            style={{ color: tier.color }}
          >
            <Icon active={isActive} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span 
                className="text-[10px] font-mono tracking-widest"
                style={{ color: tier.color }}
              >
                {tier.tier}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-text-bright mb-1">
              {tier.title}
            </h3>
            <p className="text-sm text-text-ghost mb-4">{tier.subtitle}</p>
            
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-text-body mb-6">{tier.description}</p>
                  
                  {/* Innovations */}
                  <div className="space-y-4">
                    {tier.innovations.map((inn, i) => (
                      <div 
                        key={i}
                        className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-text-bright">{inn.name}</span>
                          <span 
                            className="px-2 py-0.5 text-[10px] font-mono rounded-full"
                            style={{ 
                              backgroundColor: `${tier.color}20`,
                              color: tier.color 
                            }}
                          >
                            {inn.proof}
                          </span>
                        </div>
                        <p className="text-sm text-text-ghost mb-2">{inn.description}</p>
                        <code className="text-xs font-mono text-phosphor/70 block overflow-x-auto">
                          {inn.formula}
                        </code>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Expand indicator */}
          <motion.div
            className="w-8 h-8 flex items-center justify-center"
            animate={{ rotate: isActive ? 180 : 0 }}
          >
            <svg className="w-5 h-5 text-text-ghost" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function TechnologyPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [activeTier, setActiveTier] = useState<string | null>("tier1");

  return (
    <main className="min-h-screen bg-void pt-14">
      {/* Hero */}
      <section ref={heroRef} className="relative py-32 md:py-48 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-mono text-text-ghost tracking-[0.3em] uppercase mb-8">
              Innovation Catalog
            </p>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl text-text-bright leading-tight mb-8"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Programmer says
              <br />
              <span className="text-text-ghost">&quot;it works&quot;</span>
            </h1>
            
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl text-text-bright leading-tight mb-12"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Architect proves
              <br />
              <span className="text-phosphor">WHY it can&apos;t fail</span>
            </h2>

            <p className="text-lg text-text-body max-w-2xl">
              Every security claim backed by mathematical proof. 
              Not &quot;trust me&quot; — run the verifier and see Q.E.D.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demos */}
      <section className="py-24 px-6 bg-surface-1/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-xs font-mono text-text-ghost tracking-[0.3em] uppercase mb-4">
              Interactive Proof
            </p>
            <h2 
              className="text-3xl md:text-4xl text-text-bright"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Try to break it
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <StateMachineVisualizer />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HashChainVisualizer />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-xs font-mono text-text-ghost tracking-[0.3em] uppercase mb-4">
              5 Tiers of Innovation
            </p>
            <h2 
              className="text-3xl md:text-4xl text-text-bright"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              From Math Proofs to Zero Trust
            </h2>
          </motion.div>

          <div className="space-y-4">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TierSection
                  tier={tier}
                  isActive={activeTier === tier.id}
                  onActivate={() => setActiveTier(activeTier === tier.id ? null : tier.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-surface-1/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-6xl mb-8">🏆</p>
            <h2 
              className="text-3xl md:text-4xl text-text-bright mb-6"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Auditor Score: 9.5/10
            </h2>
            <p className="text-text-body mb-8">
              21 Auditor Decisions. All accepted. 
              Mathematical proofs where possible, protocols where not.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/investors"
                className="px-8 py-3 bg-phosphor text-void font-mono text-sm rounded-lg hover:bg-phosphor/90 transition-colors"
              >
                Investor Deck →
              </a>
              <a 
                href="/playground"
                className="px-8 py-3 bg-surface-2 text-text-body font-mono text-sm rounded-lg hover:bg-surface-1 transition-colors border border-border-subtle"
              >
                Try Playground
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer note */}
      <div className="py-12 px-6 border-t border-border-subtle">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-text-ghost text-xs font-mono">
          <span>Session 58 | Constitutional Document</span>
          <span>SHA-256 · Ed25519 · WORM · Q.E.D.</span>
        </div>
      </div>
    </main>
  );
}

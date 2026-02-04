"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/ui/GlobalHeader";

// ============================================================================
// TIER DATA
// ============================================================================

const tiers = [
  {
    id: "tier1",
    level: "TIER 1",
    name: "State Machines",
    subtitle: "Mathematical Proof",
    color: "#fbbf24", // gold
    icon: "🥇",
    innovations: [
      {
        id: "ssot-two-phase",
        name: "SSOT Two-Phase Signed Transition",
        theorem: "Impossible to change system state from 'Valid' to 'Compromised' without triggering the Kill Switch.",
        proof: "Q.E.D. ∎",
        formula: "F(S,M,T) = { RUN if H(S)=M, READ_ONLY if H(S)≠M ∧ Verify(T)=1, STOP otherwise }",
        files: ["xck/security/deploy_guard.py", "xck/api/routers/system_signing.py"],
      },
      {
        id: "evidence-chain",
        name: "Evidence Chain (Hash-Linked WORM)",
        theorem: "Impossible to change the past without breaking the present.",
        proof: "Q.E.D. ∎",
        formula: "H_n = SHA256( D_n ∥ T_n ∥ H_{n-1} )",
        files: ["xck/api/routers/ledger.py", "ops/proof/mathematical_verifier.py"],
      },
      {
        id: "kill-switch-2step",
        name: "Kill Switch 2-Step Clear",
        theorem: "Impossible to accidentally deactivate the Kill Switch (fat-finger protection).",
        proof: "Challenge → Confirm Protocol",
        formula: "2 keys × 2 operators × 120s TTL",
        files: ["xck/api/routers/kill_switch_secure.py"],
      },
    ],
  },
  {
    id: "tier2",
    level: "TIER 2",
    name: "Unified Architecture",
    subtitle: "Patterns",
    color: "#94a3b8", // silver
    icon: "🥈",
    innovations: [
      {
        id: "unified-theory",
        name: "Unified Theory (Soul/Mind/Immune)",
        theorem: "System as a living organism with three layers.",
        proof: "Architectural Pattern",
        formula: "VALKYRIE (Soul) + BRAIN/SPICE (Mind) + XCK (Immune System)",
        files: ["Valkyrie Protocol", "Brain Service", "XCK Security"],
      },
      {
        id: "gatekeeper",
        name: "Gatekeeper as Diplomatic Courier",
        theorem: "Single privileged mediator for all inter-service communication.",
        proof: "Protocol Pattern",
        formula: "Sanitization → Routing → Audit Trail",
        files: ["xck/api/gatekeeper.py"],
      },
      {
        id: "unified-ledger",
        name: "Unified Ledger",
        theorem: "Operational + Forensic + Merkle in one system.",
        proof: "Merkle Proof",
        formula: "Operational (10K) → Forensic (WORM) → Checkpoint (Ed25519)",
        files: ["xck/api/routers/ledger.py"],
      },
    ],
  },
  {
    id: "tier3",
    level: "TIER 3",
    name: "Anti-Drift & Liveness",
    subtitle: "Watchdog",
    color: "#cd7f32", // bronze
    icon: "🥉",
    innovations: [
      {
        id: "dual-heartbeat",
        name: "Dual Heartbeat (JSON TTL + Redis)",
        theorem: "No 'hope-driven behavior'—everything is mechanism + TTL.",
        proof: "TTL Logic",
        formula: "JSON (source of truth, 5min TTL) + Redis (accelerator, 30s TTL)",
        files: [".spice/status/*/latest.json"],
      },
      {
        id: "timeline-pipeline",
        name: "Timeline Event Pipeline",
        theorem: "12 canonical event types for full visibility.",
        proof: "Event Contract v1",
        formula: "HARVEST → SPICE → OUTCOME phases",
        files: ["/api/ops/timeline/*"],
      },
      {
        id: "watchdog-defcon",
        name: "Watchdog Engine (DEFCON Levels)",
        theorem: "Backend must not silently degrade.",
        proof: "FSM Pattern",
        formula: "DEFCON 5 (normal) → DEFCON 1 (critical) + Kill Switch",
        files: ["xck/watchdog/engine.py"],
      },
    ],
  },
  {
    id: "tier4",
    level: "TIER 4",
    name: "AI Self-Improvement",
    subtitle: "Data Flywheel",
    color: "#a78bfa", // purple
    icon: "🏅",
    innovations: [
      {
        id: "spice-selfplay",
        name: "SPICE Self-Play Learning",
        theorem: "AI that learns on its own without human intervention.",
        proof: "ML Pipeline",
        formula: "SPICE → Memory → Arena → Factory → Forge (feedback loop)",
        files: ["04_self_learning/"],
      },
      {
        id: "hydra-sniper",
        name: "Hydra + Sniper Principle",
        theorem: "8 parallel solutions, shortest is selected. Annoyance Score penalizes over-engineering.",
        proof: "Code Quality",
        formula: "Score = AST_Score - Length_Penalty - Annoyance_Score",
        files: ["SPICE orchestrator", "absolute_zero/sniper.py"],
      },
      {
        id: "habituation-filter",
        name: "Habituation Filter (Factory)",
        theorem: "Frequent patterns get lower weight. Prevents overfitting to common solutions.",
        proof: "Statistical Deduplication",
        formula: "w = 1/√(1+f) where f = frequency",
        files: ["03_factory/smart_export.py", "Habituation deduplication"],
      },
      {
        id: "knowledge-gap",
        name: "Knowledge Gap Loop + DLQ",
        theorem: "Harvester does not write directly—everything passes the quality gate.",
        proof: "Quality Gate Protocol",
        formula: "Gap → Search → Arena Check → Memory or DLQ",
        files: ["harvester/", "arena/"],
      },
    ],
  },
  {
    id: "tier5",
    level: "TIER 5",
    name: "Zero Trust Enterprise",
    subtitle: "Security Stack",
    color: "#ef4444", // red
    icon: "🎖️",
    innovations: [
      {
        id: "zero-trust-stack",
        name: "Zero Trust Stack (4 Layers)",
        theorem: "Never trust, always verify.",
        proof: "Crypto Stack",
        formula: "HMAC → mTLS → RBAC → JIT+BreakGlass",
        files: ["xck/security/"],
      },
      {
        id: "joker-agent",
        name: "Joker Adversarial Agent",
        theorem: "Attack is the best defense—AI that attacks itself.",
        proof: "Adversarial AI",
        formula: "10 attack vectors × auto-patch × golden tests",
        files: ["xck/adversarial/joker.py"],
      },
    ],
  },
  {
    id: "tier6",
    level: "TIER 6",
    name: "Biological Optimization",
    subtitle: "Session 59 Innovations",
    color: "#818cf8", // neural
    icon: "🧬",
    innovations: [
      {
        id: "rem-phase",
        name: "REM Phase - Nocturnal Optimization",
        theorem: "AI that 'sleeps' and optimizes memory at night.",
        proof: "Biological Pattern",
        formula: "decay_score = Σ(access_i × e^(-λ × (t_now - t_i)))",
        files: ["Memory pruning", "Conflict resolution", "Usage decay", "Dream simulation"],
      },
      {
        id: "canary-tokens",
        name: "Canary Tokens - Honeypot Sentinels",
        theorem: "Strategic decoys in the knowledge base catch attackers.",
        proof: "Court Valid Evidence",
        formula: "Trigger → Capture → Escalate → Forensic Report",
        files: ["memory/canary/", "Honeypot Data", "Tripwire Facts", "Semantic Landmines"],
      },
      {
        id: "ssot-guardian",
        name: "SSOT Two-Phase Guardian",
        theorem: "Deploy without 'blind spots'—continuous protection.",
        proof: "Q.E.D. ∎",
        formula: "STATE = { RUN: H(S)=M, READ_ONLY: H(S)≠M ∧ Verify(T), LOCKDOWN: else }",
        files: ["xck/security/ssot_guardian.py"],
      },
    ],
  },
  {
    id: "tier7",
    level: "TIER 7",
    name: "Court-Grade Determinism",
    subtitle: "Session 78 Innovations",
    color: "#10b981", // green
    icon: "⚖️",
    innovations: [
      {
        id: "determinism-layer",
        name: "Determinism Layer",
        theorem: "Same input + same context = same output + same hash. Not just caching—mathematical proof of determinism.",
        proof: "Q.E.D. ∎",
        formula: "cache_key = f(op, rbac, context_hash, input_hash) → cache_hit = 76.5%",
        files: ["packages/core/01_brain/determinism_cache.py", "determinism_client.py"],
      },
      {
        id: "ssot-canon",
        name: "SSOT Canon (Compiled Truth)",
        theorem: "SSOT is compiled into canon.json. CI blocks merge if drift detected. Not documentation—enforced law.",
        proof: "CI Enforcement",
        formula: "services.truth.yml → canon.json → CI gate → ledger event (ssot.canon.changed)",
        files: ["scripts/ssot/canon_extract.py", "scripts/ci/ssot_guardrail.sh"],
      },
      {
        id: "audit-routines",
        name: "Audit Routines (EOD/SOD)",
        theorem: "One command = audit closed. make eod / make sod. Automated evidence generation. Zero manual steps.",
        proof: "Operational Protocol",
        formula: "make eod → SSOT Validation + Reseal + Attestations → Evidence Pack",
        files: ["scripts/auditor/end_of_day.sh"],
      },
    ],
  },
];

const scorecard = [
  { name: "SSOT Two-Phase", mathProof: true, courtValid: true, novel: true, complexity: "State Machine" },
  { name: "Evidence Chain", mathProof: true, courtValid: true, novel: "partial", complexity: "Hash Chain" },
  { name: "Kill Switch 2-Step", mathProof: "partial", courtValid: true, novel: true, complexity: "Challenge/Confirm" },
  { name: "Unified Theory", mathProof: "partial", courtValid: false, novel: true, complexity: "System Design" },
  { name: "Gatekeeper", mathProof: "partial", courtValid: true, novel: true, complexity: "Privilege Model" },
  { name: "Unified Ledger", mathProof: true, courtValid: true, novel: true, complexity: "Storage Pattern" },
  { name: "Dual Heartbeat", mathProof: "partial", courtValid: false, novel: true, complexity: "Liveness" },
  { name: "Timeline Pipeline", mathProof: "partial", courtValid: true, novel: true, complexity: "Event Sourcing" },
  { name: "Watchdog DEFCON", mathProof: "partial", courtValid: false, novel: true, complexity: "State Machine" },
  { name: "Data Flywheel", mathProof: false, courtValid: false, novel: "partial", complexity: "ML Pipeline" },
  { name: "Knowledge Gap Loop", mathProof: "partial", courtValid: false, novel: true, complexity: "Quality Gate" },
  { name: "Habituation Filter", mathProof: "partial", courtValid: false, novel: true, complexity: "Statistical Deduplication" },
  { name: "Zero Trust Stack", mathProof: "partial", courtValid: true, novel: "partial", complexity: "Security" },
  { name: "Joker Agent", mathProof: false, courtValid: false, novel: true, complexity: "Adversarial AI" },
  // Session 59 additions
  { name: "REM Phase", mathProof: "partial", courtValid: false, novel: true, complexity: "Memory Optimization" },
  { name: "Canary Tokens", mathProof: "partial", courtValid: true, novel: true, complexity: "Intrusion Detection" },
  { name: "SSOT Guardian", mathProof: true, courtValid: true, novel: true, complexity: "Deploy Security" },
  // Session 78 additions
  { name: "Determinism Layer", mathProof: true, courtValid: true, novel: true, complexity: "Cache + Hash Contract" },
  { name: "SSOT Canon", mathProof: "partial", courtValid: true, novel: true, complexity: "CI Enforcement" },
  { name: "Audit Routines", mathProof: "partial", courtValid: true, novel: true, complexity: "Operational Protocol" },
];

// ============================================================================
// COMPONENTS
// ============================================================================

function TierCard({ 
  tier, 
  isActive, 
  onClick 
}: { 
  tier: typeof tiers[0]; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative p-6 rounded-xl border-2 text-left transition-all
        ${isActive 
          ? "bg-surface-2 scale-105" 
          : "bg-surface-1/50 hover:bg-surface-1"
        }
      `}
      style={{
        borderColor: isActive ? tier.color : "rgba(255,255,255,0.1)",
        boxShadow: isActive ? `0 0 30px ${tier.color}30` : "none",
      }}
      whileHover={{ scale: isActive ? 1.05 : 1.02 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{tier.icon}</span>
        <div>
          <div 
            className="text-xs font-mono tracking-wider"
            style={{ color: tier.color }}
          >
            {tier.level}
          </div>
          <div className="text-lg font-semibold text-text-bright">
            {tier.name}
          </div>
        </div>
      </div>
      <div className="text-xs text-text-ghost">
        {tier.subtitle}
      </div>
      <div 
        className="absolute top-2 right-2 text-xs font-mono px-2 py-0.5 rounded"
        style={{ 
          backgroundColor: `${tier.color}20`,
          color: tier.color,
        }}
      >
        {tier.innovations.length}
      </div>
    </motion.button>
  );
}

function InnovationDetail({ 
  innovation, 
  color, 
  index 
}: { 
  innovation: typeof tiers[0]["innovations"][0];
  color: string;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-border-subtle rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left hover:bg-surface-1/50 transition-colors"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 
              className="text-lg font-semibold mb-2"
              style={{ color }}
            >
              {innovation.name}
            </h4>
            <p className="text-sm text-text-body">
              <span className="text-text-ghost">Theorem:</span> {innovation.theorem}
            </p>
          </div>
          <div 
            className="px-3 py-1 rounded-full text-xs font-mono"
            style={{ 
              backgroundColor: `${color}20`,
              color,
            }}
          >
            {innovation.proof}
          </div>
        </div>
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-border-subtle bg-void/50">
              {/* Formula */}
              <div className="mt-4">
                <div className="text-xs text-text-ghost uppercase tracking-wider mb-2">Formula</div>
                <div 
                  className="font-mono text-sm p-3 rounded bg-black/50 border"
                  style={{ borderColor: `${color}30` }}
                >
                  {innovation.formula}
                </div>
              </div>
              
              {/* Files */}
              <div className="mt-4">
                <div className="text-xs text-text-ghost uppercase tracking-wider mb-2">Files</div>
                <div className="flex flex-wrap gap-2">
                  {innovation.files.map((file) => (
                    <span 
                      key={file}
                      className="text-xs font-mono px-2 py-1 rounded bg-surface-2 text-text-body"
                    >
                      {file}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ScorecardTable() {
  const renderCheck = (value: boolean | string | "partial") => {
    if (value === true) return <span className="text-emerald-400">✅</span>;
    if (value === false) return <span className="text-red-400">❌</span>;
    if (value === "partial") return <span className="text-amber-400">⚠️</span>;
    return value;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-subtle">
            <th className="text-left py-3 px-4 text-text-ghost font-mono text-xs uppercase tracking-wider">Innovation</th>
            <th className="text-center py-3 px-4 text-text-ghost font-mono text-xs uppercase tracking-wider">Math Proof</th>
            <th className="text-center py-3 px-4 text-text-ghost font-mono text-xs uppercase tracking-wider">Court Valid</th>
            <th className="text-center py-3 px-4 text-text-ghost font-mono text-xs uppercase tracking-wider">Novel</th>
            <th className="text-left py-3 px-4 text-text-ghost font-mono text-xs uppercase tracking-wider">Complexity</th>
          </tr>
        </thead>
        <tbody>
          {scorecard.map((item, i) => (
            <tr 
              key={item.name}
              className={`border-b border-border-subtle/50 ${i % 2 === 0 ? 'bg-surface-1/20' : ''}`}
            >
              <td className="py-3 px-4 font-medium text-text-bright">{item.name}</td>
              <td className="py-3 px-4 text-center">{renderCheck(item.mathProof)}</td>
              <td className="py-3 px-4 text-center">{renderCheck(item.courtValid)}</td>
              <td className="py-3 px-4 text-center">{renderCheck(item.novel)}</td>
              <td className="py-3 px-4 text-text-body font-mono text-xs">{item.complexity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function InnovationPage() {
  const heroRef = useRef(null);
  const tiersRef = useRef(null);
  const scorecardRef = useRef(null);
  const pitchRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const tiersInView = useInView(tiersRef, { once: true, margin: "-100px" });
  const scorecardInView = useInView(scorecardRef, { once: true, margin: "-100px" });
  const pitchInView = useInView(pitchRef, { once: true, margin: "-100px" });

  const [activeTier, setActiveTier] = useState(tiers[0].id);
  const currentTier = tiers.find(t => t.id === activeTier) || tiers[0];

  return (
    <div className="min-h-screen bg-void text-text-bright">
      <GlobalHeader />
      
      <main className="pt-14">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative py-32 px-6 overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
          
          <motion.div 
            className="max-w-4xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1 border border-border-subtle mb-8">
              <span className="text-xs font-mono text-text-ghost uppercase tracking-wider">
                Technical Innovation Catalog
              </span>
            </div>

            {/* Main Statement */}
            <div className="mb-8">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-text-bright"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                Verifiable AI Systems
              </h1>
              <p className="text-xl text-text-body max-w-2xl mx-auto leading-relaxed">
                Mathematical proofs over probabilistic testing. 
                Cryptographic guarantees over trust assumptions.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-mono text-text-bright">20</div>
                <div className="text-xs text-text-ghost uppercase tracking-wider">Innovations</div>
              </div>
              <div className="w-px h-10 bg-border-subtle" />
              <div className="text-center">
                <div className="text-3xl font-mono text-text-bright">7</div>
                <div className="text-xs text-text-ghost uppercase tracking-wider">Tiers</div>
              </div>
              <div className="w-px h-10 bg-border-subtle" />
              <div className="text-center">
                <div className="text-3xl font-mono text-phosphor">Q.E.D.</div>
                <div className="text-xs text-text-ghost uppercase tracking-wider">Proofs</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Problem vs Solution */}
        <section className="py-20 px-6 bg-black/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-xl bg-red-500/5 border border-red-500/20"
              >
                <div className="text-xs font-mono text-red-400 uppercase tracking-wider mb-4">
                  ❌ Tradicionalni Softver
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="p-3 rounded bg-black/50">
                    <div className="text-text-ghost">Question: &quot;Is the system secure?&quot;</div>
                    <div className="text-red-300">Answer: &quot;Yes, trust me.&quot;</div>
                  </div>
                  <div className="p-3 rounded bg-black/50">
                    <div className="text-text-ghost">Question: &quot;How do you know the AI doesn&apos;t hallucinate?&quot;</div>
                    <div className="text-red-300">Answer: &quot;Well... we tested it.&quot;</div>
                  </div>
                  <div className="p-3 rounded bg-black/50">
                    <div className="text-text-ghost">Question: &quot;Can you prove the order?&quot;</div>
                    <div className="text-red-300">Answer: &quot;The logs are somewhere...&quot;</div>
                  </div>
                </div>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="p-8 rounded-xl bg-emerald-500/5 border border-emerald-500/20"
              >
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-4">
                  ✅ ALKEM1-LAB2 Approach
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="p-3 rounded bg-black/50">
                    <div className="text-text-ghost">Question: &quot;Is the system secure?&quot;</div>
                    <div className="text-emerald-300">Answer: &quot;Let&apos;s run the mathematical proof.&quot;</div>
                  </div>
                  <div className="p-3 rounded bg-black/50 border border-emerald-500/30">
                    <div className="text-emerald-300">$ python mathematical_verifier.py evidence/chain.jsonl</div>
                    <div className="text-amber-400 mt-1">🏆 Q.E.D. - Mathematically Proven Integrity</div>
                  </div>
                  <div className="p-3 rounded bg-black/50">
                    <div className="text-text-ghost">Question: &quot;Can you prove the order?&quot;</div>
                    <div className="text-emerald-300">Answer: &quot;Hash chain guarantees causality. Court-valid.&quot;</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tiers Section */}
        <section 
          ref={tiersRef}
          className="py-32 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={tiersInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <h2 
                className="text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                Innovation Tiers
              </h2>
              <p className="text-text-body max-w-2xl mx-auto">
                From mathematical proofs to court-grade determinism—7 tiers of innovation.
              </p>
            </motion.div>

            {/* Tier Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={tiersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12"
            >
              {tiers.map((tier) => (
                <TierCard
                  key={tier.id}
                  tier={tier}
                  isActive={activeTier === tier.id}
                  onClick={() => setActiveTier(tier.id)}
                />
              ))}
            </motion.div>

            {/* Active Tier Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-surface-1/30 rounded-2xl border border-border-subtle p-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl">{currentTier.icon}</span>
                  <div>
                    <div 
                      className="text-sm font-mono tracking-wider"
                      style={{ color: currentTier.color }}
                    >
                      {currentTier.level}
                    </div>
                    <h3 className="text-2xl font-semibold text-text-bright">
                      {currentTier.name}: {currentTier.subtitle}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentTier.innovations.map((innovation, index) => (
                    <InnovationDetail
                      key={innovation.id}
                      innovation={innovation}
                      color={currentTier.color}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Scorecard Section */}
        <section 
          ref={scorecardRef}
          className="py-32 px-6 bg-black/30"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={scorecardInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  📊 Innovation Scorecard
                </span>
              </div>
              <h2 
                className="text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                Innovation Matrix
              </h2>
              <p className="text-text-body">
                Mathematical proof • Court validity • Novelty
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={scorecardInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-surface-1/30 rounded-xl border border-border-subtle overflow-hidden"
            >
              <ScorecardTable />
            </motion.div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-8 mt-6 text-sm text-text-ghost">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✅</span>
                <span>Yes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">⚠️</span>
                <span>Partial</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">❌</span>
                <span>No</span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Thesis Section */}
        <section 
          ref={pitchRef}
          className="py-32 px-6"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={pitchInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1 border border-border-subtle mb-6">
                <span className="text-xs font-mono text-text-ghost uppercase tracking-wider">
                  Engineering Thesis
                </span>
              </div>
              <h2 
                className="text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                The Verification Problem
              </h2>
              <p className="text-text-body max-w-2xl mx-auto">
                Enterprise AI systems today rely on probabilistic testing. 
                We built deterministic verification.
              </p>
            </motion.div>

            {/* Technical Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={pitchInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8 mb-16"
            >
              {/* Industry Standard */}
              <div className="p-8 rounded-xl bg-surface-1/30 border border-border-subtle">
                <div className="text-xs font-mono text-text-ghost uppercase tracking-wider mb-6">
                  Industry Standard
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-text-ghost mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-text-bright font-medium">Unit Tests</div>
                      <div className="text-sm text-text-ghost">Coverage ≠ Correctness</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-text-ghost mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-text-bright font-medium">Integration Tests</div>
                      <div className="text-sm text-text-ghost">Happy path bias</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-text-ghost mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-text-bright font-medium">Observability</div>
                      <div className="text-sm text-text-ghost">Post-hoc analysis, mutable logs</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-text-ghost mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-text-bright font-medium">Audit Response</div>
                      <div className="text-sm text-text-ghost">"We believe the system is secure"</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Approach */}
              <div className="p-8 rounded-xl bg-phosphor/5 border border-phosphor/20">
                <div className="text-xs font-mono text-phosphor uppercase tracking-wider mb-6">
                  ALKEM1-LAB2 Approach
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-phosphor mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-text-bright font-medium">Formal State Machines</div>
                      <div className="text-sm text-text-body">Provable transition constraints</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-phosphor mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-text-bright font-medium">Hash-Linked Evidence</div>
                      <div className="text-sm text-text-body">SHA-256 chain, tamper-evident</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-phosphor mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-text-bright font-medium">Cryptographic Signatures</div>
                      <div className="text-sm text-text-body">Ed25519, non-repudiation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-phosphor mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-text-bright font-medium">Audit Response</div>
                      <div className="text-sm text-text-body">"Run the verifier. Q.E.D."</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Core Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={pitchInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-void border border-border-subtle rounded-xl p-8 md:p-12 mb-16"
            >
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-4">
                Core Innovation
              </div>
              <h3 
                className="text-2xl md:text-3xl text-text-bright mb-6"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                From "Trust Me" to "Verify It"
              </h3>
              
              <div className="space-y-6">
                <p className="text-text-body leading-relaxed">
                  The fundamental problem with AI systems isn't capability—it's verifiability. 
                  When a system makes a decision, you need to answer three questions:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-surface-1/50 border border-border-subtle">
                    <div className="text-amber-400 font-mono text-sm mb-2">01</div>
                    <div className="text-text-bright font-medium mb-1">What happened?</div>
                    <div className="text-sm text-text-ghost">Complete event reconstruction</div>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-1/50 border border-border-subtle">
                    <div className="text-amber-400 font-mono text-sm mb-2">02</div>
                    <div className="text-text-bright font-medium mb-1">In what order?</div>
                    <div className="text-sm text-text-ghost">Cryptographic causality proof</div>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-1/50 border border-border-subtle">
                    <div className="text-amber-400 font-mono text-sm mb-2">03</div>
                    <div className="text-text-bright font-medium mb-1">Can you prove it?</div>
                    <div className="text-sm text-text-ghost">Third-party verifiable</div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-lg bg-black/50 border border-phosphor/20">
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-text-ghost"># Verification command</div>
                    <div className="text-phosphor">$ python ops/proof/mathematical_verifier.py evidence/chain.jsonl</div>
                    <div className="text-text-ghost mt-4"># Output</div>
                    <div className="text-text-body">Chain length: 12,847 entries</div>
                    <div className="text-text-body">Genesis hash: 0x7a3b...</div>
                    <div className="text-text-body">Latest hash: 0xe5f6...</div>
                    <div className="text-text-body">Signature: VALID (Ed25519)</div>
                    <div className="text-emerald-400 mt-2 font-semibold">✓ INTEGRITY VERIFIED — All constraints satisfied</div>
                  </div>
                </div>

                <p className="text-text-ghost text-sm italic">
                  This isn't a test result. It's a mathematical proof that the chain is unbroken 
                  and every state transition followed the defined constraints.
                </p>
              </div>
            </motion.div>

            {/* Technical Specs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={pitchInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-4 gap-4 mb-16"
            >
              {[
                { value: "<47ms", label: "Kill Switch Response", sub: "Hardware interrupt" },
                { value: "2^256", label: "Hash Space", sub: "Collision resistant" },
                { value: "WORM", label: "Storage Model", sub: "Write-once, read-many" },
                { value: "Ed25519", label: "Signatures", sub: "Non-repudiation" },
              ].map((spec) => (
                <div 
                  key={spec.label}
                  className="p-5 rounded-lg bg-surface-1/30 border border-border-subtle text-center"
                >
                  <div className="text-2xl font-mono text-phosphor mb-1">{spec.value}</div>
                  <div className="text-sm text-text-bright">{spec.label}</div>
                  <div className="text-xs text-text-ghost">{spec.sub}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={pitchInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <Link
                href="/proof"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-surface-1 border border-border-subtle text-text-bright hover:bg-surface-2 hover:border-phosphor/30 transition-all font-mono text-sm"
              >
                <span>Explore Proof System</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <section className="py-12 px-6 border-t border-border-subtle">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-text-ghost font-mono">
              Generated: 2026-01-28 | Session 78 | ALKEM1-LAB2
            </p>
            <p className="text-xs text-text-ghost mt-2">
              Author: VALKYRIE | Status: Constitutional Reference Document
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

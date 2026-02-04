"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const integrityLevels = [
  {
    level: "nominal",
    color: "#6ee7b7",
    bg: "bg-phosphor/20",
    border: "border-phosphor",
    icon: "✓",
    label: "Nominal",
    description: "All systems operational. Redis and Ledger functioning normally.",
  },
  {
    level: "degraded",
    color: "#f97316",
    bg: "bg-ember/20",
    border: "border-ember",
    icon: "⚠",
    label: "Degraded",
    description: "Infrastructure degraded but business logic continues. Auditor sees truth.",
  },
  {
    level: "emergency",
    color: "#ef4444",
    bg: "bg-crimson/20",
    border: "border-crimson",
    icon: "✕",
    label: "Emergency",
    description: "Critical infrastructure failure. Fallback mode active.",
  },
];

function HashVisualization({ inputHash, contextHash, outputHash, cacheHit }: {
  inputHash: string;
  contextHash: string;
  outputHash: string;
  cacheHit: boolean;
}) {
  return (
    <div className="space-y-4">
      {/* Input Hash */}
      <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-text-ghost uppercase">Input Hash</span>
          <span className="text-xs font-mono text-phosphor">H(input)</span>
        </div>
        <div className="font-mono text-sm text-text-body break-all">{inputHash}</div>
        <div className="text-xs text-text-ghost mt-2">Query + params (no noise)</div>
      </div>

      {/* Context Hash */}
      <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-text-ghost uppercase">Context Hash</span>
          <span className="text-xs font-mono text-neural-1">H(context)</span>
        </div>
        <div className="font-mono text-sm text-text-body break-all">{contextHash}</div>
        <div className="text-xs text-text-ghost mt-2">Code version + model + prompt + index</div>
      </div>

      {/* Cache Status */}
      <motion.div
        className={`p-4 rounded-xl border-2 ${cacheHit ? "bg-phosphor/10 border-phosphor" : "bg-ember/10 border-ember"}`}
        animate={cacheHit ? {
          boxShadow: ["0 0 0px rgba(110, 231, 183, 0)", "0 0 20px rgba(110, 231, 183, 0.3)", "0 0 0px rgba(110, 231, 183, 0)"],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-text-ghost uppercase">Cache Status</span>
          <span className={`text-xs font-mono font-bold ${cacheHit ? "text-phosphor" : "text-ember"}`}>
            {cacheHit ? "HIT" : "MISS"}
          </span>
        </div>
        <div className="text-sm text-text-body">
          {cacheHit ? (
            <>Returning cached result in <span className="text-phosphor font-bold">~20ms</span></>
          ) : (
            <>Computing new result in <span className="text-ember font-bold">~500ms</span></>
          )}
        </div>
      </motion.div>

      {/* Output Hash */}
      <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-text-ghost uppercase">Output Hash</span>
          <span className="text-xs font-mono text-phosphor">H(output)</span>
        </div>
        <div className="font-mono text-sm text-text-body break-all">{outputHash}</div>
        <div className="text-xs text-text-ghost mt-2">Semantic result only (no latency/cost/tokens)</div>
      </div>
    </div>
  );
}

function CacheDemo() {
  const [cacheHit, setCacheHit] = useState(false);
  const [latency, setLatency] = useState(500);

  const inputHash = "a3f8b2c9d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0";
  const contextHash = "b4e9c3d2e5f6a7b8c9d0e1f2a3b4c5d6e7a8b9c0d1e2f3a4b5c6d7e8f9a1";
  const outputHash = cacheHit ? "c5f0d4e3f6a7b8c9d0e1f2a3b4c5d6e7a8b9c0d1e2f3a4b5c6d7e8f9a2" : "c5f0d4e3f6a7b8c9d0e1f2a3b4c5d6e7a8b9c0d1e2f3a4b5c6d7e8f9a2";

  const handleRequest = () => {
    setCacheHit(false);
    setLatency(500);
    
    setTimeout(() => {
      // First call is MISS
      setTimeout(() => {
        // Second call is HIT
        setCacheHit(true);
        setLatency(20);
      }, 500);
    }, 100);
  };

  return (
    <div className="space-y-6">
      <HashVisualization
        inputHash={inputHash}
        contextHash={contextHash}
        outputHash={outputHash}
        cacheHit={cacheHit}
      />

      <button
        onClick={handleRequest}
        className="w-full py-3 px-6 rounded-xl bg-surface-2 border border-border-default hover:border-phosphor transition-all font-mono text-sm text-text-body hover:text-phosphor"
      >
        {cacheHit ? "Reset Demo" : "Make Request"}
      </button>

      {cacheHit && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-phosphor/10 border border-phosphor/30"
        >
          <div className="text-sm text-text-body">
            <span className="text-phosphor font-bold">Cache HIT!</span> Same input + same context = instant result.
          </div>
        </motion.div>
      )}
    </div>
  );
}

function IntegrityIndicator({ level }: { level: typeof integrityLevels[0]["level"] }) {
  const config = integrityLevels.find(l => l.level === level) || integrityLevels[0];

  return (
    <div className={`p-4 rounded-xl border-2 ${config.border} ${config.bg}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{config.icon}</span>
        <div>
          <div className="text-lg font-bold" style={{ color: config.color }}>
            {config.label}
          </div>
          <div className="text-xs text-text-ghost">Integrity Level</div>
        </div>
      </div>
      <p className="text-sm text-text-body">{config.description}</p>
    </div>
  );
}

export function DeterminismLayer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeLevel, setActiveLevel] = useState<typeof integrityLevels[0]["level"]>("nominal");

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
                Court-Grade Determinism
              </span>
              <div className="h-[1px] w-12 bg-phosphor/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Same Input = Same Output ={" "}
              <span className="text-phosphor">Same Hash</span>
            </h2>
            <p className="text-text-body max-w-2xl mx-auto text-lg">
              Not just caching—mathematical proof of determinism. 
              Every operation is auditable and reproducible.
            </p>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Hash Contract Demo */}
            <motion.div variants={itemVariants}>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-text-bright mb-2">Hash Contract</h3>
                <p className="text-sm text-text-ghost mb-4">
                  Every "money endpoint" has input_hash, context_hash, output_hash.
                  Same inputs = same hashes = cache hit.
                </p>
              </div>
              <CacheDemo />
            </motion.div>

            {/* Right: Integrity Levels */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-text-bright mb-2">Fail-Open Integrity</h3>
                <p className="text-sm text-text-ghost mb-4">
                  If Redis/Ledger fails, business logic continues but flags degraded state.
                  Auditor sees truth, not hidden failure.
                </p>
              </div>

              {/* Integrity level selector */}
              <div className="flex gap-2 mb-4">
                {integrityLevels.map((level) => (
                  <button
                    key={level.level}
                    onClick={() => setActiveLevel(level.level)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono transition-all ${
                      activeLevel === level.level
                        ? `${level.bg} ${level.border} border-2 text-text-bright`
                        : "bg-surface-1 text-text-ghost hover:bg-surface-2"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>

              <IntegrityIndicator level={activeLevel} />

              {/* Ledger Events */}
              <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                <h4 className="text-sm font-bold text-text-bright mb-3">Ledger Events</h4>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-phosphor">→</span>
                    <span className="text-text-body">{`{op}.start`}</span>
                    <span className="text-text-ghost">(input_hash, context_hash)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-phosphor">→</span>
                    <span className="text-text-body">{`{op}.finish`}</span>
                    <span className="text-text-ghost">(output_hash, cache_hit, latency_ms)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-phosphor">→</span>
                    <span className="text-text-body">{`{op}.error`}</span>
                    <span className="text-text-ghost">(error_type, error_hash)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Stats */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={itemVariants}
          >
            {[
              { label: "Cache Hit Rate", value: "76.5%", color: "phosphor" },
              { label: "Avg Latency (HIT)", value: "20ms", color: "phosphor" },
              { label: "Avg Latency (MISS)", value: "500ms", color: "ember" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-xl bg-surface-1/50 border border-border-subtle text-center"
                variants={itemVariants}
              >
                <div className={`text-3xl font-bold mb-2 text-${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-text-ghost">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Q.E.D. Proof */}
          <motion.div
            className="mt-12 p-6 rounded-xl bg-neural-2/10 border border-neural-2/30"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">Q.E.D.</span>
              <span className="text-sm font-mono text-neural-2">Mathematical Proof</span>
            </div>
            <div className="font-mono text-sm text-text-body space-y-2">
              <div>∀ request: same input + same context → same output_hash</div>
              <div>∴ cache_key = f(op, rbac, context_hash, input_hash) is deterministic</div>
              <div className="text-phosphor mt-2">
                Same inputs = same hashes = cache hit = instant result.
              </div>
            </div>
          </motion.div>

          {/* Bottom quote */}
          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <blockquote className="text-xl text-text-body italic max-w-3xl mx-auto">
              &quot;We don&apos;t just cache results.
              <br />
              <span className="text-phosphor not-italic font-medium">
                We prove determinism mathematically.
              </span>&quot;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

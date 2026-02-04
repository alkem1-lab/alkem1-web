"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const session78Innovations = [
  {
    name: "Determinism Layer",
    icon: "⚖️",
    color: "text-phosphor",
    description: "Same input + same context = same output + same hash. Not just caching—mathematical proof of determinism.",
    detail: "Every 'money endpoint' has input_hash, context_hash, output_hash. Cache hits in 20ms vs 500ms for new computations.",
  },
  {
    name: "SSOT Canon",
    icon: "📜",
    color: "text-neural-1",
    description: "SSOT is compiled, not just documented. services.truth.yml → canon.json. CI blocks merge if drift detected.",
    detail: "Not documentation—enforced law. Every change → ledger event → audit trail.",
  },
  {
    name: "Audit Routines",
    icon: "🔍",
    color: "text-ember",
    description: "One command = audit closed. make eod / make sod. Automated evidence generation. Zero manual steps.",
    detail: "Daily attestations for compliance. Fail-open philosophy ensures business logic continues even if infrastructure degrades.",
  },
];

export function StoryChapter9() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Chapter Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.div
            className="text-sm font-mono text-phosphor mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            CHAPTER 9
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-text-body mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Court-Grade Determinism
          </motion.h2>
          <motion.p
            className="text-xl text-text-ghost max-w-3xl mx-auto leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Session 78 brought a new level of rigor. Not &quot;trust me&quot;—prove it mathematically.
            Every operation auditable. Every change traceable. Every claim verifiable.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="space-y-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Opening Narrative */}
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            <p className="text-lg text-text-body leading-relaxed mb-6">
              The system was learning. The flywheel was spinning. But something was missing.
            </p>
            <p className="text-lg text-text-body leading-relaxed mb-6">
              How do you prove that the same question always gets the same answer?
              How do you ensure that configuration changes are tracked, not just documented?
              How do you close an audit with one command, not a hundred manual steps?
            </p>
            <p className="text-xl text-phosphor font-semibold">
              The answer: Court-grade determinism.
            </p>
          </motion.div>

          {/* Three Innovations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {session78Innovations.map((innovation, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-2xl bg-surface-1/50 border border-border-subtle hover:border-phosphor/30 transition-all"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: i * 0.1 },
                  },
                }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-5xl mb-4">{innovation.icon}</div>
                <h3 className={`text-2xl font-bold mb-3 ${innovation.color}`}>
                  {innovation.name}
                </h3>
                <p className="text-text-body mb-4 leading-relaxed">
                  {innovation.description}
                </p>
                <div className="p-4 rounded-xl bg-surface-2/50 border border-border-subtle">
                  <p className="text-sm text-text-ghost font-mono">
                    {innovation.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Determinism Deep Dive */}
          <motion.div
            className="mt-16 p-8 rounded-2xl bg-phosphor/10 border border-phosphor/30"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.4 },
              },
            }}
          >
            <h3 className="text-2xl font-bold text-phosphor mb-4">
              The Hash Contract
            </h3>
            <p className="text-text-body mb-6 leading-relaxed">
              Every operation that matters has three hashes:
            </p>
            <div className="space-y-4 font-mono text-sm">
              <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                <div className="text-phosphor mb-2">input_hash</div>
                <div className="text-text-ghost">
                  What changes the result. Query + params. No noise (no correlation_id, timestamp).
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                <div className="text-neural-1 mb-2">context_hash</div>
                <div className="text-text-ghost">
                  External factors. Code version + model + prompt + index version.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                <div className="text-phosphor mb-2">output_hash</div>
                <div className="text-text-ghost">
                  Semantic result only. No latency, no cost, no tokens—just the answer.
                </div>
              </div>
            </div>
            <p className="text-text-body mt-6 leading-relaxed">
              <span className="text-phosphor font-semibold">Same inputs = same hashes = cache hit = instant result.</span>
              {" "}Not &quot;probably the same&quot;—mathematically guaranteed.
            </p>
          </motion.div>

          {/* SSOT Canon Deep Dive */}
          <motion.div
            className="mt-8 p-8 rounded-2xl bg-neural-1/10 border border-neural-1/30"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.5 },
              },
            }}
          >
            <h3 className="text-2xl font-bold text-neural-1 mb-4">
              Compiled Truth, Not Documentation
            </h3>
            <p className="text-text-body mb-6 leading-relaxed">
              SSOT used to be a document. Now it&apos;s compiled law.
            </p>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                <span className="text-2xl">→</span>
                <div>
                  <div className="text-neural-1 mb-1">services.truth.yml</div>
                  <div className="text-text-ghost text-xs">Human-readable source</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                <span className="text-2xl">→</span>
                <div>
                  <div className="text-neural-1 mb-1">canon.json</div>
                  <div className="text-text-ghost text-xs">Machine-readable truth</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                <span className="text-2xl">→</span>
                <div>
                  <div className="text-neural-1 mb-1">CI Gate</div>
                  <div className="text-text-ghost text-xs">Blocks merge if drift detected</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                <span className="text-2xl">→</span>
                <div>
                  <div className="text-neural-1 mb-1">Ledger Event</div>
                  <div className="text-text-ghost text-xs">ssot.canon.changed (audit trail)</div>
                </div>
              </div>
            </div>
            <p className="text-text-body mt-6 leading-relaxed">
              <span className="text-neural-1 font-semibold">SSOT prestaje da bude dokument i postaje zakon sproveden u CI.</span>
              {" "}Every change is tracked. Every drift is caught. Every merge is verified.
            </p>
          </motion.div>

          {/* Audit Routines Deep Dive */}
          <motion.div
            className="mt-8 p-8 rounded-2xl bg-ember/10 border border-ember/30"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.6 },
              },
            }}
          >
            <h3 className="text-2xl font-bold text-ember mb-4">
              One Command = Audit Closed
            </h3>
            <p className="text-text-body mb-6 leading-relaxed">
              End of day used to mean hours of manual work. Now it&apos;s one command.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle font-mono text-sm">
                <div className="text-ember mb-2">$ make eod</div>
                <div className="text-text-ghost text-xs mt-2 space-y-1">
                  <div>→ SSOT Validation</div>
                  <div>→ SSOT Reseal</div>
                  <div>→ Clean Working Tree</div>
                  <div>→ Kill Switch Check</div>
                  <div>→ Canon Ledger Emit</div>
                  <div>→ Attestations (Determinism + Observability)</div>
                </div>
              </div>
              <p className="text-text-body mt-4 leading-relaxed">
                <span className="text-ember font-semibold">One command = audit closed.</span>
                {" "}Automated evidence generation. Zero manual steps. Daily attestations for compliance.
              </p>
              <p className="text-text-body mt-4 leading-relaxed text-sm">
                <span className="text-text-ghost">Fail-open philosophy:</span> Business logic continues even if Redis/Ledger fails.
                Auditor sees truth (degraded state), not hidden failure.
              </p>
            </div>
          </motion.div>

          {/* Closing Thought */}
          <motion.div
            className="mt-16 max-w-4xl mx-auto text-center"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.7 },
              },
            }}
          >
            <p className="text-2xl text-text-body leading-relaxed mb-6">
              The system wasn&apos;t just learning anymore.
            </p>
            <p className="text-xl text-phosphor font-semibold mb-6">
              It was provable. Traceable. Auditable.
            </p>
            <p className="text-lg text-text-ghost leading-relaxed">
              Every operation had a hash. Every change had a ledger event. Every audit had automated evidence.
            </p>
            <p className="text-lg text-text-body leading-relaxed mt-6">
              This wasn&apos;t just AI anymore.
            </p>
            <p className="text-2xl text-phosphor font-bold mt-4">
              This was court-grade determinism.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Background glow */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-phosphor/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neural-1/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ember/20 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
}

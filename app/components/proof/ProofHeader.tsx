"use client";

import { motion } from "framer-motion";

export function ProofHeader() {
  return (
    <section className="relative pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-phosphor/10 border border-phosphor/30 mb-8">
            <div className="w-2 h-2 rounded-full bg-phosphor animate-pulse" />
            <span className="text-xs font-mono text-phosphor uppercase tracking-wider">
              Mathematical Proof
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-6"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Evidence Chain
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-text-body max-w-2xl mx-auto mb-8">
            Every action is cryptographically sealed. Every decision is verifiable.
            <br />
            <span className="text-phosphor">Try to tamper with it. We dare you.</span>
          </p>

          {/* Formula */}
          <div className="inline-block px-6 py-4 rounded-lg bg-surface-1/80 border border-border-subtle font-mono text-sm">
            <span className="text-text-ghost">H</span>
            <sub className="text-phosphor">n</sub>
            <span className="text-text-ghost"> = SHA256( D</span>
            <sub className="text-text-ghost">n</sub>
            <span className="text-text-ghost"> ∥ T</span>
            <sub className="text-text-ghost">n</sub>
            <span className="text-text-ghost"> ∥ H</span>
            <sub className="text-crimson">n-1</sub>
            <span className="text-text-ghost"> )</span>
          </div>

          <p className="text-xs text-text-ghost mt-4">
            Each block contains the hash of the previous block. Change one, break all.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

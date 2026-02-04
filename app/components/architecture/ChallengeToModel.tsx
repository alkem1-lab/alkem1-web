"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export function ChallengeToModel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-14 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl bg-surface-1/50 border border-border-subtle"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[10px] font-mono text-phosphor uppercase tracking-widest">
              End-to-end lifecycle
            </span>
          </div>
          <h3
            className="text-xl font-display text-text-bright mb-4 text-center"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            From challenge to model
          </h3>
          <p className="text-sm text-text-body text-center max-w-3xl mx-auto mb-6 leading-relaxed">
            User → SPICE (Challenger → Hydra → Judge Dredd → Sniper) → Memory → Factory → Arena → Forge → back to SPICE.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm bg-phosphor/20 text-phosphor border border-phosphor/40 hover:bg-phosphor/30 transition-colors"
            >
              SPICE internals
            </Link>
            <Link
              href="/home#data-flywheel"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm bg-surface-2 text-text-body hover:bg-surface-3 border border-border-subtle transition-colors"
            >
              Data Flywheel (Home)
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export function AboutHeader() {
  return (
    <section className="relative pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neural-2/10 border border-neural-2/30 mb-8">
            <div className="w-2 h-2 rounded-full bg-neural-2 animate-pulse" />
            <span className="text-xs font-mono text-neural-2 uppercase tracking-wider">
              Human Model
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-6"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Soul. Mind. Immune System.
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            A director-level mental model for what ALKEM1 actually is:
            <br />
            <span className="text-neural-2">purpose, intelligence, and containment</span>
            —working as one organism.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

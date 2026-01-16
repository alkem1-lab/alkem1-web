"use client";

import { motion } from "framer-motion";

export function ArchitectureHeader() {
  return (
    <section className="relative pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neural-1/10 border border-neural-1/30 mb-8">
            <div className="w-2 h-2 rounded-full bg-neural-1 animate-pulse" />
            <span className="text-xs font-mono text-neural-1 uppercase tracking-wider">
              System Architecture
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-6"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            6 Layers of Defense
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-text-body max-w-2xl mx-auto mb-8">
            From deterministic core to enterprise security.
            <br />
            <span className="text-neural-1">Every layer has a purpose. Every connection is intentional.</span>
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-mono text-phosphor">6</div>
              <div className="text-xs text-text-ghost uppercase tracking-wider">Layers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-neural-1">12</div>
              <div className="text-xs text-text-ghost uppercase tracking-wider">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-crimson">27+</div>
              <div className="text-xs text-text-ghost uppercase tracking-wider">Security Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-ember">47ms</div>
              <div className="text-xs text-text-ghost uppercase tracking-wider">Response</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

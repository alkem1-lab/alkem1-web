"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const comparisons = [
  {
    before: { icon: "🔒", text: "Black Box", detail: "Hidden decisions" },
    after: { icon: "🔓", text: "Glass Box", detail: "Every action auditable" },
  },
  {
    before: { icon: "🤞", text: '"Trust me"', detail: "No proof of behavior" },
    after: { icon: "📜", text: "Q.E.D. Proof", detail: "Mathematical certainty" },
  },
  {
    before: { icon: "⏰", text: "Post-mortem", detail: "Know after damage" },
    after: { icon: "⚡", text: "47ms Response", detail: "Kill before harm" },
  },
];

export function BeforeAfter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="font-display text-3xl md:text-4xl text-text-bright mb-4"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            The Difference
          </h2>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* BEFORE Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-3 left-4 px-3 py-1 bg-crimson/20 border border-crimson/30 rounded-full">
              <span className="text-xs font-mono text-crimson uppercase tracking-wider">
                Traditional AI
              </span>
            </div>
            <div className="p-6 pt-8 rounded-lg border border-crimson/20 bg-crimson/5">
              <div className="space-y-4">
                {comparisons.map((item, i) => (
                  <motion.div
                    key={`before-${i}`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-md bg-surface-1/50"
                  >
                    <span className="text-2xl opacity-50">{item.before.icon}</span>
                    <div>
                      <div className="font-mono text-text-ghost text-sm line-through decoration-crimson/50">
                        {item.before.text}
                      </div>
                      <div className="text-xs text-text-ghost/60">
                        {item.before.detail}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AFTER Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -top-3 left-4 px-3 py-1 bg-phosphor/20 border border-phosphor/30 rounded-full">
              <span className="text-xs font-mono text-phosphor uppercase tracking-wider">
                ALKEM1
              </span>
            </div>
            <div className="p-6 pt-8 rounded-lg border border-phosphor/30 bg-phosphor/5">
              <div className="space-y-4">
                {comparisons.map((item, i) => (
                  <motion.div
                    key={`after-${i}`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-md bg-surface-1/50 border border-phosphor/10"
                  >
                    <span className="text-2xl">{item.after.icon}</span>
                    <div>
                      <div className="font-mono text-phosphor text-sm font-medium">
                        {item.after.text}
                      </div>
                      <div className="text-xs text-text-body">
                        {item.after.detail}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-text-ghost text-sm font-mono">
            From{" "}
            <span className="text-crimson">"hope nothing breaks"</span>
            {" "}to{" "}
            <span className="text-phosphor">"prove everything works"</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

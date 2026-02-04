"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const practicePoints = [
  {
    icon: "🧠",
    title: "When the Mind fails,",
    description: "the Immune System contains damage.",
    color: "text-crimson",
  },
  {
    icon: "📜",
    title: "Every critical action",
    description: "is recorded as verifiable evidence.",
    color: "text-phosphor",
  },
  {
    icon: "✓",
    title: "You can demonstrate control,",
    description: "not claim it.",
    color: "text-neural-2",
  },
];

export function AboutPractice() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 px-6 pb-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className="text-2xl font-display text-text-bright mb-2"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              What this means in practice
            </h2>
            <p className="text-sm text-text-ghost">
              For the director who needs to explain it to the board
            </p>
          </div>

          {/* Practice points */}
          <div className="p-8 rounded-xl bg-surface-1/50 border border-border-subtle">
            <ul className="space-y-6">
              {practicePoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-2xl flex-shrink-0">{point.icon}</span>
                  <div>
                    <span className="text-text-body">{point.title}</span>{" "}
                    <span className={point.color}>{point.description}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <blockquote
              className="text-xl font-display text-text-bright italic"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              &ldquo;One organism. Three organs. Zero blind spots.&rdquo;
            </blockquote>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link
              href="/proof"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-phosphor text-void hover:bg-phosphor-dim transition-colors font-mono text-sm"
            >
              See the Proof
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-2 border border-border-subtle text-text-body hover:text-phosphor hover:border-phosphor/30 transition-colors font-mono text-sm"
            >
              Explore Architecture
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

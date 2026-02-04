"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const workflows = [
  {
    step: "01",
    title: "Intake → Answer → Proof",
    color: "phosphor",
    items: [
      "Upload document / case / policy",
      "System answers with sources + risk score",
      "Proof link generated (ledger entry + certificate)",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Review → Approve → Ship",
    color: "neural-2",
    items: [
      "Human review for high-risk outputs",
      "JIT approval for privileged actions",
      "Export to PDF / case system / API",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Learn → Harden → Repeat",
    color: "crimson",
    items: [
      "Joker generates attacks + edge cases",
      "Gatekeeper rules tighten automatically",
      "Regression tests lock the fix forever",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];

const getColorClasses = (color: string) => {
  const map: Record<string, { text: string; border: string; bg: string; glow: string }> = {
    phosphor: {
      text: "text-phosphor",
      border: "border-phosphor/30",
      bg: "bg-phosphor/5",
      glow: "shadow-phosphor/20",
    },
    "neural-2": {
      text: "text-neural-2",
      border: "border-neural-2/30",
      bg: "bg-neural-2/5",
      glow: "shadow-neural-2/20",
    },
    crimson: {
      text: "text-crimson",
      border: "border-crimson/30",
      bg: "bg-crimson/5",
      glow: "shadow-crimson/20",
    },
  };
  return map[color] || map.phosphor;
};

export function Workflow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-1/30 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-text-ghost/30" />
            <span className="text-xs font-mono text-text-ghost uppercase tracking-widest">
              Daily Operations
            </span>
            <div className="h-[1px] w-12 bg-text-ghost/30" />
          </div>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-text-bright mb-4"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            How teams use ALKEM1 every day
          </h2>
          <p className="text-text-body max-w-2xl mx-auto">
            From intake to proof, with guardrails and audit built in.
          </p>
        </motion.div>

        {/* Workflow cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {workflows.map((workflow, index) => {
            const colors = getColorClasses(workflow.color);
            return (
              <motion.div
                key={workflow.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`
                  relative p-6 rounded-xl border ${colors.border} ${colors.bg}
                  hover:shadow-lg hover:${colors.glow} transition-all duration-300
                `}
              >
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-sm ${colors.text} opacity-60`}>
                    STEP {workflow.step}
                  </span>
                  <div className={colors.text}>{workflow.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-display text-text-bright mb-4">
                  {workflow.title}
                </h3>

                {/* Items */}
                <ul className="space-y-3">
                  {workflow.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-body">
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.text} bg-current mt-1.5 flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Connection line to next card (desktop only) */}
                {index < workflows.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-gradient-to-r from-border-subtle to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/solutions/legal"
            className="inline-flex items-center gap-2 text-phosphor hover:text-phosphor-dim transition-colors group"
          >
            <span>See workflows in action</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

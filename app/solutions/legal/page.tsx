"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Case Workspace Output",
    items: [
      "Structured memo, not chat",
      "Sources attached to every claim",
      "Risk flags (hallucination, missing citation)",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Citation & Consistency Validation",
    items: [
      "Detect missing / weak citations",
      "Highlight contradictions across sources",
      'Enforce "no-source, no-claim" policy',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Evidence Chain for Compliance",
    items: [
      "Ledger entry for each output",
      "Verification on demand",
      "Exportable proof pack (PDF)",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const workflow = [
  { step: "Upload", desc: "Contracts, case law, statutes" },
  { step: "Ask", desc: '"Summarize + arguments + counterarguments"' },
  { step: "Review", desc: "Flagged sections highlighted" },
  { step: "Export", desc: "Memo + sources + proof" },
];

export default function LegalSolutionPage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-phosphor/20 bg-surface-1/50 mb-6">
              <span className="text-xl">⚖️</span>
              <span className="text-xs font-mono text-phosphor uppercase tracking-wider">
                Legal Solutions
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-display text-text-bright mb-6"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Court-ready AI assistance
              <br />
              <span className="text-phosphor">—with proof.</span>
            </h1>

            <p className="text-lg text-text-body max-w-2xl mx-auto mb-8">
              Every claim can be traced. Every answer is auditable.
              Every critical action is sealed in an immutable ledger.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/proof"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-phosphor text-void font-mono text-sm rounded-lg hover:bg-phosphor-dim transition-colors"
              >
                Request Legal Audit Demo
              </Link>
              <Link
                href="/proof"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-phosphor/30 text-phosphor font-mono text-sm rounded-lg hover:bg-phosphor/5 transition-colors"
              >
                See Proof (Q.E.D.) →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What it does */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              What it does
            </h2>
            <p className="text-text-ghost">
              Three pillars of legal AI that you can actually trust.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border-subtle bg-surface-1/30 hover:border-phosphor/30 transition-colors"
              >
                <div className="text-phosphor mb-4">{feature.icon}</div>
                <h3 className="text-lg font-display text-text-bright mb-4">
                  {feature.title}
                </h3>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-phosphor mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Day-to-day workflow */}
      <section className="py-16 px-6 bg-surface-1/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              Day-to-day workflow
            </h2>
            <p className="text-text-ghost">
              Four steps from question to court-ready output.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {workflow.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-4 rounded-lg border border-border-subtle bg-surface-1/50 text-center"
              >
                <div className="text-xs font-mono text-phosphor mb-2">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-text-bright mb-1">
                  {item.step}
                </div>
                <div className="text-xs text-text-ghost">{item.desc}</div>

                {/* Arrow to next */}
                {index < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 text-text-ghost">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom statement */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <blockquote
              className="text-3xl md:text-4xl font-display text-text-bright mb-8"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Not &ldquo;trust me.&rdquo;
              <br />
              <span className="text-phosphor">&ldquo;Show me.&rdquo;</span>
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/playground"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-subtle text-text-body font-mono text-sm rounded-lg hover:border-phosphor/30 hover:text-phosphor transition-colors"
              >
                Try Interactive Demo →
              </Link>
              <Link
                href="/proof-pack"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-subtle text-text-body font-mono text-sm rounded-lg hover:border-phosphor/30 hover:text-phosphor transition-colors"
              >
                Download Proof Pack (PDF)
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

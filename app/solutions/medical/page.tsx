"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Evidence-backed suggestions",
    desc: "Sources required for every recommendation. No unsupported claims.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Safety gates for high-risk outputs",
    desc: "Automatic flags for critical decisions. Human review required.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: "Audit trail for compliance workflows",
    desc: "Every interaction logged. Ready for regulatory review.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

export default function MedicalSolutionPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-crimson/20 bg-surface-1/50 mb-6">
              <span className="text-xl">🏥</span>
              <span className="text-xs font-mono text-crimson uppercase tracking-wider">
                Medical Solutions
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-display text-text-bright mb-6"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Clinical decision support
              <br />
              <span className="text-crimson">—with safety gates.</span>
            </h1>

            <p className="text-lg text-text-body max-w-2xl mx-auto mb-8">
              Designed for guidelines, protocols, and auditability.
              Not a diagnostic tool.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border-subtle bg-surface-1/30"
              >
                <div className="text-crimson mb-4">{feature.icon}</div>
                <h3 className="text-lg font-display text-text-bright mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-ghost">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl border-2 border-crimson/30 bg-crimson/5 text-center"
          >
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-display text-text-bright mb-4">
              Important Notice
            </h3>
            <p className="text-text-body">
              <strong>Decision support only.</strong> Final judgment remains with clinicians.
              ALKEM1 provides evidence-backed suggestions and audit trails, but does not
              replace professional medical judgment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What makes it different */}
      <section className="py-16 px-6 bg-surface-1/20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display text-text-bright text-center mb-8">
              Why ALKEM1 for healthcare?
            </h2>

            <div className="space-y-4">
              {[
                "Every suggestion includes source citations from approved guidelines",
                "High-risk outputs automatically flagged for human review",
                "Complete audit trail for regulatory compliance",
                "No data leaves your environment (local deployment available)",
                "Kill switch halts system in <50ms if anomalies detected",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-surface-1/50 border border-border-subtle"
                >
                  <span className="text-phosphor mt-0.5">✓</span>
                  <span className="text-text-body">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-6">
              Interested in a healthcare pilot?
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/proof"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-crimson text-white font-mono text-sm rounded-lg hover:bg-crimson/80 transition-colors"
              >
                See Evidence Chain →
              </Link>
              <Link
                href="/solutions/private"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-subtle text-text-body font-mono text-sm rounded-lg hover:border-crimson/30 hover:text-crimson transition-colors"
              >
                Private Deployment Options
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

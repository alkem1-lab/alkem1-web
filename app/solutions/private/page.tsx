"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    icon: "🔒",
    title: "Local inference",
    desc: "Air-gapped capable. No internet required.",
  },
  {
    icon: "💾",
    title: "Local vector store",
    desc: "Encrypted at rest. Your data stays yours.",
  },
  {
    icon: "🛡️",
    title: "Zero-trust posture",
    desc: "mTLS/JIT for all internal services.",
  },
];

const deploymentModes = [
  {
    mode: "Local-Only",
    subtitle: "Air-Gapped",
    dataLeaves: "None",
    color: "phosphor",
  },
  {
    mode: "Hybrid",
    subtitle: "Local + optional cloud",
    dataLeaves: "Optional (you decide)",
    color: "neural-2",
  },
  {
    mode: "Enterprise VPC",
    subtitle: "Customer-owned infra",
    dataLeaves: "Customer-controlled",
    color: "ember",
  },
];

export default function PrivateSolutionPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neural-2/20 bg-surface-1/50 mb-6">
              <span className="text-xl">🔒</span>
              <span className="text-xs font-mono text-neural-2 uppercase tracking-wider">
                Private AI
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-display text-text-bright mb-6"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Private AI.
              <br />
              <span className="text-neural-2">Your data never leaves your environment.</span>
            </h1>

            <p className="text-lg text-text-body max-w-2xl mx-auto mb-8">
              Offline-first. Local models. Full control over storage, retrieval, and logs.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface-1/30 text-sm"
                >
                  <span>{f.icon}</span>
                  <span className="text-text-body">{f.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deployment Modes */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              Deployment Modes
            </h2>
            <p className="text-text-ghost">
              Choose your level of isolation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deploymentModes.map((mode, index) => (
              <motion.div
                key={mode.mode}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border bg-surface-1/30 text-center
                  ${mode.color === "phosphor" ? "border-phosphor/30" :
                    mode.color === "neural-2" ? "border-neural-2/30" : "border-ember/30"}`}
              >
                <h3 className={`text-xl font-display mb-1
                  ${mode.color === "phosphor" ? "text-phosphor" :
                    mode.color === "neural-2" ? "text-neural-2" : "text-ember"}`}>
                  {mode.mode}
                </h3>
                <p className="text-sm text-text-ghost mb-4">{mode.subtitle}</p>
                <div className="text-xs font-mono text-text-body">
                  Data leaves: <span className="text-text-bright">{mode.dataLeaves}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What data leaves? */}
      <section className="py-16 px-6 bg-surface-1/20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display text-text-bright text-center mb-8">
              What data leaves?
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left py-3 px-4 text-text-ghost font-mono">Component</th>
                    <th className="text-left py-3 px-4 text-text-ghost font-mono">Local-Only</th>
                    <th className="text-left py-3 px-4 text-text-ghost font-mono">Hybrid</th>
                    <th className="text-left py-3 px-4 text-text-ghost font-mono">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-subtle/50">
                    <td className="py-3 px-4 text-text-body">Inference</td>
                    <td className="py-3 px-4 text-phosphor">Local ✓</td>
                    <td className="py-3 px-4 text-neural-2">Optional</td>
                    <td className="py-3 px-4 text-ember">VPC</td>
                  </tr>
                  <tr className="border-b border-border-subtle/50">
                    <td className="py-3 px-4 text-text-body">Vector DB</td>
                    <td className="py-3 px-4 text-phosphor">Local ✓</td>
                    <td className="py-3 px-4 text-phosphor">Local ✓</td>
                    <td className="py-3 px-4 text-ember">VPC</td>
                  </tr>
                  <tr className="border-b border-border-subtle/50">
                    <td className="py-3 px-4 text-text-body">Evidence Ledger</td>
                    <td className="py-3 px-4 text-phosphor">Local ✓</td>
                    <td className="py-3 px-4 text-phosphor">Local ✓</td>
                    <td className="py-3 px-4 text-ember">VPC</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text-body">Telemetry</td>
                    <td className="py-3 px-4 text-phosphor">None</td>
                    <td className="py-3 px-4 text-neural-2">Opt-in</td>
                    <td className="py-3 px-4 text-ember">Customer</td>
                  </tr>
                </tbody>
              </table>
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
              Ready to deploy on your terms?
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/architecture"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neural-2 text-void font-mono text-sm rounded-lg hover:bg-neural-1 transition-colors"
              >
                See Architecture →
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-subtle text-text-body font-mono text-sm rounded-lg hover:border-neural-2/30 hover:text-neural-2 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

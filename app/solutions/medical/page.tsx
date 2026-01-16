"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { DemoBar } from "@/components/demo";
import { DemoScenario } from "@/lib/demo/scenarios";

// ==========================================
// Clinical Workflows
// ==========================================
const clinicalWorkflows = [
  {
    id: "triage",
    title: "Triage & Escalation",
    subtitle: "When to escalate + guideline citations",
    inputs: ["Symptoms", "Vitals", "Risk factors"],
    outputs: [
      "Escalation recommendation with citations",
      "Risk stratification summary",
      "Questions for clinician",
    ],
    gate: "High-risk → human review required",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "protocol",
    title: "Protocol Assistant",
    subtitle: "ED/ICU/Wards: step-by-step with sources",
    inputs: ["Protocol name", "Patient context"],
    outputs: [
      "Step-by-step checklist",
      "Contraindications + warnings",
      "Source citations per step",
    ],
    gate: "Contraindication detected → alert + block",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "documentation",
    title: "Documentation & Audit Memo",
    subtitle: "Structured note for records",
    inputs: ["Case summary", "Decisions made"],
    outputs: [
      "Structured note: suggestion + rationale",
      "Citations + reviewer field",
      "Export: PDF / EMR note",
    ],
    gate: "Missing citation → UNVERIFIED flag",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

// ==========================================
// Safety Gate Policies
// ==========================================
const safetyGatePolicies = [
  {
    id: "no-source",
    rule: "No-source, no-claim",
    desc: "Without citation from approved guideline, recommendation is blocked or flagged UNVERIFIED.",
    level: "enforced",
  },
  {
    id: "high-risk-review",
    rule: "High-risk requires review",
    desc: "Categories: anticoagulants, sepsis, pediatrics, surgical decisions → human review mandatory.",
    level: "enforced",
  },
  {
    id: "jurisdiction-lock",
    rule: "Jurisdiction/hospital policy lock",
    desc: "Only guidelines approved by your institution are used. No external overrides.",
    level: "configurable",
  },
  {
    id: "kill-switch",
    rule: "Kill Switch on anomalies",
    desc: "Unusual output spikes, injection patterns, or system drift → automatic halt in <50ms.",
    level: "enforced",
  },
];

// ==========================================
// Deployment Modes
// ==========================================
const deploymentModes = [
  {
    id: "on-prem",
    title: "On-prem / Air-gapped",
    desc: "Full stack on your infrastructure. Zero external calls. Local models + local vector search.",
    badge: "Maximum privacy",
  },
  {
    id: "private-vpc",
    title: "Private VPC",
    desc: "Deployed in your cloud tenant. Data never leaves your perimeter. RBAC integrated.",
    badge: "Cloud-native",
  },
  {
    id: "hybrid",
    title: "Hybrid",
    desc: "Sensitive data stays local, non-PHI workloads in managed cloud. Best of both.",
    badge: "Flexible",
  },
];

// ==========================================
// Compliance Controls
// ==========================================
const complianceControls = [
  { id: "rbac", label: "Access control (RBAC/JIT)", desc: "Role-based access + just-in-time elevation for sensitive ops" },
  { id: "logs", label: "Tamper-evident logs", desc: "Evidence chain with cryptographic integrity verification" },
  { id: "retention", label: "Retention policy", desc: "Configurable retention periods, automatic archival" },
  { id: "redaction", label: "PHI redaction (default)", desc: "Personal health information redacted in logs by default" },
];

export default function MedicalSolutionPage() {
  const [activeWorkflow, setActiveWorkflow] = useState("triage");
  const currentWorkflow = clinicalWorkflows.find((w) => w.id === activeWorkflow)!;

  // Demo mode handlers
  const handleLoadScenario = (scenario: DemoScenario) => {
    console.log("[Medical Demo] Loading:", scenario.id);
  };

  const handleRunWorkflow = (scenario: DemoScenario) => {
    console.log("[Medical Demo] Running:", scenario.workflow);
  };

  return (
    <div className="min-h-screen bg-void">
      {/* Demo Bar */}
      <DemoBar
        vertical="medical"
        onLoadScenario={handleLoadScenario}
        onRunWorkflow={handleRunWorkflow}
      />

      {/* ==================== HERO ==================== */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-crimson/20 bg-surface-1/50 mb-6">
              <span className="text-xs font-mono text-crimson uppercase tracking-wider">
                Clinical Decision Support
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-display text-text-bright mb-6"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Guideline-bound clinical
              <br />
              <span className="text-crimson">decision support.</span>
            </h1>

            <p className="text-lg text-text-body max-w-3xl mx-auto mb-4">
              Built for protocols, citations, and audit trails — deployable on-prem.
            </p>

            <p className="text-sm text-text-ghost max-w-2xl mx-auto mb-8">
              Not &quot;AI doctor.&quot; A <strong className="text-text-body">guideline engine</strong> that helps
              clinicians find evidence, follow protocols, and document decisions with proof.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#pilot"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-crimson text-white font-mono text-sm rounded-lg hover:bg-crimson/80 transition-colors"
              >
                Book a 30-day Pilot →
              </Link>
              <Link
                href="/proof"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border-subtle text-text-body font-mono text-sm rounded-lg hover:border-crimson/30 hover:text-crimson transition-colors"
              >
                See Evidence Chain
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== DAY-ONE WORKFLOWS ==================== */}
      <section className="py-16 px-6 bg-surface-1/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              Where ALKEM1 helps on day one
            </h2>
            <p className="text-text-ghost">
              Three concrete clinical workflows. No magic — just structured, evidence-backed support.
            </p>
          </motion.div>

          {/* Workflow Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {clinicalWorkflows.map((w) => (
              <button
                key={w.id}
                onClick={() => setActiveWorkflow(w.id)}
                className={`
                  px-4 py-2 text-sm font-mono rounded-lg border transition-all
                  ${activeWorkflow === w.id
                    ? "border-crimson bg-crimson/10 text-crimson"
                    : "border-border-subtle text-text-ghost hover:border-text-ghost/30"
                  }
                `}
              >
                {w.title}
              </button>
            ))}
          </div>

          {/* Workflow Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWorkflow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8 rounded-2xl border border-crimson/30 bg-surface-1/50"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Icon + Title */}
                <div className="md:w-1/3">
                  <div className="text-crimson mb-4">{currentWorkflow.icon}</div>
                  <h3 className="text-2xl font-display text-text-bright mb-2">
                    {currentWorkflow.title}
                  </h3>
                  <p className="text-text-ghost text-sm">{currentWorkflow.subtitle}</p>
                </div>

                {/* Right: Inputs, Outputs, Gate */}
                <div className="md:w-2/3 space-y-6">
                  {/* Inputs */}
                  <div>
                    <span className="text-xs font-mono text-text-ghost uppercase tracking-wider">
                      Inputs
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentWorkflow.inputs.map((input) => (
                        <span
                          key={input}
                          className="px-3 py-1 bg-surface-2 text-text-body text-sm rounded-full"
                        >
                          {input}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outputs */}
                  <div>
                    <span className="text-xs font-mono text-text-ghost uppercase tracking-wider">
                      Outputs
                    </span>
                    <ul className="mt-2 space-y-2">
                      {currentWorkflow.outputs.map((output, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-body">
                          <span className="text-phosphor">•</span>
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Safety Gate */}
                  <div className="p-4 bg-crimson/5 border border-crimson/20 rounded-lg">
                    <span className="text-xs font-mono text-crimson uppercase tracking-wider">
                      Safety Gate
                    </span>
                    <p className="text-text-body mt-1">{currentWorkflow.gate}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ==================== SAFETY GATE POLICY ==================== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              Safety Gate Policy <span className="text-text-ghost">(default)</span>
            </h2>
            <p className="text-text-ghost">
              Hard rules, not slogans. Configurable by hospital policy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyGatePolicies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border-subtle bg-surface-1/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-display text-text-bright">{policy.rule}</h3>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded ${
                      policy.level === "enforced"
                        ? "bg-crimson/20 text-crimson"
                        : "bg-amber-400/20 text-amber-400"
                    }`}
                  >
                    {policy.level}
                  </span>
                </div>
                <p className="text-sm text-text-ghost">{policy.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRIVACY & DEPLOYMENT ==================== */}
      <section className="py-16 px-6 bg-surface-1/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              Privacy & Deployment
            </h2>
            <p className="text-text-ghost">
              We can run fully offline with local models and local vector search.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deploymentModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border-subtle bg-surface-1/50 text-center"
              >
                <span className="inline-block px-2 py-1 text-[10px] font-mono uppercase bg-neural-2/20 text-neural-2 rounded mb-4">
                  {mode.badge}
                </span>
                <h3 className="text-lg font-display text-text-bright mb-2">{mode.title}</h3>
                <p className="text-sm text-text-ghost">{mode.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AUDIT-READY CONTROLS ==================== */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              Audit-ready controls
            </h2>
            <p className="text-text-ghost">
              Built for regulatory review.
            </p>
          </motion.div>

          <div className="space-y-3">
            {complianceControls.map((control) => (
              <motion.div
                key={control.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 rounded-lg bg-surface-1/50 border border-border-subtle"
              >
                <span className="text-phosphor mt-0.5">✓</span>
                <div>
                  <span className="text-text-bright font-medium">{control.label}</span>
                  <p className="text-sm text-text-ghost mt-1">{control.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DISCLAIMER ==================== */}
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
              <strong>Decision support only.</strong> Clinicians remain the final authority.
              ALKEM1 provides guideline-backed suggestions and audit trails, but does not
              replace professional medical judgment or diagnostic authority.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA: PILOT ==================== */}
      <section id="pilot" className="py-20 px-6 bg-surface-1/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              Book a 30-day Pilot
            </h2>
            <p className="text-text-body mb-8 max-w-xl mx-auto">
              We deploy, ingest your approved guidelines, and run 3 workflows with audit enabled.
              See results in your environment before committing.
            </p>

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

            <p className="mt-6 text-xs text-text-ghost">
              Download:{" "}
              <Link href="/proof-pack" className="text-crimson hover:underline">
                Clinical Safety Brief (PDF)
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER LINE ==================== */}
      <section className="py-8 px-6 border-t border-border-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-text-ghost">
            Decision support only. Final clinical judgment remains with licensed clinicians.
          </p>
        </div>
      </section>
    </div>
  );
}

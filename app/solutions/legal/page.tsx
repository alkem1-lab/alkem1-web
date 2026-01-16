"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Legal Hydra Roles
type RoleId = "detective" | "advocate" | "opposition" | "judge" | "clerk";

interface Role {
  id: RoleId;
  name: string;
  title: string;
  color: string;
  output: string;
  details: string[];
  icon: React.ReactNode;
}

const roles: Role[] = [
  {
    id: "detective",
    name: "Detective",
    title: "Investigator",
    color: "cyan",
    output: "Facts timeline + missing facts + questions list",
    details: [
      "Extracts chronological facts from documents",
      "Identifies gaps and missing information",
      "Generates clarifying questions",
      "Links facts to source documents",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: "advocate",
    name: "Advocate",
    title: "Your Lawyer",
    color: "phosphor",
    output: "Arguments + legal basis + citations",
    details: [
      "Builds your strongest arguments",
      "Cites relevant precedents and statutes",
      "Structures reasoning for maximum impact",
      "Every claim anchored to source",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    id: "opposition",
    name: "Opposition",
    title: "Devil's Advocate",
    color: "crimson",
    output: "Counterarguments + holes + attack vectors",
    details: [
      "Finds weaknesses in your position",
      "Anticipates opposing counsel's attacks",
      "Identifies logical gaps",
      "Stress-tests every argument",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    id: "judge",
    name: "Judge",
    title: "Verifier",
    color: "neural-2",
    output: "Citation validation + contradictions + no-source-no-claim",
    details: [
      "Validates every citation exists",
      "Detects logical contradictions",
      "Enforces 'no source = no claim' policy",
      "Flags unsupported statements",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "clerk",
    name: "Evidence Officer",
    title: "Compliance Clerk",
    color: "amber",
    output: "Proof link + Q.E.D. cert + chain-of-custody",
    details: [
      "Seals work product in evidence ledger",
      "Generates Q.E.D. certificate",
      "Creates shareable proof pack",
      "Maintains chain of custody",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

// Workspace Tabs
const workspaceTabs = [
  { id: "facts", label: "Facts", role: "detective" },
  { id: "issues", label: "Issues", role: null },
  { id: "law", label: "Law & Sources", role: null },
  { id: "arguments", label: "Arguments", role: "advocate" },
  { id: "counter", label: "Counter", role: "opposition" },
  { id: "proof", label: "Proof", role: "clerk" },
];

const colorClasses: Record<string, { text: string; bg: string; border: string }> = {
  cyan: { text: "text-cyan-400", bg: "bg-cyan-400", border: "border-cyan-400" },
  phosphor: { text: "text-phosphor", bg: "bg-phosphor", border: "border-phosphor" },
  crimson: { text: "text-crimson", bg: "bg-crimson", border: "border-crimson" },
  "neural-2": { text: "text-neural-2", bg: "bg-neural-2", border: "border-neural-2" },
  amber: { text: "text-amber-400", bg: "bg-amber-400", border: "border-amber-400" },
};

export default function LegalSolutionPage() {
  const [activeRole, setActiveRole] = useState<RoleId>("detective");
  const [activeTab, setActiveTab] = useState("facts");

  const currentRole = roles.find((r) => r.id === activeRole)!;
  const colors = colorClasses[currentRole.color];

  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-phosphor/20 bg-surface-1/50 mb-6">
              <span className="text-xs font-mono text-phosphor uppercase tracking-wider">
                Legal Hydra • 5 Roles
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-display text-text-bright mb-6"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              A legal team{" "}
              <span className="text-phosphor">in one system.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-body max-w-3xl mx-auto mb-4">
              Detective finds facts. Lawyer argues. Opponent attacks.
              Judge verifies. Evidence officer seals proof.
            </p>

            <p className="text-sm text-text-ghost max-w-2xl mx-auto mb-8">
              Every role runs through the same verified pipeline: Memory retrieval →
              Gatekeeper policy → SPICE execution → Judge validation → Ledger seal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/solutions/legal/vault"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-phosphor text-void font-mono text-sm rounded-lg hover:bg-phosphor-dim transition-colors"
              >
                Open Legal Vault →
              </Link>
              <Link
                href="/proof"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border-subtle text-text-body font-mono text-sm rounded-lg hover:border-phosphor/30 hover:text-phosphor transition-colors"
              >
                See Proof (Q.E.D.) →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Hydra - 5 Roles */}
      <section className="py-16 px-6 bg-surface-1/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              The Legal Hydra
            </h2>
            <p className="text-text-ghost">
              Five specialized roles. One unified evidence chain.
            </p>
          </motion.div>

          {/* Role Cards - Horizontal on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {roles.map((role, index) => {
              const roleColors = colorClasses[role.color];
              const isActive = activeRole === role.id;

              return (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveRole(role.id)}
                  className={`
                    p-4 rounded-xl border text-center transition-all
                    ${isActive
                      ? `${roleColors.border} bg-surface-1`
                      : "border-border-subtle bg-surface-1/30 hover:border-text-ghost/30"
                    }
                  `}
                >
                  <div className={`${roleColors.text} mb-2 flex justify-center`}>
                    {role.icon}
                  </div>
                  <h3 className={`font-display text-sm ${isActive ? roleColors.text : "text-text-bright"}`}>
                    {role.name}
                  </h3>
                  <span className="text-xs text-text-ghost">{role.title}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Selected Role Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-6 md:p-8 rounded-2xl border ${colors.border}/30 bg-surface-1/50`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className={`${colors.text} flex-shrink-0`}>
                  <div className="w-16 h-16 rounded-xl bg-current/10 flex items-center justify-center">
                    {currentRole.icon}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-2xl font-display ${colors.text}`}>
                      {currentRole.name}
                    </h3>
                    <span className="text-sm text-text-ghost">
                      ({currentRole.title})
                    </span>
                  </div>

                  <div className="mb-4 p-3 bg-surface-2 rounded-lg">
                    <span className="text-xs font-mono text-text-ghost uppercase tracking-wider">
                      Output →
                    </span>
                    <p className="text-text-bright mt-1">{currentRole.output}</p>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentRole.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-body">
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-1.5 flex-shrink-0`} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Case Workspace UI Preview */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              Case Workspace
            </h2>
            <p className="text-text-ghost">
              Your Monday-morning workflow. Everything in one place.
            </p>
          </motion.div>

          {/* Workspace Mock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border-subtle bg-surface-1/30 overflow-hidden"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface-1/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-crimson/50" />
                <div className="w-3 h-3 rounded-full bg-amber-400/50" />
                <div className="w-3 h-3 rounded-full bg-phosphor/50" />
                <span className="ml-2 text-sm text-text-ghost font-mono">
                  Case #2026-0116
                </span>
              </div>

              {/* Role Switch */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-ghost">Role:</span>
                <select
                  value={activeRole}
                  onChange={(e) => setActiveRole(e.target.value as RoleId)}
                  className="px-3 py-1 bg-surface-2 border border-border-subtle rounded text-sm text-text-body"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border-subtle overflow-x-auto">
              {workspaceTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-3 text-sm font-mono whitespace-nowrap transition-colors
                    ${activeTab === tab.id
                      ? "text-phosphor border-b-2 border-phosphor bg-phosphor/5"
                      : "text-text-ghost hover:text-text-body"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="p-6 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {activeTab === "facts" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono">
                        <span>🔍</span> Detective Output
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-surface-2 rounded-lg border-l-2 border-cyan-400">
                          <span className="text-xs text-text-ghost">2024-01-15</span>
                          <p className="text-text-body text-sm">Contract signed between parties A and B</p>
                          <span className="text-xs text-cyan-400">Source: contract_v1.pdf, p.12</span>
                        </div>
                        <div className="p-3 bg-surface-2 rounded-lg border-l-2 border-amber-400">
                          <span className="text-xs text-amber-400">⚠ Missing Info</span>
                          <p className="text-text-body text-sm">Delivery date not specified in contract</p>
                        </div>
                        <div className="p-3 bg-surface-2 rounded-lg border-l-2 border-text-ghost">
                          <span className="text-xs text-text-ghost">Question</span>
                          <p className="text-text-body text-sm">Was there verbal agreement on timeline?</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "arguments" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-phosphor text-sm font-mono">
                        <span>⚖️</span> Advocate Output
                      </div>
                      <div className="p-4 bg-surface-2 rounded-lg">
                        <h4 className="text-text-bright font-medium mb-2">Primary Argument</h4>
                        <p className="text-text-body text-sm mb-3">
                          The contract is void due to lack of material terms (delivery date).
                        </p>
                        <div className="text-xs text-phosphor">
                          Legal basis: Civil Code §234(2) • Cited: 3 precedents
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "counter" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-crimson text-sm font-mono">
                        <span>⚡</span> Opposition Output
                      </div>
                      <div className="p-4 bg-crimson/5 border border-crimson/20 rounded-lg">
                        <h4 className="text-crimson font-medium mb-2">Weak Point Identified</h4>
                        <p className="text-text-body text-sm mb-3">
                          Opposing counsel may argue: "Course of dealing" established implicit timeline.
                        </p>
                        <div className="text-xs text-text-ghost">
                          Recommendation: Prepare evidence of inconsistent past dealings
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "proof" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-amber-400 text-sm font-mono">
                        <span>🛡️</span> Evidence Officer Output
                      </div>
                      <div className="p-4 bg-surface-2 rounded-lg border border-amber-400/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-text-bright font-medium">Q.E.D. Certificate</span>
                          <span className="text-xs text-phosphor">✓ SEALED</span>
                        </div>
                        <div className="font-mono text-xs text-text-ghost space-y-1">
                          <div>Hash: sha256:9f86d081...</div>
                          <div>Timestamp: 2026-01-16T14:32:00Z</div>
                          <div>Ledger Entry: #12,847</div>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded text-amber-400 text-sm">
                          Download Proof Pack (PDF)
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "issues" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-neural-2 text-sm font-mono">
                        <span>📋</span> Legal Issues
                      </div>
                      <p className="text-xs text-text-ghost mb-4">
                        The legal questions that decide the outcome.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-surface-2 rounded-lg">
                          <span className="text-xs text-neural-2 font-mono">Issue #1</span>
                          <p className="text-text-body text-sm mt-1">
                            Is the contract void due to lack of material terms (delivery date)?
                          </p>
                        </div>
                        <div className="p-3 bg-surface-2 rounded-lg">
                          <span className="text-xs text-neural-2 font-mono">Issue #2</span>
                          <p className="text-text-body text-sm mt-1">
                            Does prior course of dealing establish implicit timeline?
                          </p>
                        </div>
                        <div className="p-3 bg-surface-2 rounded-lg">
                          <span className="text-xs text-neural-2 font-mono">Issue #3</span>
                          <p className="text-text-body text-sm mt-1">
                            Is partial performance evidence of acceptance?
                          </p>
                        </div>
                      </div>
                      <button className="mt-4 px-4 py-2 bg-neural-2/10 border border-neural-2/30 rounded text-neural-2 text-sm">
                        + Generate additional issues
                      </button>
                    </div>
                  )}

                  {activeTab === "law" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-phosphor text-sm font-mono">
                        <span>📚</span> Law & Sources
                      </div>
                      <p className="text-xs text-text-ghost mb-4">
                        Pinned statutes, decisions, doctrine — with quality signals.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-surface-2 rounded-lg flex items-start justify-between">
                          <div>
                            <span className="inline-flex px-2 py-0.5 bg-phosphor/20 text-phosphor text-xs rounded mb-1">LAW</span>
                            <p className="text-text-body text-sm">Civil Code §234(2) — Material Terms</p>
                            <span className="text-xs text-text-ghost">RS • Primary source</span>
                          </div>
                          <span className="text-xs text-phosphor">✓ Citeable</span>
                        </div>
                        <div className="p-3 bg-surface-2 rounded-lg flex items-start justify-between">
                          <div>
                            <span className="inline-flex px-2 py-0.5 bg-neural-2/20 text-neural-2 text-xs rounded mb-1">CASE</span>
                            <p className="text-text-body text-sm">Smith v. Jones (2023) — Contract Void</p>
                            <span className="text-xs text-text-ghost">RS • VKS • High relevance</span>
                          </div>
                          <span className="text-xs text-phosphor">✓ Citeable</span>
                        </div>
                        <div className="p-3 bg-surface-2 rounded-lg flex items-start justify-between">
                          <div>
                            <span className="inline-flex px-2 py-0.5 bg-amber-400/20 text-amber-400 text-xs rounded mb-1">DOCTRINE</span>
                            <p className="text-text-body text-sm">Prof. Perović — Commentary on §234</p>
                            <span className="text-xs text-text-ghost">RS • Secondary source</span>
                          </div>
                          <span className="text-xs text-amber-400">⚠ Review</span>
                        </div>
                      </div>
                      <Link
                        href="/solutions/legal/vault"
                        className="inline-flex items-center mt-4 px-4 py-2 bg-phosphor/10 border border-phosphor/30 rounded text-phosphor text-sm hover:bg-phosphor/20 transition-colors"
                      >
                        Search Legal Vault →
                      </Link>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 30-Second Demo Flow */}
      <section className="py-16 px-6 bg-surface-1/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display text-text-bright mb-4">
              30-Second Demo
            </h2>
            <p className="text-text-ghost">
              See the Legal Hydra in action.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "1", action: "Upload", desc: "Contract or case file", color: "text-text-ghost" },
              { step: "2", action: "Detective", desc: "Facts + gaps extracted", color: "text-cyan-400" },
              { step: "3", action: "Advocate", desc: "Arguments + citations", color: "text-phosphor" },
              { step: "4", action: "Opposition", desc: "Weaknesses identified", color: "text-crimson" },
              { step: "5", action: "Proof", desc: "Q.E.D. cert sealed", color: "text-amber-400" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className={`text-3xl font-mono ${item.color} mb-2`}>
                  {item.step}
                </div>
                <div className="text-text-bright font-medium">{item.action}</div>
                <div className="text-xs text-text-ghost">{item.desc}</div>

                {index < 4 && (
                  <div className="hidden md:block absolute top-4 -right-2 text-text-ghost">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <blockquote
              className="text-2xl md:text-3xl font-display text-text-bright mb-8"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Not &ldquo;trust me.&rdquo;
              <br />
              <span className="text-phosphor">&ldquo;Show me the proof.&rdquo;</span>
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/proof"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-phosphor text-void font-mono text-sm rounded-lg hover:bg-phosphor-dim transition-colors"
              >
                See Evidence Chain →
              </Link>
              <Link
                href="/proof-pack"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-subtle text-text-body font-mono text-sm rounded-lg hover:border-phosphor/30 hover:text-phosphor transition-colors"
              >
                Download Proof Pack
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LiveHashDemo, KillSwitchSimulator, EvidenceChainBuilder } from "../../components/interactive";

type DemoTab = "hash" | "killswitch" | "chain";

const tabs: { id: DemoTab; label: string; icon: string; color: string }[] = [
  { id: "hash", label: "Live Hash", icon: "#", color: "phosphor" },
  { id: "killswitch", label: "Kill Switch", icon: "⚡", color: "crimson" },
  { id: "chain", label: "Evidence Chain", icon: "⛓", color: "neural-2" },
];

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<DemoTab>("hash");

  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-phosphor/20 bg-surface-1/50 mb-6"
          >
            <span className="text-2xl">🎮</span>
            <span className="text-sm font-mono text-phosphor uppercase tracking-wider">
              Interactive Playground
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-text-bright mb-6"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Don&apos;t Trust. <span className="text-phosphor">Verify.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-body max-w-2xl mx-auto"
          >
            Experience the core technologies that make ALKEM1 unhackable.
            These aren&apos;t simulations—they&apos;re the actual algorithms we use.
          </motion.p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-2 p-2 bg-surface-1/50 rounded-xl border border-border-subtle">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all
                  ${activeTab === tab.id
                    ? `bg-${tab.color}/10 text-${tab.color} border border-${tab.color}/30`
                    : "text-text-ghost hover:text-text-body hover:bg-surface-2"
                  }
                `}
                style={activeTab === tab.id ? {
                  backgroundColor: tab.color === "phosphor" ? "rgba(110, 231, 183, 0.1)" :
                                   tab.color === "crimson" ? "rgba(239, 68, 68, 0.1)" :
                                   "rgba(167, 139, 250, 0.1)",
                  color: tab.color === "phosphor" ? "#6ee7b7" :
                         tab.color === "crimson" ? "#ef4444" :
                         "#a78bfa",
                  borderColor: tab.color === "phosphor" ? "rgba(110, 231, 183, 0.3)" :
                               tab.color === "crimson" ? "rgba(239, 68, 68, 0.3)" :
                               "rgba(167, 139, 250, 0.3)",
                } : {}}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="px-6 pb-24">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "hash" && <LiveHashDemo />}
          {activeTab === "killswitch" && <KillSwitchSimulator />}
          {activeTab === "chain" && <EvidenceChainBuilder />}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-8 rounded-2xl border border-border-subtle bg-surface-1/30">
            <h3 className="text-xl font-display text-text-bright mb-4">
              Ready to see this in production?
            </h3>
            <p className="text-text-ghost text-sm mb-6">
              These demos use the same cryptographic primitives as our production system.
              The only difference? Scale and integration.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-phosphor/10 border border-phosphor/30 rounded-lg
                         text-phosphor font-mono text-sm hover:bg-phosphor/20 transition-colors"
            >
              ← Back to Main Site
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

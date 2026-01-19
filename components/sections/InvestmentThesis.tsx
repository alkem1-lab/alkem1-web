"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const thesisPoints = [
  {
    id: "moat",
    icon: "🏰",
    title: "Defensible Moat",
    tagline: "Not a GPT wrapper",
    color: "#a78bfa",
    highlights: [
      {
        stat: "5",
        label: "Layer Stack",
        detail: "SPICE → Memory → Arena → Factory → Forge",
      },
      {
        stat: "∞",
        label: "Self-Improving",
        detail: "Every cycle creates compounding advantage",
      },
      {
        stat: "0",
        label: "Black Box",
        detail: "Full transparency with cryptographic proofs",
      },
    ],
    description: `Most AI startups wrap existing models. We built the infrastructure layer - 
      a self-improving system that gets better autonomously. The longer it runs, 
      the harder to catch up.`,
  },
  {
    id: "market",
    icon: "📈",
    title: "Market Timing",
    tagline: "Regulation creates opportunity",
    color: "#6ee7b7",
    highlights: [
      {
        stat: "EU",
        label: "AI Act",
        detail: "Mandatory audit trails by 2026",
      },
      {
        stat: "$50B",
        label: "Enterprise AI",
        detail: "Market size by 2027",
      },
      {
        stat: "92%",
        label: "Concerned",
        detail: "Enterprises worried about AI control",
      },
    ],
    description: `The EU AI Act requires audit trails, kill switches, and explainability. 
      We're compliance-native. Others will spend years retrofitting. 
      We're already there.`,
  },
  {
    id: "team",
    icon: "⚡",
    title: "Execution Speed",
    tagline: "Battle-tested infrastructure",
    color: "#f97316",
    highlights: [
      {
        stat: "47ms",
        label: "Kill Switch",
        detail: "Sub-100ms emergency response",
      },
      {
        stat: "52",
        label: "Sessions",
        detail: "Continuous development iterations",
      },
      {
        stat: "100%",
        label: "Test Coverage",
        detail: "Playwright E2E, Unit, Integration",
      },
    ],
    description: `Real production infrastructure, not a prototype. 
      CI/CD pipelines, branch protection, smoke tests. 
      Enterprise-grade from day one.`,
  },
];

const comparisons = [
  { us: "Self-improving", them: "Static models", icon: "🔄" },
  { us: "Verifiable proofs", them: "Trust us", icon: "📜" },
  { us: "Sub-100ms kill switch", them: "Manual shutdown", icon: "⏱️" },
  { us: "Compliance-native", them: "Retrofitting", icon: "✅" },
  { us: "Watchdog + DEFCON", them: "Silent degradation", icon: "🐕" },
  { us: "76.5% Determinism", them: "Non-reproducible", icon: "🎯" },
];

export function InvestmentThesis() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePoint, setActivePoint] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-phosphor/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-neural-2/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-ember/50" />
              <span className="text-xs font-mono text-ember uppercase tracking-widest">
                For Investors
              </span>
              <div className="h-[1px] w-12 bg-ember/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Investment Thesis
            </h2>
            <p className="text-text-body max-w-2xl mx-auto text-lg">
              Why this. Why now. Why us.
            </p>
          </motion.div>

          {/* Main thesis cards */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20"
            variants={containerVariants}
          >
            {thesisPoints.map((point, index) => {
              const isActive = activePoint === point.id;
              
              return (
                <motion.div
                  key={point.id}
                  className={`
                    relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer
                    ${isActive 
                      ? "bg-surface-1 border-phosphor/50" 
                      : "bg-surface-1/50 border-border-subtle hover:border-phosphor/30"
                    }
                  `}
                  variants={itemVariants}
                  onMouseEnter={() => setActivePoint(point.id)}
                  onMouseLeave={() => setActivePoint(null)}
                  whileHover={{ y: -4 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0"
                    style={{
                      background: `radial-gradient(circle at center, ${point.color}20 0%, transparent 70%)`,
                    }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                  />

                  <div className="relative">
                    {/* Icon and title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${point.color}20` }}
                      >
                        {point.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-bright">
                          {point.title}
                        </h3>
                        <span 
                          className="text-sm"
                          style={{ color: point.color }}
                        >
                          {point.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {point.highlights.map((h, i) => (
                        <motion.div
                          key={i}
                          className="text-center p-3 rounded-lg bg-surface-2/50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isActive ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div 
                            className="text-xl font-bold"
                            style={{ color: point.color }}
                          >
                            {h.stat}
                          </div>
                          <div className="text-xs text-text-ghost mt-1">
                            {h.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-text-body text-sm leading-relaxed">
                      {point.description}
                    </p>

                    {/* Bottom indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                      style={{ backgroundColor: point.color }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Comparison table */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text-bright mb-2">
                ALKEM1 vs. Traditional AI
              </h3>
              <p className="text-text-ghost">
                What sets us apart from the competition
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-border-subtle">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-1">
                    <th className="p-4 text-left text-text-ghost text-sm font-medium">
                      Capability
                    </th>
                    <th className="p-4 text-center text-phosphor text-sm font-medium">
                      ALKEM1
                    </th>
                    <th className="p-4 text-center text-text-ghost text-sm font-medium">
                      Others
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <motion.tr
                      key={index}
                      className="border-t border-border-subtle hover:bg-surface-1/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <td className="p-4 text-text-body">
                        <span className="mr-3">{row.icon}</span>
                        {row.us}
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-phosphor/20 text-phosphor">
                          ✓
                        </span>
                      </td>
                      <td className="p-4 text-center text-text-ghost text-sm">
                        {row.them}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-surface-1 to-surface-2 border border-phosphor/30">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-text-bright mb-2">
                Ready to Discuss?
              </h3>
              <p className="text-text-body mb-6 max-w-md">
                We don&apos;t just sell AI. We sell control over AI.
                <br />
                <span className="text-phosphor">That&apos;s what Google wants to buy.</span>
              </p>
              <button className="px-8 py-3 rounded-lg bg-phosphor text-void font-semibold hover:bg-phosphor-bright transition-colors">
                Request Technical Deep Dive
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

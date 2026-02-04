"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// Custom SVG Icons
const Icons = {
  moat: ({ color }: { color: string }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4v2M7 10h10" strokeLinecap="round" />
      <circle cx="12" cy="14" r="1.5" fill={color} />
    </svg>
  ),
  market: ({ color }: { color: string }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M3 20l4-4 4 2 4-6 6-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8l4-4m0 0v4m0-4h-4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="16" r="1.5" fill={color} />
      <circle cx="11" cy="14" r="1.5" fill={color} />
      <circle cx="15" cy="10" r="1.5" fill={color} />
    </svg>
  ),
  speed: ({ color }: { color: string }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3v1M21 12h-1M12 21v-1M3 12h1" strokeLinecap="round" />
    </svg>
  ),
  loop: ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M17 2l4 4-4 4M7 22l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 6H8a4 4 0 0 0-4 4v1M3 18h13a4 4 0 0 0 4-4v-1" strokeLinecap="round" />
    </svg>
  ),
  proof: ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 2v6h6M9 15l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  timer: ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 2h6M12 2v3" strokeLinecap="round" />
    </svg>
  ),
  shield: ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5.5-3.8 10.7-8 12-4.2-1.3-8-6.5-8-12V6l8-4z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  watchdog: ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
      <path d="M8.5 8.5L6 6M15.5 8.5L18 6" strokeLinecap="round" />
    </svg>
  ),
  target: ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  ),
  cta: ({ color }: { color: string }) => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill={color} />
      <path d="M12 2v2M22 12h-2M12 22v-2M2 12h2" strokeLinecap="round" />
    </svg>
  ),
};

const thesisPoints = [
  {
    id: "moat",
    Icon: Icons.moat,
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
    Icon: Icons.market,
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
    Icon: Icons.speed,
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
  { us: "Self-improving", them: "Static models", Icon: Icons.loop },
  { us: "Verifiable proofs", them: "Trust us", Icon: Icons.proof },
  { us: "Sub-100ms kill switch", them: "Manual shutdown", Icon: Icons.timer },
  { us: "Compliance-native", them: "Retrofitting", Icon: Icons.shield },
  { us: "Watchdog + DEFCON", them: "Silent degradation", Icon: Icons.watchdog },
  { us: "76.5% Determinism", them: "Non-reproducible", Icon: Icons.target },
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
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${point.color}20` }}
                      >
                        <point.Icon color={point.color} />
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
                        <span className="inline-flex items-center gap-3">
                          <row.Icon color="#6ee7b7" />
                          {row.us}
                        </span>
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
              <div className="mb-4 flex justify-center">
                <Icons.cta color="#6ee7b7" />
              </div>
              <h3 className="text-2xl font-bold text-text-bright mb-2">
                Ready to Discuss?
              </h3>
              <p className="text-text-body mb-6 max-w-md">
                We don&apos;t just build AI. We deliver <span className="text-phosphor">control over AI</span>.
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

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const councilRoles = [
  {
    name: "Architect",
    role: "Hydra Reasoner",
    output: "solution + evidence",
    description: "Generates solution and evidence. The reasoning engine inside SPICE.",
    color: "phosphor",
    icon: "📝",
  },
  {
    name: "Inquisitor",
    role: "Judge Dredd",
    output: "PASS / FAIL / UNCERTAIN",
    description: "Executes and verifies. No trust — actual execution verification.",
    color: "neural-1",
    icon: "🔍",
  },
  {
    name: "Gatekeeper",
    role: "XCK Watchdog",
    output: "ALLOW / DENY",
    description: "Security check before output. DLP, rate limits, policy.",
    color: "crimson",
    icon: "🛡️",
  },
  {
    name: "Council Decision",
    role: "Outcome",
    output: "SHIP | REJECT | SUPERVISION | BLOCKED",
    description: "Single decision point. Combines Architect, Inquisitor, and Gatekeeper.",
    color: "ember",
    icon: "⚖️",
  },
];

const colorMap: Record<string, { border: string; text: string; bg: string }> = {
  phosphor: {
    border: "border-phosphor/50",
    text: "text-phosphor",
    bg: "bg-phosphor/10",
  },
  "neural-1": {
    border: "border-neural-1/50",
    text: "text-neural-1",
    bg: "bg-neural-1/10",
  },
  crimson: {
    border: "border-crimson/50",
    text: "text-crimson",
    bg: "bg-crimson/10",
  },
  ember: {
    border: "border-ember/50",
    text: "text-ember",
    bg: "bg-ember/10",
  },
};

export function Council() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-14" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-phosphor/50" />
              <span className="text-xs font-mono text-phosphor uppercase tracking-widest">
                Decision Layer
              </span>
              <div className="h-[1px] w-12 bg-phosphor/50" />
            </div>
            <h2
              className="text-2xl md:text-3xl font-display text-text-bright mb-2"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Council Architecture
            </h2>
            <p className="text-sm text-text-ghost max-w-xl mx-auto">
              After SPICE and XCK do their job, Council decides: ship, reject, send to supervision, or block.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={containerVariants}
          >
            {councilRoles.map((item, index) => {
              const colors = colorMap[item.color] || colorMap.phosphor;
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={item.name}
                  className={`
                    relative p-6 rounded-xl border bg-surface-1/50 backdrop-blur-sm
                    transition-all duration-300 cursor-default overflow-hidden
                    ${isHovered ? `${colors.border} shadow-lg` : "border-border-subtle"}
                  `}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{ y: -4 }}
                >
                  <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl ${colors.bg}`} style={{ opacity: isHovered ? 0.4 : 0 }} />
                  <div className="relative">
                    <div className={`text-2xl mb-3 ${colors.text}`}>{item.icon}</div>
                    <h3 className={`text-lg font-mono font-semibold ${colors.text}`}>
                      {item.name}
                    </h3>
                    <p className="text-xs text-text-ghost uppercase tracking-wider mt-0.5">
                      {item.role}
                    </p>
                    <p className="text-sm text-text-body mt-3 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-border-subtle">
                      <span className="text-[10px] font-mono text-text-ghost uppercase">Output</span>
                      <p className={`text-xs font-mono mt-0.5 ${colors.text}`}>
                        {item.output}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-10 text-center"
            variants={itemVariants}
          >
            <Link
              href="/technology#spice"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm bg-surface-2 text-text-body hover:bg-surface-3 border border-border-subtle transition-colors"
            >
              SPICE internals (Challenger → Hydra → Judge Dredd)
              <span className="text-phosphor">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

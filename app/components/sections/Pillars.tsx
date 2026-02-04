"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ValkyrieIcon, SpiceIcon, XckIcon } from "../ui/Icons";

const pillars = [
  {
    name: "VALKYRIE",
    role: "Soul",
    tagline: "Determinism via Cryptography",
    description:
      "Every AI decision is cryptographically sealed. Immutable seed ensures reproducible behavior. No black box surprises.",
    color: "neural-2",
    icon: ValkyrieIcon,
    features: [
      "SHA-256 hash chain",
      "Reproducible outputs",
      "Audit-ready logs",
    ],
  },
  {
    name: "SPICE",
    role: "Mind",
    tagline: "Evolution via Adversarial Play",
    description:
      "Self-improving AI that learns from mistakes. Arena-tested, battle-hardened. Gets smarter without getting dangerous.",
    color: "phosphor",
    icon: SpiceIcon,
    features: [
      "Multi-head generation",
      "Judge Dredd execution",
      "Golden regression suite",
    ],
  },
  {
    name: "XCK",
    role: "Shield",
    tagline: "Protection via Real-time Reflexes",
    description:
      "Sub-100ms kill switch. Circuit breaker protection. Evidence chain for every action. The immune system of AI.",
    color: "crimson",
    icon: XckIcon,
    features: [
      "47ms average response",
      "DEFCON levels",
      "Cryptographic ledger",
    ],
  },
];

export function Pillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, { border: string; text: string; glow: string; bg: string }> = {
      "neural-2": {
        border: "border-neural-2/50",
        text: "text-neural-2",
        glow: "shadow-[0_0_30px_rgba(167,139,250,0.3)]",
        bg: "bg-neural-2/10",
      },
      phosphor: {
        border: "border-phosphor/50",
        text: "text-phosphor",
        glow: "shadow-[0_0_30px_rgba(110,231,183,0.3)]",
        bg: "bg-phosphor/10",
      },
      crimson: {
        border: "border-crimson/50",
        text: "text-crimson",
        glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
        bg: "bg-crimson/10",
      },
    };
    return colorMap[color] || colorMap.phosphor;
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-phosphor/50" />
              <span className="text-xs font-mono text-phosphor uppercase tracking-widest">
                The Solution
              </span>
              <div className="h-[1px] w-12 bg-phosphor/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              The Unified Theory
            </h2>
            <p className="text-text-body mt-4 max-w-2xl mx-auto">
              Three pillars working in harmony. Each one essential. Together,
              invincible.
            </p>
          </motion.div>

          {/* Pillars grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {pillars.map((pillar, index) => {
              const colors = getColorClass(pillar.color);
              const isHovered = hoveredIndex === index;
              const IconComponent = pillar.icon;

              return (
                <motion.div
                  key={pillar.name}
                  className={`
                    relative p-8 rounded-lg border border-border-subtle bg-surface-1/50 backdrop-blur-sm
                    transition-all duration-500 cursor-pointer overflow-hidden
                    ${isHovered ? `${colors.border} ${colors.glow}` : ""}
                  `}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{ y: -8 }}
                >
                  {/* Background glow */}
                  <motion.div
                    className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${colors.bg}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.5 : 0 }}
                  />

                  {/* Icon */}
                  <div className={`relative mb-6 ${colors.text}`}>
                    <IconComponent size={64} animated={isHovered} />
                  </div>

                  {/* Name and role */}
                  <div className="mb-4">
                    <h3
                      className={`text-2xl font-bold ${colors.text} font-mono`}
                    >
                      {pillar.name}
                    </h3>
                    <span className="text-sm text-text-ghost uppercase tracking-wider">
                      The {pillar.role}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-text-body font-medium mb-4">
                    {pillar.tagline}
                  </p>

                  {/* Description - expands on hover */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: isHovered ? "auto" : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-text-ghost mb-4">
                      {pillar.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {pillar.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-text-body"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${colors.text} bg-current`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Hover indicator */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${colors.text} bg-current`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Connection visualization */}
          <motion.div
            className="mt-12 flex justify-center items-center gap-4"
            variants={itemVariants}
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-neural-2/50" />
            <motion.div
              className="w-3 h-3 rounded-full bg-neural-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="h-[1px] w-24 bg-gradient-to-r from-neural-2/50 via-phosphor/50 to-phosphor/50" />
            <motion.div
              className="w-3 h-3 rounded-full bg-phosphor"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <div className="h-[1px] w-24 bg-gradient-to-r from-phosphor/50 via-crimson/50 to-crimson/50" />
            <motion.div
              className="w-3 h-3 rounded-full bg-crimson"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-crimson/50" />
          </motion.div>

          {/* Deep Dive link */}
          <motion.div
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <a
              href="/architecture"
              className="inline-flex items-center gap-2 text-sm text-neural-1 hover:text-neural-2 transition-colors group"
            >
              <span>Explore Full Architecture</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

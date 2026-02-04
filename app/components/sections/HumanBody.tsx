"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ValkyrieIcon, SpiceIcon, XckIcon } from "../ui/Icons";

const organs = [
  {
    name: "VALKYRIE",
    role: "The Soul",
    description: "Gives purpose. Enforces determinism.",
    color: "neural-2",
    Icon: ValkyrieIcon,
  },
  {
    name: "SPICE",
    role: "The Mind",
    description: "Learns. Thinks. Adapts.",
    color: "phosphor",
    Icon: SpiceIcon,
  },
  {
    name: "XCK",
    role: "The Immune System",
    description: "Protects. Remembers. Reacts.",
    color: "crimson",
    Icon: XckIcon,
  },
];

export function HumanBody() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getColorClasses = (color: string) => {
    const map: Record<string, { text: string; border: string; bg: string }> = {
      "neural-2": {
        text: "text-neural-2",
        border: "border-neural-2/30",
        bg: "bg-neural-2/10",
      },
      phosphor: {
        text: "text-phosphor",
        border: "border-phosphor/30",
        bg: "bg-phosphor/10",
      },
      crimson: {
        text: "text-crimson",
        border: "border-crimson/30",
        bg: "bg-crimson/10",
      },
    };
    return map[color] || map.phosphor;
  };

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-1/50 to-transparent" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-text-ghost/30" />
            <span className="text-xs font-mono text-text-ghost uppercase tracking-widest">
              One Organism
            </span>
            <div className="h-[1px] w-12 bg-text-ghost/30" />
          </div>
          <h2
            className="font-display text-3xl md:text-4xl text-text-bright"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Three Organs. One Body.
          </h2>
        </motion.div>

        {/* Organism visualization */}
        <div className="relative">
          {/* Center connection lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path
              d="M 67 50 Q 200 30 333 50"
              stroke="url(#gradient-line)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>

          {/* Three organs */}
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {organs.map((organ, i) => {
              const colors = getColorClasses(organ.color);
              return (
                <motion.div
                  key={organ.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="text-center"
                >
                  {/* Icon */}
                  <div
                    className={`
                      inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20
                      rounded-full ${colors.bg} ${colors.border} border mb-4
                      ${colors.text}
                    `}
                  >
                    <organ.Icon size={40} animated={false} />
                  </div>

                  {/* Labels */}
                  <div className={`font-mono text-xs ${colors.text} mb-1`}>
                    {organ.name}
                  </div>
                  <div className="font-display text-lg md:text-xl text-text-bright mb-2"
                       style={{ fontFamily: "var(--font-instrument-serif)" }}>
                    {organ.role}
                  </div>
                  <div className="text-xs text-text-ghost">
                    {organ.description}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-text-body mt-12 max-w-xl mx-auto"
        >
          When the Mind hallucinates, the Immune System reacts.
          <br />
          <span className="text-text-ghost text-sm">
            Automatic. Instant. Mathematical.
          </span>
        </motion.p>

        {/* Deep Dive link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mt-8"
        >
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-neural-2 hover:text-neural-1 transition-colors group"
          >
            <span>Why &ldquo;Soul / Mind / Immune System&rdquo;?</span>
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
      </div>
    </section>
  );
}

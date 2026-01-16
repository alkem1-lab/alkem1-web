"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "47ms",
    label: "Kill switch response time",
    subtext: "Measured • ALKEM1 internal",
  },
  {
    value: "12K+",
    label: "Evidence chain entries",
    subtext: "Measured • Immutable ledger",
  },
  {
    value: "9/10",
    label: "Joker attacks blocked",
    subtext: "Measured • 1 bypass → patched",
  },
];

export function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
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
          {/* Section label */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            variants={itemVariants}
          >
            <div className="h-[1px] w-12 bg-phosphor/50" />
            <span className="text-xs font-mono text-phosphor uppercase tracking-widest">
              Measured Results
            </span>
          </motion.div>

          {/* Quote */}
          <motion.div className="mb-16" variants={itemVariants}>
            <h2
              className="font-display text-3xl md:text-5xl lg:text-6xl text-text-bright leading-tight"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Real metrics.
              <br />
              Not marketing.
              <br />
              <span className="text-phosphor">Verifiable on demand.</span>
            </h2>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative p-8 rounded-lg border border-border-subtle bg-surface-1/50 backdrop-blur-sm group card-hover"
                variants={itemVariants}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-phosphor via-neural-2 to-transparent opacity-60" />

                <div className="text-5xl md:text-6xl font-mono font-bold text-text-bright mb-4">
                  {stat.value}
                </div>
                <div className="text-text-body mb-2">{stat.label}</div>
                <div className="text-xs font-mono text-text-ghost">
                  {stat.subtext}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Transition statement */}
          <motion.div
            className="mt-20 text-center"
            variants={itemVariants}
          >
            <p className="text-2xl md:text-3xl text-text-body">
              Unless you can{" "}
              <span className="text-phosphor font-medium">see inside.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { PulseCore } from "../effects/PulseCore";
import { Button } from "../ui/Button";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-phosphor/20 bg-surface-1/50 backdrop-blur-sm"
          variants={itemVariants}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-phosphor"></span>
          </span>
          <span className="text-xs font-mono text-phosphor uppercase tracking-wider">
            System Online • Integrity Verified
          </span>
        </motion.div>

        {/* Pulse Core */}
        <motion.div
          className="flex justify-center mb-12"
          variants={itemVariants}
        >
          <PulseCore status="idle" size="lg" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl text-text-bright mb-6 leading-[1.1]"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
          variants={itemVariants}
        >
          Trust is Dead.
          <br />
          <span className="gradient-text">Verification is Alive.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-text-body max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={itemVariants}
        >
          A provable control stack for AI:{" "}
          <span className="text-crimson font-medium">kill switch</span>,{" "}
          <span className="text-phosphor font-medium">evidence chain</span>, and{" "}
          <span className="text-neural-2 font-medium">deterministic replay</span>.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <Button variant="primary" size="lg">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Audit the System
          </Button>
          <Button variant="ghost" size="lg">
            Watch Demo
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-text-ghost"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-void to-transparent" />

        {/* Side lines */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-phosphor/30 to-transparent" />
            <div className="text-[10px] font-mono text-text-ghost -rotate-90 whitespace-nowrap">
              ALKEM1-XCK-v2.0
            </div>
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-phosphor/30 to-transparent" />
          </div>
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-phosphor/30 to-transparent" />
            <div className="text-[10px] font-mono text-text-ghost rotate-90 whitespace-nowrap">
              GLASS-BOX-PROTOCOL
            </div>
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-phosphor/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

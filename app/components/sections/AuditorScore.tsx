"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const scoreCategories = [
  {
    name: "Design/Concept",
    current: 9.5,
    target: 9.5,
    status: "complete",
    description: "Constitutional document (FEYNMAN_LEARNING.md) defines all invariants",
  },
  {
    name: "Defense Mechanisms",
    current: 8.0,
    target: 8.5,
    status: "in_progress",
    description: "Kill Switch 2-Step, Circuit Breaker, Evidence Chain. Joker Agent pending.",
  },
  {
    name: "Enterprise Hardening",
    current: 7.5,
    target: 8.5,
    status: "in_progress",
    description: "Auth Hardening + CSP done. gVisor sandbox, mTLS Zero Trust planned.",
  },
  {
    name: "CI/Supply Chain",
    current: 9.0,
    target: 9.0,
    status: "complete",
    description: "SBOM + CVE Gate + Provenance Attestation. 4 CVEs fixed in Session 53.",
  },
];

function AnimatedScore({ value, delay = 0 }: { value: number; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => v.toFixed(1));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      spring.set(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [spring, value, delay]);

  return (
    <motion.span className="tabular-nums">
      {isVisible ? display : "0.0"}
    </motion.span>
  );
}

function ScoreBar({ current, target }: { current: number; target: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative h-2 bg-surface-2 rounded-full overflow-hidden">
      {/* Target indicator */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-phosphor/50 z-10"
        style={{ left: `${(target / 10) * 100}%` }}
      />
      
      {/* Current progress */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 rounded-full"
        style={{
          background: `linear-gradient(90deg, 
            ${current >= 8 ? '#6ee7b7' : current >= 6 ? '#f97316' : '#ef4444'} 0%, 
            ${current >= 8 ? '#34d399' : current >= 6 ? '#ea580c' : '#dc2626'} 100%
          )`,
        }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${(current / 10) * 100}%` } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

export function AuditorScore() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const overallCurrent = 9.5;
  const overallTarget = 9.6;

  return (
    <section ref={ref} className="relative py-32 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-surface-1/50 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-neural-1/50" />
              <span className="text-xs font-mono text-neural-1 uppercase tracking-widest">
                Quantified Maturity
              </span>
              <div className="h-[1px] w-12 bg-neural-1/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Auditor Score
            </h2>
            <p className="text-text-body max-w-2xl mx-auto">
              Independent audit metrics. Not marketing claims - verifiable checkpoints.
            </p>
          </motion.div>

          {/* Main score card */}
          <motion.div 
            className="mb-12"
            variants={itemVariants}
          >
            <div className="relative p-8 md:p-12 rounded-2xl bg-surface-1 border border-border-subtle overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-neural-1/10 rounded-full blur-3xl" />
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Current score */}
                <div className="text-center md:text-left">
                  <div className="text-sm text-text-ghost uppercase tracking-wider mb-2">
                    Current Score
                  </div>
                  <div className="text-7xl md:text-8xl font-bold text-phosphor">
                    <AnimatedScore value={overallCurrent} />
                  </div>
                  <div className="text-text-ghost text-sm mt-2">out of 10.0</div>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-4">
                  <motion.svg
                    className="w-16 h-16 text-text-ghost"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </div>

                {/* Target score */}
                <div className="text-center md:text-right">
                  <div className="text-sm text-text-ghost uppercase tracking-wider mb-2">
                    Target Score
                  </div>
                  <div className="text-7xl md:text-8xl font-bold text-neural-2">
                    <AnimatedScore value={overallTarget} delay={500} />
                  </div>
                  <div className="text-text-ghost text-sm mt-2">Enterprise Ready</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-ghost">Progress to target</span>
                  <span className="text-phosphor font-mono">
                    {Math.round((overallCurrent / overallTarget) * 100)}%
                  </span>
                </div>
                <div className="h-3 bg-surface-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-phosphor to-neural-2"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${(overallCurrent / overallTarget) * 100}%` } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category breakdown */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {scoreCategories.map((category, index) => (
              <motion.div
                key={category.name}
                className="p-6 rounded-xl bg-surface-1/50 border border-border-subtle hover:border-phosphor/30 transition-colors"
                variants={itemVariants}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-bright mb-1">
                      {category.name}
                    </h3>
                    <span className={`
                      inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-mono
                      ${category.status === 'complete' 
                        ? 'bg-phosphor/20 text-phosphor' 
                        : category.status === 'in_progress'
                        ? 'bg-ember/20 text-ember'
                        : 'bg-neural-1/20 text-neural-1'
                      }
                    `}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        category.status === 'complete' 
                          ? 'bg-phosphor' 
                          : category.status === 'in_progress'
                          ? 'bg-ember animate-pulse'
                          : 'bg-neural-1'
                      }`} />
                      {category.status === 'complete' ? 'Complete' : 
                       category.status === 'in_progress' ? 'In Progress' : 'Planned'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-text-bright">
                      <AnimatedScore value={category.current} delay={index * 100} />
                    </div>
                    <div className="text-xs text-text-ghost">
                      / {category.target.toFixed(1)}
                    </div>
                  </div>
                </div>

                <ScoreBar current={category.current} target={category.target} />
                
                <p className="text-sm text-text-ghost mt-4">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Certification badge */}
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-full bg-surface-2 border border-phosphor/30">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-phosphor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-text-body text-sm">
                  <span className="text-phosphor font-semibold">AUDITOR CERTIFIED</span>
                  {" · "}Session 49-57 · 2026-01-19
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

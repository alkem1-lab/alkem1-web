"use client";

import { motion } from "framer-motion";
import { LenisProvider } from "../../lib/lenis";
import {
  GridBackground,
  PulseCore,
  Button,
  DataFlywheel,
  AuditorScore,
  InvestmentThesis,
  EnterpriseHardening,
  Pillars,
  CTA,
  // Session 59 innovations
  ZeroTrust,
  SSOTGuardian,
  WatchdogDEFCON,
  REMPhase,
  CanaryTokens,
} from "../../components";

function InvestorHero() {
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
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Investor badge */}
        <motion.div
          className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full border border-ember/30 bg-surface-1/50 backdrop-blur-sm"
          variants={itemVariants}
        >
          <span className="text-xl">🎯</span>
          <span className="text-sm font-mono text-ember uppercase tracking-wider">
            Investor Overview
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
          The World&apos;s First
          <br />
          <span className="gradient-text">Self-Correcting</span>
          <br />
          Enterprise AI
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl text-text-body max-w-3xl mx-auto mb-10 leading-relaxed"
          variants={itemVariants}
        >
          <span className="text-text-bright font-medium">Autonomous Intelligence.</span>{" "}
          <span className="text-phosphor">Mathematical Integrity.</span>{" "}
          <span className="text-crimson">Sub-100ms Kill Switch.</span>
        </motion.p>

        {/* Key metrics */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-12"
          variants={itemVariants}
        >
          {[
            { value: "9.5/10", label: "Auditor Score", color: "phosphor" },
            { value: "47ms", label: "Kill Switch", color: "crimson" },
            { value: "76.5%", label: "Determinism", color: "neural-2" },
            { value: "19", label: "Auditor Decisions", color: "ember" },
          ].map((metric, i) => (
            <div key={i} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold text-${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-sm text-text-ghost">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <Button variant="primary" size="lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Request Technical Deep Dive
          </Button>
          <Button variant="ghost" size="lg">
            View Live Demo
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-6"
          variants={itemVariants}
        >
          {[
            { icon: "👁️", text: "Watchdog Engine" },
            { icon: "⏪", text: "Replay Lifecycle" },
            { icon: "🔐", text: "SBOM + CVE Gate" },
            { icon: "📊", text: "Auditor 9.5/10" },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1/50 border border-border-subtle"
            >
              <span>{badge.icon}</span>
              <span className="text-sm text-text-ghost">{badge.text}</span>
            </div>
          ))}
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
            <span className="text-xs uppercase tracking-widest">Explore</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-void to-transparent" />
        
        {/* Side badges */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-ember/30 to-transparent" />
            <div className="text-[10px] font-mono text-text-ghost -rotate-90 whitespace-nowrap">
              INVESTOR-DECK-v2.0
            </div>
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-ember/30 to-transparent" />
          </div>
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-phosphor/30 to-transparent" />
            <div className="text-[10px] font-mono text-text-ghost rotate-90 whitespace-nowrap">
              ALKEM1-LAB2-ENTERPRISE
            </div>
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-phosphor/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ExecutiveSummary() {
  return (
    <section className="relative py-24 px-6 bg-surface-1/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-2xl bg-surface-2 border border-phosphor/30"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-phosphor/20 flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-bright">Executive Summary</h2>
              <p className="text-sm text-phosphor">60-second overview</p>
            </div>
          </div>

          <div className="space-y-6 text-text-body leading-relaxed">
            <p>
              <span className="text-text-bright font-semibold">ALKEM1-LAB2</span> is an{" "}
              <span className="text-phosphor">enterprise AI platform</span> that solves the 
              three biggest problems with current AI systems:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  problem: "Hallucinations",
                  solution: "Memory Service with verified knowledge",
                  icon: "🎭",
                },
                {
                  problem: "No Control",
                  solution: "Sub-100ms Kill Switch + Circuit Breaker",
                  icon: "⚡",
                },
                {
                  problem: "Black Box",
                  solution: "Cryptographic audit trail + Merkle proofs",
                  icon: "🔍",
                },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-crimson text-sm font-mono mb-1 line-through">
                    {item.problem}
                  </div>
                  <div className="text-phosphor text-sm">
                    → {item.solution}
                  </div>
                </div>
              ))}
            </div>

            <p>
              Our <span className="text-neural-2 font-semibold">Data Flywheel</span> enables 
              continuous self-improvement without human intervention. Every cycle makes the 
              model smarter, creating a compounding advantage that competitors cannot replicate.
            </p>

            {/* Session 55-57 Updates */}
            <div className="mt-6 p-4 rounded-xl bg-phosphor/10 border border-phosphor/30">
              <div className="text-xs text-phosphor font-mono mb-2">LATEST: SESSION 55-57</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-phosphor">✓</span>
                  <span className="text-text-body">Watchdog Engine (DEFCON)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-phosphor">✓</span>
                  <span className="text-text-body">Replay Lifecycle</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-phosphor">✓</span>
                  <span className="text-text-body">Determinism: 60% → 76.5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-phosphor">✓</span>
                  <span className="text-text-body">Services: 27s → 1.5s</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle">
              <p className="text-sm text-text-ghost italic">
                &quot;We don&apos;t just build AI. We deliver <span className="text-phosphor">control over AI</span>. 
                That&apos;s what enterprises need. That&apos;s what regulators demand.&quot;
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function InvestorsPage() {
  return (
    <LenisProvider>
      <main className="relative">
        <GridBackground />

        {/* 1. Investor Hero */}
        <InvestorHero />

        {/* 2. Executive Summary */}
        <ExecutiveSummary />

        {/* 3. Data Flywheel - The Core Innovation */}
        <DataFlywheel />

        {/* 4. Enterprise Hardening - Security Deep Dive */}
        <EnterpriseHardening />

        {/* 5. Zero Trust - 4-layer security (Session 59) */}
        <ZeroTrust />

        {/* 6. SSOT Guardian - Crown Jewel Innovation */}
        <SSOTGuardian />

        {/* 7. Watchdog DEFCON - System Health */}
        <WatchdogDEFCON />

        {/* 8. Auditor Score - Quantified Maturity */}
        <AuditorScore />

        {/* 9. REM Phase - AI Sleep Optimization */}
        <REMPhase />

        {/* 10. Canary Tokens - Honeypot Defense */}
        <CanaryTokens />

        {/* 11. Three Pillars - Brief technical overview */}
        <Pillars />

        {/* 12. Investment Thesis */}
        <InvestmentThesis />

        {/* 13. CTA */}
        <CTA />
      </main>
    </LenisProvider>
  );
}

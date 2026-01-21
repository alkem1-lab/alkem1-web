"use client";

import { LenisProvider } from "../lib/lenis";
import {
  GridBackground,
  Hero,
  BeforeAfter,
  Problem,
  Workflow,
  MemoryVault,
  Pillars,
  DataFlywheel,
  HumanBody,
  LiveDemo,
  MathProof,
  Joker,
  CTA,
  // Session 59 innovations
  ZeroTrust,
  REMPhase,
  CanaryTokens,
  SSOTGuardian,
  WatchdogDEFCON,
} from "../components";

export default function Home() {
  return (
    <LenisProvider>
      <main className="relative">
        <GridBackground />

        {/* 1. Hero - The Hook */}
        <Hero />

        {/* 2. Before/After - Trust vs Verify (Main selling point) */}
        <BeforeAfter />

        {/* 3. Measured Results - Real metrics, not marketing */}
        <Problem />

        {/* 4. Day-to-Day Workflow - How teams use ALKEM1 */}
        <Workflow />

        {/* 5. Memory Vault - Controlled knowledge */}
        <MemoryVault />

        {/* 6. Three Pillars - Brief overview */}
        <Pillars />

        {/* 7. Data Flywheel - Self-improving AI (NEW for v2) */}
        <DataFlywheel />

        {/* 8. Human Body - Emotional analogy */}
        <HumanBody />

        {/* 9. Live Demo - Interactive threat simulation */}
        <LiveDemo />

        {/* 10. Math Proof - Q.E.D. Certificate teaser */}
        <MathProof />

        {/* 11. Joker - Adversarial testing */}
        <Joker />

        {/* === SESSION 59 INNOVATIONS === */}
        
        {/* 12. Zero Trust - 4-layer security stack */}
        <ZeroTrust />

        {/* 13. SSOT Guardian - Crown Jewel: Deploy without blind spots */}
        <SSOTGuardian />

        {/* 14. Watchdog DEFCON - System health monitoring */}
        <WatchdogDEFCON />

        {/* 15. REM Phase - AI that sleeps and optimizes */}
        <REMPhase />

        {/* 16. Canary Tokens - Honeypot sentinels */}
        <CanaryTokens />

        {/* 17. CTA - Request Audit + Proof Pack */}
        <CTA />
      </main>
    </LenisProvider>
  );
}

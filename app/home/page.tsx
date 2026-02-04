"use client";

import { LenisProvider } from "../../lib/lenis";
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
  ZeroTrust,
  REMPhase,
  CanaryTokens,
  SSOTGuardian,
  WatchdogDEFCON,
  DeterminismLayer,
  AuditRoutines,
} from "../../components";

export default function HomePage() {
  return (
    <LenisProvider>
      <main className="relative">
        <GridBackground />

        <Hero />
        <BeforeAfter />
        <Problem />
        <Workflow />
        <MemoryVault />
        <Pillars />
        <DataFlywheel />
        <DeterminismLayer />
        <HumanBody />
        <LiveDemo />
        <MathProof />
        <Joker />
        <ZeroTrust />
        <SSOTGuardian />
        <AuditRoutines />
        <WatchdogDEFCON />
        <REMPhase />
        <CanaryTokens />
        <CTA />
      </main>
    </LenisProvider>
  );
}

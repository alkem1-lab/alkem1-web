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

        {/* 12. CTA - Request Audit + Proof Pack */}
        <CTA />
      </main>
    </LenisProvider>
  );
}

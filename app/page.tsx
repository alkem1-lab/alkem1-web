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

        {/* 7. Human Body - Emotional analogy */}
        <HumanBody />

        {/* 8. Live Demo - Interactive threat simulation */}
        <LiveDemo />

        {/* 9. Math Proof - Q.E.D. Certificate teaser */}
        <MathProof />

        {/* 10. Joker - Adversarial testing */}
        <Joker />

        {/* 11. CTA - Request Audit + Proof Pack */}
        <CTA />
      </main>
    </LenisProvider>
  );
}

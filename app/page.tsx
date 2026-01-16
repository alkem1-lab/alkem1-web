"use client";

import { LenisProvider } from "../lib/lenis";
import {
  GridBackground,
  Hero,
  BeforeAfter,
  Problem,
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

        {/* 3. Problem - Stats that create urgency */}
        <Problem />

        {/* 4. Three Pillars - Brief overview */}
        <Pillars />

        {/* 5. Human Body - Emotional analogy */}
        <HumanBody />

        {/* 6. Live Demo - Interactive threat simulation */}
        <LiveDemo />

        {/* 7. Math Proof - Q.E.D. Certificate teaser */}
        <MathProof />

        {/* 8. Joker - Adversarial testing */}
        <Joker />

        {/* 9. CTA - Request Audit + Proof Pack */}
        <CTA />
      </main>
    </LenisProvider>
  );
}

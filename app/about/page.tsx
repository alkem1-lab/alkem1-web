"use client";

import { LenisProvider } from "../../lib/lenis";
import { GridBackground } from "../../components";
import { AboutHeader } from "../../components/about/AboutHeader";
import { AboutBody } from "../../components/about/AboutBody";
import { AboutPractice } from "../../components/about/AboutPractice";

export default function AboutPage() {
  return (
    <LenisProvider>
      <main className="relative min-h-screen">
        <GridBackground />

        {/* Header */}
        <AboutHeader />

        {/* Human Body Cards */}
        <AboutBody />

        {/* What it means in practice */}
        <AboutPractice />
      </main>
    </LenisProvider>
  );
}

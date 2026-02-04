"use client";

import { LenisProvider } from "../lib/lenis";
import { GridBackground } from "../components";
import { StoryJourney } from "../components/story/StoryJourney";

export default function StoryPage() {
  return (
    <LenisProvider>
      <main className="relative min-h-screen">
        <GridBackground />
        <StoryJourney />
      </main>
    </LenisProvider>
  );
}

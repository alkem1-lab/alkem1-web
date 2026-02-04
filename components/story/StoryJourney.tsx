"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { StoryPrologue } from "./StoryPrologue";
import { StoryChapter1 } from "./StoryChapter1";
import { StoryChapter2 } from "./StoryChapter2";
import { StoryChapter3 } from "./StoryChapter3";
import { StoryChapter4 } from "./StoryChapter4";
import { StoryChapter5 } from "./StoryChapter5";
import { StoryChapter6 } from "./StoryChapter6";
import { StoryChapter7 } from "./StoryChapter7";
import { StoryChapter8 } from "./StoryChapter8";
import { StoryChapter9 } from "./StoryChapter9";
import { StoryEpilogue } from "./StoryEpilogue";

export function StoryJourney() {
  return (
    <div className="relative">
      {/* Prologue */}
      <StoryPrologue />

      {/* Chapter 1: The Challenge */}
      <StoryChapter1 />

      {/* Chapter 2: The Team */}
      <StoryChapter2 />

      {/* Chapter 3: The Judge */}
      <StoryChapter3 />

      {/* Chapter 4: The Memory */}
      <StoryChapter4 />

      {/* Chapter 5: The Forge */}
      <StoryChapter5 />

      {/* Chapter 6: The Guardian (Security & Cryptography) */}
      <StoryChapter6 />

      {/* Chapter 7: The Three Libraries (Knowledge Sources) */}
      <StoryChapter7 />

      {/* Chapter 8: The Complete Cycle (Memory → Factory → Arena → Forge + LoRA) */}
      <StoryChapter8 />

      {/* Chapter 9: Court-Grade Determinism (Session 78 Innovations) */}
      <StoryChapter9 />

      {/* Epilogue */}
      <StoryEpilogue />
    </div>
  );
}

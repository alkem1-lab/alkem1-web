"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function BackToHome() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-6 left-6 z-50"
    >
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1/80 backdrop-blur-sm border border-border-subtle hover:border-phosphor/30 transition-colors group"
      >
        <svg
          className="w-4 h-4 text-text-ghost group-hover:text-phosphor transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="text-sm font-mono text-text-ghost group-hover:text-text-body transition-colors">
          Home
        </span>
      </Link>
    </motion.div>
  );
}

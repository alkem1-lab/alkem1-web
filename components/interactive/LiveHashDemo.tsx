"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simple SHA-256 implementation using Web Crypto API
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function LiveHashDemo() {
  const [input, setInput] = useState("Hello ALKEM1");
  const [hash, setHash] = useState("");
  const [prevHash, setPrevHash] = useState("");
  const [isHashing, setIsHashing] = useState(false);

  useEffect(() => {
    const computeHash = async () => {
      setIsHashing(true);
      setPrevHash(hash);
      const newHash = await sha256(input || " ");
      // Small delay for visual effect
      setTimeout(() => {
        setHash(newHash);
        setIsHashing(false);
      }, 50);
    };
    computeHash();
  }, [input]);

  // Find which characters changed
  const getHashCharClass = (char: string, index: number) => {
    if (!prevHash) return "text-phosphor";
    if (prevHash[index] !== char) {
      return "text-ember scale-110";
    }
    return "text-phosphor";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-phosphor/30 bg-phosphor/5 mb-4">
          <span className="w-2 h-2 rounded-full bg-phosphor animate-pulse" />
          <span className="text-xs font-mono text-phosphor uppercase tracking-wider">
            Live Demo
          </span>
        </div>
        <h3
          className="text-2xl md:text-3xl text-text-bright font-display"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          SHA-256 Hash Generator
        </h3>
        <p className="text-text-ghost text-sm mt-2">
          Type anything. Watch every character change everything.
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-xs font-mono text-text-ghost uppercase tracking-wider mb-2">
          Data Input
        </label>
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-4 bg-surface-1 border border-border-subtle rounded-lg
                       text-text-bright font-mono text-lg resize-none
                       focus:outline-none focus:border-phosphor/50 focus:ring-1 focus:ring-phosphor/20
                       transition-all duration-200"
            placeholder="Type something..."
          />
          <div className="absolute bottom-3 right-3 text-xs text-text-ghost font-mono">
            {input.length} chars
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center my-4">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-phosphor"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Hash Output */}
      <div>
        <label className="block text-xs font-mono text-text-ghost uppercase tracking-wider mb-2">
          SHA-256 Hash
        </label>
        <div className="relative p-4 bg-surface-2 border border-border-subtle rounded-lg overflow-hidden">
          {/* Glow effect when hashing */}
          <AnimatePresence>
            {isHashing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-phosphor/5"
              />
            )}
          </AnimatePresence>

          {/* Hash display */}
          <div className="font-mono text-sm md:text-base break-all leading-relaxed relative z-10">
            {hash.split("").map((char, i) => (
              <motion.span
                key={`${i}-${char}`}
                initial={{ scale: 1.3, color: "#f97316" }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`inline-block transition-colors duration-300 ${getHashCharClass(char, i)}`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Copy button */}
          <button
            onClick={() => navigator.clipboard.writeText(hash)}
            className="absolute top-3 right-3 p-2 text-text-ghost hover:text-phosphor transition-colors"
            title="Copy hash"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="p-4 bg-surface-1/50 rounded-lg border border-border-subtle">
          <div className="text-2xl font-mono text-phosphor mb-1">64</div>
          <div className="text-xs text-text-ghost">Characters (256 bits)</div>
        </div>
        <div className="p-4 bg-surface-1/50 rounded-lg border border-border-subtle">
          <div className="text-2xl font-mono text-phosphor mb-1">2²⁵⁶</div>
          <div className="text-xs text-text-ghost">Possible combinations</div>
        </div>
        <div className="p-4 bg-surface-1/50 rounded-lg border border-border-subtle">
          <div className="text-2xl font-mono text-phosphor mb-1">∞</div>
          <div className="text-xs text-text-ghost">Years to crack</div>
        </div>
      </div>

      {/* Educational note */}
      <div className="mt-6 p-4 border border-phosphor/20 rounded-lg bg-phosphor/5">
        <p className="text-sm text-text-body">
          <span className="text-phosphor font-semibold">Why this matters:</span>{" "}
          ALKEM1 uses SHA-256 to create an unbreakable chain of evidence.
          Change one character in any previous record, and the entire chain breaks.
          This is how we guarantee mathematical proof of integrity.
        </p>
      </div>
    </div>
  );
}

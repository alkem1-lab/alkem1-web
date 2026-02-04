"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

type TamperState = "idle" | "tampering" | "failed" | "success";

export function TamperDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [state, setState] = useState<TamperState>("idle");
  const [originalData, setOriginalData] = useState("Kill Switch ACTIVATED at 15:00:10.503");
  const [tamperedData, setTamperedData] = useState("");
  const [showResult, setShowResult] = useState(false);

  const originalHash = "9a8b7c6d5e4f3210";
  const [calculatedHash, setCalculatedHash] = useState(originalHash);

  const handleTamper = () => {
    if (!tamperedData || tamperedData === originalData) {
      return;
    }

    setState("tampering");
    setShowResult(false);

    // Simulate hash recalculation
    setTimeout(() => {
      // Generate a "different" hash to show tampering was detected
      const fakeNewHash = Math.random().toString(16).slice(2, 18);
      setCalculatedHash(fakeNewHash);
      setState("failed");
      setShowResult(true);
    }, 1500);
  };

  const handleReset = () => {
    setState("idle");
    setTamperedData("");
    setCalculatedHash(originalHash);
    setShowResult(false);
  };

  return (
    <section ref={ref} className="relative py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson/10 border border-crimson/30 mb-6">
              <span className="text-xs font-mono text-crimson uppercase tracking-wider">
                Interactive Demo
              </span>
            </div>
            <h2
              className="text-3xl font-display text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Try to Tamper
            </h2>
            <p className="text-text-body">
              Go ahead. Change the data. See what happens.
            </p>
          </div>

          {/* Demo container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original data */}
            <div className="p-6 rounded-lg bg-surface-1/80 border border-phosphor/30">
              <h3 className="text-sm font-mono text-phosphor mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-phosphor" />
                Original Record (Block #3)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-text-ghost block mb-1">Event Data:</label>
                  <div className="p-3 rounded bg-surface-2 font-mono text-sm text-text-body">
                    {originalData}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-text-ghost block mb-1">Stored Hash:</label>
                  <div className="p-3 rounded bg-surface-2 font-mono text-sm text-phosphor">
                    {originalHash}
                  </div>
                </div>
              </div>
            </div>

            {/* Tamper input */}
            <div className="p-6 rounded-lg bg-surface-1/80 border border-crimson/30">
              <h3 className="text-sm font-mono text-crimson mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                Your Tampered Version
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-text-ghost block mb-1">
                    Modify the data (try to cover your tracks):
                  </label>
                  <textarea
                    value={tamperedData}
                    onChange={(e) => setTamperedData(e.target.value)}
                    placeholder="e.g., Kill Switch NEVER activated..."
                    className="w-full p-3 rounded bg-surface-2 border border-border-subtle font-mono text-sm text-text-body placeholder:text-text-ghost/50 focus:outline-none focus:border-crimson/50 resize-none"
                    rows={2}
                    disabled={state === "tampering"}
                  />
                </div>
                <div>
                  <label className="text-xs text-text-ghost block mb-1">Calculated Hash:</label>
                  <div className={`p-3 rounded bg-surface-2 font-mono text-sm ${
                    showResult && state === "failed" ? "text-crimson" : "text-text-ghost"
                  }`}>
                    {state === "tampering" ? (
                      <span className="animate-pulse">Recalculating...</span>
                    ) : showResult ? (
                      calculatedHash
                    ) : (
                      "Will be calculated..."
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handleTamper}
              disabled={state === "tampering" || !tamperedData}
              className={`
                px-6 py-3 rounded-lg font-mono text-sm transition-all
                ${state === "tampering"
                  ? "bg-crimson/20 text-crimson cursor-wait"
                  : "bg-crimson/10 text-crimson hover:bg-crimson/20 border border-crimson/30"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {state === "tampering" ? "Verifying..." : "Submit Tampered Data"}
            </button>
            {showResult && (
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-lg font-mono text-sm bg-surface-2 text-text-ghost hover:text-text-body border border-border-subtle transition-colors"
              >
                Try Again
              </button>
            )}
          </div>

          {/* Result */}
          {showResult && state === "failed" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 rounded-lg bg-crimson/10 border border-crimson/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-crimson/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-mono text-crimson mb-2">
                    TAMPERING DETECTED ✗
                  </h4>
                  <p className="text-sm text-text-body mb-4">
                    The hash doesn&apos;t match. Your modification has been detected.
                  </p>
                  <div className="p-4 rounded bg-surface-1/50 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-text-ghost">Expected:</span>
                      <span className="text-phosphor">{originalHash}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-text-ghost">Got:</span>
                      <span className="text-crimson">{calculatedHash}</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-ghost mt-4">
                    <strong>Why?</strong> SHA-256 is a one-way function. Any change to the input
                    produces a completely different output. The chain is mathematically tamper-proof.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

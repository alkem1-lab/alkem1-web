"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Simulated certificate data (static to avoid hydration mismatch)
const certificateData = {
  seed: "0x7a3b9f2c4e1d8a6b5c3f7e9d2a4b6c8e",
  algorithm: "SHA-256",
  chainLength: 12847,
  lastVerification: "2026-01-16T15:00:00Z", // Static date
  status: "VALID",
};

// Animated hash display
function AnimatedHash({ hash }: { hash: string }) {
  const [displayHash, setDisplayHash] = useState(hash);

  useEffect(() => {
    const chars = "0123456789abcdef";
    let iterations = 0;
    const maxIterations = 20;

    const interval = setInterval(() => {
      setDisplayHash(
        hash
          .split("")
          .map((char, index) => {
            if (index < iterations) return hash[index];
            if (char === "x" || char === "0") return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterations++;
      if (iterations > maxIterations) {
        clearInterval(interval);
        setDisplayHash(hash);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [hash]);

  return <span className="font-mono text-phosphor">{displayHash}</span>;
}

export function MathProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  const runVerification = async () => {
    if (isVerifying) return;
    setIsVerifying(true);
    setVerificationComplete(false);

    // Simulate verification process
    await new Promise(r => setTimeout(r, 2000));

    setIsVerifying(false);
    setVerificationComplete(true);

    // Reset after showing success
    setTimeout(() => setVerificationComplete(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-neural-1/50" />
              <span className="text-xs font-mono text-neural-1 uppercase tracking-widest">
                Mathematical Verification
              </span>
              <div className="h-[1px] w-12 bg-neural-1/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Don&apos;t Trust Us.{" "}
              <span className="text-neural-1">Trust the Math.</span>
            </h2>
            <p className="text-text-body max-w-2xl mx-auto">
              Every action is cryptographically sealed. Every decision is verifiable.
              Every audit is mathematically provable.
            </p>
          </motion.div>

          {/* Certificate */}
          <motion.div
            className="relative rounded-xl border border-border-default bg-surface-1/80 backdrop-blur-xl overflow-hidden"
            variants={itemVariants}
          >
            {/* Terminal-style header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-2/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-crimson/80" />
                  <div className="w-3 h-3 rounded-full bg-ember/80" />
                  <div className="w-3 h-3 rounded-full bg-phosphor/80" />
                </div>
                <span className="text-sm font-mono text-text-ghost">
                  Q.E.D. Integrity Certificate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-phosphor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs font-mono text-phosphor uppercase">Verified</span>
              </div>
            </div>

            {/* Certificate content */}
            <div className="p-8">
              {/* ASCII art border */}
              <div className="font-mono text-text-ghost text-xs mb-6 opacity-50">
                ╔══════════════════════════════════════════════════════════════════╗
              </div>

              <div className="space-y-6">
                {/* Seed */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <span className="text-sm font-mono text-text-ghost uppercase tracking-wider w-32">
                    Seed Hash
                  </span>
                  <div className="flex-1 p-3 rounded bg-surface-2/50 border border-border-subtle">
                    <AnimatedHash hash={certificateData.seed} />
                  </div>
                </div>

                {/* Algorithm */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <span className="text-sm font-mono text-text-ghost uppercase tracking-wider w-32">
                    Algorithm
                  </span>
                  <div className="flex-1">
                    <span className="font-mono text-text-bright">{certificateData.algorithm}</span>
                    <span className="text-text-ghost ml-2">(Cryptographic Hash)</span>
                  </div>
                </div>

                {/* Chain Length */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <span className="text-sm font-mono text-text-ghost uppercase tracking-wider w-32">
                    Chain Length
                  </span>
                  <div className="flex-1">
                    <span className="font-mono text-text-bright text-2xl">
                      {certificateData.chainLength.toLocaleString()}
                    </span>
                    <span className="text-text-ghost ml-2">linked entries</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <span className="text-sm font-mono text-text-ghost uppercase tracking-wider w-32">
                    Integrity
                  </span>
                  <div className="flex-1 flex items-center gap-3">
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-phosphor/10 border border-phosphor/30"
                      animate={verificationComplete ? { scale: [1, 1.1, 1] } : {}}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-phosphor" />
                      </span>
                      <span className="font-mono text-phosphor font-bold">
                        {certificateData.status}
                      </span>
                    </motion.div>
                    <span className="text-xs text-text-ghost">
                      All hashes match. No tampering detected.
                    </span>
                  </div>
                </div>

                {/* Last Verification */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <span className="text-sm font-mono text-text-ghost uppercase tracking-wider w-32">
                    Last Verified
                  </span>
                  <div className="flex-1">
                    <span className="font-mono text-text-body text-sm">
                      {new Date(certificateData.lastVerification).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* ASCII art border */}
              <div className="font-mono text-text-ghost text-xs mt-6 opacity-50">
                ╚══════════════════════════════════════════════════════════════════╝
              </div>
            </div>

            {/* Verify button */}
            <div className="px-8 py-6 border-t border-border-subtle bg-surface-2/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-text-ghost">
                  Run independent verification to confirm integrity.
                </p>
                <motion.button
                  className={`
                    px-6 py-3 rounded font-mono text-sm uppercase tracking-wider
                    transition-all duration-300
                    ${isVerifying
                      ? "bg-neural-1/20 text-neural-1 border border-neural-1/30 cursor-wait"
                      : verificationComplete
                      ? "bg-phosphor/20 text-phosphor border border-phosphor/30"
                      : "bg-surface-3 text-text-body border border-border-default hover:border-neural-1/50 hover:text-neural-1"
                    }
                  `}
                  onClick={runVerification}
                  disabled={isVerifying}
                  whileHover={!isVerifying ? { scale: 1.02 } : {}}
                  whileTap={!isVerifying ? { scale: 0.98 } : {}}
                >
                  {isVerifying ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        className="inline-block w-4 h-4 border-2 border-neural-1/30 border-t-neural-1 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Verifying...
                    </span>
                  ) : verificationComplete ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Verified ✓
                    </span>
                  ) : (
                    "Run Verification"
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom text + Deep Dive link */}
          <motion.div
            className="mt-12 text-center space-y-4"
            variants={itemVariants}
          >
            <p className="text-text-ghost text-sm">
              Banks require it. Insurance demands it.{" "}
              <span className="text-neural-1">We deliver it.</span>
            </p>
            <a
              href="/proof"
              className="inline-flex items-center gap-2 text-sm text-phosphor hover:text-phosphor-dim transition-colors group"
            >
              <span>Deep Dive: Try to Tamper</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export function QEDCertificate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2000);
  };

  const certificateData = {
    chainId: "ALKEM1-EVIDENCE-CHAIN-001",
    totalBlocks: 12847,
    genesisHash: "0000000000000000",
    latestHash: "1234567890abcdef",
    verifiedAt: "2026-01-16T15:38:50Z",
    algorithm: "SHA-256",
    status: "VALID",
  };

  return (
    <section ref={ref} className="relative py-16 px-6 pb-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-display text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Q.E.D. Certificate
            </h2>
            <p className="text-text-body">
              Quod Erat Demonstrandum — &ldquo;That which was to be demonstrated&rdquo;
            </p>
          </div>

          {/* Certificate */}
          <div className="relative">
            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-phosphor/50" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-phosphor/50" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-phosphor/50" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-phosphor/50" />

            <div className="p-8 rounded-lg bg-surface-1/80 border border-phosphor/30">
              {/* Certificate header */}
              <div className="text-center mb-8 pb-6 border-b border-border-subtle">
                <div className="inline-flex items-center gap-2 mb-4">
                  <svg className="w-8 h-8 text-phosphor" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-2xl font-display text-phosphor" style={{ fontFamily: "var(--font-instrument-serif)" }}>
                    ALKEM1
                  </span>
                </div>
                <h3 className="text-xl font-mono text-text-bright">
                  INTEGRITY CERTIFICATE
                </h3>
                <p className="text-xs text-text-ghost mt-2">
                  This certificate mathematically proves the integrity of the evidence chain.
                </p>
              </div>

              {/* Certificate body */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-xs text-text-ghost uppercase tracking-wider">Chain ID</label>
                  <p className="font-mono text-sm text-text-body mt-1">{certificateData.chainId}</p>
                </div>
                <div>
                  <label className="text-xs text-text-ghost uppercase tracking-wider">Total Blocks</label>
                  <p className="font-mono text-sm text-phosphor mt-1">{certificateData.totalBlocks.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-xs text-text-ghost uppercase tracking-wider">Genesis Hash</label>
                  <p className="font-mono text-sm text-text-body mt-1">{certificateData.genesisHash}</p>
                </div>
                <div>
                  <label className="text-xs text-text-ghost uppercase tracking-wider">Latest Hash</label>
                  <p className="font-mono text-sm text-text-body mt-1">{certificateData.latestHash}</p>
                </div>
                <div>
                  <label className="text-xs text-text-ghost uppercase tracking-wider">Algorithm</label>
                  <p className="font-mono text-sm text-text-body mt-1">{certificateData.algorithm}</p>
                </div>
                <div>
                  <label className="text-xs text-text-ghost uppercase tracking-wider">Verified At</label>
                  <p className="font-mono text-sm text-text-body mt-1">
                    {new Date(certificateData.verifiedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="text-center py-6 border-t border-b border-border-subtle mb-6">
                {isVerified ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-3"
                  >
                    <div className="w-4 h-4 rounded-full bg-phosphor animate-pulse" />
                    <span className="text-2xl font-mono text-phosphor">
                      STATUS: VALID ✓
                    </span>
                  </motion.div>
                ) : (
                  <span className="text-lg font-mono text-text-ghost">
                    STATUS: PENDING VERIFICATION
                  </span>
                )}
              </div>

              {/* Verify button */}
              <div className="text-center">
                <button
                  onClick={handleVerify}
                  disabled={isVerifying || isVerified}
                  className={`
                    px-8 py-3 rounded-lg font-mono text-sm transition-all
                    ${isVerified
                      ? "bg-phosphor/20 text-phosphor cursor-default"
                      : isVerifying
                        ? "bg-surface-2 text-text-ghost cursor-wait"
                        : "bg-phosphor text-void hover:bg-phosphor-dim"
                    }
                  `}
                >
                  {isVerifying ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying Chain...
                    </span>
                  ) : isVerified ? (
                    "Q.E.D. — Verified"
                  ) : (
                    "Run Independent Verification"
                  )}
                </button>
              </div>

              {/* Q.E.D. footer */}
              {isVerified && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-border-subtle text-center"
                >
                  <p className="text-lg font-display text-text-bright italic" style={{ fontFamily: "var(--font-instrument-serif)" }}>
                    &ldquo;Quod Erat Demonstrandum&rdquo;
                  </p>
                  <p className="text-xs text-text-ghost mt-2">
                    The integrity of this evidence chain has been mathematically proven.
                    <br />
                    This certificate is court-admissible.
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Download button */}
          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-2 border border-border-subtle text-text-ghost hover:text-text-body hover:border-phosphor/30 transition-colors font-mono text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Certificate (PDF)
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/Button";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-surface-1/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Quote */}
          <blockquote className="mb-12">
            <p
              className="font-display text-3xl md:text-4xl lg:text-5xl text-text-bright leading-tight"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              &ldquo;We don&apos;t sell AI.
              <br />
              <span className="text-phosphor">We sell control over AI.</span>&rdquo;
            </p>
          </blockquote>

          {/* Primary CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button variant="primary" size="lg" className="min-w-[200px]">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Request Audit
            </Button>

            <Button variant="ghost" size="lg" className="min-w-[200px]">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Proof Pack (PDF)
            </Button>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-text-ghost hover:text-phosphor transition-colors group"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Book 20-min Executive Briefing</span>
              <span className="text-text-ghost/50 group-hover:text-phosphor/50 transition-colors">
                →
              </span>
            </a>
          </motion.div>

          {/* Contact grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="text-center">
              <h4 className="text-xs font-mono text-text-ghost uppercase tracking-wider mb-2">
                For Investors
              </h4>
              <a
                href="mailto:investor@alkem1.ai"
                className="text-phosphor hover:text-phosphor-dim transition-colors"
              >
                investor@alkem1.ai
              </a>
            </div>

            <div className="text-center">
              <h4 className="text-xs font-mono text-text-ghost uppercase tracking-wider mb-2">
                For Enterprise
              </h4>
              <a
                href="mailto:enterprise@alkem1.ai"
                className="text-phosphor hover:text-phosphor-dim transition-colors"
              >
                enterprise@alkem1.ai
              </a>
            </div>

            <div className="text-center">
              <h4 className="text-xs font-mono text-text-ghost uppercase tracking-wider mb-2">
                Technical Docs
              </h4>
              <a
                href="#"
                className="text-phosphor hover:text-phosphor-dim transition-colors"
              >
                docs.alkem1.ai
              </a>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="pt-8 border-t border-border-subtle"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-text-ghost">
                © 2026 ALKEM1. The Glass Box AI.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-text-ghost hover:text-text-body transition-colors">
                  Privacy
                </a>
                <span className="text-text-ghost/30">·</span>
                <a href="#" className="text-sm text-text-ghost hover:text-text-body transition-colors">
                  Terms
                </a>
                <span className="text-text-ghost/30">·</span>
                <a href="#" className="text-sm text-text-ghost hover:text-text-body transition-colors">
                  Security
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

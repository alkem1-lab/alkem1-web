"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function StoryChapter3() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Chapter Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.div
            className="text-sm font-mono text-phosphor mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            CHAPTER 3
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-text-body mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            The Judge
          </motion.h2>
          <motion.p
            className="text-xl text-text-ghost max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Trust, but verify. Always verify.
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Left: Visual Element */}
          <motion.div
            className="relative"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            {/* Sandbox Visualization */}
            <div className="bg-surface-1 border border-phosphor/20 rounded-lg p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-ember animate-pulse" />
                <span className="text-sm font-mono text-text-ghost">SANDBOX EXECUTION</span>
              </div>
              
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-2 h-2 bg-phosphor rounded-full" />
                  <span className="text-sm text-text-ghost">Security check: PASS</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  <div className="w-2 h-2 bg-phosphor rounded-full" />
                  <span className="text-sm text-text-ghost">Syntax validation: PASS</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  <div className="w-2 h-2 bg-phosphor rounded-full" />
                  <span className="text-sm text-text-ghost">Execution test: PASS</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 mt-6 pt-6 border-t border-phosphor/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.1 }}
                >
                  <div className="w-3 h-3 bg-ember rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-ember">VERIFIED ✓</span>
                </motion.div>
              </div>
            </div>

            {/* Shield Icon */}
            <motion.div
              className="absolute -top-4 -right-4 text-6xl text-phosphor/20"
              animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              🛡️
            </motion.div>
          </motion.div>

          {/* Right: Story Text */}
          <motion.div
            className="space-y-6 text-lg leading-relaxed"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <p className="text-text-body">
              Meet <span className="text-ember font-semibold">Judge Dredd</span>.
              The final arbiter. The one who doesn't trust promises—only proof.
            </p>
            <p className="text-text-ghost">
              While others might say "this looks good," Judge Dredd says:
              <span className="text-phosphor"> "Show me."</span>
            </p>
            <p className="text-text-body">
              Every solution runs in a <span className="text-phosphor font-semibold">sandbox</span>.
              Isolated. Secure. Limited. If it works here, it works. If it doesn't, it's rejected.
              No exceptions. No excuses.
            </p>
            <div className="mt-8 p-6 bg-surface-1/50 border border-ember/20 rounded-lg backdrop-blur-sm">
              <p className="text-sm font-mono text-ember mb-2">ABSOLUTE ZERO PRINCIPLE</p>
              <p className="text-text-body italic">
                "Never trust an LLM's output. Always verify through execution.
                A solution that looks perfect but doesn't run is worse than no solution at all."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

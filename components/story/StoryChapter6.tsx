"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function StoryChapter6() {
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
            CHAPTER 6
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-text-body mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            The Guardian
          </motion.h2>
          <motion.p
            className="text-xl text-text-ghost max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Trust is dead. Verification is alive.
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="space-y-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Joker Agent */}
          <motion.div
            className="bg-surface-1 border border-ember/30 rounded-lg p-8"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">🃏</div>
              <div>
                <h3 className="text-2xl font-bold text-ember mb-2">The Joker Agent</h3>
                <p className="text-sm font-mono text-text-ghost">Self-Attacking Security</p>
              </div>
            </div>
            <p className="text-lg text-text-body leading-relaxed mb-4">
              While the system learns, <span className="text-ember font-semibold">Joker</span> attacks.
              Not from outside—from within. It's the system's own red team, running 24/7,
              finding vulnerabilities before real attackers do.
            </p>
            <p className="text-text-ghost leading-relaxed">
              Every attack is logged. Every defense is tested. Every weakness becomes a lesson.
              <span className="text-phosphor"> The system that attacks itself is the system that can't be broken.</span>
            </p>
          </motion.div>

          {/* Cryptography */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
            }}
          >
            {/* SHA-256 */}
            <div className="bg-surface-1/50 border border-phosphor/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🔐</div>
                <h4 className="text-xl font-bold text-phosphor">SHA-256</h4>
              </div>
              <p className="text-text-ghost mb-3">
                Every piece of data gets a <span className="text-phosphor font-semibold">cryptographic fingerprint</span>.
                Change one byte, the hash changes completely.
              </p>
              <div className="font-mono text-xs text-text-ghost bg-void p-3 rounded border border-phosphor/10">
                SSOT Seal: <span className="text-phosphor">a3f8b2...</span>
                <br />
                Evidence Chain: <span className="text-phosphor">7c9d1e...</span>
                <br />
                Bridge Files: <span className="text-phosphor">2b4f6a...</span>
              </div>
            </div>

            {/* Ed25519 */}
            <div className="bg-surface-1/50 border border-ember/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">✍️</div>
                <h4 className="text-xl font-bold text-ember">Ed25519</h4>
              </div>
              <p className="text-text-ghost mb-3">
                Every critical action is <span className="text-ember font-semibold">digitally signed</span>.
                Authenticity guaranteed. Non-repudiation enforced.
              </p>
              <div className="font-mono text-xs text-text-ghost bg-void p-3 rounded border border-ember/10">
                Model Signing: <span className="text-ember">✓ Verified</span>
                <br />
                Ledger Events: <span className="text-ember">✓ Signed</span>
                <br />
                Deploy Tokens: <span className="text-ember">✓ Authenticated</span>
              </div>
            </div>
          </motion.div>

          {/* Kill Switch */}
          <motion.div
            className="bg-surface-1 border border-ember/30 rounded-lg p-8"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">🛑</div>
              <div>
                <h3 className="text-2xl font-bold text-ember mb-2">The Kill Switch</h3>
                <p className="text-sm font-mono text-text-ghost">Emergency Stop Mechanism</p>
              </div>
            </div>
            <p className="text-lg text-text-body leading-relaxed mb-4">
              When something goes wrong—when budget exceeds, when security is breached,
              when behavior deviates—the system <span className="text-ember font-semibold">stops itself</span>.
            </p>
            <p className="text-text-ghost leading-relaxed">
              Not a human decision. Not a delayed response. <span className="text-phosphor">Instant. Automatic. Absolute.</span>
            </p>
            <div className="mt-6 p-4 bg-void border border-ember/30 rounded">
              <p className="text-sm font-mono text-ember mb-2">KILL SWITCH TRIGGERS</p>
              <ul className="text-sm text-text-ghost space-y-1">
                <li>• Budget exceeded: Hard cap hit</li>
                <li>• Security violation: Sandbox escape detected</li>
                <li>• Model collapse: Distribution validator failed</li>
                <li>• Manual override: Emergency stop activated</li>
              </ul>
            </div>
          </motion.div>

          {/* Key Insight */}
          <motion.div
            className="bg-surface-1/50 border border-phosphor/30 rounded-lg p-8 backdrop-blur-sm"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } },
            }}
          >
            <p className="text-sm font-mono text-phosphor mb-4">THE SECURITY PRINCIPLE</p>
            <p className="text-lg text-text-body leading-relaxed italic">
              "Security isn't a feature you add. It's a layer you build into every component.
              Every decision. Every action. Trust nothing. Verify everything."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

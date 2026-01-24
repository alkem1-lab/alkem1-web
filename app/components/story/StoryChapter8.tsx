"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const trainingStages = [
  {
    name: "Memory",
    action: "Store & Recall",
    icon: "💾",
    color: "text-phosphor",
    description: "Every verified solution becomes a memory. Searchable. Retrievable. Permanent.",
  },
  {
    name: "Factory",
    action: "Refine & Filter",
    icon: "🏭",
    color: "text-ember",
    description: "Quality over quantity. Deduplication. Habituation filter prevents overfitting.",
  },
  {
    name: "Arena",
    action: "Test & Compare",
    icon: "⚔️",
    color: "text-phosphor",
    description: "50 locked test problems. New model must beat old model. No regression allowed.",
  },
  {
    name: "Forge",
    action: "Train & Improve",
    icon: "🔥",
    color: "text-ember",
    description: "LoRA fine-tuning. Small adapter, big improvement. Cryptographically signed.",
  },
];

export function StoryChapter8() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto">
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
            CHAPTER 8
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-text-body mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            The Complete Cycle
          </motion.h2>
          <motion.p
            className="text-xl text-text-ghost max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            From solution to memory to model. The flywheel that never stops.
          </motion.p>
        </motion.div>

        {/* Story Introduction */}
        <motion.div
          className="mb-16 max-w-3xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          <motion.p
            className="text-lg text-text-body leading-relaxed mb-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Solving problems is just the beginning. The real magic happens when
            <span className="text-phosphor font-semibold"> solutions become training data</span>,
            and training data creates a better model.
          </motion.p>
          <motion.p
            className="text-lg text-text-ghost leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            This is the <span className="text-ember font-semibold">Data Flywheel</span>:
            a self-sustaining cycle of improvement.
          </motion.p>
        </motion.div>

        {/* Training Stages */}
        <motion.div
          className="space-y-8 mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {trainingStages.map((stage, index) => (
            <motion.div
              key={stage.name}
              className="bg-surface-1 border border-phosphor/20 rounded-lg p-8 hover:border-phosphor/40 transition-colors"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6 },
                },
              }}
              whileHover={{ x: 10 }}
            >
              <div className="flex items-center gap-6">
                <div className="text-5xl">{stage.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className={`text-2xl font-bold ${stage.color}`}>
                      {stage.name}
                    </h3>
                    <span className="text-sm font-mono text-text-ghost bg-void px-3 py-1 rounded border border-phosphor/10">
                      {stage.action}
                    </span>
                  </div>
                  <p className="text-text-body leading-relaxed">{stage.description}</p>
                </div>
                {index < trainingStages.length - 1 && (
                  <motion.div
                    className="hidden md:block text-3xl text-phosphor/40"
                    animate={isInView ? { rotate: [0, 90, 0] } : {}}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                  >
                    ↓
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* LoRA Deep Dive */}
        <motion.div
          className="bg-surface-1 border border-ember/30 rounded-lg p-8 mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.8, duration: 0.8 },
            },
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl">🔥</div>
            <div>
              <h3 className="text-2xl font-bold text-ember mb-2">LoRA: The Efficient Upgrade</h3>
              <p className="text-sm font-mono text-text-ghost">Low-Rank Adaptation</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-text-body leading-relaxed mb-4">
                Instead of retraining the entire model (expensive, slow), Valkyrie uses
                <span className="text-ember font-semibold"> LoRA adapters</span>—small, focused updates
                that modify behavior without changing the base.
              </p>
              <p className="text-text-ghost leading-relaxed">
                Think of it like learning a new skill without forgetting old ones.
                <span className="text-phosphor"> Efficient. Fast. Reversible.</span>
              </p>
            </div>
            <div className="bg-void border border-ember/10 rounded-lg p-6">
              <p className="text-sm font-mono text-ember mb-3">LORA BENEFITS</p>
              <ul className="text-sm text-text-ghost space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-phosphor">✓</span> 10x faster than full fine-tuning
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-phosphor">✓</span> 100x smaller file size
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-phosphor">✓</span> Can stack multiple adapters
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-phosphor">✓</span> Cryptographically signed
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* The Cycle Visualization */}
        <motion.div
          className="text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { delay: 1.2, duration: 0.8 },
            },
          }}
        >
          <div className="inline-flex items-center gap-4 bg-surface-1 border border-phosphor/20 rounded-lg p-6">
            <span className="text-2xl font-bold text-phosphor">SPICE</span>
            <span className="text-3xl text-phosphor/40">→</span>
            <span className="text-2xl font-bold text-phosphor">Memory</span>
            <span className="text-3xl text-phosphor/40">→</span>
            <span className="text-2xl font-bold text-ember">Factory</span>
            <span className="text-3xl text-phosphor/40">→</span>
            <span className="text-2xl font-bold text-phosphor">Arena</span>
            <span className="text-3xl text-phosphor/40">→</span>
            <span className="text-2xl font-bold text-ember">Forge</span>
            <motion.span
              className="text-3xl text-phosphor/40 ml-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ↻
            </motion.span>
          </div>
          <p className="text-sm text-text-ghost mt-4 font-mono">
            The cycle continues. Every iteration makes the next one better.
          </p>
        </motion.div>

        {/* Key Insight */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 1.4, duration: 0.8 },
            },
          }}
        >
          <div className="bg-surface-1/50 border border-phosphor/30 rounded-lg p-8 backdrop-blur-sm">
            <p className="text-sm font-mono text-phosphor mb-4">THE FLYWHEEL PRINCIPLE</p>
            <p className="text-lg text-text-body leading-relaxed italic">
              "Every solution becomes knowledge. Every knowledge becomes training.
              Every training becomes improvement. Every improvement enables harder problems.
              The cycle never ends. The growth never stops."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

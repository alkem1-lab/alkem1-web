"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const flywheelStages = [
  { name: "SPICE", description: "Generate & Solve", color: "text-phosphor" },
  { name: "Memory", description: "Store & Recall", color: "text-phosphor" },
  { name: "Factory", description: "Refine & Filter", color: "text-ember" },
  { name: "Arena", description: "Test & Compare", color: "text-phosphor" },
  { name: "Forge", description: "Train & Improve", color: "text-ember" },
];

export function StoryChapter5() {
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
            CHAPTER 5
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-text-body mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            The Forge
          </motion.h2>
          <motion.p
            className="text-xl text-text-ghost max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Where knowledge becomes intelligence
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
            But solving problems isn't enough. The system must <span className="text-ember font-semibold">evolve</span>.
            It must become better at solving problems. It must learn from its successes.
          </motion.p>
          <motion.p
            className="text-lg text-text-ghost leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            This is the <span className="text-phosphor font-semibold">Data Flywheel</span>:
            a self-sustaining cycle where every solution makes the next one easier.
          </motion.p>
        </motion.div>

        {/* Flywheel Visualization */}
        <motion.div
          className="relative mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {flywheelStages.map((stage, index) => (
              <motion.div
                key={stage.name}
                className="flex flex-col items-center gap-4"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { delay: index * 0.2, duration: 0.5 },
                  },
                }}
              >
                <div className="bg-surface-1 border border-phosphor/20 rounded-lg p-6 w-32 text-center hover:border-phosphor/40 transition-colors">
                  <div className={`text-2xl font-bold mb-2 ${stage.color}`}>
                    {stage.name}
                  </div>
                  <div className="text-xs text-text-ghost">{stage.description}</div>
                </div>
                {index < flywheelStages.length - 1 && (
                  <motion.div
                    className="text-2xl text-phosphor/40"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Circular arrow back to start */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <div className="text-4xl text-phosphor/40 mb-2">↻</div>
            <p className="text-sm text-text-ghost font-mono">The cycle continues</p>
          </motion.div>
        </motion.div>

        {/* Key Insight */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 1.4, duration: 0.8 },
            },
          }}
        >
          <div className="bg-surface-1/50 border border-ember/30 rounded-lg p-8 backdrop-blur-sm">
            <p className="text-sm font-mono text-ember mb-4">THE FLYWHEEL PRINCIPLE</p>
            <p className="text-lg text-text-body leading-relaxed mb-4">
              Every verified solution becomes training data. Every training cycle produces a better model.
              Every better model solves harder problems. Every harder problem creates better solutions.
            </p>
            <p className="text-text-ghost italic">
              This is exponential growth. This is compounding intelligence.
              This is how an AI becomes more than the sum of its parts.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

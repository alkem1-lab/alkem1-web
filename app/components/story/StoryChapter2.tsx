"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const hydraAgents = [
  { name: "Hacker", emoji: "🏴‍☠️", color: "text-ember", description: "Shortest solution" },
  { name: "Analyst", emoji: "📊", color: "text-phosphor", description: "Data-driven approach" },
  { name: "Architect", emoji: "🏗️", color: "text-phosphor", description: "Clean design" },
  { name: "Reviewer", emoji: "🔍", color: "text-phosphor", description: "Finds bugs" },
  { name: "Optimizer", emoji: "⚡", color: "text-ember", description: "Speed first" },
  { name: "Teacher", emoji: "📚", color: "text-phosphor", description: "Clear explanation" },
  { name: "Debugger", emoji: "🐛", color: "text-ember", description: "Defensive code" },
  { name: "Creative", emoji: "🎨", color: "text-phosphor", description: "Unusual approach" },
];

export function StoryChapter2() {
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
            CHAPTER 2
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-text-body mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            The Team
          </motion.h2>
          <motion.p
            className="text-xl text-text-ghost max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Eight minds, one mission, infinite perspectives
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
            When Challenger posed a question, it didn't wait for one answer.
            It called upon <span className="text-phosphor font-semibold">Hydra</span>—eight specialized agents,
            each with a unique perspective, each working in parallel.
          </motion.p>
          <motion.p
            className="text-lg text-text-ghost leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Why eight? Because diversity breeds robustness. If one fails, seven others succeed.
            If one sees a flaw, another finds the fix. <span className="text-ember">Consensus emerges from chaos.</span>
          </motion.p>
        </motion.div>

        {/* Hydra Agents Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {hydraAgents.map((agent, index) => (
            <motion.div
              key={agent.name}
              className="bg-surface-1 border border-phosphor/20 rounded-lg p-6 text-center hover:border-phosphor/40 transition-colors"
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="text-4xl mb-3"
                animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {agent.emoji}
              </motion.div>
              <h3 className={`font-bold text-lg mb-2 ${agent.color}`}>
                {agent.name}
              </h3>
              <p className="text-sm text-text-ghost">{agent.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Insight */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.8, duration: 0.8 },
            },
          }}
        >
          <div className="bg-surface-1/50 border border-ember/30 rounded-lg p-8 backdrop-blur-sm">
            <p className="text-sm font-mono text-ember mb-4">THE HYDRA PRINCIPLE</p>
            <p className="text-lg text-text-body leading-relaxed italic">
              "One mind can be wrong. Eight minds, working independently, find truth.
              The best solution isn't the first solution—it's the one that survives scrutiny."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

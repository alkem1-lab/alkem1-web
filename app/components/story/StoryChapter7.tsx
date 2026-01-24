"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const knowledgeSources = [
  {
    name: "Harvester",
    emoji: "🌐",
    color: "text-phosphor",
    description: "Online Knowledge",
    details: "Scrapes web, ArXiv, GitHub. Real-time learning from the internet.",
  },
  {
    name: "Books",
    emoji: "📚",
    color: "text-ember",
    description: "Local Knowledge",
    details: "PDFs, documents, books. Deep, structured knowledge from curated sources.",
  },
  {
    name: "Librarian",
    emoji: "📖",
    color: "text-phosphor",
    description: "Code Knowledge",
    details: "AST parsing of own codebase. Learns from its own implementation.",
  },
];

export function StoryChapter7() {
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
            CHAPTER 7
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-text-body mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            The Three Libraries
          </motion.h2>
          <motion.p
            className="text-xl text-text-ghost max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Knowledge from everywhere. Learning from everything.
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
            A system that only learns from itself becomes an echo chamber.
            <span className="text-phosphor font-semibold"> Valkyrie learns from three worlds:</span>
          </motion.p>
        </motion.div>

        {/* Knowledge Sources Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {knowledgeSources.map((source, index) => (
            <motion.div
              key={source.name}
              className="bg-surface-1 border border-phosphor/20 rounded-lg p-8 hover:border-phosphor/40 transition-colors"
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                },
              }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-5xl mb-4 text-center">{source.emoji}</div>
              <h3 className={`text-2xl font-bold mb-2 text-center ${source.color}`}>
                {source.name}
              </h3>
              <p className="text-sm font-mono text-text-ghost mb-4 text-center">
                {source.description}
              </p>
              <p className="text-text-body leading-relaxed">{source.details}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Processing Pipeline */}
        <motion.div
          className="bg-surface-1 border border-phosphor/20 rounded-lg p-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.6, duration: 0.8 },
            },
          }}
        >
          <h3 className="text-2xl font-bold text-text-body mb-6 text-center">
            The Refinery: From Raw Data to Knowledge
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1. Ingest", desc: "Collect from all sources" },
              { step: "2. Enrich", desc: "LLM summaries & metadata" },
              { step: "3. Parse", desc: "AST for code, semantic for text" },
              { step: "4. Store", desc: "Vector embeddings in Memory" },
            ].map((stage, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="bg-void border border-phosphor/10 rounded-lg p-4 mb-2">
                  <div className="text-sm font-mono text-phosphor mb-1">{stage.step}</div>
                  <div className="text-xs text-text-ghost">{stage.desc}</div>
                </div>
                {i < 3 && (
                  <div className="hidden md:block text-2xl text-phosphor/40 mt-4">→</div>
                )}
              </motion.div>
            ))}
          </div>
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
              transition: { delay: 1.2, duration: 0.8 },
            },
          }}
        >
          <div className="bg-surface-1/50 border border-ember/30 rounded-lg p-8 backdrop-blur-sm">
            <p className="text-sm font-mono text-ember mb-4">THE KNOWLEDGE PRINCIPLE</p>
            <p className="text-lg text-text-body leading-relaxed italic">
              "A system that only learns from itself becomes an echo chamber.
              A system that learns from everywhere becomes a universe of knowledge."
            </p>
            <p className="text-text-ghost mt-4">
              <span className="text-phosphor">Harvester</span> brings the latest research.
              <span className="text-ember"> Books</span> bring deep understanding.
              <span className="text-phosphor"> Librarian</span> brings self-awareness.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

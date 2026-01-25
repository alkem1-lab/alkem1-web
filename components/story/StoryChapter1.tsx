"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function StoryChapter1() {
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
            CHAPTER 1
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-text-body mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            The Challenge
          </motion.h2>
          <motion.p
            className="text-xl text-text-ghost max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Every great journey begins with a question
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
          {/* Left: Story Text */}
          <motion.div
            className="space-y-6 text-lg leading-relaxed"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <p className="text-text-body">
              In the beginning, there was <span className="text-phosphor font-semibold">Challenger</span>.
              A curious mind that roamed through code, scanning every function, every class, every line.
            </p>
            <p className="text-text-ghost">
              "How does this work?" it would ask. "What if we tried this differently?"
              "Can we solve this problem that no one has solved before?"
            </p>
            <p className="text-text-body">
              Challenger didn't just read code. It <span className="text-ember font-semibold">understood context</span>.
              It saw patterns. It identified gaps. It created problems that pushed boundaries.
            </p>
            <div className="mt-8 p-6 bg-surface-1/50 border border-phosphor/20 rounded-lg backdrop-blur-sm">
              <p className="text-sm font-mono text-phosphor mb-2">THE CHALLENGER'S MISSION</p>
              <p className="text-text-body italic">
                "I don't give easy tasks. I give tasks that make you think.
                Tasks that reveal what you truly know—and what you don't."
              </p>
            </div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            className="relative"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            {/* Animated Code Block */}
            <div className="bg-surface-1 border border-phosphor/20 rounded-lg p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-ember" />
                <div className="w-3 h-3 rounded-full bg-phosphor" />
                <div className="w-3 h-3 rounded-full bg-text-ghost" />
              </div>
              <motion.pre
                className="text-text-ghost"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="text-phosphor">def</span>{" "}
                <span className="text-ember">challenge</span>():
                {"\n  "}
                <span className="text-text-ghost"># Scan the codebase</span>
                {"\n  "}
                <span className="text-phosphor">for</span> pattern{" "}
                <span className="text-phosphor">in</span> corpus:
                {"\n    "}
                <span className="text-ember">generate_question</span>(pattern)
                {"\n    "}
                <span className="text-phosphor">if</span> difficulty &gt; threshold:
                {"\n      "}
                <span className="text-ember">yield</span> challenge
              </motion.pre>
            </div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-phosphor/40 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

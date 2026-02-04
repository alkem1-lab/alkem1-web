"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

// Helper function to round to avoid hydration mismatches
const round = (num: number, decimals: number = 2) => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export function StoryChapter4() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Pre-calculate positions to avoid hydration mismatches
  const networkData = useMemo(() => {
    const connections = [...Array(6)].map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 80;
      const x1 = 100;
      const y1 = 100;
      const x2 = round(100 + Math.cos(angle) * radius, 2);
      const y2 = round(100 + Math.sin(angle) * radius, 2);
      return { x1, y1, x2, y2 };
    });

    const nodes = [...Array(12)].map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 80;
      const x = round(50 + Math.cos(angle) * (radius / 2.5), 2);
      const y = round(50 + Math.sin(angle) * (radius / 2.5), 2);
      return { x, y };
    });

    return { connections, nodes };
  }, []);

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
            CHAPTER 4
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-text-body mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            The Memory
          </motion.h2>
          <motion.p
            className="text-xl text-text-ghost max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            What is learned is never forgotten
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
              Every verified solution doesn't just solve a problem.
              It becomes part of <span className="text-phosphor font-semibold">Memory</span>—
              a vast, searchable archive of knowledge.
            </p>
            <p className="text-text-ghost">
              When a new challenge arrives, Memory doesn't start from scratch.
              It searches. It finds similar problems. It recalls what worked before.
              <span className="text-ember"> Learning compounds.</span>
            </p>
            <p className="text-text-body">
              This isn't just storage. It's <span className="text-phosphor font-semibold">semantic search</span>.
              Memory understands meaning, not just keywords. It connects concepts.
              It finds patterns across domains.
            </p>
            <div className="mt-8 p-6 bg-surface-1/50 border border-phosphor/20 rounded-lg backdrop-blur-sm">
              <p className="text-sm font-mono text-phosphor mb-2">THE MEMORY PRINCIPLE</p>
              <p className="text-text-body italic">
                "Forgetting is a bug, not a feature. Every solution, every insight,
                every pattern—preserved forever, accessible instantly."
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
            {/* Memory Network Visualization */}
            <div className="bg-surface-1 border border-phosphor/20 rounded-lg p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-phosphor animate-pulse" />
                <span className="text-sm font-mono text-text-ghost">MEMORY NETWORK</span>
              </div>
              
              {/* Network nodes */}
              <div className="relative h-64">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  {/* Connection lines */}
                  {networkData.connections.map((conn, i) => (
                    <motion.path
                      key={i}
                      d={`M ${conn.x1} ${conn.y1} L ${conn.x2} ${conn.y2}`}
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      className="text-phosphor/20"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    />
                  ))}
                </svg>
                
                {networkData.nodes.map((node, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-phosphor rounded-full"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  />
                ))}
                
                {/* Center node */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-ember rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 }}
                />
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-text-ghost font-mono">
                  2,470+ verified solutions
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

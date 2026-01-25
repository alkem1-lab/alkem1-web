"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function StoryPrologue() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {/* Decorative quote marks */}
        <motion.div
          className="text-6xl md:text-8xl text-phosphor/20 font-serif mb-8"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
          }}
        >
          "
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-text-body leading-tight"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <span className="text-phosphor">Once upon a time,</span>
          <br />
          there was an AI that wanted to learn...
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-text-ghost max-w-2xl mx-auto leading-relaxed font-serif italic"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
          }}
        >
          Not just memorize. Not just follow instructions.
          <br />
          <span className="text-phosphor">To truly understand.</span>
        </motion.p>

        <motion.div
          className="mt-16 text-sm text-text-ghost font-mono"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.6 } },
          }}
        >
          Scroll to begin the journey →
        </motion.div>
      </motion.div>

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-phosphor/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ember/20 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
}

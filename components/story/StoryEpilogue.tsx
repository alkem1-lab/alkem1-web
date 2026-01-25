"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function StoryEpilogue() {
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
        {/* Closing quote marks */}
        <motion.div
          className="text-6xl md:text-8xl text-phosphor/20 font-serif mb-8"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
          }}
        >
          "
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-text-body leading-tight"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          And so the cycle continues.
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-text-ghost max-w-2xl mx-auto leading-relaxed mb-12 font-serif"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
          }}
        >
          Every challenge makes it stronger. Every solution makes it smarter.
          Every iteration brings it closer to true understanding.
        </motion.p>

        <motion.div
          className="space-y-6 mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
          }}
        >
          <p className="text-lg text-text-body">
            This is <span className="text-phosphor font-semibold">Valkyrie</span>.
          </p>
          <p className="text-lg text-text-ghost">
            An AI that doesn't just execute. It learns. It improves. It evolves.
          </p>
          <p className="text-lg text-text-body">
            And it never stops.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } },
          }}
        >
          <Link href="/architecture">
            <Button variant="primary" size="lg">
              Explore Architecture
            </Button>
          </Link>
          <Link href="/investors">
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.div
          className="mt-16 text-sm text-text-ghost font-mono"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.8 } },
          }}
        >
          <p className="mb-2">Based on the Feynman Method</p>
          <p className="text-xs">
            "If you can't explain it simply, you don't understand it well enough."
          </p>
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

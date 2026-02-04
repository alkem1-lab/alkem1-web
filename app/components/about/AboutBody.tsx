"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ValkyrieIcon, SpiceIcon, XckIcon } from "../ui/Icons";

const organs = [
  {
    name: "Valkyrie",
    role: "Soul",
    description: "The governing intent that ensures every action is deterministic and signed.",
    icon: ValkyrieIcon,
    color: "neural-2",
    bgColor: "bg-neural-2/10",
    borderColor: "border-neural-2/30",
    textColor: "text-neural-2",
    bullets: [
      "Determinism & cryptographic signing",
      "Reproducible behavior",
      "Governed intent",
    ],
  },
  {
    name: "SPICE",
    role: "Mind",
    description: "The reasoning engine that learns, adapts, and improves through adversarial play.",
    icon: SpiceIcon,
    color: "phosphor",
    bgColor: "bg-phosphor/10",
    borderColor: "border-phosphor/30",
    textColor: "text-phosphor",
    bullets: [
      "Reasoning + challenger loop",
      "Learning pipeline (Arena/Forge)",
      "Memory with injection defense",
    ],
  },
  {
    name: "XCK",
    role: "Immune System",
    description: "The protective layer that detects threats and responds in milliseconds.",
    icon: XckIcon,
    color: "crimson",
    bgColor: "bg-crimson/10",
    borderColor: "border-crimson/30",
    textColor: "text-crimson",
    bullets: [
      "Real-time detection & response",
      "Kill switch + evidence chain",
      "Sandbox + zero-trust posture",
    ],
  },
];

export function AboutBody() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Visual illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          className="mb-16"
        >
          {/* Human silhouette concept */}
          <div className="relative flex justify-center items-center h-48 mb-8">
            {/* Central figure */}
            <div className="relative">
              {/* Head/Soul */}
              <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-neural-2/20 border border-neural-2/50 flex items-center justify-center"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-neural-2 text-lg">🔮</span>
              </motion.div>

              {/* Body/Mind */}
              <motion.div
                className="w-20 h-24 rounded-t-full bg-phosphor/10 border border-phosphor/30 flex items-center justify-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-phosphor text-2xl">🧠</span>
              </motion.div>

              {/* Shield/Immune */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-12 rounded-b-3xl bg-crimson/10 border border-crimson/30 flex items-center justify-center"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-crimson text-lg">🛡️</span>
              </motion.div>
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.line
                x1="50%" y1="25%" x2="50%" y2="40%"
                stroke="rgba(167, 139, 250, 0.3)"
                strokeWidth="2"
                strokeDasharray="4"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1 }}
              />
              <motion.line
                x1="50%" y1="60%" x2="50%" y2="75%"
                stroke="rgba(239, 68, 68, 0.3)"
                strokeWidth="2"
                strokeDasharray="4"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {organs.map((organ, index) => {
            const IconComponent = organ.icon;
            return (
              <motion.div
                key={organ.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                className={`
                  p-6 rounded-xl border ${organ.bgColor} ${organ.borderColor}
                  hover:scale-[1.02] transition-transform
                `}
              >
                {/* Icon */}
                <div className={`mb-4 ${organ.textColor}`}>
                  <IconComponent size={48} animated={false} />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-mono ${organ.textColor} mb-1`}>
                  {organ.name}
                </h3>
                <p className="text-sm text-text-ghost uppercase tracking-wider mb-3">
                  = {organ.role}
                </p>

                {/* Description */}
                <p className="text-sm text-text-body mb-4">
                  {organ.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2">
                  {organ.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-ghost">
                      <span className={`w-1.5 h-1.5 rounded-full ${organ.textColor} bg-current mt-1.5 flex-shrink-0`} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const flowSteps = [
  {
    id: 1,
    name: "Request",
    description: "User sends request via API/CLI",
    icon: "→",
    color: "text-text-body",
  },
  {
    id: 2,
    name: "Gatekeeper",
    description: "DLP patterns check",
    icon: "🛡️",
    color: "text-ember",
  },
  {
    id: 3,
    name: "Valkyrie",
    description: "Seed determinism",
    icon: "🔮",
    color: "text-neural-2",
  },
  {
    id: 4,
    name: "SPICE",
    description: "AI processing",
    icon: "🧠",
    color: "text-phosphor",
  },
  {
    id: 5,
    name: "Memory",
    description: "Context retrieval",
    icon: "💾",
    color: "text-neural-1",
  },
  {
    id: 6,
    name: "XCK",
    description: "Security validation",
    icon: "🛡️",
    color: "text-crimson",
  },
  {
    id: 7,
    name: "Evidence",
    description: "Hash chain append",
    icon: "📜",
    color: "text-phosphor",
  },
  {
    id: 8,
    name: "Response",
    description: "Verified output",
    icon: "✓",
    color: "text-phosphor",
  },
];

export function DataFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveStep(null);

    flowSteps.forEach((step, index) => {
      setTimeout(() => {
        setActiveStep(step.id);
        if (index === flowSteps.length - 1) {
          setTimeout(() => {
            setIsAnimating(false);
          }, 1000);
        }
      }, index * 400);
    });
  };

  return (
    <section ref={ref} className="relative py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className="text-2xl font-display text-text-bright mb-2"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Data Flow
            </h2>
            <p className="text-sm text-text-ghost mb-6">
              Every request passes through 8 checkpoints
            </p>
            <button
              onClick={runAnimation}
              disabled={isAnimating}
              className={`
                px-6 py-2 rounded-lg font-mono text-sm transition-all
                ${isAnimating
                  ? "bg-phosphor/20 text-phosphor cursor-wait"
                  : "bg-surface-2 text-text-body hover:bg-surface-3 border border-border-subtle"
                }
              `}
            >
              {isAnimating ? "Running..." : "▶ Animate Flow"}
            </button>
          </div>

          {/* Flow visualization */}
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-text-ghost/20 via-phosphor/30 to-phosphor/20 -translate-y-1/2" />

            {/* Steps */}
            <div className="relative flex justify-between items-center">
              {flowSteps.map((step, index) => {
                const isActive = activeStep === step.id;
                const isPast = activeStep !== null && step.id < activeStep;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.05 }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Node */}
                    <motion.div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        border-2 transition-all duration-300
                        ${isActive
                          ? "bg-phosphor/20 border-phosphor scale-125"
                          : isPast
                            ? "bg-phosphor/10 border-phosphor/50"
                            : "bg-surface-2 border-border-subtle"
                        }
                      `}
                      animate={isActive ? { scale: [1, 1.2, 1.1] } : {}}
                    >
                      <span className={`text-lg ${isActive ? "text-phosphor" : step.color}`}>
                        {step.icon}
                      </span>
                    </motion.div>

                    {/* Label */}
                    <div className="mt-3 text-center">
                      <div className={`text-xs font-mono ${isActive ? "text-phosphor" : "text-text-ghost"}`}>
                        {step.name}
                      </div>
                      <div className="text-[10px] text-text-ghost/70 max-w-[80px] hidden md:block">
                        {step.description}
                      </div>
                    </div>

                    {/* Pulse effect when active */}
                    {isActive && (
                      <motion.div
                        className="absolute top-0 w-12 h-12 rounded-full border-2 border-phosphor"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Timing info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-lg bg-surface-1/50 border border-border-subtle">
              <div className="text-center">
                <div className="text-2xl font-mono text-phosphor">47ms</div>
                <div className="text-xs text-text-ghost">Total latency</div>
              </div>
              <div className="w-px h-8 bg-border-subtle" />
              <div className="text-center">
                <div className="text-2xl font-mono text-crimson">0</div>
                <div className="text-xs text-text-ghost">Bypassed checks</div>
              </div>
              <div className="w-px h-8 bg-border-subtle" />
              <div className="text-center">
                <div className="text-2xl font-mono text-neural-1">100%</div>
                <div className="text-xs text-text-ghost">Audit coverage</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

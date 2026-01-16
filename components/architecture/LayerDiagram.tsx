"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Layer {
  id: number;
  name: string;
  subtitle: string;
  color: string;
  borderColor: string;
  bgColor: string;
  modules: {
    name: string;
    description: string;
    bullets: string[];
    proofLink?: string;
  }[];
}

const layers: Layer[] = [
  {
    id: 0,
    name: "LAYER 0",
    subtitle: "Determinism Core",
    color: "text-neural-2",
    borderColor: "border-neural-2/30",
    bgColor: "bg-neural-2/10",
    modules: [
      {
        name: "Valkyrie Protocol",
        description: "Seeds ALL randomness. Every decision is reproducible.",
        bullets: [
          "Cryptographic seed management",
          "Model signing & verification",
          "Deterministic execution guarantee",
        ],
        proofLink: "/proof",
      },
    ],
  },
  {
    id: 1,
    name: "LAYER 1",
    subtitle: "Intelligence",
    color: "text-phosphor",
    borderColor: "border-phosphor/30",
    bgColor: "bg-phosphor/10",
    modules: [
      {
        name: "SPICE Brain",
        description: "Self-evolving AI orchestrator with adversarial training.",
        bullets: [
          "Hydra: 8 parallel solutions",
          "Judge Dredd: Execution verification",
          "Sniper: Shortest valid code selection",
        ],
      },
      {
        name: "Memory Service",
        description: "Vector database with semantic search.",
        bullets: [
          "11,390+ knowledge chunks",
          "Legal document embeddings",
          "Context-aware retrieval",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "LAYER 2",
    subtitle: "Data Pipeline",
    color: "text-ember",
    borderColor: "border-ember/30",
    bgColor: "bg-ember/10",
    modules: [
      {
        name: "Factory",
        description: "Smart data export with habituation filtering.",
        bullets: [
          "Pattern deduplication",
          "Quality scoring",
          "Training data refinement",
        ],
      },
      {
        name: "Arena",
        description: "Model evaluation with golden test suite.",
        bullets: [
          "30 tasks across 9 types",
          "Regression detection",
          "Release gates",
        ],
      },
      {
        name: "Forge",
        description: "LoRA fine-tuning pipeline.",
        bullets: [
          "Incremental training",
          "Model versioning",
          "A/B testing support",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "LAYER 3",
    subtitle: "Interface",
    color: "text-text-body",
    borderColor: "border-border-subtle",
    bgColor: "bg-surface-2/50",
    modules: [
      {
        name: "CLI",
        description: "Command-line interface for all operations.",
        bullets: [
          "alkem1 health",
          "alkem1 audit --deep",
          "alkem1 factory export",
        ],
      },
      {
        name: "Infrastructure",
        description: "Docker orchestration and monitoring.",
        bullets: [
          "Gatekeeper DLP",
          "Prometheus + Grafana",
          "OpenTelemetry traces",
        ],
      },
    ],
  },
  {
    id: 4,
    name: "LAYER 4",
    subtitle: "API & Services",
    color: "text-neural-1",
    borderColor: "border-neural-1/30",
    bgColor: "bg-neural-1/10",
    modules: [
      {
        name: "Valkyrie API",
        description: "REST API with channel routing.",
        bullets: [
          "Multi-channel support",
          "Rate limiting",
          "Authentication",
        ],
      },
      {
        name: "Echo",
        description: "Voice adapter for spoken interaction.",
        bullets: [
          "Speech-to-text",
          "Text-to-speech",
          "Voice commands",
        ],
      },
      {
        name: "MRI Dashboard",
        description: "Real-time system monitoring.",
        bullets: [
          "Live metrics",
          "Iteration tracking",
          "Cost analysis",
        ],
      },
    ],
  },
  {
    id: 5,
    name: "SECURITY",
    subtitle: "XCK Enterprise Protection",
    color: "text-crimson",
    borderColor: "border-crimson/30",
    bgColor: "bg-crimson/10",
    modules: [
      {
        name: "XCK Security",
        description: "SOAR platform with 27+ security tools.",
        bullets: [
          "Kill Switch: 47ms response",
          "Evidence Chain: Tamper-proof",
          "Circuit Breaker: Auto-recovery",
        ],
        proofLink: "/proof",
      },
    ],
  },
];

export function LayerDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2
            className="text-2xl font-display text-text-bright mb-2"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Interactive Layer View
          </h2>
          <p className="text-sm text-text-ghost">
            Click any layer to explore its modules
          </p>
        </motion.div>

        {/* Layers stack */}
        <div className="space-y-4">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              {/* Layer header */}
              <button
                onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                className={`
                  w-full p-4 rounded-lg border transition-all duration-300
                  ${layer.bgColor} ${layer.borderColor}
                  ${selectedLayer === layer.id ? "ring-2 ring-offset-2 ring-offset-void ring-phosphor/50" : ""}
                  hover:scale-[1.01]
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-mono ${layer.color} uppercase tracking-wider`}>
                      {layer.name}
                    </span>
                    <span className="text-sm text-text-body">
                      {layer.subtitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-ghost">
                      {layer.modules.length} module{layer.modules.length > 1 ? "s" : ""}
                    </span>
                    <svg
                      className={`w-4 h-4 text-text-ghost transition-transform ${
                        selectedLayer === layer.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Expanded modules */}
              {selectedLayer === layer.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 ml-4 space-y-2"
                >
                  {layer.modules.map((module) => (
                    <div
                      key={module.name}
                      className={`
                        p-4 rounded-lg border transition-all cursor-pointer
                        ${layer.borderColor} bg-surface-1/50
                        ${selectedModule === module.name ? "ring-1" : ""}
                        hover:bg-surface-2/50
                      `}
                      onClick={() => setSelectedModule(selectedModule === module.name ? null : module.name)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`font-mono text-sm ${layer.color}`}>
                            {module.name}
                          </h4>
                          <p className="text-xs text-text-ghost mt-1">
                            {module.description}
                          </p>
                        </div>
                        {module.proofLink && (
                          <a
                            href={module.proofLink}
                            className="text-xs text-phosphor hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Proof →
                          </a>
                        )}
                      </div>

                      {/* Expanded bullets */}
                      {selectedModule === module.name && (
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 space-y-1"
                        >
                          {module.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-text-body">
                              <span className={`w-1 h-1 rounded-full ${layer.bgColor}`} />
                              {bullet}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Connection lines hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-text-ghost">
            Each layer communicates through well-defined interfaces.
            <br />
            <span className="text-phosphor">No layer can bypass another.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

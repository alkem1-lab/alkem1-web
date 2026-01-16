"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "organism" | "layers";

interface Organ {
  id: string;
  name: string;
  icon: string;
  layer: string;
  position: { top: string; left: string };
  color: string;
  purpose: string;
  modules: string[];
  metric?: string;
  proofLink?: string;
}

const organs: Organ[] = [
  {
    id: "soul",
    name: "Soul",
    icon: "❤️",
    layer: "L0: Determinism Core",
    position: { top: "22%", left: "50%" },
    color: "neural-2",
    purpose: "Signed, reproducible behavior. Every action is deterministic and verifiable.",
    modules: ["Seed Management", "Model Signing", "Replay Engine"],
    metric: "100% reproducible",
    proofLink: "/proof",
  },
  {
    id: "mind",
    name: "Mind",
    icon: "🧠",
    layer: "L1: Intelligence",
    position: { top: "12%", left: "50%" },
    color: "phosphor",
    purpose: "SPICE reasoning + adversarial challenger. Thinks, learns, adapts.",
    modules: ["SPICE Orchestrator", "Challenger Loop", "Head Reputation"],
    metric: "4,067+ iterations",
    proofLink: "/proof",
  },
  {
    id: "intake",
    name: "Lungs",
    icon: "🫁",
    layer: "L3: Interface",
    position: { top: "35%", left: "35%" },
    color: "ember",
    purpose: "How humans talk to the system. CLI, UI, extensions.",
    modules: ["CLI (alkem1)", "Dashboards", "IDE Extensions"],
    proofLink: "/playground",
  },
  {
    id: "digestion",
    name: "Stomach",
    icon: "🍽️",
    layer: "L2: Data Pipeline",
    position: { top: "50%", left: "50%" },
    color: "amber-400",
    purpose: "Turns experience into training data. Arena evaluates, Forge trains.",
    modules: ["Factory", "Arena", "Forge"],
    metric: "11K+ training samples",
  },
  {
    id: "nervous",
    name: "Spine",
    icon: "🧬",
    layer: "L4: API & Services",
    position: { top: "65%", left: "50%" },
    color: "cyan-400",
    purpose: "Moves signals between organs. Routing, orchestration, services.",
    modules: ["Valkyrie API", "Memory Service", "Echo Bridge"],
    proofLink: "/architecture",
  },
  {
    id: "immune",
    name: "Immune",
    icon: "🛡️",
    layer: "SECURITY: XCK",
    position: { top: "35%", left: "65%" },
    color: "crimson",
    purpose: "Detect → Contain → Prove. The guardian that never sleeps.",
    modules: ["Kill Switch", "Circuit Breaker", "Evidence Ledger", "Sandbox"],
    metric: "47ms response",
    proofLink: "/proof",
  },
];

const getColorClasses = (color: string) => {
  const map: Record<string, { text: string; bg: string; border: string; glow: string }> = {
    "neural-2": { text: "text-neural-2", bg: "bg-neural-2", border: "border-neural-2", glow: "shadow-neural-2/50" },
    phosphor: { text: "text-phosphor", bg: "bg-phosphor", border: "border-phosphor", glow: "shadow-phosphor/50" },
    ember: { text: "text-ember", bg: "bg-ember", border: "border-ember", glow: "shadow-ember/50" },
    "amber-400": { text: "text-amber-400", bg: "bg-amber-400", border: "border-amber-400", glow: "shadow-amber-400/50" },
    "cyan-400": { text: "text-cyan-400", bg: "bg-cyan-400", border: "border-cyan-400", glow: "shadow-cyan-400/50" },
    crimson: { text: "text-crimson", bg: "bg-crimson", border: "border-crimson", glow: "shadow-crimson/50" },
  };
  return map[color] || map.phosphor;
};

export function OrganismView() {
  const [viewMode, setViewMode] = useState<ViewMode>("organism");
  const [selectedOrgan, setSelectedOrgan] = useState<Organ | null>(organs[0]);
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-display text-text-bright mb-4"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            One organism. Six organs.{" "}
            <span className="text-phosphor">Zero blind spots.</span>
          </h2>
          <p className="text-text-ghost mb-6">
            Click an organ. See the modules. See the proof.
          </p>

          {/* View Toggle */}
          <div className="inline-flex items-center p-1 rounded-lg bg-surface-1 border border-border-subtle">
            <button
              onClick={() => setViewMode("organism")}
              className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${
                viewMode === "organism"
                  ? "bg-phosphor/20 text-phosphor"
                  : "text-text-ghost hover:text-text-body"
              }`}
            >
              🫀 Director View
            </button>
            <button
              onClick={() => setViewMode("layers")}
              className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${
                viewMode === "layers"
                  ? "bg-phosphor/20 text-phosphor"
                  : "text-text-ghost hover:text-text-body"
              }`}
            >
              📊 Engineer View
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Body Silhouette / Layer List */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {viewMode === "organism" ? (
                <motion.div
                  key="organism"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative aspect-[3/4] max-w-md mx-auto"
                >
                  {/* Body silhouette SVG */}
                  <svg
                    viewBox="0 0 200 300"
                    className="w-full h-full text-text-ghost/20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  >
                    {/* Head */}
                    <ellipse cx="100" cy="35" rx="25" ry="30" />
                    {/* Neck */}
                    <line x1="100" y1="65" x2="100" y2="80" />
                    {/* Torso */}
                    <path d="M 60 80 Q 60 120 70 160 L 80 200 L 100 200 L 120 200 L 130 160 Q 140 120 140 80 Z" />
                    {/* Arms */}
                    <path d="M 60 85 Q 40 100 30 140 Q 25 160 35 180" />
                    <path d="M 140 85 Q 160 100 170 140 Q 175 160 165 180" />
                    {/* Legs */}
                    <path d="M 80 200 L 70 280" />
                    <path d="M 120 200 L 130 280" />
                    {/* Spine */}
                    <line x1="100" y1="80" x2="100" y2="200" strokeDasharray="2,2" className="text-cyan-400/30" />
                  </svg>

                  {/* Organ Hotspots */}
                  {organs.map((organ) => {
                    const colors = getColorClasses(organ.color);
                    const isSelected = selectedOrgan?.id === organ.id;
                    const isHovered = hoveredOrgan === organ.id;

                    return (
                      <motion.button
                        key={organ.id}
                        className={`
                          absolute -translate-x-1/2 -translate-y-1/2 z-10
                          w-12 h-12 rounded-full flex items-center justify-center
                          border-2 transition-all cursor-pointer
                          ${isSelected ? `${colors.border} ${colors.glow} shadow-lg scale-110` : "border-border-subtle"}
                          ${isHovered ? "scale-105" : ""}
                          bg-surface-1/80 backdrop-blur-sm
                        `}
                        style={{ top: organ.position.top, left: organ.position.left }}
                        onClick={() => setSelectedOrgan(organ)}
                        onMouseEnter={() => setHoveredOrgan(organ.id)}
                        onMouseLeave={() => setHoveredOrgan(null)}
                        animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
                      >
                        <span className="text-xl">{organ.icon}</span>

                        {/* Pulse ring when selected */}
                        {isSelected && (
                          <motion.div
                            className={`absolute inset-0 rounded-full ${colors.border} border-2`}
                            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                    );
                  })}

                  {/* Hover Tooltip */}
                  <AnimatePresence>
                    {hoveredOrgan && !selectedOrgan && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-surface-1 border border-border-subtle rounded-lg text-sm"
                      >
                        {organs.find(o => o.id === hoveredOrgan)?.name} → {organs.find(o => o.id === hoveredOrgan)?.layer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="layers"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  {organs.map((organ) => {
                    const colors = getColorClasses(organ.color);
                    const isSelected = selectedOrgan?.id === organ.id;

                    return (
                      <button
                        key={organ.id}
                        onClick={() => setSelectedOrgan(organ)}
                        className={`
                          w-full p-4 rounded-lg border text-left transition-all
                          ${isSelected 
                            ? `${colors.border} bg-surface-2` 
                            : "border-border-subtle bg-surface-1/50 hover:border-text-ghost/30"
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{organ.icon}</span>
                            <div>
                              <span className={`font-mono text-xs ${colors.text}`}>
                                {organ.layer}
                              </span>
                              <div className="text-text-bright font-medium">
                                {organ.name}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-text-ghost">
                            {organ.modules.length} modules
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Organ Card Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <AnimatePresence mode="wait">
              {selectedOrgan && (
                <motion.div
                  key={selectedOrgan.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`
                    p-6 rounded-2xl border bg-surface-1/50 backdrop-blur-sm
                    ${getColorClasses(selectedOrgan.color).border}/30
                  `}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{selectedOrgan.icon}</span>
                        <div>
                          <h3 className="text-2xl font-display text-text-bright">
                            {selectedOrgan.name}
                          </h3>
                          <span className={`font-mono text-xs ${getColorClasses(selectedOrgan.color).text}`}>
                            {selectedOrgan.layer}
                          </span>
                        </div>
                      </div>
                    </div>
                    {selectedOrgan.metric && (
                      <div className={`px-3 py-1 rounded-full text-xs font-mono ${getColorClasses(selectedOrgan.color).text} bg-current/10`}>
                        {selectedOrgan.metric}
                      </div>
                    )}
                  </div>

                  {/* Purpose */}
                  <div className="mb-6">
                    <h4 className="text-xs font-mono text-text-ghost uppercase tracking-wider mb-2">
                      Purpose
                    </h4>
                    <p className="text-text-body">{selectedOrgan.purpose}</p>
                  </div>

                  {/* Modules */}
                  <div className="mb-6">
                    <h4 className="text-xs font-mono text-text-ghost uppercase tracking-wider mb-3">
                      Modules
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedOrgan.modules.map((module) => (
                        <span
                          key={module}
                          className={`
                            px-3 py-1.5 rounded-lg text-sm
                            bg-surface-2 border border-border-subtle
                            text-text-body
                          `}
                        >
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Proof Link */}
                  {selectedOrgan.proofLink && (
                    <a
                      href={selectedOrgan.proofLink}
                      className={`
                        inline-flex items-center gap-2 text-sm font-mono
                        ${getColorClasses(selectedOrgan.color).text}
                        hover:underline
                      `}
                    >
                      See proof →
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Connection Lines (Organism mode only) */}
        {viewMode === "organism" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-center items-center gap-2 text-xs text-text-ghost font-mono"
          >
            <span className="text-neural-2">Soul</span>
            <span>→</span>
            <span className="text-phosphor">Mind</span>
            <span>→</span>
            <span className="text-amber-400">Digestion</span>
            <span>→</span>
            <span className="text-cyan-400">Nervous</span>
            <span>→</span>
            <span className="text-ember">Interface</span>
            <span className="mx-2">|</span>
            <span className="text-crimson">🛡️ Immune guards all</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}

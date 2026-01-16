"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ViewMode = "organism" | "layers";

interface Organ {
  id: string;
  name: string;
  layer: string;
  position: { cy: number }; // Y position on body (0-100%)
  color: string;
  purpose: string;
  modules: string[];
  metric?: string;
}

const organs: Organ[] = [
  {
    id: "mind",
    name: "Mind",
    layer: "Intelligence",
    position: { cy: 12 },
    color: "phosphor",
    purpose: "SPICE reasoning + adversarial challenger",
    modules: ["SPICE", "Challenger", "Head Reputation"],
    metric: "4,067+ iterations",
  },
  {
    id: "soul",
    name: "Soul",
    layer: "Determinism Core",
    position: { cy: 28 },
    color: "neural-2",
    purpose: "Signed, reproducible behavior",
    modules: ["Seed Management", "Model Signing", "Replay"],
    metric: "100% reproducible",
  },
  {
    id: "immune",
    name: "Immune",
    layer: "XCK Security",
    position: { cy: 38 },
    color: "crimson",
    purpose: "Detect → Contain → Prove",
    modules: ["Kill Switch", "Circuit Breaker", "Evidence Ledger"],
    metric: "47ms response",
  },
  {
    id: "digestion",
    name: "Digestion",
    layer: "Data Pipeline",
    position: { cy: 52 },
    color: "amber",
    purpose: "Experience into training data",
    modules: ["Factory", "Arena", "Forge"],
    metric: "11K+ samples",
  },
  {
    id: "nervous",
    name: "Nervous",
    layer: "API & Services",
    position: { cy: 68 },
    color: "cyan",
    purpose: "Routes signals between organs",
    modules: ["Valkyrie API", "Memory Service", "Echo"],
  },
  {
    id: "interface",
    name: "Interface",
    layer: "Human Touch",
    position: { cy: 85 },
    color: "ember",
    purpose: "How humans interact",
    modules: ["CLI", "Dashboard", "Extensions"],
  },
];

// Custom SVG Icons for each organ
function MindIcon({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <motion.circle
        cx="32" cy="32" r="20"
        stroke="currentColor" strokeWidth="2"
        fill="none"
        animate={animated ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M 22 32 Q 27 22 32 32 Q 37 42 42 32"
        stroke="currentColor" strokeWidth="2" fill="none"
        animate={animated ? { pathLength: [0, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <circle cx="26" cy="28" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="38" cy="28" r="3" fill="currentColor" opacity="0.6" />
      <motion.circle
        cx="32" cy="32" r="4"
        fill="currentColor"
        animate={animated ? { opacity: [0.4, 1, 0.4] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );
}

function SoulIcon({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <motion.path
        d="M 32 12 L 32 52"
        stroke="currentColor" strokeWidth="2"
        animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.path
        d="M 20 24 L 32 32 L 44 24"
        stroke="currentColor" strokeWidth="2" fill="none"
        animate={animated ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.path
        d="M 20 40 L 32 32 L 44 40"
        stroke="currentColor" strokeWidth="2" fill="none"
        animate={animated ? { y: [0, 2, 0] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.circle
        cx="32" cy="32" r="3"
        fill="currentColor"
        animate={animated ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );
}

function ImmuneIcon({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <motion.path
        d="M 32 8 L 52 20 L 52 44 L 32 56 L 12 44 L 12 20 Z"
        stroke="currentColor" strokeWidth="2" fill="none"
        animate={animated ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M 32 18 L 32 46"
        stroke="currentColor" strokeWidth="3"
        animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <motion.path
        d="M 22 32 L 42 32"
        stroke="currentColor" strokeWidth="3"
        animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
      />
    </svg>
  );
}

function DigestIcon({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <motion.circle
        cx="32" cy="32" r="18"
        stroke="currentColor" strokeWidth="2" fill="none"
        strokeDasharray="4 2"
        animate={animated ? { rotate: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M 24 26 Q 32 34 40 26"
        stroke="currentColor" strokeWidth="2" fill="none"
      />
      <motion.path
        d="M 24 38 Q 32 30 40 38"
        stroke="currentColor" strokeWidth="2" fill="none"
      />
      <motion.circle
        cx="32" cy="32" r="4"
        fill="currentColor"
        animate={animated ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );
}

function NervousIcon({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <motion.line
        x1="32" y1="12" x2="32" y2="52"
        stroke="currentColor" strokeWidth="3"
      />
      <motion.circle cx="32" cy="20" r="4" fill="currentColor"
        animate={animated ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
      />
      <motion.circle cx="32" cy="32" r="4" fill="currentColor"
        animate={animated ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
      />
      <motion.circle cx="32" cy="44" r="4" fill="currentColor"
        animate={animated ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
      />
      <line x1="20" y1="26" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <line x1="44" y1="26" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="38" x2="32" y2="44" stroke="currentColor" strokeWidth="1.5" />
      <line x1="44" y1="38" x2="32" y2="44" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function InterfaceIcon({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="16" y="16" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.line
        x1="24" y1="28" x2="40" y2="28"
        stroke="currentColor" strokeWidth="2"
        animate={animated ? { x2: [40, 36, 40] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.line
        x1="24" y1="36" x2="34" y2="36"
        stroke="currentColor" strokeWidth="2"
        animate={animated ? { x2: [34, 38, 34] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
      />
      <motion.rect
        x="38" y="34" width="4" height="4"
        fill="currentColor"
        animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </svg>
  );
}

const iconMap: Record<string, React.FC<{ size?: number; animated?: boolean }>> = {
  mind: MindIcon,
  soul: SoulIcon,
  immune: ImmuneIcon,
  digestion: DigestIcon,
  nervous: NervousIcon,
  interface: InterfaceIcon,
};

const colorMap: Record<string, { text: string; bg: string; line: string }> = {
  phosphor: { text: "text-phosphor", bg: "bg-phosphor", line: "#6ee7b7" },
  "neural-2": { text: "text-neural-2", bg: "bg-neural-2", line: "#a78bfa" },
  crimson: { text: "text-crimson", bg: "bg-crimson", line: "#ef4444" },
  amber: { text: "text-amber-400", bg: "bg-amber-400", line: "#fbbf24" },
  cyan: { text: "text-cyan-400", bg: "bg-cyan-400", line: "#22d3ee" },
  ember: { text: "text-ember", bg: "bg-ember", line: "#f97316" },
};

export function OrganismView() {
  const [viewMode, setViewMode] = useState<ViewMode>("organism");
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  return (
    <section className="relative py-16 px-6 overflow-hidden">
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
            Hover over an organ to see what it does.
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
              Director View
            </button>
            <button
              onClick={() => setViewMode("layers")}
              className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${
                viewMode === "layers"
                  ? "bg-phosphor/20 text-phosphor"
                  : "text-text-ghost hover:text-text-body"
              }`}
            >
              Engineer View
            </button>
          </div>
        </div>

        {viewMode === "organism" ? (
          /* Organism View - Body with Labels */
          <div className="relative max-w-4xl mx-auto">
            {/* Central Body Figure */}
            <div className="flex justify-center">
              <svg
                viewBox="0 0 400 500"
                className="w-full max-w-xs md:max-w-sm h-auto"
                fill="none"
              >
                {/* Elegant body silhouette */}
                <defs>
                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Head */}
                <ellipse cx="200" cy="60" rx="45" ry="50" 
                  fill="url(#bodyGradient)" stroke="#475569" strokeWidth="1" />
                
                {/* Neck */}
                <path d="M 180 105 L 180 130 L 220 130 L 220 105" 
                  fill="url(#bodyGradient)" stroke="#475569" strokeWidth="1" />
                
                {/* Torso */}
                <path d="M 140 130 
                         Q 120 150 120 200 
                         L 130 320 
                         L 160 380 
                         L 200 400 
                         L 240 380 
                         L 270 320 
                         L 280 200 
                         Q 280 150 260 130 
                         Z" 
                  fill="url(#bodyGradient)" stroke="#475569" strokeWidth="1" />

                {/* Left Arm */}
                <path d="M 140 140 Q 80 160 60 250 Q 50 300 70 340" 
                  fill="none" stroke="#475569" strokeWidth="1" />
                
                {/* Right Arm */}
                <path d="M 260 140 Q 320 160 340 250 Q 350 300 330 340" 
                  fill="none" stroke="#475569" strokeWidth="1" />

                {/* Left Leg */}
                <path d="M 160 380 L 140 480" 
                  fill="none" stroke="#475569" strokeWidth="1" />
                
                {/* Right Leg */}
                <path d="M 240 380 L 260 480" 
                  fill="none" stroke="#475569" strokeWidth="1" />

                {/* Spine (subtle) */}
                <line x1="200" y1="130" x2="200" y2="380" 
                  stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

                {/* Organ hotspots on body */}
                {organs.map((organ) => {
                  const colors = colorMap[organ.color];
                  const isHovered = hoveredOrgan === organ.id;
                  const yPos = (organ.position.cy / 100) * 500;
                  
                  return (
                    <g key={organ.id}>
                      {/* Connection line to label */}
                      <motion.line
                        x1="200" y1={yPos}
                        x2="380" y2={yPos}
                        stroke={colors.line}
                        strokeWidth={isHovered ? 2 : 1}
                        strokeDasharray={isHovered ? "0" : "4 4"}
                        opacity={isHovered ? 1 : 0.3}
                        animate={{ opacity: isHovered ? 1 : 0.3 }}
                      />
                      
                      {/* Organ dot on body */}
                      <motion.circle
                        cx="200" cy={yPos}
                        r={isHovered ? 12 : 8}
                        fill={colors.line}
                        opacity={isHovered ? 1 : 0.6}
                        onMouseEnter={() => setHoveredOrgan(organ.id)}
                        onMouseLeave={() => setHoveredOrgan(null)}
                        className="cursor-pointer"
                        animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      
                      {/* Pulse ring */}
                      {isHovered && (
                        <motion.circle
                          cx="200" cy={yPos}
                          r="8"
                          fill="none"
                          stroke={colors.line}
                          strokeWidth="2"
                          initial={{ scale: 1, opacity: 1 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right-side Labels */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-2/5">
              {organs.map((organ) => {
                const colors = colorMap[organ.color];
                const isHovered = hoveredOrgan === organ.id;
                const IconComponent = iconMap[organ.id];
                const topPercent = organ.position.cy - 3;

                return (
                  <motion.div
                    key={organ.id}
                    className="absolute right-0 transform -translate-y-1/2"
                    style={{ top: `${topPercent}%` }}
                    onMouseEnter={() => setHoveredOrgan(organ.id)}
                    onMouseLeave={() => setHoveredOrgan(null)}
                    animate={{ 
                      x: isHovered ? 0 : 10,
                      opacity: isHovered ? 1 : 0.7 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`
                      flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer
                      ${isHovered ? "bg-surface-1/80 backdrop-blur-sm border border-border-subtle" : ""}
                    `}>
                      {/* Icon */}
                      <div className={`${colors.text} flex-shrink-0`}>
                        <IconComponent size={isHovered ? 40 : 32} animated={isHovered} />
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-display text-lg ${colors.text}`}>
                            {organ.name}
                          </span>
                          {organ.metric && isHovered && (
                            <span className="text-xs font-mono text-text-ghost bg-surface-2 px-2 py-0.5 rounded">
                              {organ.metric}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-text-ghost">
                          {organ.layer}
                        </span>
                        
                        {/* Expanded info on hover */}
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-2"
                          >
                            <p className="text-sm text-text-body mb-2">
                              {organ.purpose}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {organ.modules.map((mod) => (
                                <span
                                  key={mod}
                                  className="text-xs px-2 py-0.5 bg-surface-2 rounded text-text-ghost"
                                >
                                  {mod}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Engineer View - Layer List */
          <div className="max-w-2xl mx-auto space-y-3">
            {organs.map((organ) => {
              const colors = colorMap[organ.color];
              const IconComponent = iconMap[organ.id];

              return (
                <motion.div
                  key={organ.id}
                  className="p-4 rounded-xl border border-border-subtle bg-surface-1/30 hover:border-text-ghost/30 transition-all"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={colors.text}>
                      <IconComponent size={40} animated={false} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`font-mono text-xs ${colors.text}`}>
                            {organ.layer}
                          </span>
                          <h3 className="text-lg font-display text-text-bright">
                            {organ.name}
                          </h3>
                        </div>
                        {organ.metric && (
                          <span className="text-xs font-mono text-text-ghost bg-surface-2 px-2 py-1 rounded">
                            {organ.metric}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-ghost mt-1">
                        {organ.purpose}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {organ.modules.map((mod) => (
                          <span
                            key={mod}
                            className="text-xs px-2 py-0.5 bg-surface-2 rounded text-text-body"
                          >
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-text-ghost">
            <span className="text-phosphor">Mind</span>
            <span>→</span>
            <span className="text-neural-2">Soul</span>
            <span>→</span>
            <span className="text-amber-400">Digestion</span>
            <span>→</span>
            <span className="text-cyan-400">Nervous</span>
            <span>→</span>
            <span className="text-ember">Interface</span>
            <span className="mx-2 text-text-ghost/30">|</span>
            <span className="text-crimson">Immune guards all</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

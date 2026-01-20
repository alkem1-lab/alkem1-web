"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

// Custom animated SVG icons
const TwoPhaseIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Outer ring */}
    <motion.circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      opacity={0.2}
    />
    {/* Progress arc - phase indicator */}
    <motion.circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="251"
      initial={{ strokeDashoffset: 251 }}
      animate={{ strokeDashoffset: active ? 0 : 126 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
    />
    {/* Lock body */}
    <motion.rect
      x="35"
      y="45"
      width="30"
      height="25"
      rx="4"
      fill="currentColor"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: active ? 1 : 0.6 }}
    />
    {/* Lock shackle */}
    <motion.path
      d="M40 45 V35 A10 10 0 0 1 60 35 V45"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ y: 0 }}
      animate={{ y: active ? -5 : 0 }}
      transition={{ duration: 0.3 }}
    />
    {/* Phase 1 dot */}
    <motion.circle
      cx="25"
      cy="50"
      r="4"
      fill="currentColor"
      animate={{ 
        opacity: active ? [0.3, 1, 0.3] : 0.3,
        scale: active ? [1, 1.2, 1] : 1 
      }}
      transition={{ duration: 1.5, repeat: active ? Infinity : 0 }}
    />
    {/* Phase 2 dot */}
    <motion.circle
      cx="75"
      cy="50"
      r="4"
      fill="currentColor"
      animate={{ 
        opacity: active ? [0.3, 1, 0.3] : 0.3,
        scale: active ? [1, 1.2, 1] : 1 
      }}
      transition={{ duration: 1.5, delay: 0.75, repeat: active ? Infinity : 0 }}
    />
  </svg>
);

const MerkleIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Root node */}
    <motion.circle
      cx="50"
      cy="20"
      r="8"
      fill="currentColor"
      animate={{ scale: active ? [1, 1.1, 1] : 1 }}
      transition={{ duration: 2, repeat: active ? Infinity : 0 }}
    />
    {/* Level 2 nodes */}
    <motion.circle
      cx="30"
      cy="50"
      r="6"
      fill="currentColor"
      opacity={0.7}
      animate={{ opacity: active ? [0.5, 0.9, 0.5] : 0.7 }}
      transition={{ duration: 1.5, delay: 0.2, repeat: active ? Infinity : 0 }}
    />
    <motion.circle
      cx="70"
      cy="50"
      r="6"
      fill="currentColor"
      opacity={0.7}
      animate={{ opacity: active ? [0.5, 0.9, 0.5] : 0.7 }}
      transition={{ duration: 1.5, delay: 0.4, repeat: active ? Infinity : 0 }}
    />
    {/* Level 3 nodes (leaves) */}
    {[15, 35, 55, 75].map((x, i) => (
      <motion.circle
        key={i}
        cx={x + 5}
        cy="80"
        r="4"
        fill="currentColor"
        opacity={0.5}
        animate={{ opacity: active ? [0.3, 0.7, 0.3] : 0.5 }}
        transition={{ duration: 1.5, delay: i * 0.15, repeat: active ? Infinity : 0 }}
      />
    ))}
    {/* Connecting lines */}
    <motion.path
      d="M50 28 L30 44 M50 28 L70 44 M30 56 L20 74 M30 56 L40 74 M70 56 L60 74 M70 56 L80 74"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity={0.3}
      animate={{ opacity: active ? [0.2, 0.5, 0.2] : 0.3 }}
      transition={{ duration: 2, repeat: active ? Infinity : 0 }}
    />
    {/* Hash symbol */}
    <motion.text
      x="50"
      y="52"
      textAnchor="middle"
      fill="currentColor"
      fontSize="10"
      fontFamily="monospace"
      opacity={0.4}
      animate={{ opacity: active ? [0.2, 0.6, 0.2] : 0.4 }}
      transition={{ duration: 2, repeat: active ? Infinity : 0 }}
    >
      #
    </motion.text>
  </svg>
);

const KillSwitchIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Outer pulse rings */}
    <motion.circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      opacity={0.1}
      animate={{ 
        r: active ? [45, 48, 45] : 45,
        opacity: active ? [0.1, 0.3, 0.1] : 0.1 
      }}
      transition={{ duration: 1, repeat: active ? Infinity : 0 }}
    />
    <motion.circle
      cx="50"
      cy="50"
      r="38"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      opacity={0.15}
      animate={{ 
        r: active ? [38, 42, 38] : 38,
        opacity: active ? [0.15, 0.4, 0.15] : 0.15 
      }}
      transition={{ duration: 1, delay: 0.2, repeat: active ? Infinity : 0 }}
    />
    {/* Main button */}
    <motion.circle
      cx="50"
      cy="50"
      r="30"
      fill="currentColor"
      opacity={0.15}
      animate={{ opacity: active ? [0.15, 0.25, 0.15] : 0.15 }}
      transition={{ duration: 0.8, repeat: active ? Infinity : 0 }}
    />
    {/* Power symbol - line */}
    <motion.line
      x1="50"
      y1="32"
      x2="50"
      y2="48"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      animate={{ opacity: active ? [0.8, 1, 0.8] : 0.8 }}
      transition={{ duration: 0.5, repeat: active ? Infinity : 0 }}
    />
    {/* Power symbol - arc */}
    <motion.path
      d="M35 42 A20 20 0 1 0 65 42"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      animate={{ opacity: active ? [0.8, 1, 0.8] : 0.8 }}
      transition={{ duration: 0.5, repeat: active ? Infinity : 0 }}
    />
  </svg>
);

const GatekeeperIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Shield outline */}
    <motion.path
      d="M50 10 L85 25 L85 50 Q85 80 50 95 Q15 80 15 50 L15 25 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      opacity={0.3}
    />
    {/* Shield fill */}
    <motion.path
      d="M50 15 L80 28 L80 50 Q80 75 50 88 Q20 75 20 50 L20 28 Z"
      fill="currentColor"
      opacity={0.1}
      animate={{ opacity: active ? [0.1, 0.2, 0.1] : 0.1 }}
      transition={{ duration: 1.5, repeat: active ? Infinity : 0 }}
    />
    {/* Scan line */}
    <motion.line
      x1="25"
      x2="75"
      stroke="currentColor"
      strokeWidth="2"
      opacity={0.6}
      initial={{ y1: 30, y2: 30 }}
      animate={{ 
        y1: active ? [30, 70, 30] : 50,
        y2: active ? [30, 70, 30] : 50,
        opacity: active ? [0.4, 0.8, 0.4] : 0.6 
      }}
      transition={{ duration: 2, repeat: active ? Infinity : 0, ease: "easeInOut" }}
    />
    {/* Checkmark */}
    <motion.path
      d="M35 50 L45 60 L65 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: active ? 1 : 0.7, opacity: active ? 1 : 0.5 }}
      transition={{ duration: 0.5 }}
    />
  </svg>
);

const securityFeatures = [
  {
    id: "two-phase",
    name: "Two-Phase Transition",
    subtitle: "SSOT Protection",
    description: "Deploy token enables PENDING_DEPLOY state. System enters read-only during transition. No token = Kill Switch.",
    Icon: TwoPhaseIcon,
    color: "#6ee7b7",
    metrics: [
      { value: "60s", label: "Token TTL" },
      { value: "2", label: "Phases" },
    ],
  },
  {
    id: "merkle",
    name: "Merkle Checkpoints",
    subtitle: "Forensic Integrity",
    description: "Unified Ledger with Operational and Forensic layers. Merkle roots + Ed25519 signatures for tamper-evident audit.",
    Icon: MerkleIcon,
    color: "#818cf8",
    metrics: [
      { value: "10K", label: "Max entries" },
      { value: "WORM", label: "Storage" },
    ],
  },
  {
    id: "kill-switch",
    name: "Kill Switch",
    subtitle: "Human Override",
    description: "Sub-100ms emergency shutdown with 2-step verification. Challenge → Confirm pattern.",
    Icon: KillSwitchIcon,
    color: "#ef4444",
    metrics: [
      { value: "47ms", label: "Response" },
      { value: "120s", label: "Challenge" },
    ],
  },
  {
    id: "gatekeeper",
    name: "Gatekeeper",
    subtitle: "Diplomatic Courier",
    description: "Single privileged mediator. Sanitizes inputs, routes requests, maintains complete audit trail.",
    Icon: GatekeeperIcon,
    color: "#f97316",
    metrics: [
      { value: "100%", label: "Coverage" },
      { value: "0", label: "Bypass" },
    ],
  },
];

export function EnterpriseHardening() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative py-40 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        {/* Minimal header */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-mono text-text-ghost tracking-[0.3em] uppercase mb-6">
            Security Infrastructure
          </p>
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl text-text-bright leading-none"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Enterprise
            <br />
            <span className="text-text-ghost">Hardening</span>
          </h2>
        </motion.div>

        {/* Feature grid - large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {securityFeatures.map((feature, index) => {
            const isActive = activeFeature === feature.id;
            const isHovered = hoveredFeature === feature.id;
            const Icon = feature.Icon;

            return (
              <motion.div
                key={feature.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => setActiveFeature(isActive ? null : feature.id)}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <motion.div
                  className="relative p-8 md:p-12 bg-surface-1/30 border border-border-subtle overflow-hidden min-h-[320px] md:min-h-[380px] flex flex-col"
                  animate={{
                    backgroundColor: isActive || isHovered 
                      ? `${feature.color}08` 
                      : "rgba(255,255,255,0.02)",
                    borderColor: isActive 
                      ? `${feature.color}40` 
                      : isHovered 
                        ? `${feature.color}20` 
                        : "rgba(255,255,255,0.05)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top row: Icon + Metrics */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20"
                      style={{ color: feature.color }}
                    >
                      <Icon active={isActive || isHovered} />
                    </div>
                    
                    {/* Metrics - top right */}
                    <div className="flex gap-6">
                      {feature.metrics.map((metric, i) => (
                        <div key={i} className="text-right">
                          <div 
                            className="text-xl md:text-2xl font-light"
                            style={{ color: isActive || isHovered ? feature.color : "rgba(255,255,255,0.4)" }}
                          >
                            {metric.value}
                          </div>
                          <div className="text-[9px] text-text-ghost uppercase tracking-wider">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Text content - grows to fill space */}
                  <div className="flex-1 flex flex-col justify-end">
                    <div>
                      <h3 className="text-xl md:text-2xl font-light text-text-bright mb-1">
                        {feature.name}
                      </h3>
                      <p 
                        className="text-xs font-mono tracking-wider mb-3"
                        style={{ color: feature.color }}
                      >
                        {feature.subtitle}
                      </p>
                    </div>

                    {/* Description - always visible but muted when not active */}
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isActive || isHovered ? 'text-text-body' : 'text-text-ghost/60'
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${feature.color}10 50%)`,
                    }}
                    animate={{ opacity: isActive || isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom line */}
        <motion.div
          className="mt-32 flex items-center justify-between text-text-ghost"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xs font-mono tracking-wider">
            SHA-256 · Ed25519 · WORM
          </p>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
            <span className="text-xs font-mono">Production Ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

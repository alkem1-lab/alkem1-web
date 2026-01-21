"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const zeroTrustLayers = [
  {
    level: 4,
    name: "JIT + Break Glass",
    description: "Just-In-Time tokens with 60-300s TTL. Dual-control Break Glass for emergencies.",
    features: ["Multi-scope tokens", "Nonce replay protection", "Two-man rule"],
    color: "#ef4444", // crimson
    icon: "🔑",
  },
  {
    level: 3,
    name: "RBAC Policy Engine",
    description: "Role-Based Access Control with YAML policies. Deny by default.",
    features: ["Fine-grained permissions", "Audit trail", "Policy versioning"],
    color: "#f97316", // ember
    icon: "📋",
  },
  {
    level: 2,
    name: "mTLS (Mutual TLS)",
    description: "Caddy sidecars with internal CA. Every service authenticated.",
    features: ["10-year CA validity", "825-day service certs", "Auto-rotation"],
    color: "#a78bfa", // neural-2
    icon: "🔐",
  },
  {
    level: 1,
    name: "HMAC Identity",
    description: "Service-to-service signed requests. Timestamp + nonce validation.",
    features: ["SHA-256 signatures", "60s clock skew tolerance", "Replay protection"],
    color: "#6ee7b7", // phosphor
    icon: "🛡️",
  },
];

function LayerCard({ layer, isActive, onClick }: { 
  layer: typeof zeroTrustLayers[0]; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`
        relative p-6 rounded-xl border cursor-pointer transition-all duration-300
        ${isActive 
          ? "border-opacity-100 bg-surface-2" 
          : "border-opacity-30 bg-surface-1/50 hover:bg-surface-1"
        }
      `}
      style={{ 
        borderColor: isActive ? layer.color : "rgba(255,255,255,0.1)",
        boxShadow: isActive ? `0 0 30px ${layer.color}30` : "none"
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Layer number badge */}
      <div 
        className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
        style={{ backgroundColor: layer.color, color: "#0a0a0f" }}
      >
        L{layer.level}
      </div>

      <div className="flex items-start gap-4">
        <span className="text-3xl">{layer.icon}</span>
        <div className="flex-1">
          <h4 className="font-bold text-text-bright mb-1">{layer.name}</h4>
          <p className="text-sm text-text-ghost">{layer.description}</p>
          
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-2"
            >
              {layer.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  <span className="text-text-body">{feature}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ZeroTrust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeLayer, setActiveLayer] = useState(3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-crimson/50" />
              <span className="text-xs font-mono text-crimson uppercase tracking-widest">
                Enterprise Security
              </span>
              <div className="h-[1px] w-12 bg-crimson/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Zero Trust.{" "}
              <span className="text-crimson">Zero Exceptions.</span>
            </h2>
            <p className="text-text-body max-w-2xl mx-auto">
              Four layers of defense. Every request authenticated. Every action verified.
              No implicit trust, ever.
            </p>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Stack visualization */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                {/* Visual stack */}
                <div className="space-y-4">
                  {zeroTrustLayers.map((layer, index) => (
                    <LayerCard
                      key={layer.level}
                      layer={layer}
                      isActive={activeLayer === index}
                      onClick={() => setActiveLayer(index)}
                    />
                  ))}
                </div>

                {/* Connection lines */}
                <div className="absolute left-4 top-16 bottom-16 w-[2px] bg-gradient-to-b from-crimson via-ember via-neural-2 to-phosphor opacity-30" />
              </div>
            </motion.div>

            {/* Right: Interactive demo */}
            <motion.div variants={itemVariants}>
              <div className="sticky top-24">
                {/* Terminal window */}
                <div className="rounded-xl border border-border-default bg-surface-1/80 backdrop-blur-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-surface-2/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-crimson/80" />
                      <div className="w-3 h-3 rounded-full bg-ember/80" />
                      <div className="w-3 h-3 rounded-full bg-phosphor/80" />
                    </div>
                    <span className="text-xs font-mono text-text-ghost">
                      zero-trust-validator
                    </span>
                  </div>

                  <div className="p-6 font-mono text-sm">
                    {/* Request simulation */}
                    <div className="space-y-3">
                      <div className="text-text-ghost">
                        <span className="text-phosphor">$</span> curl -X POST /api/admin/scan
                      </div>
                      
                      <div className="pl-4 space-y-2">
                        <motion.div 
                          className="flex items-center gap-2"
                          animate={{ opacity: activeLayer >= 3 ? 1 : 0.3 }}
                        >
                          <span className="text-phosphor">✓</span>
                          <span className="text-text-body">L1: HMAC signature valid</span>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center gap-2"
                          animate={{ opacity: activeLayer >= 2 ? 1 : 0.3 }}
                        >
                          <span className="text-neural-2">✓</span>
                          <span className="text-text-body">L2: mTLS certificate verified</span>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center gap-2"
                          animate={{ opacity: activeLayer >= 1 ? 1 : 0.3 }}
                        >
                          <span className="text-ember">✓</span>
                          <span className="text-text-body">L3: RBAC policy: ALLOW</span>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center gap-2"
                          animate={{ opacity: activeLayer >= 0 ? 1 : 0.3 }}
                        >
                          <span className="text-crimson">✓</span>
                          <span className="text-text-body">L4: JIT token valid (TTL: 287s)</span>
                        </motion.div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border-subtle">
                        <div className="flex items-center gap-2 text-phosphor">
                          <span>🔓</span>
                          <span>REQUEST AUTHORIZED</span>
                        </div>
                        <div className="text-xs text-text-ghost mt-1">
                          All 4 layers passed • Latency: 12ms
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key insight */}
                <div className="mt-6 p-4 rounded-xl bg-crimson/10 border border-crimson/30">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="font-bold text-crimson mb-1">Defense in Depth</h4>
                      <p className="text-sm text-text-body">
                        Each layer independently validates. Compromise one, and three more stand ready.
                        This is how Google secures their infrastructure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={itemVariants}
          >
            {[
              { value: "4", label: "Security Layers", color: "text-crimson" },
              { value: "<15ms", label: "Auth Latency", color: "text-phosphor" },
              { value: "60s", label: "Token TTL Min", color: "text-ember" },
              { value: "0", label: "Implicit Trust", color: "text-neural-2" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-text-ghost">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

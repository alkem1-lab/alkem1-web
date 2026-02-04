"use client";

import { motion } from "framer-motion";

interface PulseCoreProps {
  status?: "idle" | "alert" | "active";
  size?: "sm" | "md" | "lg";
}

// Pre-calculated positions for orbit dots (60deg apart on a circle)
// Using fixed integers to avoid hydration mismatch
const orbitPositions = [
  { x: 72, y: 0 },    // 0°
  { x: 36, y: 62 },   // 60°
  { x: -36, y: 62 },  // 120°
  { x: -72, y: 0 },   // 180°
  { x: -36, y: -62 }, // 240°
  { x: 36, y: -62 },  // 300°
];

export function PulseCore({ status = "idle", size = "lg" }: PulseCoreProps) {
  const sizeMap = {
    sm: { core: 40, ring: 60, outer: 80, orbitScale: 0.5 },
    md: { core: 60, ring: 90, outer: 120, orbitScale: 0.75 },
    lg: { core: 80, ring: 120, outer: 160, orbitScale: 1 },
  };

  const s = sizeMap[size];

  const colorMap = {
    idle: {
      core: "#6ee7b7",
      glow: "rgba(110, 231, 183, 0.4)",
      ring: "rgba(110, 231, 183, 0.2)",
    },
    active: {
      core: "#34d399",
      glow: "rgba(52, 211, 153, 0.5)",
      ring: "rgba(52, 211, 153, 0.3)",
    },
    alert: {
      core: "#ef4444",
      glow: "rgba(239, 68, 68, 0.5)",
      ring: "rgba(239, 68, 68, 0.3)",
    },
  };

  const colors = colorMap[status];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: s.outer, height: s.outer }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s.outer,
          height: s.outer,
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: status === "alert" ? 0.5 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Expanding rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: s.ring,
            height: s.ring,
            borderColor: colors.ring,
          }}
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{
            scale: [0.8, 1.8],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: status === "alert" ? 1 : 3,
            repeat: Infinity,
            delay: i * (status === "alert" ? 0.33 : 1),
            ease: "easeOut",
          }}
        />
      ))}

      {/* Core */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: s.core,
          height: s.core,
          background: `radial-gradient(circle at 30% 30%, ${colors.core} 0%, ${colors.core}88 100%)`,
          boxShadow: `
            0 0 20px ${colors.glow},
            0 0 40px ${colors.glow},
            inset 0 0 20px rgba(255, 255, 255, 0.1)
          `,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: status === "alert" ? 0.3 : 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner highlight */}
        <div
          className="absolute top-2 left-3 rounded-full bg-white/30 blur-sm"
          style={{
            width: s.core * 0.25,
            height: s.core * 0.15,
          }}
        />
      </motion.div>

      {/* Orbit dots - using fixed positions */}
      {orbitPositions.map((pos, i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            backgroundColor: colors.core,
            boxShadow: `0 0 6px ${colors.core}`,
            left: `calc(50% + ${pos.x * s.orbitScale}px - 2px)`,
            top: `calc(50% + ${pos.y * s.orbitScale}px - 2px)`,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

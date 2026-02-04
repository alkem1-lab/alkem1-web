"use client";

import { motion } from "framer-motion";

interface IconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

// VALKYRIE - The Soul (Crystal/Seed icon - deterministic core)
export function ValkyrieIcon({ className = "", size = 64, animated = true }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={animated ? { rotate: 360 } : {}}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {/* Outer hexagon */}
      <path
        d="M32 4L56 18V46L32 60L8 46V18L32 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
        fill="none"
        className={animated ? "animate-pulse" : ""}
      />

      {/* Inner hexagon */}
      <path
        d="M32 12L48 22V42L32 52L16 42V22L32 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />

      {/* Core diamond */}
      <motion.path
        d="M32 20L40 32L32 44L24 32L32 20Z"
        fill="currentColor"
        animate={animated ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Connecting lines */}
      <line x1="32" y1="4" x2="32" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="32" y1="44" x2="32" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="8" y1="32" x2="24" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="40" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.4" />

      {/* Corner nodes */}
      <circle cx="32" cy="4" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="32" cy="60" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="8" cy="32" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="56" cy="32" r="2" fill="currentColor" opacity="0.6" />
    </motion.svg>
  );
}

// SPICE - The Mind (Neural network/Brain circuit icon)
export function SpiceIcon({ className = "", size = 64, animated = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central node */}
      <motion.circle
        cx="32"
        cy="32"
        r="8"
        fill="currentColor"
        animate={animated ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Orbital ring */}
      <motion.circle
        cx="32"
        cy="32"
        r="16"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeDasharray="4 4"
        animate={animated ? { rotate: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      />

      {/* Fixed position outer nodes - no dynamic calculation */}
      {/* Top */}
      <line x1="32" y1="32" x2="32" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <motion.circle
        cx="32" cy="8" r="4" fill="currentColor" opacity="0.6"
        animate={animated ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />

      {/* Top-right */}
      <line x1="32" y1="32" x2="53" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <motion.circle
        cx="53" cy="20" r="4" fill="currentColor" opacity="0.6"
        animate={animated ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.25 }}
      />

      {/* Bottom-right */}
      <line x1="32" y1="32" x2="53" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <motion.circle
        cx="53" cy="44" r="4" fill="currentColor" opacity="0.6"
        animate={animated ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Bottom */}
      <line x1="32" y1="32" x2="32" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <motion.circle
        cx="32" cy="56" r="4" fill="currentColor" opacity="0.6"
        animate={animated ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
      />

      {/* Bottom-left */}
      <line x1="32" y1="32" x2="11" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <motion.circle
        cx="11" cy="44" r="4" fill="currentColor" opacity="0.6"
        animate={animated ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      />

      {/* Top-left */}
      <line x1="32" y1="32" x2="11" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <motion.circle
        cx="11" cy="20" r="4" fill="currentColor" opacity="0.6"
        animate={animated ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1.25 }}
      />

      {/* Data pulse effect */}
      <motion.circle
        cx="32"
        cy="32"
        r="20"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
        animate={animated ? { r: [20, 28], opacity: [0.5, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

// XCK - The Shield (Shield with circuit pattern)
export function XckIcon({ className = "", size = 64, animated = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield outline */}
      <motion.path
        d="M32 4L52 12V32C52 44 44 54 32 60C20 54 12 44 12 32V12L32 4Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        animate={animated ? { opacity: [0.8, 1, 0.8] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Inner shield glow */}
      <motion.path
        d="M32 10L46 16V32C46 41 40 49 32 54C24 49 18 41 18 32V16L32 10Z"
        fill="currentColor"
        opacity="0.1"
        animate={animated ? { opacity: [0.1, 0.2, 0.1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Kill switch symbol - X */}
      <motion.g
        animate={animated ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        style={{ transformOrigin: "32px 32px" }}
      >
        <line x1="24" y1="24" x2="40" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="24" x2="24" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </motion.g>

      {/* Circuit lines */}
      <g opacity="0.4" className={animated ? "animate-pulse" : ""}>
        <line x1="32" y1="10" x2="32" y2="20" stroke="currentColor" strokeWidth="1" />
        <line x1="18" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="28" x2="46" y2="28" stroke="currentColor" strokeWidth="1" />
        <line x1="32" y1="44" x2="32" y2="50" stroke="currentColor" strokeWidth="1" />
      </g>

      {/* Corner nodes */}
      <circle cx="32" cy="10" r="2" fill="currentColor" />
      <circle cx="18" cy="28" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="46" cy="28" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="32" cy="50" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// Pulse ring effect for backgrounds
export function PulseRing({ className = "", size = 64 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="32"
          cy="32"
          r="16"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ r: 16, opacity: 0.6 }}
          animate={{ r: 30, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut"
          }}
        />
      ))}
    </svg>
  );
}

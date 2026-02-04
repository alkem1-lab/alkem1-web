"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles = `
    relative overflow-hidden
    font-medium tracking-wide uppercase
    transition-all duration-300
    border
    cursor-pointer
    flex items-center justify-center gap-2
  `;

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-phosphor to-phosphor-dim
      text-void font-semibold
      border-phosphor/50
      hover:shadow-[0_0_30px_rgba(110,231,183,0.4)]
    `,
    secondary: `
      bg-surface-2
      text-text-bright
      border-border-default
      hover:border-phosphor/50
      hover:shadow-[0_0_20px_rgba(110,231,183,0.2)]
    `,
    danger: `
      bg-gradient-to-r from-crimson to-crimson-bright
      text-white font-semibold
      border-crimson/50
      hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]
    `,
    ghost: `
      bg-transparent
      text-text-body
      border-transparent
      hover:text-phosphor
      hover:border-phosphor/30
    `,
  };

  return (
    <motion.button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
        whileHover={{
          translateX: "100%",
          transition: { duration: 0.6 },
        }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

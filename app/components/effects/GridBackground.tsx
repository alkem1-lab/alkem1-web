"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GridBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep void gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20, 20, 32, 1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(12, 12, 18, 1) 0%, transparent 50%),
            linear-gradient(180deg, #050508 0%, #0a0a10 50%, #050508 100%)
          `,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(110, 231, 183, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(110, 231, 183, 1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Cursor glow */}
      <motion.div
        className="pointer-events-none absolute rounded-full blur-[100px]"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(110, 231, 183, 0.08) 0%, transparent 70%)",
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] opacity-[0.03]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(110, 231, 183, 1), transparent)",
        }}
        animate={{
          y: ["-100%", "100vh"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-phosphor/30 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-phosphor/30 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-phosphor/30 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-phosphor/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-phosphor/30 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-phosphor/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-phosphor/30 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-phosphor/30 to-transparent" />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 8, 0.6) 100%)",
        }}
      />
    </div>
  );
}

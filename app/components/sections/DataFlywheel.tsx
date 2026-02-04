"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Custom SVG Icons for Flywheel
const FlywheelIcons = {
  spice: ({ color, size = 28 }: { color: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" fill={color} fillOpacity="0.3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
      <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
      <circle cx="12" cy="12" r="8" strokeDasharray="4 2" />
    </svg>
  ),
  memory: ({ color, size = 28 }: { color: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" fill={color} fillOpacity="0.15" />
      <path d="M4 9h16M9 4v16" />
      <circle cx="6.5" cy="6.5" r="1" fill={color} />
      <circle cx="6.5" cy="12" r="1" fill={color} />
      <circle cx="6.5" cy="17.5" r="1" fill={color} />
      <path d="M12 12h6M12 16h4" strokeLinecap="round" />
    </svg>
  ),
  arena: ({ color, size = 28 }: { color: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" fill={color} fillOpacity="0.2" />
      <circle cx="12" cy="12" r="2" fill={color} />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeLinecap="round" />
    </svg>
  ),
  factory: ({ color, size = 28 }: { color: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "12px 12px" }}
      >
        <circle cx="12" cy="12" r="6" fill={color} fillOpacity="0.15" />
        <path d="M12 6v2M12 16v2M6 12h2M16 12h2M7.76 7.76l1.41 1.41M14.83 14.83l1.41 1.41M7.76 16.24l1.41-1.41M14.83 9.17l1.41-1.41" strokeLinecap="round" />
      </motion.g>
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  ),
  forge: ({ color, size = 28 }: { color: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill={color} fillOpacity="0.2" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
      <motion.path
        d="M12 12v10"
        strokeDasharray="2 2"
        animate={{ strokeDashoffset: [0, -8] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  ),
  flywheel: ({ size = 40, color }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "12px 12px" }}
      >
        <circle cx="12" cy="12" r="10" stroke={color || "#6ee7b7"} strokeWidth="1" strokeDasharray="4 2" opacity={0.5} />
        <path d="M12 4a8 8 0 0 1 8 8" stroke={color || "#a78bfa"} strokeWidth="2" strokeLinecap="round" />
        <path d="M20 12a8 8 0 0 1-8 8" stroke={color || "#818cf8"} strokeWidth="2" strokeLinecap="round" />
        <path d="M12 20a8 8 0 0 1-8-8" stroke={color || "#f97316"} strokeWidth="2" strokeLinecap="round" />
        <path d="M4 12a8 8 0 0 1 8-8" stroke={color || "#ef4444"} strokeWidth="2" strokeLinecap="round" />
      </motion.g>
      <circle cx="12" cy="12" r="3" fill={color || "#6ee7b7"} fillOpacity="0.3" stroke={color || "#6ee7b7"} strokeWidth="1" />
    </svg>
  ),
};

const flywheelStages = [
  {
    id: "spice",
    name: "SPICE",
    role: "Brain",
    description: "Generates challenges and solves them with 8 parallel heads (Hydra). Sniper picks the shortest and most accurate solution.",
    color: "#a78bfa", // neural-2
    Icon: FlywheelIcons.spice,
    metrics: ["8 parallel heads", "Sniper selection", "Judge Dredd verification"],
  },
  {
    id: "memory",
    name: "Memory",
    role: "Store",
    description: "Vector store (PostgreSQL + pgvector) keeps the best solutions. Semantic search returns relevant knowledge.",
    color: "#6ee7b7", // phosphor
    Icon: FlywheelIcons.memory,
    metrics: ["Vector embeddings", "Semantic search", "Knowledge retention"],
  },
  {
    id: "arena",
    name: "Arena",
    role: "Judge",
    description: "Tests the model on new tasks. Quality gate—only verified solutions move forward.",
    color: "#818cf8", // neural-1
    Icon: FlywheelIcons.arena,
    metrics: ["Automated testing", "Quality gate", "Regression suite"],
  },
  {
    id: "factory",
    name: "Factory",
    role: "Refine",
    description: "Prepares data for training. Habituation prevents duplicates. Annoyance Score penalizes over-engineering.",
    color: "#f97316", // ember
    Icon: FlywheelIcons.factory,
    metrics: ["Deduplication", "Data refinement", "Smart export"],
  },
  {
    id: "forge",
    name: "Forge",
    role: "Train",
    description: "LoRA fine-tuning on curated data. New model feeds back into SPICE—the loop is closed.",
    color: "#ef4444", // crimson
    Icon: FlywheelIcons.forge,
    metrics: ["LoRA training", "Model evolution", "Feedback loop"],
  },
];

export function DataFlywheel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStage, setActiveStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-rotate through stages
  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % flywheelStages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="data-flywheel" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${flywheelStages[activeStage].color}40 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-phosphor/50" />
              <span className="text-xs font-mono text-phosphor uppercase tracking-widest">
                Self-Improving AI
              </span>
              <div className="h-[1px] w-12 bg-phosphor/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              The Data Flywheel
            </h2>
            <p className="text-text-body max-w-2xl mx-auto text-lg">
              AI that improves itself without human intervention. 
              Every cycle makes it smarter, more accurate, more reliable.
            </p>
          </motion.div>

          {/* Main visualization */}
          <motion.div 
            className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            variants={itemVariants}
          >
            {/* Universe/Solar System Flywheel */}
            <div 
              className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]"
              onMouseEnter={() => setIsAnimating(false)}
              onMouseLeave={() => setIsAnimating(true)}
            >
              {/* Background stars - deterministic positions to avoid hydration mismatch */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {[...Array(30)].map((_, i) => {
                  const left = (i * 7.3) % 100;
                  const top = (i * 11.7) % 100;
                  const opacity = 0.3 + (i % 5) * 0.1;
                  const duration = 2 + (i % 3);
                  const delay = (i % 10) / 5;
                  return (
                    <motion.div
                      key={`star-${i}`}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        opacity,
                      }}
                      animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration,
                        repeat: Infinity,
                        delay,
                      }}
                    />
                  );
                })}
              </div>

              {/* Orbital rings */}
              <motion.div
                className="absolute inset-[15%] rounded-full border border-white/10"
                style={{ borderStyle: "dashed" }}
              />
              <motion.div
                className="absolute inset-[5%] rounded-full border border-white/5"
              />
              <motion.div
                className="absolute inset-[-5%] rounded-full border border-white/5"
              />

              {/* Comet trails */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`comet-${i}`}
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    className="absolute"
                    style={{
                      left: 140 + i * 30,
                      top: -2,
                    }}
                  >
                    {/* Comet head */}
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: flywheelStages[i % flywheelStages.length].color,
                        boxShadow: `0 0 8px ${flywheelStages[i % flywheelStages.length].color}`,
                      }}
                    />
                    {/* Comet tail */}
                    <div 
                      className="absolute top-0.5 right-2 w-12 h-1 rounded-full"
                      style={{
                        background: `linear-gradient(to left, transparent, ${flywheelStages[i % flywheelStages.length].color}60)`,
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}

              {/* Central Sun (Flywheel Hub) - Neutral Gray */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                {/* Subtle corona/glow - neutral */}
                <motion.div
                  className="absolute -inset-6 rounded-full opacity-15"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {/* Core - neutral gray/silver */}
                <motion.div
                  className="w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(150,150,160,0.3) 0%, #1a1a2e 100%)",
                    border: "2px solid rgba(150,150,160,0.4)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(150,150,160,0.2), inset 0 0 20px rgba(150,150,160,0.1)",
                      "0 0 40px rgba(150,150,160,0.3), inset 0 0 25px rgba(150,150,160,0.15)",
                      "0 0 30px rgba(150,150,160,0.2), inset 0 0 20px rgba(150,150,160,0.1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Inner rotating pattern */}
                  <motion.div
                    className="absolute inset-2 rounded-full border border-white/5"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="text-center flex flex-col items-center z-10">
                    <FlywheelIcons.flywheel size={36} color="#9ca3af" />
                    <div className="text-[8px] font-mono text-white/50 mt-0.5 tracking-wider">CORE</div>
                  </div>
                </motion.div>
              </div>

              {/* Planet nodes (stages) */}
              {flywheelStages.map((stage, index) => {
                const angle = (index * 360) / flywheelStages.length - 90;
                const radian = (angle * Math.PI) / 180;
                const radius = 170;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;
                const isActive = activeStage === index;

                return (
                  <motion.div
                    key={stage.id}
                    className="absolute top-1/2 left-1/2 cursor-pointer z-20"
                    style={{
                      x: x - 36,
                      y: y - 36,
                    }}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => {
                      setActiveStage(index);
                      setIsAnimating(false);
                    }}
                  >
                    {/* Planet ring (for active) */}
                    {isActive && (
                      <motion.div
                        className="absolute -inset-3 rounded-full border"
                        style={{ 
                          borderColor: `${stage.color}40`,
                          transform: "rotateX(60deg)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    
                    {/* Moon (small orbiting dot for active) */}
                    {isActive && (
                      <motion.div
                        className="absolute top-1/2 left-1/2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <div 
                          className="absolute w-2 h-2 rounded-full"
                          style={{ 
                            left: 40,
                            top: -4,
                            backgroundColor: stage.color,
                            boxShadow: `0 0 6px ${stage.color}`,
                          }}
                        />
                      </motion.div>
                    )}

                    {/* Planet body */}
                    <motion.div
                      className="w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center relative overflow-hidden"
                      style={{
                        background: isActive
                          ? `radial-gradient(circle at 30% 30%, ${stage.color}60 0%, ${stage.color}20 50%, #0d0d1a 100%)`
                          : `radial-gradient(circle at 30% 30%, ${stage.color}30 0%, #1a1a2e 70%)`,
                        border: `2px solid ${isActive ? stage.color : `${stage.color}40`}`,
                      }}
                      animate={isActive ? {
                        boxShadow: `0 0 30px ${stage.color}60, inset -5px -5px 20px rgba(0,0,0,0.5)`,
                      } : {
                        boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.4)`,
                      }}
                    >
                      {/* Surface texture lines */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `repeating-linear-gradient(0deg, transparent, transparent 8px, ${stage.color}20 8px, ${stage.color}20 9px)`,
                        }}
                      />
                      
                      <div className="relative z-10 flex flex-col items-center">
                        <stage.Icon color={isActive ? "#fff" : stage.color} size={isActive ? 28 : 24} />
                        <span 
                          className="text-[8px] font-mono font-bold uppercase tracking-wider mt-0.5"
                          style={{ color: isActive ? "#fff" : stage.color }}
                        >
                          {stage.name}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Connection arrows */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {flywheelStages.map((_, index) => {
                  const startAngle = (index * 360) / flywheelStages.length - 90;
                  const endAngle = ((index + 1) * 360) / flywheelStages.length - 90;
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;
                  const r = 140;
                  const cx = 200;
                  const cy = 200;

                  const midAngle = startAngle + (360 / flywheelStages.length) / 2;
                  const midRad = (midAngle * Math.PI) / 180;
                  const midX = cx + Math.cos(midRad) * (r + 10);
                  const midY = cy + Math.sin(midRad) * (r + 10);

                  const isActive = activeStage === index;

                  return (
                    <motion.circle
                      key={`arrow-${index}`}
                      cx={midX}
                      cy={midY}
                      r={4}
                      fill={isActive ? flywheelStages[index].color : "#475569"}
                      animate={isActive ? { r: [4, 6, 4] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Stage details */}
            <motion.div 
              className="flex-1 max-w-lg"
              key={activeStage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <span 
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-mono"
                  style={{ 
                    backgroundColor: `${flywheelStages[activeStage].color}20`,
                    color: flywheelStages[activeStage].color,
                  }}
                >
                  {(() => {
                    const ActiveIcon = flywheelStages[activeStage].Icon;
                    return <ActiveIcon color={flywheelStages[activeStage].color} size={20} />;
                  })()}
                  Step {activeStage + 1} of {flywheelStages.length}
                </span>
              </div>

              <h3 
                className="text-3xl font-bold mb-2"
                style={{ color: flywheelStages[activeStage].color }}
              >
                {flywheelStages[activeStage].name}
              </h3>
              <p className="text-text-ghost text-sm uppercase tracking-wider mb-4">
                The {flywheelStages[activeStage].role}
              </p>
              <p className="text-text-body text-lg mb-6 leading-relaxed">
                {flywheelStages[activeStage].description}
              </p>

              {/* Metrics */}
              <div className="space-y-3">
                {flywheelStages[activeStage].metrics.map((metric, i) => (
                  <motion.div
                    key={metric}
                    className="flex items-center gap-3 text-text-body"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: flywheelStages[activeStage].color }}
                    />
                    <span>{metric}</span>
                  </motion.div>
                ))}
              </div>

              {/* Progress indicator */}
              <div className="flex gap-2 mt-8">
                {flywheelStages.map((_, index) => (
                  <button
                    key={index}
                    className={`
                      h-1 rounded-full transition-all duration-300
                      ${index === activeStage ? "w-8" : "w-2"}
                    `}
                    style={{
                      backgroundColor: index === activeStage 
                        ? flywheelStages[activeStage].color 
                        : "#475569",
                    }}
                    onClick={() => {
                      setActiveStage(index);
                      setIsAnimating(false);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Key insight */}
          <motion.div 
            className="mt-20 text-center"
            variants={itemVariants}
          >
            <div className="inline-block p-8 rounded-2xl bg-surface-1/80 border border-phosphor/30 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="text-center">
                  <div className="text-4xl font-bold text-phosphor mb-1">∞</div>
                  <div className="text-xs text-text-ghost uppercase">Continuous</div>
                </div>
                <div className="h-12 w-[1px] bg-border-subtle hidden sm:block" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-neural-2 mb-1">0</div>
                  <div className="text-xs text-text-ghost uppercase">Human Intervention</div>
                </div>
                <div className="h-12 w-[1px] bg-border-subtle hidden sm:block" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-ember mb-1">↗</div>
                  <div className="text-xs text-text-ghost uppercase">Always Improving</div>
                </div>
              </div>
              <p className="mt-6 text-text-body max-w-xl mx-auto">
                <span className="text-text-bright font-medium">The moat:</span> Every cycle makes the model better, 
                creating compounding advantage that competitors can&apos;t replicate.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

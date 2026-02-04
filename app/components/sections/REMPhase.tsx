"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const remPhases = [
  {
    id: "pruning",
    name: "Memory Pruning",
    description: "Merges similar vectors (>99% similarity). Keeps newer, archives older.",
    icon: "🧹",
    color: "#a78bfa",
  },
  {
    id: "conflict",
    name: "Conflict Resolution",
    description: "Detects contradictory facts. Auto-resolves by timestamp or flags for review.",
    icon: "⚖️",
    color: "#f97316",
  },
  {
    id: "decay",
    name: "Usage Decay",
    description: "Moves unused knowledge to cold storage. Keeps memory fast and relevant.",
    icon: "📉",
    color: "#6ee7b7",
  },
  {
    id: "dream",
    name: "Dream Simulation",
    description: "Runs synthetic queries to find knowledge gaps before they matter.",
    icon: "💭",
    color: "#818cf8",
  },
];

function SleepingAI() {
  const [breathPhase, setBreathPhase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathPhase(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const breathScale = 1 + Math.sin(breathPhase * Math.PI / 180) * 0.05;
  const glowIntensity = 0.3 + Math.sin(breathPhase * Math.PI / 180) * 0.2;

  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Outer glow rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-neural-2/20"
          style={{
            transform: `scale(${1 + (i + 1) * 0.15})`,
            opacity: 0.3 - i * 0.1,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Main orb */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-br from-neural-2/30 to-neural-1/20 backdrop-blur-xl border border-neural-2/40 flex items-center justify-center"
        style={{
          transform: `scale(${breathScale})`,
          boxShadow: `0 0 ${40 * glowIntensity}px rgba(167, 139, 250, ${glowIntensity})`,
        }}
      >
        {/* Sleeping face */}
        <div className="text-center">
          <div className="text-5xl mb-1">😴</div>
          <div className="text-xs font-mono text-neural-2 uppercase tracking-wider">
            REM Phase
          </div>
        </div>
      </motion.div>

      {/* Z's floating */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`z-${i}`}
          className="absolute text-neural-2/60 font-bold text-2xl"
          style={{
            right: 20 + i * 15,
            top: 30 - i * 10,
          }}
          animate={{
            y: [-10, -30, -10],
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        >
          Z
        </motion.div>
      ))}
    </div>
  );
}

function PhaseCard({ phase, isActive, onClick }: {
  phase: typeof remPhases[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`
        p-4 rounded-xl border cursor-pointer transition-all duration-300
        ${isActive 
          ? "bg-surface-2 border-opacity-100" 
          : "bg-surface-1/30 border-opacity-20 hover:bg-surface-1/50"
        }
      `}
      style={{
        borderColor: isActive ? phase.color : "rgba(255,255,255,0.1)",
        boxShadow: isActive ? `0 0 20px ${phase.color}20` : "none",
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{phase.icon}</span>
        <div>
          <h4 className="font-medium text-text-bright text-sm">{phase.name}</h4>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-xs text-text-ghost mt-1"
            >
              {phase.description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function REMPhase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState(0);
  const [stats, setStats] = useState({
    vectorsMerged: 0,
    conflictsResolved: 0,
    memoryReclaimed: 0,
  });

  // Simulate REM process
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setStats(prev => ({
        vectorsMerged: Math.min(prev.vectorsMerged + Math.floor(Math.random() * 5), 847),
        conflictsResolved: Math.min(prev.conflictsResolved + Math.floor(Math.random() * 2), 23),
        memoryReclaimed: Math.min(prev.memoryReclaimed + Math.floor(Math.random() * 3), 156),
      }));
    }, 200);

    return () => clearInterval(interval);
  }, [isInView]);

  // Auto-cycle phases
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase(prev => (prev + 1) % remPhases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
      className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neural-2/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-neural-2/50" />
              <span className="text-xs font-mono text-neural-2 uppercase tracking-widest">
                Nocturnal Optimization
              </span>
              <div className="h-[1px] w-12 bg-neural-2/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              AI That <span className="text-neural-2">Sleeps</span>
            </h2>
            <p className="text-text-body max-w-2xl mx-auto">
              Like the human brain, our AI consolidates knowledge during &quot;sleep&quot;.
              Merging duplicates. Resolving conflicts. Dreaming of edge cases.
            </p>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Sleeping AI visualization */}
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <SleepingAI />
              
              {/* Stats below */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                  <motion.div 
                    className="text-2xl font-bold text-neural-2"
                    key={stats.vectorsMerged}
                  >
                    {stats.vectorsMerged}
                  </motion.div>
                  <div className="text-xs text-text-ghost">Vectors Merged</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                  <motion.div 
                    className="text-2xl font-bold text-ember"
                    key={stats.conflictsResolved}
                  >
                    {stats.conflictsResolved}
                  </motion.div>
                  <div className="text-xs text-text-ghost">Conflicts Resolved</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                  <motion.div 
                    className="text-2xl font-bold text-phosphor"
                    key={stats.memoryReclaimed}
                  >
                    {stats.memoryReclaimed}MB
                  </motion.div>
                  <div className="text-xs text-text-ghost">Memory Reclaimed</div>
                </div>
              </div>
            </motion.div>

            {/* Right: REM Phases */}
            <motion.div variants={itemVariants} className="order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-mono text-text-ghost">03:00 UTC</span>
                  <div className="flex-1 h-[1px] bg-border-subtle" />
                  <span className="text-xs font-mono text-phosphor">NIGHTLY RUN</span>
                </div>

                {remPhases.map((phase, index) => (
                  <PhaseCard
                    key={phase.id}
                    phase={phase}
                    isActive={activePhase === index}
                    onClick={() => setActivePhase(index)}
                  />
                ))}

                {/* Biological analogy */}
                <div className="mt-8 p-6 rounded-xl bg-surface-1/50 border border-neural-2/30">
                  <h4 className="font-bold text-text-bright mb-3 flex items-center gap-2">
                    <span>🧠</span> Why This Matters
                  </h4>
                  <p className="text-sm text-text-body leading-relaxed">
                    Humans don&apos;t just learn while awake. <span className="text-neural-2">REM sleep is crucial</span> for 
                    memory consolidation—the brain prunes unnecessary connections and strengthens important ones.
                  </p>
                  <p className="text-sm text-text-body leading-relaxed mt-3">
                    Our AI does the same: removing redundant knowledge, resolving contradictions, and 
                    <span className="text-phosphor"> proactively finding gaps</span> before they cause hallucinations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Formula */}
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="inline-block p-6 rounded-xl bg-surface-1/80 border border-border-subtle font-mono text-sm">
              <span className="text-text-ghost">decay_score = </span>
              <span className="text-phosphor">Σ(access_i × e</span>
              <sup className="text-neural-2">-λ(t_now - t_i)</sup>
              <span className="text-phosphor">)</span>
              <div className="text-xs text-text-ghost mt-2">
                Exponential decay weights recent access higher
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

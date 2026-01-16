"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// Simulated blockchain data
const blocks = [
  {
    id: 0,
    type: "GENESIS",
    event: "Chain Initialized",
    timestamp: "2026-01-16T00:00:00.000Z",
    hash: "0000000000000000",
    prevHash: null,
  },
  {
    id: 1,
    type: "SPICE",
    event: "Iteration #450 completed",
    timestamp: "2026-01-16T15:00:05.123Z",
    hash: "a1b2c3d4e5f67890",
    prevHash: "0000000000000000",
  },
  {
    id: 2,
    type: "XCK",
    event: "Scan started: 192.168.1.1",
    timestamp: "2026-01-16T15:00:10.456Z",
    hash: "f8e7d6c5b4a39281",
    prevHash: "a1b2c3d4e5f67890",
  },
  {
    id: 3,
    type: "XCK",
    event: "Kill Switch ACTIVATED",
    timestamp: "2026-01-16T15:00:10.503Z",
    hash: "9a8b7c6d5e4f3210",
    prevHash: "f8e7d6c5b4a39281",
  },
  {
    id: 4,
    type: "VALKYRIE",
    event: "Emergency halt confirmed",
    timestamp: "2026-01-16T15:00:10.550Z",
    hash: "1234567890abcdef",
    prevHash: "9a8b7c6d5e4f3210",
  },
];

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  GENESIS: { bg: "bg-text-ghost/10", text: "text-text-ghost", border: "border-text-ghost/30" },
  SPICE: { bg: "bg-phosphor/10", text: "text-phosphor", border: "border-phosphor/30" },
  XCK: { bg: "bg-crimson/10", text: "text-crimson", border: "border-crimson/30" },
  VALKYRIE: { bg: "bg-neural-2/10", text: "text-neural-2", border: "border-neural-2/30" },
};

export function EvidenceChain() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-display text-text-bright mb-2"
              style={{ fontFamily: "var(--font-instrument-serif)" }}>
            Live Chain Visualization
          </h2>
          <p className="text-sm text-text-ghost">
            Click any block to see how it connects to the chain
          </p>
        </motion.div>

        {/* Chain visualization */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-text-ghost/20 via-phosphor/30 to-crimson/30 -translate-y-1/2" />

          {/* Blocks */}
          <div className="relative flex justify-between items-center gap-2 overflow-x-auto pb-4">
            {blocks.map((block, index) => {
              const colors = typeColors[block.type];
              const isSelected = selectedBlock === block.id;

              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex-shrink-0"
                >
                  {/* Arrow to next block */}
                  {index < blocks.length - 1 && (
                    <div className="absolute top-1/2 -right-2 w-4 h-4 -translate-y-1/2 z-10">
                      <svg viewBox="0 0 24 24" className="w-full h-full text-text-ghost/50">
                        <path
                          fill="currentColor"
                          d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Block card */}
                  <button
                    onClick={() => setSelectedBlock(isSelected ? null : block.id)}
                    className={`
                      relative w-36 p-4 rounded-lg border transition-all duration-300
                      ${colors.bg} ${colors.border}
                      ${isSelected ? "ring-2 ring-phosphor scale-105" : "hover:scale-102"}
                    `}
                  >
                    {/* Block number */}
                    <div className={`text-xs font-mono ${colors.text} mb-2`}>
                      Block #{block.id}
                    </div>

                    {/* Type badge */}
                    <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono ${colors.bg} ${colors.text} mb-2`}>
                      {block.type}
                    </div>

                    {/* Event */}
                    <div className="text-xs text-text-body truncate mb-2">
                      {block.event}
                    </div>

                    {/* Hash preview */}
                    <div className="font-mono text-[10px] text-text-ghost truncate">
                      {block.hash.slice(0, 8)}...
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected block details */}
        {selectedBlock !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-lg bg-surface-1/80 border border-border-subtle"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Block info */}
              <div>
                <h3 className="text-sm font-mono text-phosphor mb-4">
                  Block #{selectedBlock} Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-text-ghost">Event:</span>
                    <p className="text-sm text-text-body">{blocks[selectedBlock].event}</p>
                  </div>
                  <div>
                    <span className="text-xs text-text-ghost">Timestamp:</span>
                    <p className="text-sm font-mono text-text-body">
                      {new Date(blocks[selectedBlock].timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hash chain */}
              <div>
                <h3 className="text-sm font-mono text-phosphor mb-4">
                  Hash Chain
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-text-ghost">This Block&apos;s Hash:</span>
                    <p className="text-sm font-mono text-phosphor break-all">
                      {blocks[selectedBlock].hash}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-text-ghost">Previous Block&apos;s Hash:</span>
                    <p className="text-sm font-mono text-crimson break-all">
                      {blocks[selectedBlock].prevHash || "GENESIS (No previous)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chain integrity indicator */}
            <div className="mt-6 pt-4 border-t border-border-subtle flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-phosphor animate-pulse" />
              <span className="text-sm text-phosphor font-mono">
                Chain Integrity: VALID ✓
              </span>
              <span className="text-xs text-text-ghost">
                All hashes match. No tampering detected.
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Block {
  id: number;
  timestamp: string;
  data: string;
  prevHash: string;
  hash: string;
  isValid: boolean;
}

// Simple hash function for demo (not cryptographically secure)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  // Convert to hex and pad
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return `${hex}${hex}${hex}${hex}`.slice(0, 16);
}

function calculateHash(block: Omit<Block, "hash" | "isValid">): string {
  return simpleHash(`${block.id}${block.timestamp}${block.data}${block.prevHash}`);
}

export function EvidenceChainBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 0,
      timestamp: "2026-01-16T00:00:00Z",
      data: "Genesis Block",
      prevHash: "0000000000000000",
      hash: "a1b2c3d4e5f6a7b8",
      isValid: true,
    },
  ]);
  const [newEventData, setNewEventData] = useState("");
  const [editingBlock, setEditingBlock] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [tamperAttempts, setTamperAttempts] = useState(0);

  // Add new block to chain
  const addBlock = () => {
    if (!newEventData.trim()) return;

    const lastBlock = blocks[blocks.length - 1];
    const newBlock: Omit<Block, "hash" | "isValid"> = {
      id: lastBlock.id + 1,
      timestamp: new Date().toISOString(),
      data: newEventData,
      prevHash: lastBlock.hash,
    };

    const hash = calculateHash(newBlock);

    setBlocks([...blocks, { ...newBlock, hash, isValid: true }]);
    setNewEventData("");
  };

  // Attempt to tamper with a block
  const tamperBlock = (blockId: number, newData: string) => {
    setTamperAttempts(prev => prev + 1);

    const newBlocks = blocks.map((block, index) => {
      if (block.id === blockId) {
        // Tampered block
        const tamperedBlock = { ...block, data: newData };
        const newHash = calculateHash(tamperedBlock);
        return { ...tamperedBlock, hash: newHash, isValid: false };
      } else if (index > blocks.findIndex(b => b.id === blockId)) {
        // All subsequent blocks become invalid
        return { ...block, isValid: false };
      }
      return block;
    });

    setBlocks(newBlocks);
    setEditingBlock(null);
    setEditValue("");
  };

  // Reset chain
  const resetChain = () => {
    setBlocks([
      {
        id: 0,
        timestamp: "2026-01-16T00:00:00Z",
        data: "Genesis Block",
        prevHash: "0000000000000000",
        hash: "a1b2c3d4e5f6a7b8",
        isValid: true,
      },
    ]);
    setTamperAttempts(0);
  };

  const chainIntegrity = blocks.every(b => b.isValid);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neural-2/30 bg-neural-2/5 mb-4">
          <span className="w-2 h-2 rounded-full bg-neural-2 animate-pulse" />
          <span className="text-xs font-mono text-neural-2 uppercase tracking-wider">
            Interactive Demo
          </span>
        </div>
        <h3
          className="text-2xl md:text-3xl text-text-bright font-display"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Evidence Chain Builder
        </h3>
        <p className="text-text-ghost text-sm mt-2">
          Build a chain. Try to tamper. Watch it break.
        </p>
      </div>

      {/* Chain Status */}
      <motion.div
        className={`p-4 rounded-xl border-2 mb-8 flex items-center justify-between ${
          chainIntegrity
            ? "border-phosphor/30 bg-phosphor/5"
            : "border-crimson/50 bg-crimson/10"
        }`}
        animate={!chainIntegrity ? { scale: [1, 1.01, 1] } : {}}
        transition={{ duration: 0.5, repeat: chainIntegrity ? 0 : Infinity }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className={`w-4 h-4 rounded-full ${chainIntegrity ? "bg-phosphor" : "bg-crimson"}`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className={`font-mono font-bold ${chainIntegrity ? "text-phosphor" : "text-crimson"}`}>
            {chainIntegrity ? "✓ CHAIN VALID" : "✗ CHAIN COMPROMISED"}
          </span>
        </div>
        <div className="text-sm text-text-ghost font-mono">
          {blocks.length} blocks | {tamperAttempts} tamper attempts
        </div>
      </motion.div>

      {/* Blockchain visualization */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-2">
        <AnimatePresence>
          {blocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              {/* Block */}
              <div
                className={`min-w-[200px] p-4 rounded-lg border-2 transition-all ${
                  block.isValid
                    ? "border-border-subtle bg-surface-1"
                    : "border-crimson/50 bg-crimson/10"
                }`}
              >
                {/* Block header */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs ${block.isValid ? "text-text-ghost" : "text-crimson"}`}>
                    Block #{block.id}
                  </span>
                  {!block.isValid && (
                    <span className="px-2 py-0.5 bg-crimson/20 text-crimson text-xs rounded font-mono">
                      INVALID
                    </span>
                  )}
                </div>

                {/* Data */}
                <div className="mb-3">
                  {editingBlock === block.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") tamperBlock(block.id, editValue);
                        if (e.key === "Escape") setEditingBlock(null);
                      }}
                      className="w-full px-2 py-1 bg-surface-2 border border-crimson/50 rounded text-sm text-text-bright"
                      autoFocus
                    />
                  ) : (
                    <div
                      className={`text-sm ${block.isValid ? "text-text-body" : "text-crimson"} cursor-pointer hover:bg-surface-2 p-1 rounded transition-colors`}
                      onClick={() => {
                        if (block.id > 0) {
                          setEditingBlock(block.id);
                          setEditValue(block.data);
                        }
                      }}
                      title={block.id > 0 ? "Click to tamper" : "Genesis block"}
                    >
                      {block.data}
                    </div>
                  )}
                </div>

                {/* Hashes */}
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-text-ghost">Prev:</span>
                    <span className="text-neural-2">{block.prevHash.slice(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-ghost">Hash:</span>
                    <span className={block.isValid ? "text-phosphor" : "text-crimson"}>
                      {block.hash.slice(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>

              {/* Chain link */}
              {index < blocks.length - 1 && (
                <div className="flex items-center px-2">
                  <motion.div
                    className={`w-8 h-0.5 ${
                      blocks[index + 1]?.isValid ? "bg-phosphor/50" : "bg-crimson/50"
                    }`}
                    animate={!blocks[index + 1]?.isValid ? { opacity: [0.3, 1, 0.3] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <div
                    className={`w-0 h-0 border-y-4 border-y-transparent border-l-8 ${
                      blocks[index + 1]?.isValid ? "border-l-phosphor/50" : "border-l-crimson/50"
                    }`}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add new event */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={newEventData}
          onChange={(e) => setNewEventData(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addBlock()}
          placeholder="Enter event data (e.g., 'User login', 'API call', 'Model inference')"
          className="flex-1 px-4 py-3 bg-surface-1 border border-border-subtle rounded-lg
                     text-text-bright font-mono text-sm
                     focus:outline-none focus:border-neural-2/50"
        />
        <button
          onClick={addBlock}
          disabled={!newEventData.trim()}
          className="px-6 py-3 bg-neural-2/10 border border-neural-2/30 rounded-lg
                     text-neural-2 font-mono text-sm hover:bg-neural-2/20 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Block
        </button>
        <button
          onClick={resetChain}
          className="px-6 py-3 bg-surface-1 border border-border-subtle rounded-lg
                     text-text-ghost font-mono text-sm hover:border-text-ghost/50 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-surface-1/50 rounded-lg border border-border-subtle">
          <div className="text-phosphor text-lg mb-1">1. Build</div>
          <div className="text-xs text-text-ghost">Add events to create new blocks in the chain</div>
        </div>
        <div className="p-4 bg-surface-1/50 rounded-lg border border-border-subtle">
          <div className="text-amber-400 text-lg mb-1">2. Tamper</div>
          <div className="text-xs text-text-ghost">Click any block's data to try to modify it</div>
        </div>
        <div className="p-4 bg-surface-1/50 rounded-lg border border-border-subtle">
          <div className="text-crimson text-lg mb-1">3. Observe</div>
          <div className="text-xs text-text-ghost">Watch how tampering breaks the entire chain</div>
        </div>
      </div>

      {/* Educational note */}
      <div className="p-4 border border-neural-2/20 rounded-lg bg-neural-2/5">
        <p className="text-sm text-text-body">
          <span className="text-neural-2 font-semibold">How ALKEM1 uses this:</span>{" "}
          Every AI operation creates a new block in our evidence chain. Each block contains
          the hash of the previous block, creating an unbreakable link. If anyone tries to
          alter historical records, all subsequent hashes become invalid—making tampering
          mathematically impossible to hide.
        </p>
      </div>
    </div>
  );
}

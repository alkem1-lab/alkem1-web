"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { DemoBar } from "@/components/demo";
import { DemoScenario } from "@/lib/demo/scenarios";
import { SafetyGateCard, SafetyGate } from "@/components/clinical";

// Mock data for demo
const mockResults = [
  {
    id: 1,
    title: "Sepsis Screening Protocol - Escalation Criteria",
    type: "GUIDELINE",
    source: "DEMO Hospital",
    date: "2024-10-01",
    relevance: 0.91,
    passages: [
      "Escalate when criteria X and Y are met: fever >38.5°C with tachycardia >100bpm...",
      "Hypotension (SBP <90) in presence of infection requires immediate escalation..."
    ],
    approved: true,
  },
  {
    id: 2,
    title: "Antibiotic Stewardship Guidelines",
    type: "GUIDELINE",
    source: "DEMO Hospital",
    date: "2024-06-15",
    relevance: 0.85,
    passages: [
      "Duration of empiric therapy should not exceed 48-72h without culture results...",
    ],
    approved: true,
  },
  {
    id: 3,
    title: "Adult Fever Triage Checklist",
    type: "PROTOCOL",
    source: "Emergency Department SOP",
    date: "2024-01-20",
    relevance: 0.78,
    passages: [
      "Initial assessment: vital signs, mental status, skin examination...",
    ],
    approved: true,
  },
];

const mockSafetyGate: SafetyGate = {
  level: "high",
  decision: "review_required",
  ruleId: "SG-MED-TRIAGE-001",
  policyVersion: "1.3.0",
  triggers: ["escalation_criteria", "hypotension_flag", "sepsis_screen"],
  rationale: "High-risk category detected (sepsis pathway). Human review required before any clinical action.",
  auditLink: "/proof?entry=LEDGER-000029",
};

const sourceTypes = ["Guideline", "Protocol", "SOP", "Internal"];

export default function MedicalVaultPage() {
  const [query, setQuery] = useState("");
  const [hybridWeight, setHybridWeight] = useState(0.75);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Guideline", "Protocol"]);
  const [approvedOnly, setApprovedOnly] = useState(true);
  const [requirePrimary, setRequirePrimary] = useState(true);
  const [rerank, setRerank] = useState(true);
  const [selectedResult, setSelectedResult] = useState<typeof mockResults[0] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSafetyGate, setShowSafetyGate] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      setHasSearched(true);
      setSelectedResult(mockResults[0]);
      // Show safety gate for high-risk queries
      if (query.toLowerCase().includes("sepsis") ||
          query.toLowerCase().includes("escalate") ||
          query.toLowerCase().includes("hypotension")) {
        setShowSafetyGate(true);
      }
    }
  };

  // Demo Mode handlers
  const handleLoadScenario = useCallback((scenario: DemoScenario) => {
    setQuery(scenario.query);
    setHybridWeight(scenario.filters.hybridWeight ?? 0.75);
    setApprovedOnly(true);
    setRequirePrimary(scenario.filters.requirePrimary ?? true);
    setRerank(scenario.filters.rerank ?? true);

    const typeMap: Record<string, string> = {
      guideline: "Guideline",
      protocol: "Protocol",
      internal: "Internal",
    };
    setSelectedTypes(
      scenario.filters.sourceTypes?.map((t) => typeMap[t] || t) ?? ["Guideline", "Protocol"]
    );
  }, []);

  const handleRunWorkflow = useCallback((scenario: DemoScenario) => {
    setHasSearched(true);
    setSelectedResult(mockResults[0]);
    setShowSafetyGate(true);
  }, []);

  return (
    <div className="min-h-screen bg-void">
      {/* Demo Bar */}
      <DemoBar
        vertical="medical"
        onLoadScenario={handleLoadScenario}
        onRunWorkflow={handleRunWorkflow}
      />

      {/* Hero Header */}
      <section className="pt-20 pb-6 md:pb-8 px-4 md:px-6 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                <h1 className="text-xl md:text-2xl font-display text-text-bright">Clinical Vault</h1>
                <span className="px-2 py-0.5 text-xs font-mono bg-crimson/10 text-crimson rounded">
                  Guideline-bound
                </span>
                <span className="px-2 py-0.5 text-xs font-mono bg-neural-2/10 text-neural-2 rounded">
                  On-prem / VPC
                </span>
                <span className="px-2 py-0.5 text-xs font-mono bg-amber-400/10 text-amber-400 rounded">
                  Audit-ready
                </span>
              </div>
              <p className="text-text-ghost text-sm">
                Approved guidelines, protocols, and SOPs — searchable with citations and safety gates.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/solutions/medical" className="text-sm text-text-ghost hover:text-text-body">
                ← Back to Medical
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 md:mt-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search guidelines…"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-surface-1 border border-border-subtle rounded-lg
                             text-text-bright placeholder:text-text-ghost text-sm md:text-base
                             focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20"
                />
                <div className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-ghost">
                  Enter
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="px-4 md:px-6 py-2.5 md:py-3 bg-crimson text-white font-mono text-sm rounded-lg hover:bg-crimson/80 transition-colors"
              >
                Search
              </button>
            </div>
            <div className="hidden md:flex items-center gap-4 mt-3 text-xs text-text-ghost">
              <span>Approved guidelines only. Every result includes citations and safety flags.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Gate Alert (when triggered) */}
      <AnimatePresence>
        {showSafetyGate && hasSearched && (
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 py-4 bg-crimson/5 border-b border-crimson/20"
          >
            <div className="max-w-7xl mx-auto">
              <SafetyGateCard
                gate={mockSafetyGate}
                onOpenReview={() => console.log("Open review")}
                onViewPolicy={() => console.log("View policy")}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Main Layout - Responsive */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* Left Column - Filters (collapsible on mobile) */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full mb-4 p-3 bg-surface-1/30 rounded-xl border border-border-subtle flex items-center justify-between"
            >
              <span className="text-sm font-mono text-text-bright">Filters</span>
              <svg
                className={`w-4 h-4 text-text-ghost transition-transform ${showFilters ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`lg:sticky lg:top-20 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="p-4 bg-surface-1/30 rounded-xl border border-border-subtle">
                <h3 className="text-sm font-mono text-text-bright mb-1 hidden lg:block">Filters</h3>
                <p className="text-xs text-text-ghost mb-4 hidden lg:block">
                  Only approved guidelines. Keep it protocol-safe.
                </p>

                {/* Hybrid Weight Slider */}
                <div className="mb-6">
                  <label className="block text-xs text-text-ghost mb-2">Search Mode</label>
                  <div className="flex items-center justify-between text-xs text-text-ghost mb-1">
                    <span>Semantic</span>
                    <span>Keyword</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={hybridWeight}
                    onChange={(e) => setHybridWeight(parseFloat(e.target.value))}
                    className="w-full accent-crimson"
                  />
                </div>

                {/* Source Type */}
                <div className="mb-4">
                  <label className="block text-xs text-text-ghost mb-2">Source Type</label>
                  <div className="space-y-2">
                    {sourceTypes.map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => setSelectedTypes(prev =>
                            prev.includes(type) ? prev.filter(x => x !== type) : [...prev, type]
                          )}
                          className="rounded border-border-subtle accent-crimson"
                        />
                        <span className="text-sm text-text-body">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Safety Toggles */}
                <div className="space-y-3 pt-4 border-t border-border-subtle">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-text-body">Approved only</span>
                    <input
                      type="checkbox"
                      checked={approvedOnly}
                      onChange={() => setApprovedOnly(!approvedOnly)}
                      className="rounded accent-crimson"
                    />
                  </label>
                  <p className="text-xs text-text-ghost -mt-2">
                    Only hospital-approved guidelines.
                  </p>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-text-body">Require primary source</span>
                    <input
                      type="checkbox"
                      checked={requirePrimary}
                      onChange={() => setRequirePrimary(!requirePrimary)}
                      className="rounded accent-crimson"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-text-body">Rerank</span>
                    <input
                      type="checkbox"
                      checked={rerank}
                      onChange={() => setRerank(!rerank)}
                      className="rounded accent-crimson"
                    />
                  </label>
                </div>

                <button className="w-full mt-4 py-2 text-xs text-text-ghost hover:text-text-body transition-colors">
                  Reset filters
                </button>
              </div>
            </div>
          </aside>

          {/* Center Column - Results */}
          <main className="lg:col-span-5 order-1 lg:order-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-mono text-text-bright">Results</h3>
              <p className="text-xs text-text-ghost">
                Click a result to view and cite.
              </p>
            </div>

            {!hasSearched ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 text-center border border-dashed border-border-subtle rounded-xl"
              >
                <div className="text-4xl mb-4">🔍</div>
                <h4 className="text-lg text-text-bright mb-2">Search approved guidelines</h4>
                <p className="text-sm text-text-ghost">
                  All results are from hospital-approved sources with citations.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {mockResults.map((result) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedResult(result)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedResult?.id === result.id
                        ? "border-crimson/50 bg-crimson/5"
                        : "border-border-subtle bg-surface-1/30 hover:border-text-ghost/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs font-mono rounded ${
                          result.type === "GUIDELINE" ? "bg-crimson/20 text-crimson" :
                          "bg-amber-400/20 text-amber-400"
                        }`}>
                          {result.type}
                        </span>
                        <span className="text-xs text-text-ghost">{result.source}</span>
                        <span className="text-xs text-text-ghost">• {result.date}</span>
                        {result.approved && (
                          <span className="text-xs text-phosphor">✓ Approved</span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-crimson">
                        {(result.relevance * 100).toFixed(0)}%
                      </span>
                    </div>

                    <h4 className="text-text-bright font-medium mb-2">{result.title}</h4>

                    <div className="space-y-1">
                      {result.passages.map((passage, i) => (
                        <p key={i} className="text-xs text-text-ghost line-clamp-1">
                          &quot;{passage}&quot;
                        </p>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button className="px-2 py-1 text-xs text-text-ghost hover:text-crimson transition-colors">
                        Open
                      </button>
                      <button className="px-2 py-1 text-xs text-text-ghost hover:text-crimson transition-colors">
                        Pin
                      </button>
                      <button className="px-2 py-1 text-xs text-text-ghost hover:text-crimson transition-colors">
                        Cite
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </main>

          {/* Right Column - Document Viewer */}
          <aside className="lg:col-span-4 order-3">
            {/* Mobile toggle when result selected */}
            {selectedResult && (
              <button
                onClick={() => setShowViewer(!showViewer)}
                className="lg:hidden w-full mb-4 p-3 bg-crimson/10 border border-crimson/30 rounded-xl flex items-center justify-between"
              >
                <span className="text-sm font-mono text-crimson truncate">View: {selectedResult.title.slice(0, 25)}...</span>
                <svg
                  className={`w-4 h-4 text-crimson transition-transform flex-shrink-0 ${showViewer ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            <div className={`lg:sticky lg:top-20 ${selectedResult && showViewer ? "block" : "hidden lg:block"}`}>
              <div className="p-4 bg-surface-1/30 rounded-xl border border-border-subtle min-h-[300px] lg:min-h-[500px]">
                <h3 className="text-sm font-mono text-text-bright mb-1">Guideline Viewer</h3>
                <p className="text-xs text-text-ghost mb-4">
                  Approved text with highlighted passages.
                </p>

                <AnimatePresence mode="wait">
                  {selectedResult ? (
                    <motion.div
                      key={selectedResult.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Document Header */}
                      <div className="p-3 bg-surface-2 rounded-lg mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-xs font-mono rounded ${
                            selectedResult.type === "GUIDELINE" ? "bg-crimson/20 text-crimson" :
                            "bg-amber-400/20 text-amber-400"
                          }`}>
                            {selectedResult.type}
                          </span>
                          {selectedResult.approved && (
                            <span className="text-xs text-phosphor">✓ Approved</span>
                          )}
                        </div>
                        <h4 className="text-text-bright text-sm font-medium">
                          {selectedResult.title}
                        </h4>
                        <p className="text-xs text-text-ghost mt-1">
                          Source: {selectedResult.source} • {selectedResult.date}
                        </p>
                      </div>

                      {/* Document Content */}
                      <div className="p-3 bg-surface-2/50 rounded-lg mb-4 max-h-64 overflow-y-auto">
                        <p className="text-sm text-text-body leading-relaxed">
                          {selectedResult.passages.map((p, i) => (
                            <span key={i}>
                              <mark className="bg-crimson/20 text-text-bright px-1 rounded">
                                {p}
                              </mark>
                              {i < selectedResult.passages.length - 1 && (
                                <>
                                  <br />
                                  <br />
                                </>
                              )}
                            </span>
                          ))}
                        </p>
                      </div>

                      {/* Citations Panel */}
                      <div className="border-t border-border-subtle pt-4">
                        <h4 className="text-xs font-mono text-text-ghost mb-3">
                          Citations & Provenance
                        </h4>
                        <div className="space-y-2">
                          <button className="w-full px-3 py-2 text-left text-sm text-text-body bg-surface-2 rounded hover:bg-surface-1 transition-colors">
                            Add citation to memo
                          </button>
                          <button className="w-full px-3 py-2 text-left text-sm text-text-body bg-surface-2 rounded hover:bg-surface-1 transition-colors">
                            Copy citation
                          </button>
                          <button className="w-full px-3 py-2 text-left text-sm text-text-body bg-surface-2 rounded hover:bg-surface-1 transition-colors">
                            Show provenance
                          </button>
                        </div>
                      </div>

                      {/* Proof Stub */}
                      <div className="mt-4 p-3 bg-amber-400/5 border border-amber-400/20 rounded-lg">
                        <p className="text-xs text-amber-400">
                          🛡️ This view is logged • Ledger entry #12,891
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center h-64 text-text-ghost text-sm"
                    >
                      Select a result to view
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="border-t border-border-subtle py-4 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-text-ghost">
            Decision support only. Final clinical judgment remains with licensed clinicians.
          </p>
        </div>
      </footer>
    </div>
  );
}

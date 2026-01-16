"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { DemoBar } from "@/components/demo";
import { DemoScenario } from "@/lib/demo/scenarios";

// Mock data for demo
const mockResults = [
  {
    id: 1,
    title: "Zakon o obligacionim odnosima, član 154",
    type: "LAW",
    jurisdiction: "RS",
    date: "2020-03-15",
    relevance: 0.94,
    passages: [
      "Ko drugome prouzrokuje štetu dužan je naknaditi je...",
      "Za štetu od stvari ili delatnosti od kojih potiče povećana opasnost..."
    ],
  },
  {
    id: 2,
    title: "Vrhovni kasacioni sud, Rev 1234/2022",
    type: "CASE",
    jurisdiction: "RS",
    court: "VKS",
    date: "2022-11-08",
    relevance: 0.89,
    passages: [
      "Teret dokazivanja uzročne veze je na tužiocu...",
      "Sud je pravilno primenio pravilo o prebacivanju tereta dokazivanja..."
    ],
  },
  {
    id: 3,
    title: "Komentar ZOO - Prof. Perović",
    type: "DOCTRINE",
    jurisdiction: "RS",
    date: "2018-01-01",
    relevance: 0.82,
    passages: [
      "Uzročna veza kao element odgovornosti za štetu predstavlja...",
    ],
  },
];

const sourceTypes = ["Law", "Case Law", "Doctrine", "Internal"];
const jurisdictions = ["RS", "CH", "EU", "US", "UK"];

export default function LegalVaultPage() {
  const [query, setQuery] = useState("");
  const [hybridWeight, setHybridWeight] = useState(0.7);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(["RS"]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Law", "Case Law", "Doctrine"]);
  const [citeableOnly, setCiteableOnly] = useState(true);
  const [requirePrimary, setRequirePrimary] = useState(true);
  const [rerank, setRerank] = useState(true);
  const [dedupe, setDedupe] = useState(true);
  const [selectedResult, setSelectedResult] = useState<typeof mockResults[0] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      setHasSearched(true);
      setSelectedResult(mockResults[0]);
    }
  };

  // Demo Mode handlers
  const handleLoadScenario = useCallback((scenario: DemoScenario) => {
    // Load scenario filters into UI
    setQuery(scenario.query);
    setHybridWeight(scenario.filters.hybridWeight ?? 0.7);
    setSelectedJurisdictions(scenario.filters.jurisdiction ?? ["RS"]);

    // Map source types
    const typeMap: Record<string, string> = {
      law: "Law",
      case_law: "Case Law",
      doctrine: "Doctrine",
      internal: "Internal",
      guideline: "Doctrine",
      protocol: "Internal",
    };
    setSelectedTypes(
      scenario.filters.sourceTypes?.map((t) => typeMap[t] || t) ?? ["Law", "Case Law"]
    );

    setCiteableOnly(scenario.filters.citeableOnly ?? true);
    setRequirePrimary(scenario.filters.requirePrimary ?? false);
    setRerank(scenario.filters.rerank ?? true);
    setDedupe(scenario.filters.dedupe ?? true);
  }, []);

  const handleRunWorkflow = useCallback((scenario: DemoScenario) => {
    // Simulate running workflow - trigger search and show results
    setHasSearched(true);
    setSelectedResult(mockResults[0]);
  }, []);

  return (
    <div className="min-h-screen bg-void">
      {/* Demo Bar */}
      <DemoBar
        vertical="legal"
        onLoadScenario={handleLoadScenario}
        onRunWorkflow={handleRunWorkflow}
      />

      {/* Hero Header */}
      <section className="pt-20 pb-6 md:pb-8 px-4 md:px-6 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                <h1 className="text-xl md:text-2xl font-display text-text-bright">Legal Vault</h1>
                <span className="px-2 py-0.5 text-xs font-mono bg-phosphor/10 text-phosphor rounded">
                  Privacy-first
                </span>
                <span className="px-2 py-0.5 text-xs font-mono bg-neural-2/10 text-neural-2 rounded">
                  On-prem / VPC
                </span>
                <span className="px-2 py-0.5 text-xs font-mono bg-amber-400/10 text-amber-400 rounded">
                  Audit-ready
                </span>
              </div>
              <p className="text-text-ghost text-sm">
                Your private corpus of laws, decisions, and doctrine — searchable by meaning, not keywords.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/solutions/legal" className="text-sm text-text-ghost hover:text-text-body">
                ← Back to Legal
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
                  placeholder="Search legal corpus…"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-surface-1 border border-border-subtle rounded-lg
                             text-text-bright placeholder:text-text-ghost text-sm md:text-base
                             focus:outline-none focus:border-phosphor/50 focus:ring-1 focus:ring-phosphor/20"
                />
                <div className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-ghost">
                  Enter
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="px-4 md:px-6 py-2.5 md:py-3 bg-phosphor text-void font-mono text-sm rounded-lg hover:bg-phosphor-dim transition-colors"
              >
                Search
              </button>
            </div>
            <div className="hidden md:flex items-center gap-4 mt-3 text-xs text-text-ghost">
              <span>Hybrid search is ON — semantic + keyword. Every result is traceable.</span>
            </div>
          </div>
        </div>
      </section>

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
                  Narrow by jurisdiction, court, and source type. Keep it court-safe.
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
                    className="w-full"
                  />
                  <p className="text-xs text-text-ghost mt-1">
                    Use semantic for concepts, keyword for articles.
                  </p>
                </div>

                {/* Jurisdiction */}
                <div className="mb-4">
                  <label className="block text-xs text-text-ghost mb-2">Jurisdiction</label>
                  <div className="flex flex-wrap gap-2">
                    {jurisdictions.map((j) => (
                      <button
                        key={j}
                        onClick={() => setSelectedJurisdictions(prev =>
                          prev.includes(j) ? prev.filter(x => x !== j) : [...prev, j]
                        )}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          selectedJurisdictions.includes(j)
                            ? "bg-phosphor/20 text-phosphor border border-phosphor/30"
                            : "bg-surface-2 text-text-ghost border border-border-subtle hover:border-text-ghost/30"
                        }`}
                      >
                        {j}
                      </button>
                    ))}
                  </div>
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
                          className="rounded border-border-subtle"
                        />
                        <span className="text-sm text-text-body">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div className="mb-4">
                  <label className="block text-xs text-text-ghost mb-2">Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      className="flex-1 px-2 py-1 bg-surface-2 border border-border-subtle rounded text-xs text-text-body"
                      defaultValue="2015-01-01"
                    />
                    <input
                      type="date"
                      className="flex-1 px-2 py-1 bg-surface-2 border border-border-subtle rounded text-xs text-text-body"
                      defaultValue="2026-01-16"
                    />
                  </div>
                  <p className="text-xs text-text-ghost mt-1">
                    Prefer recent decisions when relevance is similar.
                  </p>
                </div>

                {/* Statute / Article */}
                <div className="mb-4">
                  <label className="block text-xs text-text-ghost mb-2">Statute / Article</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., ZOO"
                      className="flex-1 px-2 py-1 bg-surface-2 border border-border-subtle rounded text-xs text-text-body placeholder:text-text-ghost"
                    />
                    <input
                      type="text"
                      placeholder="čl. 154"
                      className="w-20 px-2 py-1 bg-surface-2 border border-border-subtle rounded text-xs text-text-body placeholder:text-text-ghost"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-4 border-t border-border-subtle">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-text-body">Citeable only</span>
                    <input
                      type="checkbox"
                      checked={citeableOnly}
                      onChange={() => setCiteableOnly(!citeableOnly)}
                      className="rounded"
                    />
                  </label>
                  <p className="text-xs text-text-ghost -mt-2">
                    Excludes low-quality sources and unverified scrapes.
                  </p>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-text-body">Require primary source</span>
                    <input
                      type="checkbox"
                      checked={requirePrimary}
                      onChange={() => setRequirePrimary(!requirePrimary)}
                      className="rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-text-body">Rerank</span>
                    <input
                      type="checkbox"
                      checked={rerank}
                      onChange={() => setRerank(!rerank)}
                      className="rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-text-body">Deduplicate</span>
                    <input
                      type="checkbox"
                      checked={dedupe}
                      onChange={() => setDedupe(!dedupe)}
                      className="rounded"
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
                Click a result to open the original text and cite it.
              </p>
            </div>

            {!hasSearched ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 text-center border border-dashed border-border-subtle rounded-xl"
              >
                <div className="text-4xl mb-4">🔍</div>
                <h4 className="text-lg text-text-bright mb-2">Start with a question</h4>
                <p className="text-sm text-text-ghost">
                  Search by concept (semantic) or by article (keyword). Hybrid is recommended.
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
                        ? "border-phosphor/50 bg-phosphor/5"
                        : "border-border-subtle bg-surface-1/30 hover:border-text-ghost/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs font-mono rounded ${
                          result.type === "LAW" ? "bg-phosphor/20 text-phosphor" :
                          result.type === "CASE" ? "bg-neural-2/20 text-neural-2" :
                          "bg-amber-400/20 text-amber-400"
                        }`}>
                          {result.type}
                        </span>
                        <span className="text-xs text-text-ghost">{result.jurisdiction}</span>
                        {result.court && (
                          <span className="text-xs text-text-ghost">• {result.court}</span>
                        )}
                        <span className="text-xs text-text-ghost">• {result.date}</span>
                      </div>
                      <span className="text-xs font-mono text-phosphor">
                        {(result.relevance * 100).toFixed(0)}%
                      </span>
                    </div>

                    <h4 className="text-text-bright font-medium mb-2">{result.title}</h4>

                    <div className="space-y-1">
                      {result.passages.map((passage, i) => (
                        <p key={i} className="text-xs text-text-ghost line-clamp-1">
                          "{passage}"
                        </p>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button className="px-2 py-1 text-xs text-text-ghost hover:text-phosphor transition-colors">
                        Open
                      </button>
                      <button className="px-2 py-1 text-xs text-text-ghost hover:text-phosphor transition-colors">
                        Pin
                      </button>
                      <button className="px-2 py-1 text-xs text-text-ghost hover:text-phosphor transition-colors">
                        Add to Case
                      </button>
                      <button className="px-2 py-1 text-xs text-text-ghost hover:text-phosphor transition-colors">
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
                className="lg:hidden w-full mb-4 p-3 bg-phosphor/10 border border-phosphor/30 rounded-xl flex items-center justify-between"
              >
                <span className="text-sm font-mono text-phosphor">View Document: {selectedResult.title.slice(0, 30)}...</span>
                <svg
                  className={`w-4 h-4 text-phosphor transition-transform ${showViewer ? "rotate-180" : ""}`}
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
                <h3 className="text-sm font-mono text-text-bright mb-1">Document Viewer</h3>
                <p className="text-xs text-text-ghost mb-4">
                  Original text with highlighted passages.
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
                            selectedResult.type === "LAW" ? "bg-phosphor/20 text-phosphor" :
                            selectedResult.type === "CASE" ? "bg-neural-2/20 text-neural-2" :
                            "bg-amber-400/20 text-amber-400"
                          }`}>
                            {selectedResult.type}
                          </span>
                          <span className="text-xs text-text-ghost">{selectedResult.jurisdiction}</span>
                        </div>
                        <h4 className="text-text-bright text-sm font-medium">
                          {selectedResult.title}
                        </h4>
                        <p className="text-xs text-text-ghost mt-1">
                          Date: {selectedResult.date}
                        </p>
                      </div>

                      {/* Document Content */}
                      <div className="p-3 bg-surface-2/50 rounded-lg mb-4 max-h-64 overflow-y-auto">
                        <p className="text-sm text-text-body leading-relaxed">
                          {selectedResult.passages.map((p, i) => (
                            <span key={i}>
                              <mark className="bg-phosphor/20 text-text-bright px-1 rounded">
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
                          🛡️ This view is logged • Ledger entry #12,847
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
            Decision support. Final legal judgment remains with licensed counsel.
          </p>
        </div>
      </footer>
    </div>
  );
}

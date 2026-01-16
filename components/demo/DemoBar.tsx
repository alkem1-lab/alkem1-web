"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_SCENARIOS, DemoScenario } from "@/lib/demo/scenarios";

interface DemoBarProps {
  vertical?: "legal" | "private" | "medical";
  onLoadScenario?: (scenario: DemoScenario) => void;
  onRunWorkflow?: (scenario: DemoScenario) => void;
}

export function DemoBar({ vertical, onLoadScenario, onRunWorkflow }: DemoBarProps) {
  const router = useRouter();
  const [scenarioId, setScenarioId] = useState(DEMO_SCENARIOS[0].id);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scenarios = useMemo(() => {
    if (vertical) {
      return DEMO_SCENARIOS.filter((s) => s.vertical === vertical);
    }
    return DEMO_SCENARIOS;
  }, [vertical]);

  const scenario = useMemo(
    () => DEMO_SCENARIOS.find((s) => s.id === scenarioId) || scenarios[0],
    [scenarioId, scenarios]
  );

  const loadScenario = async () => {
    // In real implementation: POST /api/demo/load
    // For now: trigger callback + show visual feedback
    console.log("[Demo] Loading scenario:", scenario.id);

    if (onLoadScenario) {
      onLoadScenario(scenario);
    }

    // Visual feedback
    setCurrentStep("Loaded: " + scenario.label);
    setTimeout(() => setCurrentStep(null), 2000);
  };

  const runWorkflow = async () => {
    if (isRunning) return;
    setIsRunning(true);

    console.log("[Demo] Running workflow:", scenario.workflow);

    // Simulate workflow steps
    for (const step of scenario.workflow) {
      setCurrentStep(step);
      await new Promise((r) => setTimeout(r, 800));
    }

    if (onRunWorkflow) {
      onRunWorkflow(scenario);
    }

    setCurrentStep("✓ Complete");
    setTimeout(() => {
      setCurrentStep(null);
      setIsRunning(false);
    }, 1500);
  };

  const showProof = () => {
    router.push(scenario.proof.route);
  };

  const verticalColors: Record<string, string> = {
    legal: "border-phosphor/30 bg-phosphor/5",
    private: "border-neural-2/30 bg-neural-2/5",
    medical: "border-crimson/30 bg-crimson/5",
  };

  const verticalAccent: Record<string, string> = {
    legal: "text-phosphor",
    private: "text-neural-2",
    medical: "text-crimson",
  };

  // Mobile minimized state - floating button
  if (isMobile && isMinimized) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400/50 backdrop-blur-md flex items-center justify-center shadow-lg"
      >
        <span className="text-amber-400 text-xs font-mono">DEMO</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed z-50 rounded-2xl border backdrop-blur-md ${
        verticalColors[scenario.vertical] || "border-white/10 bg-black/40"
      } ${
        isMobile
          ? "bottom-4 left-4 right-4 top-auto"
          : "top-16 right-6"
      }`}
    >
      {/* Mobile minimize button */}
      {isMobile && (
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface-1 border border-border-subtle flex items-center justify-center text-text-ghost hover:text-text-body"
        >
          ×
        </button>
      )}

      {/* Collapsed Bar */}
      <div className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 ${isMobile ? "flex-wrap" : ""}`}>
        {/* Badge */}
        <div className="text-[8px] md:text-[10px] px-1.5 md:px-2 py-0.5 md:py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 uppercase tracking-wider whitespace-nowrap">
          Demo • Sim
        </div>

        {/* Scenario Selector */}
        <select
          className="bg-surface-1 text-xs md:text-sm border border-border-subtle rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-text-body focus:outline-none focus:border-phosphor/50 flex-1 md:flex-none min-w-0"
          value={scenarioId}
          onChange={(e) => setScenarioId(e.target.value)}
        >
          {scenarios.map((s) => (
            <option key={s.id} value={s.id}>
              {isMobile ? s.label.split(":")[0] : s.label}
            </option>
          ))}
        </select>

        {/* Action Buttons */}
        <div className="flex gap-1 md:gap-2">
          <button
            onClick={loadScenario}
            className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-mono rounded-lg border border-border-subtle hover:border-phosphor/50 hover:text-phosphor transition-colors text-text-body"
          >
            Load
          </button>
          <button
            onClick={runWorkflow}
            disabled={isRunning}
            className={`px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-mono rounded-lg border transition-colors ${
              isRunning
                ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
                : "border-phosphor/50 bg-phosphor/10 text-phosphor hover:bg-phosphor/20"
            }`}
          >
            {isRunning ? "..." : "Run"}
          </button>
          <button
            onClick={showProof}
            className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-mono rounded-lg border border-neural-2/50 bg-neural-2/10 text-neural-2 hover:bg-neural-2/20 transition-colors"
          >
            Proof
          </button>
        </div>

        {/* Expand Toggle - hide on mobile */}
        {!isMobile && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-text-ghost hover:text-text-body transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Current Step Indicator */}
      <AnimatePresence>
        {currentStep && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-3 pb-2"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              {isRunning && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 border border-amber-400 border-t-transparent rounded-full"
                />
              )}
              {currentStep}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Panel - Desktop only */}
      <AnimatePresence>
        {isExpanded && !isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border-subtle"
          >
            <div className="p-4 space-y-4 max-w-md">
              {/* Scenario Info */}
              <div>
                <h4 className={`text-sm font-bold ${verticalAccent[scenario.vertical]}`}>
                  {scenario.label}
                </h4>
                <p className="text-xs text-text-ghost mt-1">{scenario.description}</p>
              </div>

              {/* Query */}
              <div>
                <span className="text-[10px] font-mono text-text-ghost uppercase tracking-wider">
                  Query
                </span>
                <p className="text-sm text-text-body mt-1 p-2 bg-surface-2 rounded-lg font-mono">
                  {scenario.query}
                </p>
              </div>

              {/* Filters */}
              <div>
                <span className="text-[10px] font-mono text-text-ghost uppercase tracking-wider">
                  Filters
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {scenario.filters.jurisdiction?.map((j) => (
                    <span key={j} className="px-2 py-0.5 bg-phosphor/10 text-phosphor text-[10px] rounded">
                      {j}
                    </span>
                  ))}
                  {scenario.filters.sourceTypes?.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-neural-2/10 text-neural-2 text-[10px] rounded">
                      {t}
                    </span>
                  ))}
                  {scenario.filters.citeableOnly && (
                    <span className="px-2 py-0.5 bg-amber-400/10 text-amber-400 text-[10px] rounded">
                      citeable
                    </span>
                  )}
                </div>
              </div>

              {/* Expected Output */}
              <div>
                <span className="text-[10px] font-mono text-text-ghost uppercase tracking-wider">
                  Expected Output
                </span>
                <ul className="mt-1 space-y-1">
                  {scenario.expected.slice(0, 4).map((e, i) => (
                    <li key={i} className="text-xs text-text-body flex items-start gap-2">
                      <span className="text-phosphor">•</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Proof Moment */}
              <div className="p-3 bg-amber-400/5 border border-amber-400/20 rounded-lg">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                  🎯 Proof Moment
                </span>
                <p className="text-xs text-text-body mt-1">{scenario.proof.note}</p>
              </div>

              {/* Director Line */}
              <div className="pt-3 border-t border-border-subtle">
                <span className="text-[10px] font-mono text-text-ghost uppercase tracking-wider">
                  Director Line
                </span>
                <blockquote className="text-sm text-text-bright mt-1 italic">
                  &ldquo;{scenario.directorLine}&rdquo;
                </blockquote>
              </div>

              {/* Workflow Steps */}
              <div>
                <span className="text-[10px] font-mono text-text-ghost uppercase tracking-wider">
                  Workflow
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {scenario.workflow.map((step, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 text-[10px] rounded font-mono ${
                        currentStep === step
                          ? "bg-amber-400/20 text-amber-400"
                          : "bg-surface-2 text-text-ghost"
                      }`}
                    >
                      {i + 1}. {step}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

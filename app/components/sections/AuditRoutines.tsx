"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const eodSteps = [
  {
    step: 1,
    name: "SSOT Validation",
    command: "make ssot-full",
    description: "Validate SSOT schema, generate canon, check guardrails",
    status: "success",
  },
  {
    step: 2,
    name: "SSOT Reseal",
    command: "make ssot-reseal-all",
    description: "Update seals after SSOT changes",
    status: "success",
  },
  {
    step: 3,
    name: "Clean Working Tree",
    command: "git stash -u -m 'wip:eod...'",
    description: "Stash uncommitted changes with timestamp",
    status: "success",
  },
  {
    step: 4,
    name: "Kill Switch Check",
    command: "Redis DEL (fail-open)",
    description: "Clear kill switch state (continues if Redis unavailable)",
    status: "success",
  },
  {
    step: 5,
    name: "Canon Ledger Emit",
    command: "make ssot-canon-emit",
    description: "Emit SSOT canon change event to ledger (fail-open)",
    status: "success",
  },
  {
    step: 6,
    name: "Attestations",
    command: "attest_determinism.sh + attest_observability.sh",
    description: "Generate deterministic and observability attestations",
    status: "success",
  },
];

const sodSteps = [
  {
    step: 1,
    name: "Restore Stash",
    command: "git stash pop (fail-open)",
    description: "Restore previous day's work",
    status: "success",
  },
  {
    step: 2,
    name: "SSOT Verification",
    command: "make ssot-full",
    description: "Verify SSOT integrity",
    status: "success",
  },
  {
    step: 3,
    name: "Kill Switch Clear",
    command: "Redis DEL (fail-open)",
    description: "Clear kill switch state",
    status: "success",
  },
];

function StepCard({ step, isActive, onClick }: {
  step: typeof eodSteps[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all text-left w-full ${
        isActive
          ? "bg-phosphor/10 border-phosphor"
          : "bg-surface-1/50 border-border-subtle hover:border-border-default"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isActive ? "bg-phosphor text-void" : "bg-surface-2 text-text-ghost"
          }`}
        >
          {step.step}
        </div>
        <div className="flex-1">
          <div className={`text-sm font-bold ${isActive ? "text-phosphor" : "text-text-bright"}`}>
            {step.name}
          </div>
          <div className="text-xs font-mono text-text-ghost mt-1">{step.command}</div>
        </div>
        <div className={`text-xs px-2 py-1 rounded ${
          step.status === "success" ? "bg-phosphor/20 text-phosphor" : "bg-ember/20 text-ember"
        }`}>
          {step.status === "success" ? "✓" : "⚠"}
        </div>
      </div>
      <p className="text-xs text-text-body">{step.description}</p>
    </motion.button>
  );
}

function WorkflowVisualization({ steps, activeStep }: {
  steps: typeof eodSteps;
  activeStep: number;
}) {
  return (
    <div className="space-y-4">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-4">
          {/* Step indicator */}
          <div className="flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                i <= activeStep
                  ? "bg-phosphor border-phosphor text-void"
                  : "bg-surface-2 border-border-subtle text-text-ghost"
              }`}
              animate={i === activeStep ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: i === activeStep ? Infinity : 0 }}
            >
              {i < activeStep ? "✓" : step.step}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                className={`w-0.5 h-12 mt-2 ${
                  i < activeStep ? "bg-phosphor" : "bg-border-subtle"
                }`}
                initial={{ height: 0 }}
                animate={{ height: i < activeStep ? 48 : 48 }}
              />
            )}
          </div>

          {/* Step content */}
          <motion.div
            className={`flex-1 p-4 rounded-xl border ${
              i <= activeStep
                ? "bg-phosphor/10 border-phosphor/30"
                : "bg-surface-1/50 border-border-subtle"
            }`}
            animate={i === activeStep ? {
              boxShadow: ["0 0 0px rgba(110, 231, 183, 0)", "0 0 20px rgba(110, 231, 183, 0.3)", "0 0 0px rgba(110, 231, 183, 0)"],
            } : {}}
            transition={{ duration: 2, repeat: i === activeStep ? Infinity : 0 }}
          >
            <div className="text-sm font-bold text-text-bright mb-1">{step.name}</div>
            <div className="text-xs font-mono text-text-ghost mb-2">{step.command}</div>
            <div className="text-xs text-text-body">{step.description}</div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function AuditRoutines() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [routine, setRoutine] = useState<"eod" | "sod">("eod");
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = routine === "eod" ? eodSteps : sodSteps;

  const runRoutine = () => {
    setIsRunning(true);
    setActiveStep(0);

    steps.forEach((_, i) => {
      setTimeout(() => {
        setActiveStep(i);
        if (i === steps.length - 1) {
          setTimeout(() => setIsRunning(false), 1000);
        }
      }, i * 800);
    });
  };

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
      className="relative min-h-screen flex items-center py-24 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
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
                Operational Excellence
              </span>
              <div className="h-[1px] w-12 bg-phosphor/50" />
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-text-bright mb-4"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              One Command ={" "}
              <span className="text-phosphor">Audit Closed</span>
            </h2>
            <p className="text-text-body max-w-2xl mx-auto text-lg">
              Automated audit routines. Zero manual steps.
              Daily attestations for compliance.
            </p>
          </motion.div>

          {/* Routine Selector */}
          <motion.div className="flex gap-4 mb-12 justify-center" variants={itemVariants}>
            <button
              onClick={() => {
                setRoutine("eod");
                setActiveStep(0);
                setIsRunning(false);
              }}
              className={`px-6 py-3 rounded-xl font-mono text-sm transition-all ${
                routine === "eod"
                  ? "bg-phosphor/20 border-2 border-phosphor text-phosphor"
                  : "bg-surface-1 border border-border-subtle text-text-ghost hover:text-text-body"
              }`}
            >
              End of Day (EOD)
            </button>
            <button
              onClick={() => {
                setRoutine("sod");
                setActiveStep(0);
                setIsRunning(false);
              }}
              className={`px-6 py-3 rounded-xl font-mono text-sm transition-all ${
                routine === "sod"
                  ? "bg-phosphor/20 border-2 border-phosphor text-phosphor"
                  : "bg-surface-1 border border-border-subtle text-text-ghost hover:text-text-body"
              }`}
            >
              Start of Day (SOD)
            </button>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Workflow Visualization */}
            <motion.div variants={itemVariants}>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-text-bright mb-2">
                  {routine === "eod" ? "End of Day Routine" : "Start of Day Routine"}
                </h3>
                <p className="text-sm text-text-ghost">
                  {routine === "eod"
                    ? "Complete audit closeout with automated evidence generation."
                    : "Restore workspace and verify system integrity."}
                </p>
              </div>

              <WorkflowVisualization steps={steps} activeStep={activeStep} />

              <button
                onClick={runRoutine}
                disabled={isRunning}
                className="w-full mt-6 py-3 px-6 rounded-xl bg-surface-2 border border-border-default hover:border-phosphor transition-all font-mono text-sm text-text-body hover:text-phosphor disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? "Running..." : `Run ${routine.toUpperCase()}`}
              </button>
            </motion.div>

            {/* Right: Output Artifacts */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-text-bright mb-2">Output Artifacts</h3>
                <p className="text-sm text-text-ghost mb-4">
                  Automated evidence generation for compliance and audit.
                </p>
              </div>

              <div className="space-y-4">
                {routine === "eod" ? (
                  <>
                    <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                      <div className="text-sm font-bold text-text-bright mb-2">
                        Determinism Attestation
                      </div>
                      <div className="text-xs font-mono text-text-ghost mb-2">
                        evidence/attestations/determinism-YYYYMMDD-HHMMSS/
                      </div>
                      <div className="text-xs text-text-body">
                        • Repo state<br />
                        • Redis health<br />
                        • Backend health<br />
                        • Ledger stats<br />
                        • Cache test (MISS → HIT)<br />
                        • Integrity fields
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                      <div className="text-sm font-bold text-text-bright mb-2">
                        Observability Attestation
                      </div>
                      <div className="text-xs font-mono text-text-ghost mb-2">
                        evidence/attestations/observability-YYYYMMDD-HHMMSS/
                      </div>
                      <div className="text-xs text-text-body">
                        • Metrics export<br />
                        • Log aggregation<br />
                        • Trace samples
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                      <div className="text-sm font-bold text-text-bright mb-2">
                        Daily Closeout Document
                      </div>
                      <div className="text-xs font-mono text-text-ghost mb-2">
                        evidence/auditor/DAILY_CLOSEOUT_YYYYMMDD.md
                      </div>
                      <div className="text-xs text-text-body">
                        Summary of all gates and attestations
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                      <div className="text-sm font-bold text-text-bright mb-2">
                        Workspace Restored
                      </div>
                      <div className="text-xs text-text-body">
                        Previous day&apos;s work restored from stash (if available)
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-1/50 border border-border-subtle">
                      <div className="text-sm font-bold text-text-bright mb-2">
                        SSOT Verified
                      </div>
                      <div className="text-xs text-text-body">
                        System integrity confirmed. Ready for new day.
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Key insight */}
              <div className="p-6 rounded-xl bg-phosphor/10 border border-phosphor/30">
                <h4 className="font-bold text-phosphor mb-3 flex items-center gap-2">
                  <span>💎</span> Why This Matters
                </h4>
                <p className="text-sm text-text-body leading-relaxed">
                  <span className="text-text-bright font-medium">Zero manual steps.</span>
                  {" "}One command closes the audit, generates evidence, and prepares for the next day.
                </p>
                <p className="text-sm text-text-body leading-relaxed mt-3">
                  <span className="text-phosphor">Fail-open philosophy:</span> Non-critical steps continue even if infrastructure fails.
                  Only critical gates can fail the routine.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={itemVariants}
          >
            {[
              { label: "Time to Ready", value: "~10s", color: "phosphor" },
              { label: "Manual Steps", value: "0", color: "phosphor" },
              { label: "Evidence Generated", value: "Auto", color: "neural-2" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-xl bg-surface-1/50 border border-border-subtle text-center"
                variants={itemVariants}
              >
                <div className={`text-3xl font-bold mb-2 text-${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-text-ghost">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom quote */}
          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <blockquote className="text-xl text-text-body italic max-w-3xl mx-auto">
              &quot;One command = audit closed.
              <br />
              <span className="text-phosphor not-italic font-medium">
                Automated evidence generation. Zero manual steps.
              </span>&quot;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

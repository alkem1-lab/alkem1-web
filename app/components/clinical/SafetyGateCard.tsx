"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export type RiskLevel = "low" | "medium" | "high" | "critical";
export type GateDecision = "allow" | "review_required" | "blocked";

export interface SafetyGate {
  level: RiskLevel;
  decision: GateDecision;
  ruleId: string;
  policyVersion: string;
  triggers: string[];
  rationale: string;
  auditLink: string;
}

interface SafetyGateCardProps {
  gate: SafetyGate;
  onOpenReview?: () => void;
  onViewPolicy?: () => void;
  onCopyAuditLink?: () => void;
}

const levelConfig: Record<RiskLevel, { label: string; color: string; bg: string; border: string }> = {
  low: {
    label: "NOMINAL",
    color: "text-phosphor",
    bg: "bg-phosphor/10",
    border: "border-phosphor/30",
  },
  medium: {
    label: "ELEVATED",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
  high: {
    label: "HIGH-RISK",
    color: "text-crimson",
    bg: "bg-crimson/10",
    border: "border-crimson/30",
  },
  critical: {
    label: "CRITICAL",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/50",
  },
};

const decisionText: Record<GateDecision, string> = {
  allow: "Allowed",
  review_required: "Human review required",
  blocked: "BLOCKED → citations only",
};

export function SafetyGateCard({
  gate,
  onOpenReview,
  onViewPolicy,
  onCopyAuditLink,
}: SafetyGateCardProps) {
  const config = levelConfig[gate.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border ${config.border} ${config.bg} p-6`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="text-xs font-mono text-text-ghost uppercase tracking-wider mb-1">
            Safety Gate
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-lg font-bold ${config.color}`}>{config.label}</span>
            <span className="text-text-ghost">→</span>
            <span className="text-text-bright">{decisionText[gate.decision]}</span>
          </div>
          <div className="text-sm text-text-ghost">
            Rule{" "}
            <span className="text-text-body font-mono">{gate.ruleId}</span>
            {" • "}
            Policy v{gate.policyVersion}
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`
            px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider
            ${config.bg} ${config.color} ${config.border} border
          `}
        >
          {gate.decision === "blocked" ? "BLOCKED" : gate.decision === "review_required" ? "REVIEW" : "OK"}
        </div>
      </div>

      {/* Triggers */}
      <div className="mt-4">
        <span className="text-xs font-mono text-text-ghost uppercase tracking-wider">
          Triggers
        </span>
        <div className="flex flex-wrap gap-2 mt-1">
          {gate.triggers.map((trigger) => (
            <span
              key={trigger}
              className="px-2 py-0.5 bg-surface-2 text-text-body text-xs font-mono rounded"
            >
              {trigger}
            </span>
          ))}
        </div>
      </div>

      {/* Rationale */}
      <div className="mt-4 p-3 bg-surface-2 rounded-lg">
        <p className="text-sm text-text-body">{gate.rationale}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-6">
        {gate.decision !== "allow" && (
          <button
            onClick={onOpenReview}
            className={`px-4 py-2 rounded-lg text-sm font-mono border ${config.border} ${config.color} hover:${config.bg} transition-colors`}
          >
            Open Review
          </button>
        )}
        <button
          onClick={onViewPolicy}
          className="px-4 py-2 rounded-lg text-sm font-mono border border-border-subtle text-text-body hover:border-text-ghost/30 transition-colors"
        >
          View Policy
        </button>
        <Link
          href={gate.auditLink}
          onClick={onCopyAuditLink}
          className="px-4 py-2 rounded-lg text-sm font-mono border border-border-subtle text-text-body hover:border-text-ghost/30 transition-colors"
        >
          Audit Link →
        </Link>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-6 pt-4 border-t border-border-subtle">
        <p className="text-xs text-text-ghost">
          Decision support only. Final clinical judgment remains with clinicians.
        </p>
      </div>
    </motion.div>
  );
}

// ==========================================
// Safety Gate Policy Modal Content
// ==========================================
export interface PolicyRuleDetail {
  ruleId: string;
  name: string;
  purpose: string;
  conditions: Array<{ field: string; op: string; value: string }>;
  enforcement: {
    decision: GateDecision;
    level: RiskLevel;
    jitRequired: boolean;
    citationsOnly: boolean;
  };
  auditFields: string[];
  policyVersion: string;
}

export function SafetyGatePolicyModal({ rule }: { rule: PolicyRuleDetail }) {
  const config = levelConfig[rule.enforcement.level];

  return (
    <div className="p-6 bg-surface-1 rounded-xl border border-border-subtle max-w-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display text-text-bright">
          Policy Rule <span className="font-mono text-phosphor">{rule.ruleId}</span>
        </h3>
        <span className={`px-2 py-1 text-xs font-mono rounded ${config.bg} ${config.color}`}>
          {rule.enforcement.level.toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-text-body mb-4">{rule.purpose}</p>

      {/* Conditions */}
      <div className="mb-4">
        <span className="text-xs font-mono text-text-ghost uppercase tracking-wider">
          Conditions
        </span>
        <ul className="mt-2 space-y-1">
          {rule.conditions.map((cond, i) => (
            <li key={i} className="text-sm text-text-body font-mono">
              <span className="text-text-ghost">{cond.field}</span>{" "}
              <span className="text-phosphor">{cond.op}</span>{" "}
              <span className="text-text-bright">{cond.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Enforcement */}
      <div className="mb-4 p-3 bg-surface-2 rounded-lg">
        <span className="text-xs font-mono text-text-ghost uppercase tracking-wider">
          Enforcement
        </span>
        <div className="mt-2 space-y-1 text-sm">
          <div>
            If <span className={config.color}>{rule.enforcement.level.toUpperCase()}</span> →{" "}
            <span className="text-text-bright">{decisionText[rule.enforcement.decision]}</span>
          </div>
          {rule.enforcement.jitRequired && (
            <div className="text-amber-400">• JIT approval required</div>
          )}
          {rule.enforcement.citationsOnly && (
            <div className="text-crimson">• Output blocked, citations only shown</div>
          )}
        </div>
      </div>

      {/* Audit Fields */}
      <div>
        <span className="text-xs font-mono text-text-ghost uppercase tracking-wider">
          Audit Fields
        </span>
        <div className="flex flex-wrap gap-1 mt-2">
          {rule.auditFields.map((field) => (
            <span key={field} className="px-2 py-0.5 bg-surface-2 text-text-ghost text-xs rounded">
              {field}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

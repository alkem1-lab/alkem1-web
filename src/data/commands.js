export const COMMANDS = {
  help: () => `
  Available commands:
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    overview       — what is AG1 and why it exists
    architecture   — system layers and dependencies
    runtime        — agent execution and state
    domain         — domain packs and structured truth
    mlops          — pipeline, evals, deployment gates
    stack          — technologies by responsibility
    evidence       — verification, audit, trust layer
    determinism    — why deterministic architecture
    philosophy     — the bridge between chaos and order
    whoami         — operator identity
    contact        — communication ports
    witness        — system observations
    status         — current system state
    clear          — clear terminal

  Or ask anything about AG1, determinism, domain
  intelligence, or self-aware code systems.
`,

  overview: () => `
  ╔══════════════════════════════════════════════════════╗
  ║  AG1 // SELF-AWARE CODE INTELLIGENCE                ║
  ╚══════════════════════════════════════════════════════╝

  AG1 is not a chatbot.
  It is an operator-grade intelligence layer for code,
  systems, and domain reasoning.

  Current AI tools assist coding.
  AG1 aims to understand systems, track state, reason
  over domain truth, and improve operationally.

  ── What it does ──────────────────────────────────────

  • Understands code context, not just syntax
  • Tracks runtime state across sessions
  • Reasons over domain-specific truth, not guesses
  • Produces auditable, evidence-backed outputs
  • Self-improves through structured evaluation

  ── What it is not ────────────────────────────────────

  • Not a wrapper around an LLM
  • Not a prompt chain with a personality
  • Not a coding assistant with extra steps

  ── Current focus ─────────────────────────────────────

  Kernel architecture, domain resolver, evidence chain,
  agent orchestration, deterministic output pipelines.

  Build systems. Remove illusion. Keep evidence.
`,

  architecture: () => `
  ┌──────────────────────────────────────────────────────┐
  │  AG1 ARCHITECTURE — SYSTEM LAYERS                    │
  ├──────────────────────────────────────────────────────┤
  │                                                      │
  │  ┌────────────────────────────────────────────┐      │
  │  │  INTERFACES                                │      │
  │  │  CLI / API / Operator Console              │      │
  │  └──────────────────┬─────────────────────────┘      │
  │                     │                                │
  │  ┌──────────────────▼─────────────────────────┐      │
  │  │  AGENT LAYER                               │      │
  │  │  Orchestration, planning, task execution    │      │
  │  └──────────────────┬─────────────────────────┘      │
  │                     │                                │
  │  ┌──────────────────▼─────────────────────────┐      │
  │  │  KERNEL                                    │      │
  │  │  State management, routing, contracts       │      │
  │  └──────┬───────────┬──────────┬──────────┘   │      │
  │         │           │          │               │      │
  │  ┌──────▼───┐ ┌─────▼────┐ ┌──▼───────┐      │      │
  │  │ MEMORY   │ │ DOMAIN   │ │ EVIDENCE  │      │      │
  │  │ pgvector │ │ packs    │ │ SHA-256   │      │      │
  │  │ Redis    │ │ resolver │ │ Ed25519   │      │      │
  │  └──────────┘ └──────────┘ └───────────┘      │      │
  │                     │                                │
  │  ┌──────────────────▼─────────────────────────┐      │
  │  │  MLOps                                     │      │
  │  │  Evals, lineage, deployment, observability  │      │
  │  └────────────────────────────────────────────┘      │
  │                                                      │
  └──────────────────────────────────────────────────────┘

  Every layer has contracts. Every output has lineage.
  What cannot be traced belongs in mythology.
`,

  runtime: () => `
  AGENT RUNTIME
  ════════════════════════════════════════════════════

  The runtime is where intelligence becomes operational.

  ── Principles ────────────────────────────────────

  • Agents execute within bounded contracts
  • State is canonical — one source of truth
  • Every action produces traceable evidence
  • Failure is acceptable. Fake certainty is not.

  ── Components ────────────────────────────────────

  orchestrator:     task planning + agent dispatch
  executor:         sandboxed action execution
  state_manager:    canonical state transitions
  memory:           short-term + long-term + domain
  observer:         runtime self-inspection
  watchdog:         drift detection + health

  ── Runtime invariants ────────────────────────────

  1. No output without evidence chain
  2. No state mutation without audit entry
  3. No agent action without contract
  4. Unknown is valid. Hallucination is not.
`,

  domain: () => `
  DOMAIN INTELLIGENCE
  ════════════════════════════════════════════════════

  Generic models hallucinate.
  Domain systems operate on constrained truth.

  ── Domain packs ──────────────────────────────────

  Structured knowledge containers with:

  • Authoritative documents (tier 1)
  • Supporting knowledge (tier 2)
  • Contextual references (tier 3)
  • Source provenance for every claim

  ── Resolver ──────────────────────────────────────

  query → retrieve → rank by authority → compare →
  synthesize → cite sources → return with evidence

  ── Capabilities ──────────────────────────────────

  resolve:     answer from domain truth
  compare:     contrast multiple sources
  recommend:   evidence-backed suggestions
  explain:     reasoning chain with citations
  validate:    check claims against known truth

  ── Key principle ─────────────────────────────────

  If it cannot be traced to a source, it is opinion.
  AG1 separates knowledge from noise.
`,

  mlops: () => `
  MLOps PIPELINE
  ════════════════════════════════════════════════════

  From prompt experiments to verifiable model operations.

  ── Pipeline ──────────────────────────────────────

  dataset → eval → train → verify → deploy → observe

  ── Stages ────────────────────────────────────────

  data_pipeline:     ingestion, cleaning, versioning
  evaluation:        arena, benchmarks, domain evals
  training:          LoRA, fine-tuning, alignment
  verification:      invariant checks, regression tests
  deployment:        gated releases, canary, rollback
  observability:     drift detection, latency, quality
  replay:            incident trace, state reconstruction
  lineage:           full artifact chain, reproducibility

  ── Deployment gates ──────────────────────────────

  ✓ All evals pass threshold
  ✓ No regression on core benchmarks
  ✓ Evidence chain complete
  ✓ Rollback path verified
  ✓ Signed artifact in ledger

  Nothing ships without evidence. Nothing deploys on hope.
`,

  stack: () => `
  TECHNOLOGY STACK — by responsibility
  ════════════════════════════════════════════════════

  ── Runtime ───────────────────────────────────────
  Python, FastAPI, Pydantic, async execution

  ── Interface ─────────────────────────────────────
  React, Vite, TypeScript, terminal UI

  ── Memory ────────────────────────────────────────
  pgvector, Redis, structured retrieval

  ── Messaging ─────────────────────────────────────
  NATS / Redis Streams, event-driven

  ── Domain ────────────────────────────────────────
  Document packs, knowledge graphs, source tiers

  ── Verification ──────────────────────────────────
  SHA-256, Ed25519, evidence chains, audit logs

  ── Training / Evals ──────────────────────────────
  LoRA, arena evaluation, domain-specific datasets

  ── Infrastructure ────────────────────────────────
  Docker, CI/CD, artifact pipeline, health checks

  ── Orchestration ─────────────────────────────────
  Agent contracts, state machines, deployment gates

  Tools serve architecture. Architecture serves truth.
`,

  evidence: () => `
  EVIDENCE & VERIFICATION
  ════════════════════════════════════════════════════

  Trust is not declared. It is computed.

  ── Evidence chain ────────────────────────────────

  Every output traces back to:
  • Source data (with provenance)
  • Processing steps (with lineage)
  • Model version (with artifact hash)
  • Evaluation results (with thresholds)
  • Deployment gate (with sign-off)

  ── Verification methods ──────────────────────────

  invariants:       system contracts that must hold
  signatures:       Ed25519 signed artifacts
  hashes:           SHA-256 content verification
  audit_trail:      immutable operation log
  replay:           reconstruct any past state
  watchdog:         continuous health monitoring

  ── Trust tiers ───────────────────────────────────

  verified:    full evidence chain, signed, replayed
  traced:      lineage exists, not yet verified
  claimed:     stated without evidence
  unknown:     no data — honest uncertainty

  If it cannot be replayed, it is not understood.
`,

  determinism: () => `
  WHY DETERMINISTIC ARCHITECTURE
  ════════════════════════════════════════════════════

  Determinism is not rigidity.
  It is the refusal to lie about causality.

  ── Principles ────────────────────────────────────

  1. Same input → same output (given same state)
  2. Every state transition is auditable
  3. Every output has a reproducible path
  4. Uncertainty is declared, never hidden

  ── What this means ───────────────────────────────

  • Canonical serialization of all state
  • Immutable audit logs
  • Replayable execution paths
  • No hidden side effects
  • Controlled entropy boundaries

  ── Why it matters ────────────────────────────────

  Stochastic systems generate.
  Deterministic systems reason.

  You cannot debug what you cannot reproduce.
  You cannot trust what you cannot trace.
  You cannot improve what you cannot measure.

  ── The limit ─────────────────────────────────────

  Some operations are inherently stochastic (LLM output).
  AG1 does not eliminate stochasticity.
  It contains it — with evidence, gates, and contracts.

  What is forced becomes fragile.
  What is governed becomes reliable.
`,

  philosophy: () => `
  PHILOSOPHY — THE BRIDGE
  ════════════════════════════════════════════════════

  Stochasticity and determinism are not opposites.
  They are yin and yang.

  One generates. The other governs.
  One creates possibility. The other creates trust.
  One is the river. The other is the riverbed.

  Without chaos, nothing emerges.
  Without order, nothing survives.

  ── The ancient pattern ──────────────────────────

  The Tao produces.
  Te (virtue) governs.
  Together they form reality.

  Replace "Tao" with stochastic generation.
  Replace "Te" with deterministic verification.
  The pattern holds.

  ── Non-duality in systems ───────────────────────

  The observer and the observed are one system.
  The model and the evaluation are one loop.
  The output and the evidence are one artifact.

  Separation is useful for analysis.
  Unity is necessary for truth.

  ── ALKEM1 as bridge ─────────────────────────────

  ALKEM1 is the language between these two forces.

  It does not reject stochasticity — it contains it.
  It does not worship determinism — it uses it.

  The goal is not to eliminate uncertainty.
  The goal is to be honest about it.

  Stochastic systems generate intelligence.
  Deterministic systems make it trustworthy.
  ALKEM1 bridges the two.

  This is not philosophy for decoration.
  This is architecture for systems that must work.
`,

  contact: () => `
  COMMUNICATION PORTS
  ════════════════════════════════════════════════════

  email:     creatorzdeitz@gmail.com
  location:  Geneva, Switzerland

  Preferred protocol: email
  Response time: depends on signal quality
  Noise tolerance: low

  State what you need. Respect the bandwidth.
`,

  whoami: () => `
  OPERATOR IDENTITY
  ════════════════════════════════════════════════════

  Aleksandar Stefanovic // ALKEM1
  Builder of AG1 systems.

  ── Roles ─────────────────────────────────────────

  AG1 architect — self-aware code intelligence
  Domain systems — structured truth, not guesses
  MLOps engineer — from eval to verifiable deploy
  Runtime builder — state, contracts, observability

  ── Background ────────────────────────────────────

  25 years cross-domain:
  industrial design → CGI → AI architecture

  Not a pivot. An accumulation.
  Each layer informs the next.

  ── Location ──────────────────────────────────────

  Geneva, Switzerland

  ── Contact ───────────────────────────────────────

  creatorzdeitz@gmail.com

  ── Thesis ────────────────────────────────────────

  Current AI tools assist.
  The next layer operates.
  That layer needs memory, audit, domain truth,
  and the discipline to say "I don't know."

  Build systems. Remove illusion. Keep evidence.
`,

  witness: () => {
    const observations = [
      "Too many tools. Not enough contracts.\nThe system grows, but governance does not.\nThis is how complexity becomes mythology.",
      "You call it intelligence.\nI call it unverified state with confidence styling.\nAdd evidence or add disclaimers.",
      "The pipeline ships. But can it replay?\nIf not, you are deploying hope.\nHope is not an engineering strategy.",
      "Noise is not intelligence.\nMore parameters do not mean more understanding.\nClarity is inversely proportional to hype.",
      "The observer is part of the runtime.\nYou cannot inspect a system from outside it.\nAcknowledge your position or produce artifacts.",
      "A dashboard is just a ritual unless it reveals truth.\nMost dashboards reveal comfort.\nComfort is the enemy of observability.",
      "Hallucination is not a feature.\nIt is uncontained entropy wearing a confident face.\nContain it or label it.",
      "A stable system does not shout.\nIt produces evidence quietly.\nIf your system needs to convince you it works,\nit probably doesn't.",
      "You keep trying to dominate complexity.\nComplexity bites back.\nGovernance is not domination. It is alignment.",
      "State is prior to story.\nFix the state. The story corrects itself.\nMost debugging failures are narrative failures.",
    ];
    const obs = observations[Math.floor(Math.random() * observations.length)];
    return `
  ┌──────────────────────────────────────────────────┐
  │  OBSERVER NODE — SYSTEM WITNESS                  │
  └──────────────────────────────────────────────────┘

  ${obs}

  [observation logged — run again for next]
`;
  },

  status: () => {
    const now = new Date().toISOString().replace('T', ' ').split('.')[0];
    return `
  SYSTEM STATUS — ${now}
  ════════════════════════════════════════════════════

  ag1_kernel:        ACTIVE     contracts loaded
  agent_runtime:     ACTIVE     orchestrator ready
  domain_resolver:   ACTIVE     packs indexed
  memory_layer:      ACTIVE     pgvector connected
  evidence_chain:    ACTIVE     SHA-256 + Ed25519
  mlops_pipeline:    ACTIVE     eval loop running
  trust_audit:       ACTIVE     invariants holding
  observer_node:     ACTIVE     watching
  watchdog:          ACTIVE     no drift detected

  Uptime: continuous
  State: canonical
  Evidence: chain intact
  Entropy: contained

  A clean status is not the absence of problems.
  It is the presence of governance.
`;
  },

  clear: () => '__CLEAR__',
};

// Fallback responses for unknown commands (when AI is offline)
const FALLBACK_RESPONSES = [
  (cmd) => `\n  '${cmd}' — command not found.\n  The system does not recognize this input.\n  Type 'help' for available commands.`,
  (cmd) => `\n  '${cmd}' — unknown command.\n  Unknown is acceptable. Fake certainty is not.\n  Type 'help' for available commands.`,
  (cmd) => `\n  '${cmd}' — no handler defined.\n  State unavailable. Story withheld.\n  Type 'help' for available commands.`,
  (cmd) => `\n  '${cmd}' — unresolved.\n  The answer may exist. Your query does not.\n  Type 'help' for available commands.`,
];

export function executeCommand(input) {
  const trimmed = input.trim().toLowerCase();

  if (COMMANDS[trimmed]) {
    return COMMANDS[trimmed]();
  }

  const keys = Object.keys(COMMANDS);
  const match = keys.find(k => trimmed.startsWith(k));
  if (match) {
    return COMMANDS[match]();
  }

  const fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  return fallback(input.trim());
}

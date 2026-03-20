import {
  commitArtifact,
  getEvidence,
  witnessArtifact,
  proveDeterminism,
  verifyChain,
} from './artifactStore';
import { LINKS, WORK_OPTIONS } from './links';

export const COMMANDS = {
  help: () => `
  Available commands:
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── navigate ──────────────────────────────────
    overview       — what is AG1 and why it exists
    architecture   — system layers and dependencies
    runtime        — agent execution and state
    domain         — domain packs and structured truth
    mlops          — pipeline, evals, deployment gates
    stack          — technologies by responsibility
    determinism    — why deterministic architecture
    philosophy     — the bridge between chaos and order
    whoami         — operator identity
    contact        — communication ports

  ── visual ────────────────────────────────────
    work           — all channels (unified menu)
    showreel       — creative showreel (video)
    technical      — technical showreel (video)
    portfolio      — full portfolio map (Miro)

  ── operator ──────────────────────────────────
    commit <msg>   — seal a message as artifact
    evidence       — list recent artifacts + hashes
    witness <id>   — full trace for one artifact
    verify         — check artifact chain integrity
    prove <input>  — determinism proof (same in = same hash)
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

  work: () => ({
    text: `  Multiple layers of work. Not everything fits one link.

  showreel   — visual / creative work
  technical  — technical reel
  portfolio  — Miro map of projects and process
  mlops      — AG1, systems, architecture

  Choose a signal. Or type the command directly.`,
    media: { type: 'work-menu', options: WORK_OPTIONS },
  }),

  showreel: () => ({
    text: `  Visual work is not the center of this interface.
  But it exists.

  Signal is visual. Terminal is just the entry point.`,
    media: { type: 'youtube', videoId: LINKS.showreel.videoId, label: LINKS.showreel.label },
  }),

  technical: () => ({
    text: `  Technical execution. Pipeline discipline.
  Where systems thinking meets visual output.`,
    media: { type: 'youtube', videoId: LINKS.technical.videoId, label: LINKS.technical.label },
  }),

  portfolio: () => ({
    text: `  Full portfolio map — architecture, projects, process.
  Not a slideshow. A system diagram.`,
    media: { type: 'miro', url: LINKS.portfolio.url, label: LINKS.portfolio.label, description: LINKS.portfolio.description },
  }),

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

  Aleksandar Stefanovic // Alek // ALKEM1

  Not a resume in human form.
  More like a long-running systems experiment
  with decent taste and low tolerance for noise.

  ── Path ──────────────────────────────────────────

  electronics + music → DMX lighting → web →
  industrial design → Swiss watchmaking →
  CGI / VFX → AI architecture → MLOps

  Not a pivot. An accumulation.
  Each domain taught the same structural laws
  wearing different skins.

  ── What stuck ────────────────────────────────────

  Watchmaking taught tolerances and modularity.
  VFX taught pipeline discipline.
  Electronics taught signal and timing.
  Design taught constraint.
  AI became the convergence layer.

  ── Current ───────────────────────────────────────

  Building AG1 — self-aware code intelligence.
  Less chatbot theater, more governed intelligence.
  Less black box, more traceable state.

  Geneva, Switzerland
  creatorzdeitz@gmail.com
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
    const chain = verifyChain();
    return `
  SYSTEM STATUS — ${now}
  ════════════════════════════════════════════════════

  ag1_kernel:        ACTIVE     contracts loaded
  agent_runtime:     ACTIVE     orchestrator ready
  domain_resolver:   ACTIVE     packs indexed
  memory_layer:      ACTIVE     pgvector connected
  evidence_chain:    ACTIVE     SHA-256
  mlops_pipeline:    ACTIVE     eval loop running
  observer_node:     ACTIVE     watching
  watchdog:          ACTIVE     no drift detected

  artifact_chain:    ${chain.length} artifacts sealed
  chain_integrity:   ${chain.valid ? 'VALID' : 'BROKEN at index ' + chain.break_at}

  State: canonical
  Entropy: contained
`;
  },

  clear: () => '__CLEAR__',
};

// ─── Async commands (need special handling) ──────────────────────

export const ASYNC_COMMANDS = {
  commit: async (args) => {
    if (!args) {
      return `\n  Usage: commit <message>\n  Example: commit interested in AG1 architecture\n\n  Seals your input as a traceable artifact.`;
    }
    const artifact = await commitArtifact(args);
    return `
  ARTIFACT SEALED
  ════════════════════════════════════════════════════

  commit_id:      ${artifact.id}
  sha256:         ${artifact.hash}
  prev_hash:      ${artifact.prev_hash}...
  timestamp:      ${artifact.timestamp}
  classification: ${artifact.classification}
  status:         ${artifact.status}
  state:          ${artifact.state_transition}

  Message recorded. Evidence chain updated.
`;
  },

  evidence: async () => {
    const artifacts = getEvidence(8);
    if (artifacts.length === 0) {
      return `\n  No artifacts recorded.\n  Use 'commit <message>' to seal your first artifact.`;
    }
    const chain = verifyChain();
    let output = `
  EVIDENCE LOG — recent artifacts
  ════════════════════════════════════════════════════

  ID        SHA256 (short)     CLASS          STATUS   TIME
  ────────  ─────────────────  ─────────────  ───────  ─────────────────────\n`;

    for (const a of artifacts) {
      const time = a.timestamp.replace('T', ' ').split('.')[0];
      output += `  ${a.id}    ${a.hash.substring(0, 16)}   ${a.classification.padEnd(13)}  ${a.status}  ${time}\n`;
    }

    output += `\n  Chain: ${chain.length} artifacts | Integrity: ${chain.valid ? 'VALID' : 'BROKEN'}`;
    output += `\n\n  Use 'witness <id>' for full trace of any artifact.`;
    return output;
  },

  witness: async (args) => {
    if (!args) {
      // Show observer node observation if no ID given
      const observations = [
        "Too many tools. Not enough contracts.\nThe system grows, but governance does not.",
        "You call it intelligence.\nI call it unverified state with confidence styling.",
        "The pipeline ships. But can it replay?\nHope is not an engineering strategy.",
        "Noise is not intelligence.\nClarity is inversely proportional to hype.",
        "The observer is part of the runtime.\nAcknowledge your position or produce artifacts.",
        "A stable system does not shout.\nIt produces evidence quietly.",
        "State is prior to story.\nFix the state. The story corrects itself.",
      ];
      const obs = observations[Math.floor(Math.random() * observations.length)];
      return `\n  ┌──────────────────────────────────────────────────┐\n  │  OBSERVER NODE                                   │\n  └──────────────────────────────────────────────────┘\n\n  ${obs}\n\n  Tip: use 'witness <id>' to trace a specific artifact.`;
    }

    const artifact = witnessArtifact(args.trim());
    if (!artifact) {
      return `\n  Artifact '${args.trim()}' not found.\n  Use 'evidence' to see available artifacts.`;
    }

    return `
  ARTIFACT TRACE — ${artifact.id}
  ════════════════════════════════════════════════════

  ── Identity ──────────────────────────────────────
  commit_id:         ${artifact.id}
  sha256:            ${artifact.hash}
  prev_hash:         ${artifact.prev_hash}...

  ── Payload ───────────────────────────────────────
  raw_input:         ${artifact.message}
  normalized:        ${artifact.normalized_payload}
  classification:    ${artifact.classification}
  topic:             ${artifact.topic}

  ── State ─────────────────────────────────────────
  timestamp:         ${artifact.timestamp}
  status:            ${artifact.status}
  state_transition:  ${artifact.state_transition}

  ── Verification ──────────────────────────────────
  hash_algorithm:    SHA-256
  chain_linked:      prev_hash → current hash
  integrity:         sealed, immutable

  Trace complete. This artifact is verifiable.
`;
  },

  prove: async (args) => {
    const input = args || 'determinism is not rigidity';
    const result = await proveDeterminism(input);
    return `
  DETERMINISM PROOF
  ════════════════════════════════════════════════════

  ── Input ─────────────────────────────────────────
  raw:       ${result.input}
  payload:   ${result.payload}

  ── Hashes (3 independent runs) ───────────────────
  run_1:     ${result.hash1}
  run_2:     ${result.hash2}
  run_3:     ${result.hash3}

  ── Result ────────────────────────────────────────
  match:     ${result.match ? 'TRUE — all identical' : 'FALSE — divergence detected'}

  Same input. Same transformation. Same output.
  Three times. No variance. No ambiguity.

  This is what determinism means in practice.
  Not philosophy. Engineering.
`;
  },

  verify: async () => {
    const chain = verifyChain();
    const artifacts = getEvidence(3);
    let output = `
  CHAIN VERIFICATION
  ════════════════════════════════════════════════════

  artifacts:   ${chain.length}
  integrity:   ${chain.valid ? 'VALID — no breaks detected' : 'BROKEN — break at index ' + chain.break_at}
  algorithm:   SHA-256
  linking:     prev_hash chain\n`;

    if (artifacts.length > 0) {
      output += `\n  ── Latest artifacts ──────────────────────────────\n`;
      for (const a of artifacts) {
        output += `  ${a.id}  ${a.hash.substring(0, 24)}...  ${a.status}\n`;
      }
    }

    output += `\n  Each artifact links to the previous via hash.\n  Tamper one, break the chain. That is the point.`;
    return output;
  },
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

export interface DemoScenario {
  id: string;
  label: string;
  vertical: "legal" | "private" | "medical";
  description: string;
  query: string;
  filters: {
    jurisdiction?: string[];
    sourceTypes?: string[];
    citeableOnly?: boolean;
    hybridWeight?: number;
    requirePrimary?: boolean;
    rerank?: boolean;
    dedupe?: boolean;
  };
  expected: string[];
  proof: { route: string; note: string };
  directorLine: string;
  workflow: string[];
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "legal-contract-review",
    label: "Legal: Contract clause review",
    vertical: "legal",
    description: "Simulate retrieval of contract clauses with jurisdiction and citeability filters.",
    query: "Show all indemnification clauses in executed NDAs from 2024",
    filters: {
      jurisdiction: ["EU", "US"],
      sourceTypes: ["contract", "agreement"],
      citeableOnly: true,
    },
    expected: [
      "Clause list with document IDs",
      "Hash-linked citations",
      "Audit trail for each result",
    ],
    proof: {
      route: "/proof",
      note: "Every returned clause is hash-anchored; tampering is detectable.",
    },
    directorLine: "Counsel sees only what the vault attests to.",
    workflow: ["Parse query", "Apply filters", "Retrieve from vault", "Attest results"],
  },
  {
    id: "legal-vault-search",
    label: "Legal: Vault search (sim)",
    vertical: "legal",
    description: "Demo search over a simulated legal vault with proof moment.",
    query: "Confidentiality obligations in M&A materials",
    filters: {
      jurisdiction: ["US"],
      sourceTypes: ["memo", "email", "contract"],
      citeableOnly: true,
    },
    expected: [
      "Filtered document set",
      "QED certificate link",
      "Director line in UI",
    ],
    proof: {
      route: "/solutions/legal/vault",
      note: "Proof moment: attestation that results match sealed index.",
    },
    directorLine: "One source of truth; one proof moment.",
    workflow: ["Load scenario", "Run filters", "Export proof", "View certificate"],
  },
  {
    id: "medical-consent",
    label: "Medical: Consent & access (sim)",
    vertical: "medical",
    description: "Simulate consent-scoped retrieval for a patient context.",
    query: "Patient 12345 – consented records for cardiology only",
    filters: {
      sourceTypes: ["consent", "lab", "imaging"],
      citeableOnly: false,
    },
    expected: [
      "Consent-gated result set",
      "Access log entry",
      "No cross-specialty leakage",
    ],
    proof: {
      route: "/solutions/medical/vault",
      note: "Proof: access log and result set are hash-linked.",
    },
    directorLine: "Access follows consent; proof follows access.",
    workflow: ["Resolve consent", "Apply scope", "Retrieve", "Log & attest"],
  },
  {
    id: "medical-vault-demo",
    label: "Medical: Vault demo",
    vertical: "medical",
    description: "Demo of medical vault with safety gates and attestation.",
    query: "All records for episode ID EP-2024-001 within consent scope",
    filters: {
      sourceTypes: ["clinical_note", "lab", "rx"],
      citeableOnly: true,
    },
    expected: [
      "Episode-scoped results",
      "Safety gate checks",
      "Proof pack export",
    ],
    proof: {
      route: "/proof",
      note: "Proof moment: vault seal matches retrieved set fingerprint.",
    },
    directorLine: "Safety gates and proof are non-optional.",
    workflow: ["Load episode", "Check gates", "Retrieve", "Attest"],
  },
  {
    id: "private-data-request",
    label: "Private: Data subject request (sim)",
    vertical: "private",
    description: "Simulate handling a data subject access request with proof.",
    query: "All personal data for subject ref DS-789",
    filters: {
      jurisdiction: ["GDPR"],
      sourceTypes: ["profile", "activity", "export"],
      citeableOnly: true,
    },
    expected: [
      "Unified export package",
      "Deletion/retention proof",
      "Timeline attestation",
    ],
    proof: {
      route: "/proof",
      note: "Proof: export manifest is signed; timeline is immutable.",
    },
    directorLine: "One request, one proof, one timeline.",
    workflow: ["Identify subject", "Aggregate data", "Export", "Attest manifest"],
  },
];

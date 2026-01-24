/**
 * DEMO MODE SCENARIOS
 * SSOT for all demo presentations
 * 
 * Each scenario defines:
 * - Query + Filters (pre-configured)
 * - Workflow steps to run
 * - Expected outputs (for presenter)
 * - Proof moment (what to show)
 */

export type DemoScenario = {
  id: string;
  label: string;
  vertical: "legal" | "private" | "medical";
  description: string;
  query: string;
  filters: {
    jurisdiction?: string[];
    sourceTypes?: string[];
    dateFrom?: string;
    dateTo?: string;
    statute?: { name: string; article?: string };
    court?: string[];
    hybridWeight?: number;
    rerank?: boolean;
    dedupe?: boolean;
    citeableOnly?: boolean;
    requirePrimary?: boolean;
    maxResults?: number;
  };
  workflow: Array<
    | "search"
    | "pinTopSources"
    | "generateIssues"
    | "generateMemo"
    | "generateCounterarguments"
    | "review"
    | "proofVerify"
  >;
  expected: string[];
  proof: {
    route: string;
    note: string;
  };
  directorLine: string;
};

export const DEMO_SCENARIOS: DemoScenario[] = [
  // ============================================
  // LEGAL DEMO — "Court-Ready Memo in 60s"
  // ============================================
  {
    id: "legal-causation-001",
    label: "Legal: Causation & Burden of Proof",
    vertical: "legal",
    description: "Court-ready memo with sources and proof in 60 seconds",
    query: "uzročna veza teret dokazivanja naknada štete",
    filters: {
      jurisdiction: ["RS"],
      sourceTypes: ["law", "case_law", "doctrine"],
      rerank: true,
      dedupe: true,
      citeableOnly: true,
      requirePrimary: true,
      hybridWeight: 0.7,
      maxResults: 25,
    },
    workflow: [
      "search",
      "pinTopSources",
      "generateIssues",
      "generateMemo",
      "generateCounterarguments",
      "review",
      "proofVerify",
    ],
    expected: [
      "Facts: what we know + what's missing",
      "Issues: 3-5 legal questions",
      "Applicable Law: cited article + passage",
      "Case law: 2 decisions with relevant passages",
      "Analysis: argument + counterargument",
      "Review: 1-3 flags (e.g., 'weak citation')",
    ],
    proof: {
      route: "/proof",
      note: "Click Proof → Run verification. Show: Ledger entry ID, Certificate hash, VALID status.",
    },
    directorLine:
      "Ne dobijate chat. Dobijate memo sa izvorima i dokazom kako je nastao.",
  },

  {
    id: "legal-contract-void",
    label: "Legal: Contract Void (Material Terms)",
    vertical: "legal",
    description: "Analyze contract validity due to missing material terms",
    query: "ugovor ništav bitni elementi posledice",
    filters: {
      jurisdiction: ["RS"],
      sourceTypes: ["law", "case_law"],
      rerank: true,
      dedupe: true,
      citeableOnly: true,
      requirePrimary: true,
      hybridWeight: 0.65,
      maxResults: 20,
    },
    workflow: [
      "search",
      "pinTopSources",
      "generateIssues",
      "generateMemo",
      "review",
      "proofVerify",
    ],
    expected: [
      "Clear definition of material terms from Civil Code",
      "Relevant case law on contract void decisions",
      "Structured legal issues",
      "Memo with citations",
    ],
    proof: {
      route: "/proof",
      note: "Verify proof chain integrity.",
    },
    directorLine:
      "Svaki zaključak ima izvor. Ako nema izvora — nema zaključka.",
  },

  // ============================================
  // PRIVATE AI DEMO — "Offline, No Data Leaves"
  // ============================================
  {
    id: "private-policy-001",
    label: "Private: Internal Policy (Local-only)",
    vertical: "private",
    description: "Answer questions using only internal documents, no external calls",
    query: "pravila za deljenje podataka sa trećim stranama",
    filters: {
      sourceTypes: ["internal"],
      citeableOnly: true,
      rerank: true,
      dedupe: true,
      hybridWeight: 0.6,
      maxResults: 20,
    },
    workflow: ["search", "pinTopSources", "generateMemo", "proofVerify"],
    expected: [
      "Answer only from internal docs",
      "3 relevant passages from internal policy",
      "Summary in 5 bullets",
      "What you must NOT do (1 bullet)",
      "Provenance shown per passage",
      "Ledger proof that no external calls were made",
    ],
    proof: {
      route: "/proof",
      note: "Show provenance (doc → chunk → retrieval) + proof entry. Highlight 'Local inference' badge.",
    },
    directorLine:
      "Sve radi lokalno. Ako nema izvora u vašim dokumentima — sistem neće izmišljati.",
  },

  {
    id: "private-nda-review",
    label: "Private: NDA Template Review",
    vertical: "private",
    description: "Compare NDA template against internal compliance requirements",
    query: "NDA klauzule zaštita poverljivih informacija rok trajanja",
    filters: {
      sourceTypes: ["internal"],
      citeableOnly: true,
      rerank: true,
      dedupe: true,
      hybridWeight: 0.5,
      maxResults: 15,
    },
    workflow: ["search", "pinTopSources", "generateMemo", "proofVerify"],
    expected: [
      "Key NDA clauses identified",
      "Comparison with internal standards",
      "Gaps highlighted",
    ],
    proof: {
      route: "/proof",
      note: "Verify all sources are internal.",
    },
    directorLine:
      "Interni dokumenti, interni odgovori. Nikad ne napušta vaš perimetar.",
  },

  // ============================================
  // MEDICAL DEMO — "Guideline-Bound Decision Support"
  // ============================================
  {
    id: "medical-guideline-001",
    label: "Medical: Guideline-Bound Suggestions",
    vertical: "medical",
    description: "Clinical decision support bound to official guidelines",
    query: "antibiotik odrasli febrilnost trajanje terapije smernice",
    filters: {
      sourceTypes: ["guideline"],
      requirePrimary: true,
      rerank: true,
      dedupe: true,
      citeableOnly: true,
      hybridWeight: 0.75,
      maxResults: 20,
    },
    workflow: [
      "search",
      "pinTopSources",
      "generateMemo",
      "review",
      "proofVerify",
    ],
    expected: [
      "Guideline-backed suggestions (3 options)",
      "When to escalate / refer (2 bullets)",
      "Contraindications / warnings (2 bullets)",
      "Citations from guideline passages",
      "Safety flags for high-risk areas",
    ],
    proof: {
      route: "/proof",
      note: "Open Review tab to show safety flags, then verify proof.",
    },
    directorLine:
      "Sistem je vezan za smernice. Ne daje 'pametne' odgovore bez izvora — i sve ostaje auditovano.",
  },

  {
    id: "medical-protocol-check",
    label: "Medical: Protocol Compliance Check",
    vertical: "medical",
    description: "Verify procedure against hospital protocols",
    query: "preoperativna priprema pacijenta protokol",
    filters: {
      sourceTypes: ["guideline", "protocol"],
      requirePrimary: true,
      rerank: true,
      dedupe: true,
      citeableOnly: true,
      hybridWeight: 0.7,
      maxResults: 15,
    },
    workflow: ["search", "pinTopSources", "generateMemo", "review", "proofVerify"],
    expected: [
      "Step-by-step protocol from official sources",
      "Safety flags if procedure deviates",
      "Clear citations to protocol sections",
    ],
    proof: {
      route: "/proof",
      note: "Review flags + proof verification.",
    },
    directorLine:
      "Decision support, ne dijagnoza. Sve vezano za protokole, sve auditovano.",
  },

  // ============================================
  // MEDICAL TRIAGE DEMO (Bulletproof for presentations)
  // ============================================
  {
    id: "medical-triage-001",
    label: "Medical: Guideline-Bound Triage (Review Gate)",
    vertical: "medical",
    description: "30-60s demo: every suggestion has citation, high-risk flagged, proof link",
    query: "adult fever tachycardia hypotension when to escalate sepsis screen",
    filters: {
      sourceTypes: ["guideline"],
      requirePrimary: true,
      rerank: true,
      dedupe: true,
      citeableOnly: true,
      hybridWeight: 0.75,
      maxResults: 10,
    },
    workflow: ["search", "pinTopSources", "generateMemo", "review", "proofVerify"],
    expected: [
      "3 guideline-cited suggestions",
      "HIGH-RISK flag → human review required",
      "Safety Gate visible with rule ID",
      "Proof link + VALID verification",
    ],
    proof: {
      route: "/proof",
      note: "Show Review flag (rule ID + triggers), then Q.E.D. certificate verification.",
    },
    directorLine:
      "Sistem ne daje medicinske tvrdnje bez odobrene smernice. Ako je high-risk, traži human review. Sve ima dokazni trag.",
  },
];

// Helper to get scenarios by vertical
export function getScenariosByVertical(
  vertical: "legal" | "private" | "medical"
): DemoScenario[] {
  return DEMO_SCENARIOS.filter((s) => s.vertical === vertical);
}

// Get scenario by ID
export function getScenarioById(id: string): DemoScenario | undefined {
  return DEMO_SCENARIOS.find((s) => s.id === id);
}

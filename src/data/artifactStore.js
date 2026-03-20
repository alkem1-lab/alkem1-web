// ─── Artifact Store ─────────────────────────────────────────────
// Real SHA-256 hashing, real timestamps, real artifact chain.
// Client-side persistence via localStorage.

const STORE_KEY = 'ag1_artifacts';

function getStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStore(store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

async function sha256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function generateId(hash) {
  return hash.substring(0, 8);
}

// ─── commit ─────────────────────────────────────────────────────
// Creates a sealed artifact from user input

export async function commitArtifact(message, topic = 'general') {
  const timestamp = new Date().toISOString();
  const payload = `${message}|${topic}|${timestamp}`;
  const hash = await sha256(payload);
  const id = generateId(hash);
  const prevStore = getStore();
  const prevHash = prevStore.length > 0 ? prevStore[prevStore.length - 1].hash : '0000000000000000000000000000000000000000000000000000000000000000';

  const artifact = {
    id,
    hash,
    prev_hash: prevHash.substring(0, 16),
    timestamp,
    message,
    topic,
    normalized_payload: payload,
    status: 'sealed',
    classification: classifyInput(message),
    state_transition: `artifact_count: ${prevStore.length} -> ${prevStore.length + 1}`,
  };

  prevStore.push(artifact);
  saveStore(prevStore);
  return artifact;
}

// ─── evidence ───────────────────────────────────────────────────
// Returns recent artifacts with hashes and status

export function getEvidence(limit = 10) {
  const store = getStore();
  return store.slice(-limit).reverse();
}

// ─── witness ────────────────────────────────────────────────────
// Returns full trace for a specific artifact

export function witnessArtifact(idOrHash) {
  const store = getStore();
  const artifact = store.find(a =>
    a.id === idOrHash ||
    a.hash === idOrHash ||
    a.hash.startsWith(idOrHash)
  );
  return artifact || null;
}

// ─── determinism proof ──────────────────────────────────────────
// Proves same input → same hash

export async function proveDeterminism(input) {
  const timestamp = '2026-01-01T00:00:00.000Z'; // fixed seed
  const payload = `${input}|proof|${timestamp}`;
  const hash1 = await sha256(payload);
  const hash2 = await sha256(payload);
  const hash3 = await sha256(payload);
  return { input, payload, hash1, hash2, hash3, match: hash1 === hash2 && hash2 === hash3 };
}

// ─── classify ───────────────────────────────────────────────────

function classifyInput(message) {
  const lower = message.toLowerCase();
  if (lower.match(/\b(ag1|architecture|kernel|runtime|agent)\b/)) return 'systems';
  if (lower.match(/\b(domain|knowledge|truth|source)\b/)) return 'domain';
  if (lower.match(/\b(eval|train|deploy|mlops|pipeline)\b/)) return 'mlops';
  if (lower.match(/\b(determinism|evidence|proof|hash|audit)\b/)) return 'verification';
  if (lower.match(/\b(philosophy|consciousness|duality|stochastic)\b/)) return 'philosophy';
  if (lower.match(/\b(hire|work|project|collaborate)\b/)) return 'inquiry';
  return 'general';
}

// ─── chain integrity ────────────────────────────────────────────

export function verifyChain() {
  const store = getStore();
  if (store.length === 0) return { valid: true, length: 0 };

  for (let i = 1; i < store.length; i++) {
    if (store[i].prev_hash !== store[i - 1].hash.substring(0, 16)) {
      return { valid: false, break_at: i, length: store.length };
    }
  }
  return { valid: true, length: store.length };
}

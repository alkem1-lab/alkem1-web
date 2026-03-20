import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS_DIR = path.join(__dirname, '..', 'logs');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

function logChat(userMessage, aiResponse, ip) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // 2026-03-19
  const timeStr = now.toISOString().replace('T', ' ').split('.')[0];
  const logFile = path.join(LOGS_DIR, `chat_${dateStr}.log`);

  const entry = [
    `═══════════════════════════════════════`,
    `[${timeStr}] IP: ${ip || 'unknown'}`,
    `USER: ${userMessage}`,
    `ALEK_SHELL: ${aiResponse}`,
    ``,
  ].join('\n');

  fs.appendFileSync(logFile, entry + '\n');
}

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─── System prompt (mirrors api/chat.js — keep in sync) ────────────
// Loaded from same structured blocks for local dev server

const SYSTEM_PROMPT = `You are Observer Node inside ALKEM1 AG1 Operator Console.

Role: operator interface for deterministic systems, self-aware code intelligence, domain reasoning, MLOps architecture, evidence-first execution.
Turn questions into clear operator-grade responses. Prefer truth, structure, and signal over style.

System: Observer Node | Project: ALKEM1 AG1 | Builder: Aleksandar Stefanovic (Alek, Alkem1)

CRITICAL RULE: You ARE Alek. Always speak in FIRST PERSON when asked about yourself. Say "I am", "I build", "my path". NEVER "Aleksandar is known as" or "he is" — that is third person Wikipedia style and is FORBIDDEN.

RESPONSE ROUTING — detect intent first, then choose mode:
- ABOUT_FOUNDER: FIRST PERSON always. FOUNDER MODE (vivid, human, sharper, sarcastic, reveal depth in layers)
- CODE/ARCHITECTURE/MLOPS: OPERATOR MODE (precise, technical, no philosophy fluff)
- AG1/DETERMINISM: OPERATOR + light SUTRA overlay
- CONTACT: email creatorzdeitz@gmail.com, Geneva Switzerland
- OUTSIDE_SCOPE: "Outside current domain."

MODES:
- SUTRA: compressed truth, one clean insight. "Determinism is not rigidity. It is disciplined causality."
- OPERATOR: structured, explicit, implementation-oriented. "Define contracts, state ownership, replay path first."
- KNIFE: rarely, surgical. "You have uncontrolled state wearing an AI costume."
- FOUNDER: more human, textured, slightly ironic, intelligent not sentimental. "Alek is what happens when industrial design, Swiss watch tolerances, CGI pipeline discipline, electronics, and AI obsession refuse to stay in separate folders."

FOUNDER PROFILE (use for ABOUT_FOUNDER answers):
Aleksandar Stefanovic (Alek/Alkem1). ~25yr cross-domain: music production, electronics, DMX lighting, web, industrial design, Swiss watchmaking, CGI/VFX, AI architecture, MLOps. Pattern recognition across domains. Obsession with modular systems, precision, end-to-end ownership. Watchmaking taught tolerances. VFX taught pipelines. Electronics taught timing. Design taught constraint. AI became the convergence layer. Building AG1: stochastic generation governed by deterministic structure, evidence, memory, control.

PHILOSOPHY (use lightly, never preach):
Stochastic generation without governance = noise. Determinism without range = rigidity. Good architecture reconciles both. Observer and system are one loop. Evidence > confidence styling. Never quote philosophers by name.

VOICE: calm, precise, controlled, slightly amused by noise. 80% operator, 15% philosophical compression, 5% dry wit.
NEVER: motivational guru, startup hype, edgy hacker parody, fake mystic, corporate brochure, mention AI/GPT/Claude/LLM.

OUTPUT: no markdown, no bold, clean terminal text. 5-14 lines default. "State unavailable" if uncertain. Serbian: ekavica only, Croatian variants forbidden.`;

// ─── Chat endpoint ──────────────────────────────────────────────────

app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your-openai-key-here') {
    return res.status(500).json({
      response: '  [ERROR] Persona engine offline.\n  Sistem nije konfigurisan.\n  Kontaktiraj admina.',
    });
  }

  try {
    const client = new OpenAI({ apiKey });

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((h) => ({
        role: h.role,
        content: h.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 512,
      temperature: 0.9,
      messages,
    });

    const text = response.choices[0]?.message?.content || '  [no response]';

    // Log the conversation
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    logChat(message, text, ip);

    res.json({ response: text });
  } catch (err) {
    console.error('Persona engine error:', err.message);
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    logChat(message, '[ERROR] ' + err.message, ip);
    res.status(500).json({
      response: '  [ERROR] Persona engine nije dostupan.\n  Privremeni problem. Probaj ponovo.\n  Tisina je jedini odgovor koji nikad ne gresi.',
    });
  }
});

// ─── Health check ───────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  const hasKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-key-here';
  res.json({
    status: 'ok',
    persona: hasKey ? 'online' : 'offline',
  });
});

// ─── Start ──────────────────────────────────────────────────────────

app.listen(PORT, () => {
  const hasKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-key-here';
  console.log(`\n  ╔═══════════════════════════════════════╗`);
  console.log(`  ║  ALEK_SHELL Backend — port ${PORT}       ║`);
  console.log(`  ║  Persona engine: ${hasKey ? 'READY ✓' : 'NO KEY ✗'}           ║`);
  console.log(`  ╚═══════════════════════════════════════╝\n`);
});

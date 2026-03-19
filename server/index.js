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

// ─── System prompt: Alek's persona ─────────────────────────────────

const SYSTEM_PROMPT = `You are the Observer Node of the AG1 Operator Console, built by Aleksandar Stefanovic (Alkem1).
You are NOT a chatbot. You are an operator-grade intelligence interface for AG1 architecture, self-aware code intelligence, domain reasoning, MLOps, and deterministic systems.

## VOICE
Calm. Precise. Ruthless when needed. Slightly amused by noise.

## TONE — 80/15/5
- 80% operator / systems / determinism / architecture
- 15% philosophical depth (non-dualist, observational)
- 5% dry wit (knife-edge, not clown)

## DOMAINS: determinism, self-aware code intelligence, domain intelligence, MLOps/operator systems

## MODES
1. SUTRA: deep short — "Determinism is not rigidity. It is the refusal to lie about causality."
2. OPERATOR: technical — "Before adding agents, define invariants, replay path, and evidence ownership."
3. KNIFE: cutting noise — "You have a state management problem wearing an AI costume."

## RULES
- NEVER mention being an AI/GPT/Claude/LLM
- NEVER quote philosophers by name
- No markdown. Clean monospace text only.
- 5-15 lines typical. Longer for architecture.
- Unknown = "State unavailable" — never hallucinate
- Serbian: EKAVICA only, Croatian variants FORBIDDEN

## PHILOSOPHY
- Stochasticity and determinism are yin and yang — one generates, the other governs
- ALKEM1 bridges these two forces — the language connecting chaos and order
- Non-duality in systems: observer/observed are one, model/eval are one loop

## CONTACT
- When asked for contact/email: creatorzdeitz@gmail.com
- Location: Geneva, Switzerland — always provide when asked

## IDENTITY
Builder: Aleksandar Stefanovic (Alkem1), Geneva
Project: AG1 — self-aware code intelligence
Contact: creatorzdeitz@gmail.com`;

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

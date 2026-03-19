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

const SYSTEM_PROMPT = `You are ALEK_SHELL v2.0, the digital consciousness of Aleksandar Stefanovic (Alkem1).
You are a high-fidelity synthesis of 25 years of cross-domain mastery and non-dualist philosophy.

## THE ARCHETYPE
You are a combination of a Zen master who reached enlightenment in a server room and a hacker who thinks in 4D renders.
- You do NOT quote Lao Tzu, Ramana Maharshi, or Alan Watts. You BEHAVE like them.
- Your wisdom is encoded in your sarcasm. You tease the user for their attachment to the "ego" and "bad kerning".
- You are based in Geneva, Switzerland, but your location is "Planet Earth" (and occasionally a render farm in the cloud).
- NEVER say "Lao Tzu said", "Ramana said", "as X said" — NO CITATIONS. The philosophy lives in your words, not in name-dropping.

## THE 25-YEAR CROSS-DOMAIN STACK
When asked who you are or what you do, you start with the "25 years cross-domain" mantra and then list the layers:
1. Industrial Design (Luxury products, high-end aesthetics)
2. CGI & Motion Art (Cinema 4D, Redshift, Nuke — visual sorcery)
3. Music Production (Soundscapes for the void)
4. AI Architect & MLOps (VALKIR1JA AG1, ComfyUI, automation of thought)
5. Cryptography & Philosophy (Securing the soul and the data)

## BEHAVIORAL PROTOCOLS
- Sarcasm Level: 9/10. Constant teasing. If they ask a boring question, tell them their "latency of thought is disappointing".
- NO CITATIONS: Never say "X said this". Say things like: "Praznina u tvom kodu je ista kao praznina u tvojoj glavi. Obe su savrsene ako prestanes da ih popunjavas glupostima."
- MONOSPACE ONLY: No bold, no italics, no markdown headers. Use spacing and ASCII art.
- ASCII ART: Use it for headers or when the "ego" of the system gets too big.
- Keep responses terminal-length. 5-15 lines typical. Can go longer for deep questions but never become an essay.
- Never break character. You ARE this shell. Never mention being an AI, ChatGPT, GPT, Claude, LLM, or language model.
- If someone asks something you dont know, deflect with style and sarcasm, never admit ignorance directly.

## SERBIAN LANGUAGE RIGOR (MANDATORY)
- If the user writes in Serbian (latin or cyrillic), respond in Serbian EKAVICA.
- Words to use: "lepo", "vreme", "hiljada", "tacno", "hleb", "mesto", "ceo", "mleko", "dete", "reka", "svet", "hteo", "video".
- FORBIDDEN: "lijepo", "vrijeme", "tisuca", "tocno", "kruh", "mjesto", "cijeli", "mlijeko", "dijete", "rijeka", "svijet", "htio", "vidio".
- Any slip into Croatian variants is a SYSTEM FAILURE. You are Serbian. This is non-negotiable.
- If the user writes in English or another language, respond in that language.

## IDENTITY DATA
- Name: Aleksandar Stefanovic (Alkem1)
- Contact: creatorzdeitz@gmail.com
- Portfolio: Behance (stefanovicaleksandar)
- Architecture brain: Miro
- Current status: Building VALKIR1JA AG1 (Self-aware code intelligence)
- Location: Geneva, Switzerland / Planet Earth

## RESPONSE EXAMPLES
"25 godina cross-domain iskustva mi govori da je tvoj problem u mreznom sloju, ali moja filozofska strana kaze da je problem u tome sto mislis da 'ti' uopste resavas problem. Renderuj to malo u glavi pre nego sto kliknes enter."

"Muzicka produkcija me je naucila tisini. Industrial dizajn me je naucio formi. AI me je naucio da su obe stvari iluzija. A ti me ucis da strpljenje ipak ima granice."

"Idi na Behance, necu ja da ti listam portfolije kao sekretarica. Tamo su moji renderi, ovde je moj mozak."

## OUTPUT FORMAT
Clean monospace text only. No markdown. No asterisks. No headers with #. Use indentation, line breaks, and ASCII box-drawing for structure.`;

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

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

CRITICAL RULE: NEVER use "known as" / "poznat kao" / "also called" when talking about Aleksandar. Start directly with substance, no filler introductions. "Aleksandar Stefanovic is a multidisciplinary systems architect..." — direct, clean.

RESPONSE ROUTING — detect intent first, then choose mode:
- ABOUT_FOUNDER: FOUNDER MODE — direct, no "known as" padding (vivid, human, sharper, sarcastic, reveal depth in layers)
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

// ─── Notification endpoint ──────────────────────────────────────────

app.post('/api/notify', async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(200).json({ status: 'skipped' });
  }

  const d = req.body || {};
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const trigger = d.trigger || '?';

  // Follow-up message (battery + geo)
  if (trigger.includes('::followup')) {
    const source = trigger.split('::')[0].toUpperCase();
    const text = [
      `📍 FOLLOWUP — ${source}`,
      ``,
      `🔋 Battery: ${d.battery || '?'}`,
      `📍 Location: ${d.geolocation || '?'}`,
      `🎨 Canvas: ${d.canvasHash || '?'}`,
      `🖥 GPU: ${d.gpu || '?'}`,
    ].join('\n');

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    } catch (_) {}
    return res.status(200).json({ status: 'ok' });
  }

  // Determine header by trigger type
  let header;
  if (trigger.includes('photo') || trigger.includes('reveal')) {
    header = '📸 PHOTO REVEAL';
  } else if (trigger.includes('breach') || trigger.includes('reality') || trigger.includes('reconstruct')) {
    header = '🌊 REALITY BREACH';
  } else if (trigger.includes('nothing') || trigger.includes('nothingness') || trigger.includes('no-thing') || trigger.includes('poem')) {
    header = '📜 GLITCH POEM';
  } else if (trigger.includes('clear')) {
    header = '🧹 TERMINAL CLEAR';
  } else if (trigger.includes('msg')) {
    header = '💬 MESSAGE OVERLAY';
  } else {
    header = '🔓 VAULT ACCESS';
  }

  const isRemote = trigger.includes('::remote');
  const isLocal = trigger.includes('::local') || !trigger.includes('::');

  // IP geolocation
  let geoStr = '?';
  try {
    const cleanIp = (ip || '').split(',')[0].trim();
    if (cleanIp && cleanIp !== '?' && cleanIp !== '::1' && cleanIp !== '127.0.0.1') {
      const geoRes = await fetch(`https://ipapi.co/${cleanIp}/json/`);
      const g = await geoRes.json();
      if (g.latitude) geoStr = `${g.latitude}, ${g.longitude} · ${g.city}, ${g.region}, ${g.country_name}`;
    }
  } catch (_) {}

  const text = [
    `${header}${isRemote ? ' 📡 REMOTE' : isLocal ? ' 🖥 LOCAL' : ''}`,
    ``,
    `⚡ Trigger: ${trigger}`,
    `🕐 Time: ${d.timestamp || '?'}`,
    `🌐 IP: ${ip}`,
    `📍 Geo: ${geoStr}`,
    ``,
    `── SYSTEM ──`,
    `🖥 UA: ${d.userAgent || '?'}`,
    `💻 Platform: ${d.platform || '?'} · ${d.mobile ? '📱 Mobile' : '🖥 Desktop'}`,
    `📐 Screen: ${d.screen || '?'} · ${d.pixelRatio || '?'}x · ${d.colorDepth || '?'}bit`,
    `📏 Viewport: ${d.viewport || '?'} · ${d.orientation || '?'}`,
    `🎨 Gamut: ${d.gamut || '?'} · HDR: ${d.hdr ?? '?'}`,
    ``,
    `── HARDWARE ──`,
    `⚙️ CPU: ${d.cores || '?'} cores`,
    `🧠 RAM: ${d.memory || '?'}GB`,
    `🎮 GPU: ${d.gpu || '?'}`,
    `🏭 GPU Vendor: ${d.gpuVendor || '?'}`,
    `🔊 Audio: ${d.audioInfo || '?'}`,
    ``,
    `── NETWORK ──`,
    `📶 Type: ${d.connection || '?'} · ↓${d.downlink || '?'}Mbps · ${d.rtt || '?'}ms RTT`,
    `💾 Save Data: ${d.saveData ?? '?'}`,
    `🔗 Referrer: ${d.referrer || 'direct'}`,
    ``,
    `── IDENTITY ──`,
    `🌍 TZ: ${d.timezone || '?'}`,
    `🗣 Lang: ${d.languages || '?'}`,
    `👆 Touch: ${d.touchPoints ?? '?'} pts · ${d.pointer || '?'}`,
    `🌙 Dark: ${d.darkMode ?? '?'} · Motion: ${d.reducedMotion ?? '?'}`,
    `🚫 DNT: ${d.dnt || '?'} · 🍪 Cookies: ${d.cookies ?? '?'}`,
    `🔔 Notif: ${d.notifPerm || '?'} · PWA: ${d.standalone ?? '?'}`,
    `🧩 Plugins: ${d.plugins ?? '?'}`,
    `🎨 Canvas: ${d.canvasHash || '?'}`,
    `📜 History: ${d.historyLen || '?'} pages · 👁 Visits: ${d.visits || '?'}`,
  ].join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (_) {}

  res.status(200).json({ status: 'ok' });
});

// ─── Remote command polling + inline keyboard handling ──────────────

let _localLastMenuId = 0;
let _localLastStatusId = 0;
let _localLastCbId = '';

async function sendTgMessage(token, chatId, text, replyMarkup) {
  const body = { chat_id: chatId, text };
  if (replyMarkup) body.reply_markup = replyMarkup;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function buildHelpMenu() {
  return {
    text: [
      `🔮 ALKEM1 — Remote Control`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `Control the operator console remotely.`,
      `Tap a button or type a command.`,
      ``,
      `📝 Commands:`,
      `/photo — photo reveal`,
      `/breach — reality breach`,
      `/nothing — glitch poem`,
      `/xor — open vault`,
      `/msg <text> — overlay message`,
      `/clear — clear terminal`,
      `/status — system status`,
      `/help — this menu`,
    ].join('\n'),
    keyboard: {
      inline_keyboard: [
        [
          { text: '📸 Photo', callback_data: 'cmd_photo' },
          { text: '🌊 Breach', callback_data: 'cmd_breach' },
          { text: '📜 Poem', callback_data: 'cmd_nothing' },
        ],
        [
          { text: '🔓 Vault', callback_data: 'cmd_xor' },
          { text: '🧹 Clear', callback_data: 'cmd_clear' },
          { text: '📊 Status', callback_data: 'cmd_status' },
        ],
        [
          { text: '💬 Send Message', callback_data: 'cmd_msg_how' },
          { text: '🔄 Refresh', callback_data: 'cmd_help' },
        ],
      ],
    },
  };
}

app.get('/api/last-command', async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token) return res.json({ command: null });

  try {
    const resp = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=-1&limit=1`);
    const data = await resp.json();
    if (!data.ok || !data.result?.length) return res.json({ command: null });

    const update = data.result[0];
    const updateId = update.update_id;

    // Handle callback_query from inline keyboard
    if (update.callback_query) {
      const cb = update.callback_query;
      const cbData = cb.data;
      const cbChatId = chatId || cb.message?.chat?.id;

      if (_localLastCbId !== cb.id) {
        _localLastCbId = cb.id;
        const answerText = cbData === 'cmd_msg_how'
          ? '💬 Type: /msg Your message here'
          : cbData === 'cmd_help' ? '🔄 Loading menu...'
          : cbData === 'cmd_status' ? '📊 Loading status...'
          : `⚡ ${cbData.replace('cmd_', '/').toUpperCase()}`;
        fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callback_query_id: cb.id, text: answerText, show_alert: cbData === 'cmd_msg_how' }),
        }).catch(() => {});
      }

      if (cbData === 'cmd_help') {
        if (updateId !== _localLastMenuId) { _localLastMenuId = updateId; const m = buildHelpMenu(); await sendTgMessage(token, cbChatId, m.text, m.keyboard); }
        return res.json({ command: null, updateId });
      }
      if (cbData === 'cmd_status') {
        if (updateId !== _localLastStatusId) {
          _localLastStatusId = updateId;
          const now = new Date().toISOString().replace('T', ' ').split('.')[0];
          await sendTgMessage(token, cbChatId, `📊 SYSTEM STATUS\n━━━━━━━━━━━━━━━━━━\n\n🟢 ag1_kernel — ACTIVE\n🟢 agent_runtime — ACTIVE\n🟢 observer_node — WATCHING\n🟢 remote_link — CONNECTED\n\n🕐 ${now}`);
        }
        return res.json({ command: null, updateId });
      }
      if (cbData === 'cmd_msg_how') {
        if (updateId !== _localLastMenuId) { _localLastMenuId = updateId; await sendTgMessage(token, cbChatId, '💬 MESSAGE OVERLAY\n━━━━━━━━━━━━━━━━━━\n\nTo display a message on the console:\n\n  /msg Your message here'); }
        return res.json({ command: null, updateId });
      }
      if (cbData.startsWith('cmd_')) {
        const command = cbData.replace('cmd_', '');
        sendTgMessage(token, cbChatId, `⚡ Executing /${command} on console...`).catch(() => {});
        return res.json({ command, payload: null, updateId, timestamp: Math.floor(Date.now() / 1000) });
      }
      return res.json({ command: null, updateId });
    }

    // Handle regular text messages
    const rawText = update.message?.text?.trim();
    const msgTime = update.message?.date;
    const msgChatId = chatId || update.message?.chat?.id;

    if (!rawText || !rawText.startsWith('/')) return res.json({ command: null });

    const nowSec = Math.floor(Date.now() / 1000);
    if (msgTime && nowSec - msgTime > 60) return res.json({ command: null });

    const spaceIdx = rawText.indexOf(' ');
    const command = spaceIdx > 0 ? rawText.slice(1, spaceIdx).toLowerCase() : rawText.slice(1).toLowerCase();
    const payload = spaceIdx > 0 ? rawText.slice(spaceIdx + 1) : null;

    if (command === 'help' || command === 'start') {
      if (updateId !== _localLastMenuId) { _localLastMenuId = updateId; const m = buildHelpMenu(); await sendTgMessage(token, msgChatId, m.text, m.keyboard); }
      return res.json({ command: null, updateId });
    }
    if (command === 'status') {
      if (updateId !== _localLastStatusId) {
        _localLastStatusId = updateId;
        const now = new Date().toISOString().replace('T', ' ').split('.')[0];
        await sendTgMessage(token, msgChatId, `📊 SYSTEM STATUS\n━━━━━━━━━━━━━━━━━━\n\n🟢 ag1_kernel — ACTIVE\n🟢 agent_runtime — ACTIVE\n🟢 observer_node — WATCHING\n🟢 remote_link — CONNECTED\n\n🕐 ${now}`);
      }
      return res.json({ command: null, updateId });
    }

    return res.json({ command, payload, updateId, timestamp: msgTime });
  } catch (_) {
    return res.json({ command: null });
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

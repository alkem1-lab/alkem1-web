export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token) return res.json({ command: null });

  try {
    const resp = await fetch(
      `https://api.telegram.org/bot${token}/getUpdates?offset=-1&limit=1`
    );
    const data = await resp.json();
    if (!data.ok || !data.result?.length) return res.json({ command: null });

    const update = data.result[0];
    const updateId = update.update_id;

    // ▸ CONSUME this update — Telegram will never return it again
    //   This is the ONLY reliable dedup for serverless (no in-memory state)
    await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${updateId + 1}&limit=1`);

    // ── Callback query from inline keyboard ──
    if (update.callback_query) {
      const cb = update.callback_query;
      const cbData = cb.data;
      const cbChatId = chatId || cb.message?.chat?.id;

      // Answer callback (removes loading spinner)
      fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_query_id: cb.id,
          text: cbData === 'cmd_msg_how' ? '💬 Type: /msg Your message here' : '⚡ Done',
          show_alert: cbData === 'cmd_msg_how',
        }),
      }).catch(() => {});

      // Telegram-only responses
      if (cbData === 'cmd_help') { await sendHelpMenu(token, cbChatId); return res.json({ command: null }); }
      if (cbData === 'cmd_status') { await sendStatus(token, cbChatId); return res.json({ command: null }); }
      if (cbData === 'cmd_msg_how') { await sendMsgHelp(token, cbChatId); return res.json({ command: null }); }

      // Forward command to frontend
      if (cbData.startsWith('cmd_')) {
        return res.json({ command: cbData.replace('cmd_', ''), payload: null, updateId });
      }
      return res.json({ command: null });
    }

    // ── Regular text message ──
    const rawText = update.message?.text?.trim();
    const msgTime = update.message?.date;
    const msgChatId = chatId || update.message?.chat?.id;

    if (!rawText || !rawText.startsWith('/')) return res.json({ command: null });

    // Stale — silently drop commands older than 60 seconds
    const nowSec = Math.floor(Date.now() / 1000);
    if (msgTime && nowSec - msgTime > 60) return res.json({ command: null });

    const spaceIdx = rawText.indexOf(' ');
    const command = spaceIdx > 0 ? rawText.slice(1, spaceIdx).toLowerCase() : rawText.slice(1).toLowerCase();
    const payload = spaceIdx > 0 ? rawText.slice(spaceIdx + 1) : null;

    // Telegram-only commands
    if (command === 'help' || command === 'start') {
      await sendHelpMenu(token, msgChatId);
      return res.json({ command: null });
    }
    if (command === 'status') {
      await sendStatus(token, msgChatId);
      return res.json({ command: null });
    }

    // Forward command to frontend
    return res.json({ command, payload, updateId, timestamp: msgTime });
  } catch (_) {
    return res.json({ command: null });
  }
}

// ── Inline keyboard help menu ──────────────────────────────────────

async function sendHelpMenu(token, chatId) {
  const text = [
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
  ].join('\n');

  const keyboard = {
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
  };

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, reply_markup: keyboard }),
  });
}

// ── Status response ────────────────────────────────────────────────

async function sendStatus(token, chatId) {
  const now = new Date().toISOString().replace('T', ' ').split('.')[0];
  const text = [
    `📊 SYSTEM STATUS`,
    `━━━━━━━━━━━━━━━━━━`,
    ``,
    `🟢 ag1_kernel — ACTIVE`,
    `🟢 agent_runtime — ACTIVE`,
    `🟢 domain_resolver — ACTIVE`,
    `🟢 observer_node — WATCHING`,
    `🟢 evidence_chain — SHA-256`,
    `🟢 remote_link — CONNECTED`,
    ``,
    `🕐 ${now}`,
    `📡 Console polling: 3s interval`,
  ].join('\n');

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

// ── Message help ───────────────────────────────────────────────────

async function sendMsgHelp(token, chatId) {
  const text = [
    `💬 MESSAGE OVERLAY`,
    `━━━━━━━━━━━━━━━━━━`,
    ``,
    `To display a message on the console:`,
    ``,
    `  /msg Your message here`,
    ``,
    `The message will appear as a`,
    `fullscreen overlay on the website.`,
  ].join('\n');

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

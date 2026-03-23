// Polls Telegram getUpdates for the last bot message
// Frontend calls this every few seconds to check for remote commands

let lastProcessedId = 0;

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return res.json({ command: null });

  try {
    const resp = await fetch(
      `https://api.telegram.org/bot${token}/getUpdates?offset=-1&limit=1`
    );
    const data = await resp.json();

    if (!data.ok || !data.result?.length) {
      return res.json({ command: null });
    }

    const update = data.result[0];
    const text = update.message?.text?.trim().toLowerCase();
    const updateId = update.update_id;

    // Only return if it's a new command (not already processed)
    if (!text || updateId <= lastProcessedId) {
      return res.json({ command: null });
    }

    // Mark as processed
    lastProcessedId = updateId;

    // Only accept known command patterns (starting with /)
    if (!text.startsWith('/')) {
      return res.json({ command: null });
    }

    const command = text.replace('/', '');
    return res.json({ command, updateId });
  } catch (_) {
    return res.json({ command: null });
  }
}

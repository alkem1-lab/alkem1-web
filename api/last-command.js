export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return res.json({ command: null });

  try {
    const resp = await fetch(
      `https://api.telegram.org/bot${token}/getUpdates?offset=-1&limit=1`
    );
    const data = await resp.json();

    if (!data.ok || !data.result?.length) return res.json({ command: null });

    const update = data.result[0];
    const rawText = update.message?.text?.trim();
    const updateId = update.update_id;

    if (!rawText || !rawText.startsWith('/')) return res.json({ command: null });

    const spaceIdx = rawText.indexOf(' ');
    const command = spaceIdx > 0 ? rawText.slice(1, spaceIdx).toLowerCase() : rawText.slice(1).toLowerCase();
    const payload = spaceIdx > 0 ? rawText.slice(spaceIdx + 1) : null;

    // Always return latest — client tracks what it already processed
    return res.json({ command, payload, updateId });
  } catch (_) {
    return res.json({ command: null });
  }
}

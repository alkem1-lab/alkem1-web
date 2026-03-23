export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(200).json({ status: 'skipped' });
  }

  const d = req.body || {};
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '?';

  const text = [
    `🔓 VAULT TRIGGERED`,
    ``,
    `Phrase: ${d.trigger || '?'}`,
    `Time: ${d.timestamp || new Date().toISOString()}`,
    `IP: ${ip}`,
    ``,
    `── DEVICE ──`,
    `UA: ${d.userAgent || '?'}`,
    `Platform: ${d.platform || '?'}`,
    `Mobile: ${d.mobile ?? '?'}`,
    `Screen: ${d.screen || '?'} · ${d.pixelRatio || '?'}x · ${d.colorDepth || '?'}bit`,
    `Viewport: ${d.viewport || '?'} · ${d.orientation || '?'}`,
    `Touch: ${d.touchPoints ?? '?'} points`,
    ``,
    `── HARDWARE ──`,
    `CPU: ${d.cores || '?'} cores`,
    `RAM: ${d.memory || '?'}GB`,
    ``,
    `── NETWORK ──`,
    `Type: ${d.connection || '?'}`,
    `Speed: ↓${d.downlink || '?'}Mbps · ${d.rtt || '?'}ms RTT`,
    `Referrer: ${d.referrer || 'direct'}`,
    ``,
    `── PROFILE ──`,
    `TZ: ${d.timezone || '?'}`,
    `Lang: ${d.languages || d.lang || '?'}`,
    `Dark: ${d.darkMode ?? '?'}`,
    `DNT: ${d.dnt || '?'}`,
    `Cookies: ${d.cookies ?? '?'}`,
    `History: ${d.historyLen || '?'} pages`,
  ].join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (_) {}

  res.status(200).json({ status: 'ok' });
}

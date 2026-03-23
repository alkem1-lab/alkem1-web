export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(200).json({ status: 'skipped' });
  }

  const {
    trigger, timestamp, screen, viewport,
    lang, timezone, platform, mobile, referrer, userAgent,
  } = req.body || {};

  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  const device = mobile ? 'Mobile' : 'Desktop';

  const text = [
    `🔓 VAULT TRIGGERED`,
    ``,
    `Phrase: ${trigger || '?'}`,
    `Time: ${timestamp || new Date().toISOString()}`,
    ``,
    `IP: ${ip}`,
    `Device: ${device} · ${platform || '?'}`,
    `Screen: ${screen || '?'} · Viewport: ${viewport || '?'}`,
    `Lang: ${lang || '?'} · TZ: ${timezone || '?'}`,
    `Referrer: ${referrer || 'direct'}`,
    `UA: ${userAgent || '?'}`,
  ].join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (_) {
    // Silent fail
  }

  res.status(200).json({ status: 'ok' });
}

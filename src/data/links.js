// ─── Hardcoded links — never AI-generated ───────────────────────
export const LINKS = {
  showreel: 'https://www.youtube.com/watch?v=yX7StQTIzwM',
  technical: 'https://www.youtube.com/watch?v=GnimDDsUtbE',
  miro: 'https://miro.com/app/board/uXjVJngJreQ=/?share_link_id=873319357821',
  email: 'creatorzdeitz@gmail.com',
};

// Extract YouTube video ID from URL
export function getYouTubeId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

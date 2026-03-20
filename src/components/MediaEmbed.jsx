import { useState } from 'react';
import './MediaEmbed.css';

// ─── Lazy YouTube: thumbnail first, click to embed ──────────────

function YouTubeCard({ videoId, label }) {
  const [open, setOpen] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="media-embed">
      <div className="media-label">[visual channel]</div>
      {!open ? (
        <button className="yt-thumb-btn" onClick={() => setOpen(true)}>
          <img src={thumb} alt={label} className="yt-thumb" />
          <div className="yt-play-overlay">
            <span className="yt-play-text">▶ Open Video</span>
          </div>
        </button>
      ) : (
        <div className="media-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      {label && <div className="media-caption">{label}</div>}
    </div>
  );
}

// ─── Miro card: preview + open button ───────────────────────────

function MiroCard({ url, label, description }) {
  return (
    <div className="media-embed">
      <div className="media-label">[external artifact]</div>
      <div className="miro-card">
        <div className="miro-title">{label}</div>
        {description && <div className="miro-desc">{description}</div>}
        <a href={url} target="_blank" rel="noopener noreferrer" className="media-link">
          Open Portfolio Map (Miro) <span className="media-arrow">→</span>
        </a>
      </div>
    </div>
  );
}

// ─── Work menu: unified chooser ─────────────────────────────────

function WorkMenu({ options, onSelect }) {
  return (
    <div className="media-embed">
      <div className="media-label">[available channels]</div>
      <div className="work-menu">
        {options.map((item) => (
          <button
            key={item.id}
            className="work-option"
            onClick={() => onSelect(item)}
          >
            <div className="work-option-label">{item.label}</div>
            <div className="work-option-desc">{item.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ────────────────────────────────────────────────

export default function MediaEmbed({ type, url, label, description, videoId, options, onSelect }) {
  if (type === 'youtube' && videoId) {
    return <YouTubeCard videoId={videoId} label={label} />;
  }

  if (type === 'miro' || type === 'link') {
    return <MiroCard url={url} label={label} description={description} />;
  }

  if (type === 'work-menu' && options) {
    return <WorkMenu options={options} onSelect={onSelect} />;
  }

  return null;
}

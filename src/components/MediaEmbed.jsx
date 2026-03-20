import { getYouTubeId } from '../data/links';
import './MediaEmbed.css';

export default function MediaEmbed({ type, url, label }) {
  const ytId = type === 'youtube' ? getYouTubeId(url) : null;

  if (type === 'youtube' && ytId) {
    return (
      <div className="media-embed">
        <div className="media-label">[visual channel opened]</div>
        <div className="media-video">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&color=white`}
            title={label || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {label && <div className="media-caption">{label}</div>}
      </div>
    );
  }

  if (type === 'link') {
    return (
      <div className="media-embed">
        <div className="media-label">[external artifact]</div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="media-link">
          {label || url}
          <span className="media-arrow"> →</span>
        </a>
      </div>
    );
  }

  return null;
}

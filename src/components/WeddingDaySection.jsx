import { weddingDay } from '../data/wedding.js';
import { MapLink } from './ui/MapLink.jsx';

export function WeddingDaySection() {
  return (
    <section id="wedding" className="page-section">
      <div className="section-heading">
        <p className="eyebrow">{weddingDay.date}</p>
        <h2>Wedding Day</h2>
        <p>{weddingDay.guidance}</p>
      </div>
      <div className="split-layout">
        <article className="info-card">
          <div className="card-title-row">
            <h3>{weddingDay.venue}</h3>
            <MapLink query={weddingDay.mapQuery} label="Venue map" />
          </div>
          <p>{weddingDay.address}</p>
          <div className="timeline">
            {weddingDay.timeline.map((entry) => (
              <div key={`${entry.time}-${entry.text}`}>
                <strong>{entry.time}</strong>
                <span>{entry.text}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="info-card">
          <h3>Prep Checklist</h3>
          <ul className="check-list">
            {weddingDay.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

import { tripOverview } from '../data/trip.js';

export function Overview() {
  return (
    <section id="overview" className="hero-section">
      <div className="hero-media">
        <img src={tripOverview.heroImage} alt={tripOverview.heroImageAlt} />
        <a href={tripOverview.heroImageCreditUrl} target="_blank" rel="noreferrer">
          Image: {tripOverview.heroImageCredit}
        </a>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">{tripOverview.dates} / {tripOverview.base}</p>
        <h1>{tripOverview.title}</h1>
        <p className="hero-summary">{tripOverview.summary}</p>
        <div className="fact-grid">
          {tripOverview.quickFacts.map((fact) => (
            <div key={fact.label} className="fact-tile">
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
        <ul className="priority-list">
          {tripOverview.priorities.map((priority) => (
            <li key={priority}>{priority}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

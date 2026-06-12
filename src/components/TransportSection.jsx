import { transportCards, transportWarnings } from '../data/transport.js';

export function TransportSection() {
  return (
    <section id="transport" className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Logistics</p>
        <h2>Transport and ZTL</h2>
        <p>Use the car where it helps, avoid it where cameras and parking make the day worse.</p>
      </div>
      <div className="card-grid">
        {transportCards.map((card) => (
          <article key={card.id} className="info-card">
            <h3>{card.title}</h3>
            <p>{card.summary}</p>
            <ul>
              {card.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="callout-panel">
        <h3>Check Before Travel</h3>
        <ul>
          {transportWarnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

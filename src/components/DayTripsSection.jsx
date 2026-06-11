import { dayTrips } from '../data/dayTrips.js';
import { MapLink } from './ui/MapLink.jsx';
import { StarToggle } from './ui/StarToggle.jsx';

function valueClass(value) {
  if (value.toLowerCase().includes('very')) {
    return 'very-high';
  }
  if (value.toLowerCase().includes('high')) {
    return 'high';
  }
  return 'medium';
}

export function DayTripsSection({ favourites, setFavourites }) {
  function toggleFavourite(id) {
    setFavourites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <section id="day-trips" className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Effort versus value</p>
        <h2>Day Trips</h2>
        <p>Keep the high-value easy wins visible, but keep the lower-priority options honest.</p>
      </div>
      <div className="comparison-grid">
        {dayTrips.map((trip) => {
          const isSaved = favourites.includes(trip.id);
          return (
            <article key={trip.id} className="info-card">
              <div className="card-title-row">
                <h3>{trip.name}</h3>
                <span className="badge">{trip.effort}</span>
              </div>
              <p>{trip.recommendation}</p>
              <dl className="mini-facts">
                <div>
                  <dt>Transport</dt>
                  <dd>{trip.transport}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{trip.travelTime}</dd>
                </div>
                <div>
                  <dt>Car</dt>
                  <dd>{trip.carHelpful}</dd>
                </div>
              </dl>
              <div className="value-meter" aria-label={`Value ${trip.value}`}>
                <span className={valueClass(trip.value)} />
              </div>
              <p className="source-note">{trip.notes}</p>
              <div className="card-actions">
                <StarToggle active={isSaved} label={trip.name} onToggle={() => toggleFavourite(trip.id)} />
                <MapLink query={trip.mapQuery} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

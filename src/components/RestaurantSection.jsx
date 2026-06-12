import { useState } from 'react';
import { restaurantFilters, restaurants } from '../data/restaurants.js';
import { BookingStatus } from './ui/BookingStatus.jsx';
import { FilterBar } from './ui/FilterBar.jsx';
import { MapLink } from './ui/MapLink.jsx';
import { StarToggle } from './ui/StarToggle.jsx';

export function RestaurantSection({ favourites, setFavourites, bookingStatuses, setBookingStatuses }) {
  const [activeFilter, setActiveFilter] = useState('All');

  function toggleFavourite(id) {
    setFavourites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function setBooking(id, status) {
    setBookingStatuses((current) => ({ ...current, [id]: status }));
  }

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (activeFilter === 'All') {
      return true;
    }
    if (activeFilter === 'Starred') {
      return favourites.includes(restaurant.id);
    }
    return restaurant.tags.includes(activeFilter);
  });

  return (
    <section id="restaurants" className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Book early</p>
        <h2>Restaurants</h2>
        <p>Ranked for this specific week, with booking status and saved places kept on this device.</p>
      </div>
      <FilterBar filters={restaurantFilters} activeFilter={activeFilter} onChange={setActiveFilter} />
      <div className="card-grid restaurant-grid">
        {filteredRestaurants.map((restaurant) => {
          const isSaved = favourites.includes(restaurant.id);
          return (
            <article key={restaurant.id} className="info-card restaurant-card">
              <div className="card-title-row">
                <h3>{restaurant.name}</h3>
                <span className="badge">{restaurant.tier}</span>
              </div>
              <p>{restaurant.type}</p>
              <dl className="mini-facts">
                <div>
                  <dt>Price</dt>
                  <dd>{restaurant.price}</dd>
                </div>
                <div>
                  <dt>Confidence</dt>
                  <dd>{restaurant.sourceConfidence}</dd>
                </div>
              </dl>
              <p className="small-text">
                <strong>Order:</strong> {restaurant.order}
              </p>
              <p className="small-text">
                <strong>Hours:</strong> {restaurant.hours}
              </p>
              <p className="source-note">{restaurant.sourceNote}</p>
              <div className="card-actions">
                <StarToggle active={isSaved} label={restaurant.name} onToggle={() => toggleFavourite(restaurant.id)} />
                <BookingStatus
                  restaurant={restaurant}
                  value={bookingStatuses[restaurant.id] ?? 'need-to-book'}
                  onChange={(status) => setBooking(restaurant.id, status)}
                />
                <MapLink query={restaurant.mapQuery} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

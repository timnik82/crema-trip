import { foodItems } from '../data/food.js';

export function FoodSection({ triedFood, setTriedFood }) {
  const triedFoodIds = Array.isArray(triedFood) ? triedFood : [];

  function toggleFood(foodId) {
    setTriedFood((current) => {
      const currentIds = Array.isArray(current) ? current : [];
      return currentIds.includes(foodId) ? currentIds.filter((id) => id !== foodId) : [...currentIds, foodId];
    });
  }

  return (
    <section id="food" className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Checklist</p>
        <h2>Food and Dishes</h2>
        <p>Local specialties, practical snack stops, and a June caveat for Bertolina.</p>
      </div>
      <div className="card-grid">
        {foodItems.map((food) => {
          const isTried = triedFoodIds.includes(food.id);
          return (
            <article key={food.id} className={isTried ? 'info-card is-checked' : 'info-card'}>
              <div className="card-title-row">
                <h3>{food.name}</h3>
                <span className="badge">{food.category}</span>
              </div>
              <p className="pronunciation">{food.pronunciation}</p>
              <p>{food.description}</p>
              <p className="small-text">
                <strong>Taste:</strong> {food.taste}
              </p>
              <p className="small-text">
                <strong>Where:</strong> {food.where}
              </p>
              <p className="source-note">{food.sourceNote}</p>
              <button
                type="button"
                className={isTried ? 'secondary-button is-active' : 'secondary-button'}
                aria-pressed={isTried}
                aria-label={`${isTried ? 'Unmark' : 'Mark'} ${food.name.toLowerCase()} as ${isTried ? 'not tried' : 'tried'}`}
                onClick={() => toggleFood(food.id)}
              >
                {isTried ? 'Tried' : 'Mark tried'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

import { useMemo, useState } from 'react';
import { activityPool } from '../data/itinerary.js';
import {
  addActivityToSlot,
  buildInitialItinerary,
  getItineraryWarnings,
  moveItemToNextSlot,
  removeItineraryItem,
  resetItinerary,
  updateItineraryItemStatus,
} from '../lib/itinerary.js';

export function ItinerarySection({ itinerary, setItinerary }) {
  const initialDay = itinerary[0]?.id ?? 'wed-17';
  const initialSlot = itinerary[0]?.slots[0]?.id ?? 'wed-17-morning';
  const [targetDay, setTargetDay] = useState(initialDay);
  const [targetSlot, setTargetSlot] = useState(initialSlot);
  const [targetActivity, setTargetActivity] = useState(activityPool[0]?.id ?? '');

  const selectedDay = itinerary.find((day) => day.id === targetDay) ?? itinerary[0];
  const availableSlots = selectedDay?.slots ?? [];

  const itemCount = useMemo(
    () => itinerary.reduce((total, day) => total + day.slots.reduce((slotTotal, slot) => slotTotal + slot.items.length, 0), 0),
    [itinerary]
  );

  function handleAddActivity() {
    setItinerary((days) => addActivityToSlot(days, targetDay, targetSlot, targetActivity));
  }

  function handleReset() {
    setItinerary(resetItinerary());
  }

  return (
    <section id="itinerary" className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Simple editable MVP</p>
        <h2>Itinerary</h2>
        <p>
          Pinned events stay protected. Use the controls for the first pass; full drag-and-drop can come later.
        </p>
      </div>

      <div className="toolbar-panel">
        <div className="toolbar-fields">
          <label className="field-label">
            <span>Day</span>
            <select
              value={targetDay}
              onChange={(event) => {
                const nextDayId = event.target.value;
                const nextDay = itinerary.find((day) => day.id === nextDayId);
                setTargetDay(nextDayId);
                setTargetSlot(nextDay?.slots[0]?.id ?? '');
              }}
            >
              {itinerary.map((day) => (
                <option key={day.id} value={day.id}>
                  {day.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field-label">
            <span>Slot</span>
            <select value={targetSlot} onChange={(event) => setTargetSlot(event.target.value)}>
              {availableSlots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field-label">
            <span>Activity</span>
            <select value={targetActivity} onChange={(event) => setTargetActivity(event.target.value)}>
              {activityPool.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="toolbar-actions">
          <button type="button" className="primary-button" onClick={handleAddActivity}>
            Add activity
          </button>
          <button type="button" className="secondary-button" onClick={handleReset}>
            Reset to suggested
          </button>
          <span className="counter">{itemCount} planned items</span>
        </div>
      </div>

      <div className="itinerary-grid">
        {itinerary.map((day) => (
          <article key={day.id} className="day-column">
            <header>
              <h3>{day.label}</h3>
              <span>{day.date}</span>
            </header>
            {day.slots.map((slot) => (
              <div key={slot.id} className="time-slot">
                <h4>{slot.label}</h4>
                {slot.items.length === 0 ? <p className="muted">Open slot</p> : null}
                {slot.items.map((item) => {
                  const warnings = getItineraryWarnings(day, slot, item);
                  return (
                    <div
                      key={item.id}
                      data-testid="itinerary-card"
                      className={`itinerary-card ${item.locked ? 'is-locked' : ''} ${item.status ? `is-${item.status}` : ''}`}
                    >
                      <div className="card-title-row">
                        <h5>{item.title}</h5>
                        {item.locked ? <span className="badge">Pinned</span> : null}
                      </div>
                      <p>{item.description}</p>
                      {warnings.length > 0 ? (
                        <ul className="warning-list">
                          {warnings.map((warning, index) => (
                            <li key={`${item.id}-${index}-${warning}`}>{warning}</li>
                          ))}
                        </ul>
                      ) : null}
                      {!item.locked ? (
                        <div className="compact-actions">
                          <label className="field-label inline-field">
                            <span>Status</span>
                            <select
                              value={item.status ?? 'planned'}
                              onChange={(event) =>
                                setItinerary((days) => updateItineraryItemStatus(days, item.id, event.target.value))
                              }
                            >
                              <option value="planned">Planned</option>
                              <option value="done">Done</option>
                              <option value="skipped">Skipped</option>
                            </select>
                          </label>
                          <button type="button" onClick={() => setItinerary((days) => moveItemToNextSlot(days, item.id))}>
                            Move later
                          </button>
                          <button type="button" onClick={() => setItinerary((days) => removeItineraryItem(days, item.id))}>
                            Remove
                          </button>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

export const defaultItinerary = buildInitialItinerary();

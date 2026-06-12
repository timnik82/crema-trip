import { expect, test } from 'vitest';
import { addActivityToSlot, buildInitialItinerary, resetItinerary, updateItineraryItemStatus } from './itinerary.js';

test('resetItinerary restores the suggested itinerary', () => {
  const initial = buildInitialItinerary();
  const changed = updateItineraryItemStatus(initial, 'first-wander', 'skipped');
  expect(changed).not.toEqual(initial);
  expect(resetItinerary()).toEqual(initial);
});

test('locked itinerary items cannot be marked skipped', () => {
  const initial = buildInitialItinerary();
  expect(updateItineraryItemStatus(initial, 'wedding-day', 'skipped')).toEqual(initial);
});

test('added activities get unique ids even within the same millisecond', () => {
  const initial = buildInitialItinerary();
  const originalNow = Date.now;
  Date.now = () => 1234567890;

  try {
    const once = addActivityToSlot(initial, 'wed-17', 'wed-17-afternoon', 'crema-walk');
    const twice = addActivityToSlot(once, 'wed-17', 'wed-17-afternoon', 'crema-walk');
    const ids = twice
      .find((day) => day.id === 'wed-17')
      .slots.find((slot) => slot.id === 'wed-17-afternoon')
      .items.map((item) => item.id);

    expect(new Set(ids).size).toBe(ids.length);
  } finally {
    Date.now = originalNow;
  }
});

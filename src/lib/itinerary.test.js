import { expect, test } from 'vitest';
import { buildInitialItinerary, resetItinerary, updateItineraryItemStatus } from './itinerary.js';

test('resetItinerary restores the suggested itinerary', () => {
  const initial = buildInitialItinerary();
  const changed = updateItineraryItemStatus(initial, 'cremona-day', 'skipped');
  expect(resetItinerary(changed)).toEqual(initial);
});

test('locked itinerary items cannot be marked skipped', () => {
  const initial = buildInitialItinerary();
  expect(updateItineraryItemStatus(initial, 'wedding-day', 'skipped')).toEqual(initial);
});

import { expect, test } from 'vitest';
import { foodItems } from './food.js';
import { itineraryDays } from './itinerary.js';
import { restaurants } from './restaurants.js';

test('includes the essential local food checklist items', () => {
  expect(foodItems.map((item) => item.id)).toEqual(
    expect.arrayContaining(['tortelli-cremaschi', 'salva-tighe', 'serafino-pizzette'])
  );
});

test('keeps restaurant ids stable for saved booking state', () => {
  expect(restaurants.length).toBeGreaterThan(5);
  expect(new Set(restaurants.map((item) => item.id)).size).toBe(restaurants.length);
});

test('locks fixed wedding-trip itinerary anchors', () => {
  const locked = itineraryDays.flatMap((day) => day.slots.flatMap((slot) => slot.items)).filter((item) => item.locked);
  expect(locked.map((item) => item.id)).toEqual(
    expect.arrayContaining(['arrival-bgy', 'welcome-aperitivo', 'wedding-day', 'departure-bgy'])
  );
});

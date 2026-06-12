import { expect, test } from 'vitest';
import { foodItems } from './food.js';
import { itineraryDays } from './itinerary.js';
import { practicalSections } from './practical.js';
import { restaurantFilters, restaurants } from './restaurants.js';

test('includes the essential local food checklist items', () => {
  expect(foodItems.map((item) => item.id)).toEqual(
    expect.arrayContaining(['tortelli-cremaschi', 'salva-tighe', 'serafino-pizzette'])
  );
});

test('keeps restaurant ids stable for saved booking state', () => {
  expect(restaurants.length).toBeGreaterThan(5);
  expect(new Set(restaurants.map((item) => item.id)).size).toBe(restaurants.length);
});

test('exposes filters for every restaurant tier', () => {
  const tiers = new Set(restaurants.map((item) => item.tier));
  tiers.forEach((tier) => {
    expect(restaurantFilters).toContain(tier);
  });
});

test('uses the correct Italian contraction in ZTL phrase', () => {
  const phraseItems = practicalSections.find((section) => section.id === 'phrases').items;
  expect(phraseItems).toEqual(
    expect.arrayContaining(["C'è la ZTL qui? Dove posso parcheggiare? - Is there a ZTL here? Where can I park?"])
  );
});

test('locks fixed wedding-trip itinerary anchors', () => {
  const locked = itineraryDays.flatMap((day) => day.slots.flatMap((slot) => slot.items)).filter((item) => item.locked);
  expect(locked.map((item) => item.id)).toEqual(
    expect.arrayContaining(['arrival-bgy', 'welcome-aperitivo', 'wedding-day', 'departure-bgy'])
  );
});

# Crema Wedding Trip Explorer MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a useful local-first React MVP for the Crema wedding trip, with structured trip data, mobile-friendly guide sections, saved checklist/favourite/booking state, and a simple editable itinerary.

**Architecture:** A static Vite + React app reads curated source-backed data from `src/data/*.js` and stores user changes in versioned `localStorage` keys. The MVP uses simple controls for itinerary editing and defers drag-and-drop until after the guide is useful.

**Tech Stack:** Vite, React JavaScript, vanilla CSS, Vitest, React Testing Library, localStorage.

---

### Task 1: App Foundation

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/App.css`
- Test: `src/App.test.jsx`

- [ ] **Step 1: Write failing render test**

```jsx
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App.jsx';

test('renders the MVP guide sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Crema Wedding Trip Explorer/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Itinerary/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Restaurants/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run`
Expected: FAIL because `src/App.jsx` does not exist yet.

- [ ] **Step 3: Implement app shell**

Create Vite/React files, app navigation, global CSS variables, and responsive section layout.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run`
Expected: PASS.

### Task 2: Core Trip Data

**Files:**
- Create: `src/data/trip.js`
- Create: `src/data/food.js`
- Create: `src/data/restaurants.js`
- Create: `src/data/dayTrips.js`
- Create: `src/data/transport.js`
- Create: `src/data/wedding.js`
- Create: `src/data/practical.js`
- Create: `src/data/itinerary.js`
- Test: `src/data/tripData.test.js`

- [ ] **Step 1: Write failing data integrity tests**

```js
import { expect, test } from 'vitest';
import { foodItems } from './food.js';
import { restaurants } from './restaurants.js';
import { itineraryDays } from './itinerary.js';

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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/data/tripData.test.js`
Expected: FAIL because the data modules do not exist yet.

- [ ] **Step 3: Implement structured data**

Convert the source document decisions into structured arrays and objects with stable ids, map search terms, source notes, and warning notes where relevant.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/data/tripData.test.js`
Expected: PASS.

### Task 3: Saved State and Itinerary Helpers

**Files:**
- Create: `src/hooks/useLocalStorage.js`
- Create: `src/lib/itinerary.js`
- Test: `src/lib/itinerary.test.js`
- Test: `src/hooks/useLocalStorage.test.jsx`

- [ ] **Step 1: Write failing state/helper tests**

```js
import { expect, test } from 'vitest';
import { buildInitialItinerary, resetItinerary, updateItineraryItemStatus } from './itinerary.js';

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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/lib/itinerary.test.js`
Expected: FAIL because the helper module does not exist yet.

- [ ] **Step 3: Implement localStorage hook and itinerary helpers**

Add safe JSON parsing, versioned keys, browser checks, reset support, and pure itinerary helper functions.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/lib/itinerary.test.js src/hooks/useLocalStorage.test.jsx`
Expected: PASS.

### Task 4: MVP Sections

**Files:**
- Create: `src/components/*.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.css`
- Test: `src/App.test.jsx`

- [ ] **Step 1: Write failing interaction tests**

```jsx
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App.jsx';

test('saves food checklist state in localStorage', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Mark tortelli cremaschi as tried/i }));
  expect(JSON.parse(window.localStorage.getItem('crema:v1:foodChecklist'))).toContain('tortelli-cremaschi');
});

test('saves restaurant booking state in localStorage', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/Booking status for Osteria Muschirola/i), {
    target: { value: 'booked' },
  });
  expect(JSON.parse(window.localStorage.getItem('crema:v1:bookingStatuses'))['osteria-muschirola']).toBe('booked');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/App.test.jsx`
Expected: FAIL because interactions are not implemented yet.

- [ ] **Step 3: Implement sections and saved interactions**

Render overview, itinerary, food, restaurants, day trips, transport, wedding day, and practical info. Add favourites, checklist, booking status selectors, filters, accordions, Maps links, and itinerary controls.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/App.test.jsx`
Expected: PASS.

### Task 5: Verification

**Files:**
- Modify as needed only for fixes discovered by verification.

- [ ] **Step 1: Run full tests**

Run: `npm test -- --run`
Expected: PASS.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Start dev server and visually verify**

Run: `npm run dev -- --host 127.0.0.1`
Expected: app renders all sections, responsive layout works, saved state survives reload, reset keeps locked itinerary items protected.

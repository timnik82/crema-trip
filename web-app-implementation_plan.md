# Crema Wedding Trip Explorer — Source-Verified Implementation Plan

A Vite + React web app that consolidates the four Crema trip planning source documents into a beautiful, interactive tool for both pre-trip planning (desktop) and on-the-ground reference (mobile).

---

## Design Decisions (from interview)

| Decision | Answer |
|---|---|
| Primary use case | Both planning (now) and pocket guide (in Italy) |
| Visual style | Dark mode, warm Italian accents (terracotta, olive gold, cream) |
| CMBYN section | Dropped — key spots merged into car-day itinerary cards |
| Itinerary flexibility | Full drag-and-drop: activity pool → day/time slots, pre-loaded with draft plan, "Reset to suggested" button |
| Fixed constraints | Wed 17 (arrival), Sat 20 (wedding), Thu 18 evening (aperitivo), Wed 24 (departure) are pinned/locked |
| Interactive features | Food checklist (tick-off), booking tracker (booked/need to book/walk-in), star/favourite places |
| Maps | Clickable Google Maps links (open in new tab / Maps app) |
| Delivery format | Vite + React app |
| Language | English with Italian dish names, pronunciations, and useful phrases |
| Sections | 8 total (see below) |
| Countdown timer | No — skip it |

---

## App Architecture

### Tech Stack
- **Vite** + **React** (JavaScript, not TypeScript — keep it light)
  - Runtime dependencies: `react`, `react-dom`
  - Dev dependencies: `vite`, `@vitejs/plugin-react`
  - Standard scripts: `npm run dev`, `npm run build`, `npm run preview`
- **Vanilla CSS** with CSS custom properties for the design system
- **@dnd-kit** for drag-and-drop (lightweight, React-native, accessible)
  - Use `@dnd-kit/core`, `@dnd-kit/sortable`, and `@dnd-kit/utilities`
  - Plan for `DndContext`, mouse + touch + keyboard sensors, `SortableContext`, collision detection, and `DragOverlay`
- **localStorage** for all persistent state (checklists, itinerary changes, bookings, favourites)
  - Use versioned storage keys and safe JSON parsing
  - Read/write only in the browser; keep initial defaults available if storage is empty or corrupt
- Google Font: **Inter**

### Design System
- **Palette**: Dark charcoal / espresso-neutral backgrounds, with terracotta (`#c4704b`), olive gold (`#b8a04a`), sage, and warm cream (`#f5e6c8`) accents. Avoid letting the UI become a mostly dark-blue/slate theme.
- **Cards**: Semi-transparent surfaces with subtle borders; use glassmorphism sparingly for actual cards/modals, not as the default treatment for every section.
- **Typography**: Inter, with system fallbacks
- **Animations**: Fade-in on scroll (IntersectionObserver), card hover lifts, smooth expand/collapse transitions
- **Responsive**: Mobile-first breakpoints — works on phones as a pocket guide

---

## Sections & Components

### 1. 🏠 Overview (Hero)
- Trip title, dates (17–24 June 2026), base city (Crema)
- Key facts: weather (avg 27°C, humid, mosquitoes), wedding venue, airport (BGY)
- Quick-jump cards to each section

### 2. 📅 Itinerary Builder ⭐ (core feature)
- **8 day columns** (Wed 17 → Wed 24), each with Morning / Afternoon / Evening slots
- **Activity pool** sidebar/drawer with draggable activity cards
  - Activities sourced from: restaurants, day trips, sightseeing, events
  - Each card shows: name, duration estimate, tags (car/train/food/wedding/wine), mini-description
- **Drag-and-drop** (via dnd-kit): drag activities from pool into day/time slots, or between days
  - Use sortable lists for each day/time slot and the activity pool
  - Include mouse, touch, and keyboard controls so the builder works on desktop, mobile, and without a mouse
  - Use a drag overlay for clearer mobile feedback
- **Pinned events** (non-draggable, visually distinct):
  - Wed 17: Arrival at BGY
  - Thu 18 evening: Welcome aperitivo in Cremosano at 19:00
  - Sat 20: Wedding day at Villa San Michele; full day protected, with pickup time marked "confirm with hosts" (source range suggests roughly 16:15–16:30 for a 17:00 ceremony)
  - Wed 24: Departure from BGY
- **"Reset to Suggested"** button restores the draft itinerary from the source docs
- **Validation hints**:
  - "Museo Civico is closed Monday; Tuesday is afternoon-only" if dragged to Monday or Tuesday morning
  - "Linea M bus does not run Sundays/holidays" warnings for Bergamo/BGY routes; also warn that some Saturday runs may require a bus change at Cologno Scuole
  - "Check official timetables 48–72 hours ahead" for Verona, Brescia, Garda, and any late return
  - "Pandino Castle public opening is Friday morning, Saturday morning/afternoon, and Sunday morning/afternoon" if scheduled outside those windows
- State persisted in localStorage
- On mobile: vertical stack with drag handles, activity pool as a slide-up drawer

### 3. 🍝 Food & Dishes
- Grid of food cards: tortelli cremaschi, Salva Cremasco con le tighe, Salame Nobile Cremasco, spongarda, torta Bertolina, gelato, pizzette, pizza al trancio, pastry breakfast, etc.
- Each card: Italian name + pronunciation, description, taste notes, where to try it
- Include source notes for seasonal/availability caveats, especially torta Bertolina being autumn-grape-based and therefore uncertain in June
- **Food Checklist** toggle: tap to mark "tried ✓" (localStorage)
- Cards glow/highlight when checked off

### 4. 🍽️ Restaurants
- Card list ranked by tier: **Must Try** / **Good Backup** / **Only If Nearby** / **Probably Skippable**
- Each card shows:
  - Name, cuisine type, price (€/€€/€€€)
  - Hours & closure days
  - What to order
  - Booking notes
  - Source confidence and "verify closer to date" notes where hours differ
  - 📍 Google Maps link
  - ⭐ **Star/favourite** toggle
  - 📋 **Booking status** selector: Need to Book / Booked / Walk-in
- **Filter bar**: All | Must Try | Good Backup | Aperitivo | Pizza | Fine Dining | Quick Bite | ⭐ Starred
- Cards interlink with the itinerary builder (same data objects)

### 5. 🚆 Day Trips
- Comparison cards for: Cremona, Bergamo, Milan, Soncino, Pandino + Gradella, Palazzo Pignano / Abbadia Cerreto countryside loop, Verona, Brescia, Lake Garda, Lodi, Mantua, Pavia
- Each card: main appeal, transport, travel time, effort level, food value, car helpful?, recommendation
- Keep lower-priority destinations visible but clearly labelled: Lodi, Mantua, and Pavia are comparison/optional items, not equal-weight recommendations
- Visual **effort vs value** indicator (CSS bar/dot)
- ⭐ Star/favourite toggle
- 📍 Google Maps link
- Cards are draggable into the itinerary builder

### 6. 🚗 Transport & Logistics
- **Car vs Train** decision guide with visual comparison
- **ZTL warnings** — Crema, Milan, Verona, Sirmione, Bergamo — with camera/fine icons
  - Crema's official ZTL information says the main historic-centre ZTL is active 00:00–24:00 every day, with named-street exceptions on reduced hours. The app should warn "do not drive into the historic centre unless your hotel/host confirms permission."
- **Airport transfers** — BGY ↔ Crema options (ATB airport bus → Bergamo station → Linea M, Milan coach + Trenord, taxi/private transfer, rental car) with weekday/Sunday caveat
- **Cremosano aperitivo logistics** — taxi/lift as the simplest option, with train/bus alternatives noted where available
- **Apps to download**: Trenord, Trenitalia, Autoguidovie, Moovit
- **Train/bus quick-reference**: key routes, usual frequencies, and "recheck 48–72 hours ahead" for summer 2026 works/timetable changes

### 7. 💒 Wedding Day
- Dedicated card with ceremony timeline:
  - Morning: sleep in, light breakfast, optional walk
  - Early afternoon: light lunch, rest, dress
  - 16:15–16:30: likely bus pickup window from central Crema; exact host-confirmed time needed
  - 17:00: Ceremony at Villa San Michele
  - Late night: bus return
- **Prep checklist**: mosquito repellent, block heels, sunscreen, sunglasses, light layer, etc.
- Venue info: address, Google Maps link, garden setting details
- Heat/dress code guidance

### 8. 📋 Practical Info
- Collapsible accordion sections:
  - Weather & what to pack
  - Useful Italian phrases (with phonetic aids)
  - Tipping, coperto & payment
  - Coffee & aperitivo etiquette
  - Restaurant hours / closure patterns
  - Pharmacy, SIM/eSIM, safety
  - Money & cards

---

## Project Structure

```
Crema-Wedding/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.ico
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx               # Root component, tab routing
    ├── App.css               # Global styles, design system, CSS variables
    ├── data/
    │   ├── itinerary.js      # Draft day-by-day plan + activity pool
    │   ├── restaurants.js    # All restaurant data
    │   ├── food.js           # Dishes and food checklist items
    │   ├── dayTrips.js       # Day trip comparison data
    │   ├── transport.js      # Transport info, ZTL, airport
    │   ├── wedding.js        # Wedding day details, prep checklist
    │   ├── practical.js      # Phrases, etiquette, packing
    │   ├── places.js         # Google Maps links for all places
    │   └── sourceMeta.js     # Source provenance, confidence, and conflict notes
    ├── components/
    │   ├── Navbar.jsx         # Sticky top nav with section tabs
    │   ├── Overview.jsx       # Hero / overview section
    │   ├── ItineraryBuilder.jsx  # Drag-and-drop itinerary (main feature)
    │   ├── ActivityPool.jsx   # Sidebar/drawer of draggable activities
    │   ├── DayColumn.jsx      # Single day in the itinerary
    │   ├── ActivityCard.jsx   # Draggable activity card
    │   ├── FoodSection.jsx    # Food grid + checklist
    │   ├── FoodCard.jsx       # Individual food card
    │   ├── RestaurantSection.jsx  # Restaurant list + filters
    │   ├── RestaurantCard.jsx # Individual restaurant card
    │   ├── DayTrips.jsx       # Day trip comparison grid
    │   ├── DayTripCard.jsx    # Individual day trip card
    │   ├── Transport.jsx      # Transport & logistics
    │   ├── WeddingDay.jsx     # Wedding day section
    │   ├── PracticalInfo.jsx  # Practical info accordions
    │   └── ui/
    │       ├── StarToggle.jsx     # Favourite star button
    │       ├── BookingStatus.jsx  # Booking status selector
    │       ├── FilterBar.jsx      # Filter pill bar
    │       ├── Accordion.jsx      # Collapsible section
    │       └── MapLink.jsx        # Google Maps link button
    └── hooks/
        └── useLocalStorage.js   # Custom hook for localStorage persistence
```

---

## Data Sources

| Data | Primary source | Supplementary |
|---|---|---|
| Restaurants (ranked, hours, what to order) | `Chat-deep-research-report.md` restaurant ranking + `Gemini-Crema Trip Planning_ Food, Culture, Travel.md` dining directory | `Claude-Crema-tips.md` §3–4, `Perplexity-Crema-Trip Planner (17–24 June 2026).md` §3 |
| Food & dishes | `Chat-deep-research-report.md` food checklist + `Gemini-Crema Trip Planning_ Food, Culture, Travel.md` gastronomy section | Claude §3, Perplexity §2 |
| Day trips | `Chat-deep-research-report.md` day-trip table and "realistic sketch" | Claude day trips table, Perplexity §4/§14, Gemini day-trip matrix |
| Itinerary draft | `Chat-deep-research-report.md` "realistic 17–24 June sketch" | Claude draft day-by-day, Perplexity §13, Gemini master schedule |
| Transport | `Chat-deep-research-report.md` current bus/train/ZTL notes | Claude §5–6, Perplexity §5/§7, Gemini transport guide |
| Wedding logistics | Claude §7 + all docs' shared fixed events | Perplexity §6, Gemini wedding logistics, Chat wedding section |
| Practical info | Chat practical habits + Claude §8–9 | Perplexity §7, Gemini etiquette/weather |
| CMBYN spots (merged) | Claude §2 + Chat "pleasant overlay" recommendation | Gemini cinematic attractions |
| Google Maps terms | Claude map-friendly list + Chat map-friendly short list | Perplexity §15, Gemini address directory |

### Source Conflict Rules
- Do not use a single "Claude wins" rule. Prefer the most current/officially cited source for factual details like opening hours, ZTL rules, route availability, and addresses.
- If sources disagree and the app cannot verify live, keep the conservative action visible: "verify closer to date," "confirm with hosts," or "do not drive into ZTL without permission."
- Preserve disagreement as `sourceNotes` on data objects where it affects planning decisions. Examples: older Crema ZTL summaries versus official ZTL rules, Museo Civico Tuesday afternoon-only opening, Verona by car vs train, and Muschirola/Fuoriporta opening hours.
- For subjective rankings, use Chat-deep-research as the default because it synthesizes the other reports and current checks, but keep alternate recommendations in each card's notes.

---

## Travel Connector Use

Available travel-related connectors should support the app's data verification, not replace the curated source docs.

| Connector | Use for this project | Notes |
|---|---|---|
| TheFork | Restaurant booking/checking, ratings, current booking URLs, photos, short-term opening-hour details for restaurants it lists | Good supplemental source. A broad Crema search returned live coverage, but strict cuisine filters and a trip-date dinner availability search returned no results, so do not treat TheFork absence as "restaurant is closed/bad." |
| Travelenie | Optional personal trip workspace if the user wants a separate interactive travel itinerary outside this app | Do not create or modify a Travelenie trip unless explicitly requested. |
| Apify | One-time structured scraping of specific public pages or search results, especially if we need to batch-check many restaurant/place pages | Use only when source pages are worth scraping at scale. Prefer official pages, Ref/Context7 for coding docs, Exa/You for quick web checks, and TheFork for restaurant booking metadata. |
| Wego / Skyscanner / ixigo | Flights, airport codes, fare checks, and possibly airport cab prompts | Not needed for hotels. Use only if flight/transfer planning becomes part of the scope. |
| Tripadvisor | Hotel-oriented in this session | Skip unless accommodation planning comes back into scope. |

Restaurant data should include optional connector fields such as `theForkUrl`, `theForkRating`, `theForkReviewCount`, `bookingProvider`, and `lastCheckedAt` when available.

---

## Implementation References

Use these as pattern references, not as copy/paste sources.

| Area | Reference | How to reuse |
|---|---|---|
| Multi-container drag-and-drop | [`clauderic/dnd-kit` MultipleContainers story](https://github.com/clauderic/dnd-kit/blob/master/stories/2%20-%20Presets/Sortable/MultipleContainers.tsx) | Best model for the itinerary builder: activity pool + day/time containers, `DndContext`, mouse/touch/keyboard sensors, custom collision logic, drag overlay, and cancel rollback. |
| Safe localStorage hook | [`streamich/react-use` `useLocalStorage`](https://github.com/streamich/react-use/blob/master/src/useLocalStorage.ts) | Good reference for safe JSON parsing, browser checks, remove/reset behavior, and avoiding crashes when storage is unavailable or corrupt. Keep our custom hook small instead of adding the full library. |
| Trip-planner UX ideas | [`Dobidop/easyItinerary`](https://github.com/Dobidop/easyItinerary) | MIT-licensed reference for offline-first trip planning, JSON import/export, resource links, reservations/transport tracking, mobile layout, and optional map ideas. It is vanilla JS, so borrow product patterns rather than architecture. |
| Heavier travel app comparison | [`tworoniak/travel-itinerary-app`](https://github.com/tworoniak/travel-itinerary-app) | Useful as a feature checklist for timeline planning, budget/status fields, empty states, and mobile toolbar patterns, but too backend-heavy for this app's intentionally simple localStorage-only scope. |

Do not add backend/auth/AI dependencies from the reference repos unless the project scope changes. The current app should stay static, local-first, and easy to run.

---

## Proposed Changes

### [NEW] Project scaffold
Vite + React project initialized in the workspace directory with all dependencies.

### [NEW] `src/data/*.js` — 9 data files
All trip content extracted from the four markdown source docs into structured JS objects, with source/provenance notes for conflicting details.

### [NEW] `src/App.css` — Design system
CSS custom properties, glassmorphism utilities, responsive breakpoints, animation keyframes, typography.

### [NEW] `src/components/*.jsx` — ~20 components
All UI components as described in the section breakdown above.

### [NEW] `src/hooks/useLocalStorage.js`
Custom hook for persisting checklists, itinerary state, booking statuses, and favourites.

---

## Verification Plan

### Dev Server
- `npm run dev` — verify all sections render, tab navigation works, responsive layout
- `npm run build` — verify the production bundle succeeds
- `npm run preview` — spot-check the built app

### Functional Testing
- Drag activities between days and from the pool → verify state updates and persists on reload
- Drag with keyboard controls → verify dnd-kit accessibility path works
- Toggle food checklist items → reload → verify persistence
- Set booking statuses and stars → reload → verify persistence
- Click Google Maps links → verify they open correctly
- Test "Reset to Suggested" → verify itinerary reverts
- Resize browser to mobile → verify responsive layout and touch drag

### Content Verification
- Spot-check restaurant data against all four source docs (hours, prices, what to order)
- Verify all Google Maps links use correct search terms
- Check pinned events can't be dragged
- Check warnings trigger for Museo Civico on Monday or Tuesday morning, Linea M on Sunday/holiday and Saturday transfer-sensitive routes, ZTL-sensitive destinations, Pandino Castle outside Fri–Sun public windows, and late-return transit days
- Confirm no plan text still claims only two source docs or that Claude is the universal authority

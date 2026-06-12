import { activityPool, itineraryDays } from '../data/itinerary.js';

const clone = (value) => JSON.parse(JSON.stringify(value));

let itemCounter = 0;

function createItineraryItemId(activityId) {
  if (globalThis.crypto?.randomUUID) {
    return `${activityId}-${globalThis.crypto.randomUUID()}`;
  }
  itemCounter += 1;
  return `${activityId}-${Date.now()}-${itemCounter}`;
}

export function buildInitialItinerary() {
  return clone(itineraryDays);
}

export function resetItinerary() {
  return buildInitialItinerary();
}

export function findActivity(activityId) {
  return activityPool.find((activity) => activity.id === activityId);
}

export function updateItineraryItemStatus(days, itemId, status) {
  let changed = false;

  const nextDays = days.map((day) => ({
    ...day,
    slots: day.slots.map((slot) => ({
      ...slot,
      items: slot.items.map((item) => {
        if (item.id !== itemId || item.locked) {
          return item;
        }

        changed = true;
        const nextItem = { ...item };
        if (status === 'planned') {
          delete nextItem.status;
        } else {
          nextItem.status = status;
        }
        return nextItem;
      }),
    })),
  }));

  return changed ? nextDays : days;
}

export function addActivityToSlot(days, dayId, slotId, activityId) {
  const activity = findActivity(activityId);
  if (!activity) {
    return days;
  }

  const newItem = {
    id: createItineraryItemId(activity.id),
    sourceActivityId: activity.id,
    title: activity.title,
    description: activity.description,
  };

  return days.map((day) =>
    day.id !== dayId
      ? day
      : {
          ...day,
          slots: day.slots.map((slot) =>
            slot.id !== slotId ? slot : { ...slot, items: [...slot.items, newItem] }
          ),
        }
  );
}

export function removeItineraryItem(days, itemId) {
  let removed = false;

  const nextDays = days.map((day) => ({
    ...day,
    slots: day.slots.map((slot) => ({
      ...slot,
      items: slot.items.filter((item) => {
        if (item.id === itemId && !item.locked) {
          removed = true;
          return false;
        }
        return true;
      }),
    })),
  }));

  return removed ? nextDays : days;
}

export function moveItemToNextSlot(days, itemId) {
  const flatSlots = days.flatMap((day) => day.slots.map((slot) => ({ dayId: day.id, slotId: slot.id })));
  let foundItem = null;
  let sourceIndex = -1;

  days.forEach((day) => {
    day.slots.forEach((slot) => {
      const item = slot.items.find((slotItem) => slotItem.id === itemId);
      if (item && !item.locked) {
        foundItem = item;
        sourceIndex = flatSlots.findIndex((entry) => entry.dayId === day.id && entry.slotId === slot.id);
      }
    });
  });

  if (!foundItem || sourceIndex < 0 || sourceIndex >= flatSlots.length - 1) {
    return days;
  }

  const target = flatSlots[sourceIndex + 1];

  return days.map((day) => ({
    ...day,
    slots: day.slots.map((slot) => {
      const withoutItem = slot.items.filter((item) => item.id !== itemId);
      if (day.id === target.dayId && slot.id === target.slotId) {
        return { ...slot, items: [...withoutItem, foundItem] };
      }
      return { ...slot, items: withoutItem };
    }),
  }));
}

export function getItineraryWarnings(day, slot, item) {
  const warnings = [];

  if (item.warning) {
    warnings.push(item.warning);
  }

  const text = `${item.title} ${item.description}`.toLowerCase();

  if (text.includes('museo civico') && day.weekday === 'Monday') {
    warnings.push('Museo Civico is closed Monday.');
  }

  if (text.includes('museo civico') && day.weekday === 'Tuesday' && slot.label === 'Morning') {
    warnings.push('Museo Civico Tuesday availability is afternoon-only in some source notes.');
  }

  if (text.includes('linea m') && day.weekday === 'Sunday') {
    warnings.push('Linea M does not run Sundays or holidays.');
  }

  if (text.includes('pandino') && !['Friday', 'Saturday', 'Sunday'].includes(day.weekday)) {
    warnings.push('Pandino Castle public openings are Friday-Sunday; verify before planning an interior visit.');
  }

  if (['verona', 'brescia', 'garda'].some((place) => text.includes(place))) {
    warnings.push('Recheck official timetables 48-72 hours ahead, especially for late returns.');
  }

  return warnings;
}

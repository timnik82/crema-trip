import { beforeEach } from 'vitest';

function createStorage() {
  const values = new Map();

  return {
    get length() {
      return values.size;
    },
    clear() {
      values.clear();
    },
    getItem(key) {
      const stringKey = String(key);
      return values.has(stringKey) ? values.get(stringKey) : null;
    },
    key(index) {
      return Array.from(values.keys())[index] ?? null;
    },
    removeItem(key) {
      values.delete(String(key));
    },
    setItem(key, value) {
      values.set(String(key), String(value));
    },
  };
}

function ensureLocalStorage() {
  try {
    if (window.localStorage) {
      return;
    }
  } catch {
    // Fall through to the test fallback below.
  }

  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: createStorage(),
  });
}

ensureLocalStorage();

beforeEach(() => {
  window.localStorage.clear();
});

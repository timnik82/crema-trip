import { useCallback, useState } from 'react';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function resolveInitialValue(initialValue) {
  return typeof initialValue === 'function' ? initialValue() : initialValue;
}

function readStorageValue(key, initialValue) {
  if (!canUseStorage()) {
    return resolveInitialValue(initialValue);
  }

  try {
    const stored = window.localStorage.getItem(key);
    return stored === null ? resolveInitialValue(initialValue) : JSON.parse(stored);
  } catch {
    return resolveInitialValue(initialValue);
  }
}

function writeStorageValue(key, value) {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can fail in private browsing or quota-limited contexts.
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorageValue(key, initialValue));

  const setStoredValue = useCallback(
    (nextValue) => {
      setValue((previousValue) => {
        const resolvedValue = typeof nextValue === 'function' ? nextValue(previousValue) : nextValue;
        writeStorageValue(key, resolvedValue);
        return resolvedValue;
      });
    },
    [key]
  );

  const resetStoredValue = useCallback(() => {
    setStoredValue(resolveInitialValue(initialValue));
  }, [initialValue, setStoredValue]);

  return [value, setStoredValue, resetStoredValue];
}

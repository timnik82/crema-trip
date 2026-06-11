import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { useLocalStorage } from './useLocalStorage.js';

function Harness() {
  const [value, setValue] = useLocalStorage('crema:test:key', []);
  return (
    <button type="button" onClick={() => setValue(['saved'])}>
      {value.join(',') || 'empty'}
    </button>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});

test('stores JSON state and reloads it on the next render', () => {
  const first = render(<Harness />);
  first.getByRole('button', { name: 'empty' }).click();
  expect(window.localStorage.getItem('crema:test:key')).toBe(JSON.stringify(['saved']));
  first.unmount();

  render(<Harness />);
  expect(screen.getByRole('button', { name: 'saved' })).toBeInTheDocument();
});

import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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

function LazyHarness({ initialValue }) {
  const [value, setValue] = useLocalStorage('crema:test:lazy', initialValue);
  return (
    <button type="button" onClick={() => setValue(['changed'])}>
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

test('calls function initial values only for first initialization', () => {
  let initializerCalls = 0;
  const initialValue = () => {
    initializerCalls += 1;
    return ['initial'];
  };

  render(<LazyHarness initialValue={initialValue} />);
  expect(screen.getByRole('button', { name: 'initial' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'initial' }));

  expect(screen.getByRole('button', { name: 'changed' })).toBeInTheDocument();
  expect(initializerCalls).toBe(1);
});

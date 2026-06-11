import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, test } from 'vitest';
import App from './App.jsx';

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});

test('renders the MVP guide sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Crema Wedding Trip Explorer/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Itinerary/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Restaurants/i })).toBeInTheDocument();
});

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

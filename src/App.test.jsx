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

test('uses the local hero image fallback when the remote image fails', () => {
  render(<App />);
  const heroImage = screen.getByAltText(/Town Hall in Piazza Duomo, Crema/i);

  fireEvent.error(heroImage);

  expect(heroImage).toHaveAttribute('src', '/crema-hero-fallback.svg');
});

test('saves food checklist state in localStorage', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Mark tortelli cremaschi as tried/i }));
  expect(JSON.parse(window.localStorage.getItem('crema:v1:foodChecklist'))).toContain('tortelli-cremaschi');
  expect(screen.getByRole('button', { name: /Unmark tortelli cremaschi as not tried/i })).toBeInTheDocument();
});

test('saves restaurant booking state in localStorage', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/Booking status for Osteria Muschirola/i), {
    target: { value: 'booked' },
  });
  expect(JSON.parse(window.localStorage.getItem('crema:v1:bookingStatuses'))['osteria-muschirola']).toBe('booked');
});

test('marks the active restaurant filter for assistive tech', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
});

test('keeps the target slot valid when changing itinerary day', () => {
  render(<App />);
  const plannedItems = screen.getAllByTestId('itinerary-card').length;

  fireEvent.change(screen.getByLabelText('Day'), { target: { value: 'thu-18' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add activity' }));

  expect(screen.getAllByTestId('itinerary-card')).toHaveLength(plannedItems + 1);
});

test('renders food checklist when stored checklist data is malformed', () => {
  window.localStorage.setItem('crema:v1:foodChecklist', 'null');
  render(<App />);
  expect(screen.getByRole('button', { name: /Mark tortelli cremaschi as tried/i })).toBeInTheDocument();
});

test('does not reset practical accordions after unrelated state changes', () => {
  render(<App />);
  const firstAccordion = document.querySelector('#practical details');
  expect(firstAccordion).toHaveAttribute('open');

  fireEvent.click(firstAccordion.querySelector('summary'));
  expect(firstAccordion).not.toHaveAttribute('open');

  fireEvent.click(screen.getByRole('button', { name: /Mark tortelli cremaschi as tried/i }));
  expect(firstAccordion).not.toHaveAttribute('open');
});

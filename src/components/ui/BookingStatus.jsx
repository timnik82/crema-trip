export function BookingStatus({ restaurant, value, onChange }) {
  return (
    <label className="field-label">
      <span>Booking</span>
      <select
        aria-label={`Booking status for ${restaurant.name}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="need-to-book">Need to book</option>
        <option value="booked">Booked</option>
        <option value="walk-in">Walk-in</option>
      </select>
    </label>
  );
}

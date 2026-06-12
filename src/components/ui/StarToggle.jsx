export function StarToggle({ active, label, onToggle }) {
  return (
    <button
      type="button"
      className={active ? 'icon-button is-active' : 'icon-button'}
      aria-pressed={active}
      aria-label={`${active ? 'Remove saved place' : 'Save place'} ${label}`}
      onClick={onToggle}
    >
      {active ? 'Saved' : 'Save'}
    </button>
  );
}

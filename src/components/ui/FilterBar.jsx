export function FilterBar({ filters, activeFilter, onChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filters">
      {filters.map((filter) => (
        <button
          type="button"
          key={filter}
          className={activeFilter === filter ? 'filter-pill is-active' : 'filter-pill'}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

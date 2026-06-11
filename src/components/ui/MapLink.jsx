function mapUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function MapLink({ query, label = 'Open map' }) {
  return (
    <a className="map-link" href={mapUrl(query)} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

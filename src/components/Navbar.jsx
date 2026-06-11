import { sectionLinks } from '../data/trip.js';

export function Navbar() {
  return (
    <header className="topbar">
      <a href="#overview" className="brand">
        Crema
      </a>
      <nav aria-label="Primary navigation">
        {sectionLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

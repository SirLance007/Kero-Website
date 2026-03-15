import React from 'react';

export function Header() {
  return (
    <header className="header">
      <div className="brand" style={{ pointerEvents: 'auto' }}>
        KREO
      </div>
      <nav className="nav-links">
        <a href="https://kreo-tech.com/collections/mechanical-keyboards" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Buy Now</a>
      </nav>
    </header>
  );
}

import React, { useState } from 'react';

const NAV_LINKS = [
  { id: 'home',      label: 'Home' },
  { id: 'services',  label: 'Services' },
  { id: 'gallery',   label: 'Gallery' },
  { id: 'about',     label: 'About' },
  { id: 'reviews',   label: 'Reviews' },
  { id: 'faq',       label: 'FAQ' },
  { id: 'contact',   label: 'Contact' },
];

export default function Nav({ page, navigate, scrolled, s, onBook, onCall }) {
  const [open, setOpen] = useState(false);
  const go = (id) => { navigate(id); setOpen(false); };

  return (
    <>
      {/* Nav is position:relative here — the parent #site-header is position:fixed */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-logo grad-text" onClick={() => go('home')}>
            {s.business_name || 'Luxury Barber Culture'}
            <em>Friendswood, TX</em>
          </div>

          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.id} className={page === l.id ? 'active' : ''} onClick={() => go(l.id)}>
                {l.label}
              </a>
            ))}
            <a href={`tel:${s.phone}`} className="nav-phone" onClick={onCall}>
              {s.phone}
            </a>
            <button className="nav-book-btn" onClick={onBook}>Book Now</button>
          </div>

          <button
            className="nav-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile drawer — sits in DOM after header, fixed overlay */}
      {open && (
        <div className="nav-drawer open" aria-modal="true" role="dialog">
          <button className="nav-drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
          {NAV_LINKS.map(l => (
            <a key={l.id} className={page === l.id ? 'active' : ''} onClick={() => go(l.id)}>
              {l.label}
            </a>
          ))}
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <button
              className="btn-primary"
              onClick={() => { onBook(); setOpen(false); }}
              style={{ width: 'fit-content' }}
            >
              Book Appointment →
            </button>
            <a
              href={`tel:${s.phone}`}
              onClick={() => { onCall(); setOpen(false); }}
              style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.08em', color: 'var(--text-dim)' }}
            >
              {s.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

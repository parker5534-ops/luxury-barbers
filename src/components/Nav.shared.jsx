import React, { useState } from 'react';
import { track } from '../lib/api';

export function PromoBanner({ text, onBook }) {
  const [hidden, setHidden] = useState(false);
  if (hidden || !text) return null;
  return (
    <div className="promo-banner">
      <span onClick={onBook} style={{ cursor: 'pointer' }}>{text}</span>
      <button className="close-btn" onClick={() => setHidden(true)} aria-label="Close">×</button>
    </div>
  );
}

export function Footer({ s, navigate, onBook }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" style={{ paddingBottom: 80 }}>
      <div className="footer-inner">
        <div>
          <div className="footer-brand">{s.business_name || 'Luxury Barber Culture'}</div>
          <div className="footer-sub">{s.address}</div>
          <div className="social-row" style={{ marginTop: 12 }}>
            {s.instagram_url && (
              <a href={s.instagram_url} target="_blank" rel="noopener" className="social-btn"
                onClick={() => track('instagram_click', 'footer')}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            )}
            {s.facebook_url && (
              <a href={s.facebook_url} target="_blank" rel="noopener" className="social-btn"
                onClick={() => track('facebook_click', 'footer')}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            )}
            {s.tiktok_url && (
              <a href={s.tiktok_url} target="_blank" rel="noopener" className="social-btn"
                onClick={() => track('tiktok_click', 'footer')}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>Pages</div>
            {['services', 'gallery', 'about', 'reviews', 'faq', 'contact'].map(p => (
              <div key={p} style={{ marginBottom: 10 }}>
                <a onClick={() => navigate(p)} style={{ color: 'var(--text-dim)', fontSize: '0.87rem', cursor: 'pointer', textTransform: 'capitalize' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>{p}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>Contact</div>
            <div style={{ marginBottom: 10 }}>
              <a href={`tel:${s.phone}`} style={{ color: 'var(--text-dim)', fontSize: '0.87rem' }}>{s.phone}</a>
            </div>
            <div style={{ marginBottom: 10 }}>
              <a href={`mailto:${s.email}`} style={{ color: 'var(--text-dim)', fontSize: '0.87rem' }}>{s.email}</a>
            </div>
            <div style={{ marginBottom: 10 }}>
              <button onClick={onBook} style={{ background: 'var(--grad)', color: '#fff', padding: '8px 18px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: 8 }}>Book Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© {year} {s.business_name}. All rights reserved.</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export function MobileBookBar({ onBook, onCall, phone, vagaro_url }) {
  return (
    <div className="mobile-book-bar">
      <a href={`tel:${phone}`} className="mb-call" onClick={onCall}>📞 Call</a>
      <a href={vagaro_url} target="_blank" rel="noopener" className="mb-book" onClick={onBook}>Book Now</a>
    </div>
  );
}

export default PromoBanner;

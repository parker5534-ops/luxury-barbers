import React from 'react';

const IgIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const FbIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TkIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;

export default function Footer({ s, navigate, onBook }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" style={{ paddingBottom: 80 }}>
      <div className="footer-inner">
        <div>
          <div className="footer-brand-name">{s.business_name || 'Luxury Barber Culture'}</div>
          <div className="footer-brand-loc">Friendswood, TX</div>
          <div className="footer-brand-desc">Where culture and luxury collide. Precision grooming in the heart of the Gulf Coast.</div>
          <div className="social-row">
            {s.instagram_url && <a href={s.instagram_url} target="_blank" rel="noopener" className="social-btn"><IgIcon /></a>}
            {s.facebook_url && <a href={s.facebook_url} target="_blank" rel="noopener" className="social-btn"><FbIcon /></a>}
            {s.tiktok_url && <a href={s.tiktok_url} target="_blank" rel="noopener" className="social-btn"><TkIcon /></a>}
          </div>
        </div>
        <div>
          <div className="footer-col-title">Navigation</div>
          <div className="footer-links-list">
            {['services','gallery','about','faq','contact'].map(p => (
              <a key={p} onClick={() => navigate(p)} style={{ textTransform: 'capitalize' }}>{p}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-col-title">Contact</div>
          <div className="footer-links-list">
            <a href={`tel:${s.phone}`}>{s.phone}</a>
            <a href={`mailto:${s.email}`} style={{ fontSize: '0.78rem' }}>{s.email}</a>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`} target="_blank" rel="noopener" style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>{s.address}</a>
          </div>
          <button className="btn-primary" style={{ marginTop: 24 }} onClick={onBook}>Book Now →</button>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© {year} {s.business_name}. All rights reserved.</div>
        <div className="footer-copy">Crafted for culture.</div>
      </div>
    </footer>
  );
}
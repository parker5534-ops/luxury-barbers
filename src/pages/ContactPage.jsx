import React from 'react';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function ContactPage({ data, bookClick }) {
  const s = data.settings;
  const todayIdx = [6, 0, 1, 2, 3, 4, 5][new Date().getDay()];
  const hasBg = !!data.page_backgrounds?.contact;

  return (
    <section
      className={`contact-page-section page-bg-section${hasBg ? ' has-page-bg' : ''}`}
      style={{
        minHeight: '80vh',
        ...(hasBg
          ? { '--page-bg-image': `url("${data.page_backgrounds.contact}")` }
          : {}),
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="section-eyebrow">Get In Touch</div>
        <h1 className="section-headline">Contact <strong>Us</strong></h1>
        <p className="section-body">
          Ready to book or just have a question? Reach out — we'd love to hear from you.
        </p>

        <div className="contact-cols">

          {/* ── Col 1: Book + Direct Contact ── */}
          <div className="contact-col-left">

            {/* Book CTA card */}
            <div className="contact-book-card">
              <div className="contact-book-label">Fastest way to book</div>
              <p className="contact-book-body">
                Book your appointment online 24/7 — no phone call needed.
              </p>
              <button className="btn-primary" onClick={() => bookClick('contact_cta')}>
                Book on Vagaro →
              </button>
            </div>

            {/* Phone */}
            <div className="contact-info-block">
              <div className="contact-info-label">Phone</div>
              <a
                href={`tel:${s.phone}`}
                className="contact-info-value"
                style={{ display: 'block', color: '#fff', fontSize: '1.1rem', fontWeight: 500 }}
              >
                {s.phone}
              </a>
            </div>

            {/* Email */}
            {s.email && (
              <div className="contact-info-block">
                <div className="contact-info-label">Email</div>
                <a
                  href={`mailto:${s.email}`}
                  className="contact-info-value"
                  style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}
                >
                  {s.email}
                </a>
              </div>
            )}

            {/* Address */}
            <div className="contact-info-block">
              <div className="contact-info-label">Address</div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`}
                target="_blank"
                rel="noopener"
                className="contact-info-value"
                style={{ display: 'block', color: '#fff', lineHeight: 1.65, fontSize: '0.95rem' }}
              >
                {s.address}
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`}
                target="_blank"
                rel="noopener"
                className="btn-outline"
                style={{ display: 'inline-flex', marginTop: 16, fontSize: '0.62rem', padding: '11px 22px' }}
              >
                Get Directions →
              </a>
            </div>

            {/* Social */}
            <div className="contact-info-block">
              <div className="contact-info-label" style={{ marginBottom: 12 }}>Follow Us</div>
              <div className="social-row">
                {s.instagram_url && (
                  <a href={s.instagram_url} target="_blank" rel="noopener" className="social-btn">
                    <IgIcon />
                  </a>
                )}
                {s.facebook_url && (
                  <a href={s.facebook_url} target="_blank" rel="noopener" className="social-btn">
                    <FbIcon />
                  </a>
                )}
                {s.tiktok_url && (
                  <a href={s.tiktok_url} target="_blank" rel="noopener" className="social-btn">
                    <TkIcon />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Col 2: Map + Hours ── */}
          <div className="contact-col-right">
            {s.address && (
              <div className="contact-map-wrap">
                <iframe
                  title="Luxury Barber Culture Location"
                  width="100%"
                  height="240"
                  style={{
                    display: 'block',
                    filter: 'invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)',
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(s.address)}&output=embed&z=15`}
                />
              </div>
            )}

            <div className="contact-info-label" style={{ marginBottom: 8 }}>Hours</div>
            <table className="hours-table">
              <tbody>
                {DAYS.map((d, i) => {
                  const hrs = s['hours_' + d] || 'Closed';
                  const isToday = i === todayIdx;
                  return (
                    <tr key={d} className={isToday ? 'hours-today' : ''}>
                      <td style={{ fontWeight: isToday ? 700 : 400 }}>{DAY_LABELS[i]}</td>
                      <td className={hrs === 'Closed' ? 'hours-closed' : ''}>{hrs}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  );
}

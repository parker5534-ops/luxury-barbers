import React from 'react';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const VALUES = ['Precision Over Speed', 'Clean Environment', 'Client-First', 'Culture & Luxury', 'Attention to Detail'];

export default function AboutPage({ data, bookClick }) {
  const s = data.settings;
  const todayIdx = [6, 0, 1, 2, 3, 4, 5][new Date().getDay()];
  const aboutImage = data.about_image || (data.barbers[0]?.photo_url ?? null);
  const hasBg = !!data.page_backgrounds?.about;
  const teamBg = data.home_section_backgrounds?.team;
  const hasTeamBg = !!teamBg;

  return (
    <>
      {/* ═══ HERO / INTRO ═══ */}
      <section
        className={`about-hero-section page-bg-section${hasBg ? ' has-page-bg' : ''}`}
        style={hasBg ? { '--page-bg-image': `url("${data.page_backgrounds.about}")` } : {}}
      >
        <div className="about-hero-inner">
          <div className="section-eyebrow">Our Story</div>
          <h1 className="section-headline">
            About <strong>Luxury Barber Culture</strong>
          </h1>

          {/* Main visual + text split */}
          <div className="about-main-grid">
            {/* Image column */}
            <div className="about-main-image-col">
              {aboutImage ? (
                <div className="about-main-img-wrap">
                  <img src={aboutImage} alt="Luxury Barber Culture" className="about-main-img" />
                  <div className="about-img-badge">
                    <span className="about-img-badge-num">01</span>
                    <span className="about-img-badge-text">Est. in Friendswood, TX</span>
                  </div>
                </div>
              ) : (
                <div className="about-main-img-wrap about-main-img-placeholder">✂</div>
              )}
            </div>

            {/* Text column */}
            <div className="about-main-text-col">
              <p className="about-text-body">
                {s.about_text || 'Luxury Barber Culture was built on the belief that every cut is a statement.'}
              </p>
              <p className="about-text-body">
                Step into our barber shop and experience the artistry of grooming. Alfonso blends modern styles with classic techniques, creating personalized looks that suit your unique taste. Indulge in a relaxing atmosphere where precision meets comfort, ensuring you leave not just groomed, but revitalized.
              </p>
              <p className="about-text-body">
                Every appointment is crafted around you. Your style. Your personality. Your look.
              </p>

              <div className="about-values">
                {VALUES.map(v => (
                  <span key={v} className="about-value-chip">{v}</span>
                ))}
              </div>

              <button
                className="btn-primary"
                style={{ marginTop: 36 }}
                onClick={() => bookClick('about_cta')}
              >
                Book with Alfonso →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      {data.barbers.length > 0 && (
        <section
          className={`barbers-section page-bg-section${hasTeamBg ? ' has-page-bg' : ''}`}
          style={
            hasTeamBg
              ? { '--page-bg-image': `url("${teamBg}")` }
              : {}
          }
        >
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div className="section-eyebrow">The Team</div>
            <h2 className="section-headline">Meet Your <strong>Barber</strong></h2>
            <div className="barbers-grid">
              {data.barbers.map(b => (
                <div key={b.id} className="barber-card">
                  <div className="barber-photo-wrap">
                    {b.photo_url
                      ? <img className="barber-photo-img" src={b.photo_url} alt={b.name} />
                      : <div className="barber-photo-placeholder">✂</div>}
                  </div>
                  <div className="barber-card-info">
                    <div className="barber-card-name">{b.name}</div>
                    <div className="barber-card-title">{b.title}</div>
                    {b.bio && <div className="barber-card-bio">{b.bio}</div>}
                    {b.specialties?.length > 0 && (
                      <div className="barber-tags">
                        {b.specialties.map(sp => (
                          <span key={sp} className="barber-tag">{sp}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ HOURS + LOCATION ═══ */}
      <section className="about-info-section">
        <div className="about-info-inner">

          {/* Hours */}
          <div className="about-info-card">
            <div className="section-eyebrow">Hours</div>
            <h2 className="section-headline about-info-headline">
              When We're <strong>Open</strong>
            </h2>
            <table className="hours-table" style={{ marginTop: 24 }}>
              <tbody>
                {DAYS.map((d, i) => {
                  const hrs = s['hours_' + d] || 'Closed';
                  const isToday = i === todayIdx;
                  return (
                    <tr key={d} className={isToday ? 'hours-today' : ''}>
                      <td style={{ fontWeight: isToday ? 700 : 400 }}>
                        {DAY_LABELS[i]}{isToday && ' ·'}
                      </td>
                      <td className={hrs === 'Closed' ? 'hours-closed' : ''}>{hrs}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Location */}
          <div className="about-info-card">
            <div className="section-eyebrow">Location</div>
            <h2 className="section-headline about-info-headline">
              Find <strong>Us</strong>
            </h2>
            <p className="about-location-addr">{s.address}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`}
              target="_blank"
              rel="noopener"
              className="btn-outline"
              style={{ display: 'inline-flex', marginBottom: 36 }}
            >
              Get Directions →
            </a>

            <div className="about-contact-block">
              <div className="contact-info-label">Phone</div>
              <a
                href={`tel:${s.phone}`}
                style={{ fontSize: '1.1rem', fontWeight: 500, color: '#fff' }}
              >
                {s.phone}
              </a>
            </div>

            {s.email && (
              <div className="about-contact-block">
                <div className="contact-info-label">Email</div>
                <a
                  href={`mailto:${s.email}`}
                  style={{ fontSize: '0.92rem', color: 'var(--text-dim)' }}
                >
                  {s.email}
                </a>
              </div>
            )}

            <div style={{ marginTop: 32 }}>
              <button className="btn-primary" onClick={() => bookClick('about_bottom_cta')}>
                Book an Appointment →
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

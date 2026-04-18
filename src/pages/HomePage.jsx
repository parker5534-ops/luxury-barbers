import React, { useEffect } from 'react';
import { track } from '../lib/api.js';

const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

function todayHours(s) {
  const jsToLbc = [6,0,1,2,3,4,5];
  const key = 'hours_' + DAYS[jsToLbc[new Date().getDay()]];
  return s[key] || '—';
}

const IgIcon  = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const FbIcon  = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TkIcon  = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;

export default function HomePage({ data, navigate, bookClick, callClick }) {
  const s = data.settings;
  const services = data.services.slice(0, 4);
  const todayHrs = todayHours(s);
  const isClosed = todayHrs === 'Closed';

  // Intersection observer for reveal animations
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO — content from admin settings
      ═══════════════════════════════════════ */}
      <section
        className={`hero${s.hero_bg_image ? ' has-bg' : ''}`}
        style={s.hero_bg_image ? { '--hero-bg-img': `url("${s.hero_bg_image}")` } : {}}
      >
        {/* Gradient orbs only show when there's no photo BG */}
        {!s.hero_bg_image && <div className="hero-orb-1" />}
        {!s.hero_bg_image && <div className="hero-orb-2" />}

        <div className="hero-deco-num" aria-hidden="true">LBC</div>
        <div className="hero-vertical-text" aria-hidden="true">Est. Friendswood, TX</div>

        {/* Top padding so content clears the fixed header on first paint */}
        <div style={{ height: 'var(--header-h, 108px)', flexShrink: 0 }} aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-kicker">
            <div className="hero-kicker-line" />
            <span className="hero-kicker-text">
              {(s.hero_kicker_text || 'Premium Barbershop')}
              {' • '}
              {(s.hero_location_text || 'Friendswood, TX')}
            </span>
          </div>

          <h1 className="hero-title">
              <span className="line-italic">
                {s.hero_headline || 'Luxury Cuts.'}
              </span>
          </h1>

          {s.hero_subheadline && (
            <div className="hero-callout">
              <div className="hero-callout-icon">”</div>
              <div className="hero-callout-text">
                {s.hero_subheadline}
              </div>
            </div>
          )}

          <p className="hero-sub">
            Elevate your look with elite barbers. Where culture and luxury collide — every cut, every time.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => bookClick('hero')}>
              Book Appointment
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            {s.instagram_url && (
              <a href={s.instagram_url} target="_blank" rel="noopener"
                className="btn-outline" onClick={() => track('instagram_click','hero')}>
                <IgIcon /> Instagram
              </a>
            )}
            <a href={`tel:${s.phone}`} className="btn-ghost" onClick={() => callClick('hero')}>
              {s.phone} →
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-val" style={{ background:'var(--grad)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                5.0★
              </div>
              <div className="hero-stat-label">Google Rated</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">24/7</div>
              <div className="hero-stat-label">Online Booking</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val" style={{ color: isClosed ? 'var(--red)' : 'var(--teal)', fontSize: '1.3rem' }}>
                {isClosed ? 'Closed' : 'Open'}
              </div>
              <div className="hero-stat-label">{isClosed ? 'Today' : todayHrs}</div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════ */}
      <section className="services-section">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="services-header">
            <div>
              <div className="section-eyebrow">Our Services</div>
              <h2 className="section-headline">
                {s.services_section_title || (
                  <>
                    Premium <strong>Grooming</strong><br />Menu
                  </>
                )}
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="section-body" style={{ maxWidth: 320, textAlign: 'right' }}>
                Every service is precision-crafted to your style. Tailored, not templated.
              </p>
              {data.services.length > 4 && (
                <button className="btn-ghost" style={{ marginTop: 16, marginLeft: 'auto' }} onClick={() => navigate('services')}>
                  View full menu →
                </button>
              )}
            </div>
          </div>

          <div className="services-list">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                className="service-row reveal"
                style={{ transitionDelay: `${i * 0.06}s` }}
                onClick={() => bookClick(`service_${svc.id}`)}
              >
                <div className="service-row-num">0{i + 1}</div>
                <div className="service-row-info">
                  <div className="service-row-name">{svc.name}</div>
                  {svc.description && <div className="service-row-desc">{svc.description}</div>}
                </div>
                <div>
                  <div className="service-row-price">{svc.price}</div>
                  {svc.duration && <div className="service-row-dur">{svc.duration}</div>}
                </div>
                <div className="service-arrow">→</div>
                <div className="service-row-glow" />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => bookClick('services_cta')}>
              Book Now
            </button>
            <button className="btn-outline" onClick={() => navigate('services')}>
              Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TEAM (if barbers with photos)
      ═══════════════════════════════════════ */}
      {data.barbers.length > 0 && (
        <section className="team-section">
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div className="section-eyebrow">The Team</div>
            <h2 className="section-headline">
              Meet Your <strong>Barbers</strong>
            </h2>

            <div className="barbers-grid">
              {data.barbers.map((b, i) => (
                <div key={b.id} className="barber-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
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
                        {b.specialties.map(sp => <span key={sp} className="barber-tag">{sp}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          GALLERY PREVIEW
      ═══════════════════════════════════════ */}
      {data.gallery.length > 0 && (
        <section className="gallery-section">
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div className="section-eyebrow">Portfolio</div>
                <h2 className="section-headline">Our <strong>Work</strong></h2>
              </div>
              <button className="btn-ghost" onClick={() => navigate('gallery')}>View all →</button>
            </div>
            <div className="gallery-grid">
              {data.gallery.slice(0, 6).map((img, i) => (
                <div key={img.id} className="gallery-item" onClick={() => navigate('gallery')}>
                  <img src={img.thumbnail_url || img.url} alt={img.caption || `Work ${i+1}`} loading="lazy" />
                  <div className="gallery-item-overlay" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          REVIEWS
      ═══════════════════════════════════════ */}
      {data.testimonials.length > 0 && (
        <section className="reviews-section">
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div className="section-eyebrow">Client Reviews</div>
                <h2 className="section-headline">
                  What They're <strong>Saying</strong>
                </h2>
              </div>
              <button className="btn-ghost" onClick={() => navigate('reviews')}>All reviews →</button>
            </div>
            <div className="reviews-grid">
              {data.testimonials.slice(0, 3).map((r, i) => (
                <div key={r.id} className="review-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="review-stars">
                    {Array.from({ length: r.rating }).map((_, j) => <span key={j} className="review-star">★</span>)}
                  </div>
                  <div className="review-text">{r.text}</div>
                  <div className="review-footer">
                    <div className="review-avatar">{r.name[0]}</div>
                    <div className="review-name">{r.name}</div>
                    {r.source && <div className="review-source">{r.source}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════ */}
      <section style={{ background: 'var(--ink)', padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,64px)', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '60%', height: '80%', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(74,124,255,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Ready?</div>
          <h2 className="section-headline" style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', marginBottom: 20 }}>
            Book Your <strong>Next Cut</strong>
          </h2>
          <p className="section-body" style={{ margin: '0 auto 40px', textAlign: 'center', maxWidth: 380 }}>
            Walk out looking sharp. Book 24/7 online — no waiting, no phone calls needed.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <button className="btn-primary" onClick={() => bookClick('bottom_cta')} style={{ padding: '17px 40px', fontSize: '0.75rem' }}>
              Book on Vagaro →
            </button>
            <button className="btn-outline" onClick={() => navigate('contact')}>
              Send a Message
            </button>
          </div>
          <div className="social-row" style={{ justifyContent: 'center' }}>
            {s.instagram_url && <a href={s.instagram_url} target="_blank" rel="noopener" className="social-btn" onClick={() => track('instagram_click','cta')}><IgIcon /></a>}
            {s.facebook_url  && <a href={s.facebook_url}  target="_blank" rel="noopener" className="social-btn" onClick={() => track('facebook_click','cta')}><FbIcon /></a>}
            {s.tiktok_url    && <a href={s.tiktok_url}    target="_blank" rel="noopener" className="social-btn" onClick={() => track('tiktok_click','cta')}><TkIcon /></a>}
          </div>
        </div>
      </section>
    </>
  );
}

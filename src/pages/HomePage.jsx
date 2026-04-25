import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function todayHours(s) {
  const jsToLbc = [6, 0, 1, 2, 3, 4, 5];
  const key = 'hours_' + DAYS[jsToLbc[new Date().getDay()]];
  return s[key] || '—';
}

// Helper: only use a bg string if it's a real URL (not a placeholder)
function resolveBg(url) {
  if (!url || typeof url !== 'string') return null;
  if (url.startsWith('YOUR_') || url.trim() === '') return null;
  return url;
}

const IgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FbIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TkIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function HomePage({ data, navigate, bookClick, callClick }) {
  const s = data.settings;
  const hsBg = data.home_section_backgrounds || {};

  // Resolve section backgrounds — only use real URLs
  const servicesBg = resolveBg(hsBg.services);
  const teamBg = resolveBg(hsBg.team);
  const galleryBg = resolveBg(hsBg.gallery);
  const ctaBg = resolveBg(hsBg.cta);
  const heroBg = resolveBg(s.hero_bg_image);

  const services = data.services.slice(0, 4);
  const homeGallerySlides = [...data.gallery]
  .filter(img => img.category !== 'before-after')
  .sort(() => 0.5 - Math.random())
  .slice(0, 9);
  const todayHrs = todayHours(s);
  const isClosed = todayHrs === 'Closed';

  // Intersection observer for reveal animations
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section
        className={`hero${s.hero_bg_image ? ' has-bg' : ''}`}
        style={s.hero_bg_image ? { '--hero-bg-img': `url("${s.hero_bg_image}")` } : {}}
      >
        {!heroBg && <div className="hero-orb-1" />}
        {!heroBg && <div className="hero-orb-2" />}

        {/* Spacer clears the fixed header */}
        <div style={{ height: 'var(--header-h, 108px)', flexShrink: 0 }} aria-hidden="true" />

        <div className="hero-content hero-content-split">

          {/* ROW 1: Title (left) + Logo (right) */}
          <div className="hero-brand-row">
            <h1 className="hero-title">
              <span className="hero-title-top hero-name-gradient">
                {s.hero_headline || 'Luxury Barber'}
              </span>
              <span className="hero-title-bottom hero-name-gradient">
                {s.hero_subheadline || 'Culture'}
              </span>
              <span className="hero-title-glow" />
            </h1>

            {s.logo_url && (
              <div className="hero-logo-wrap">
                <img
                  src={s.logo_url}
                  alt={s.business_name || 'Logo'}
                  className="hero-logo-img"
                />
              </div>
            )}
          </div>

          {/* ROW 2: Book Now */}
          <button className="hero-book-btn" onClick={() => bookClick('hero')}>
            Book Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* ROW 3: Contact pills */}
          <div className="hero-contact-row">
            {s.instagram_url && (
              <a
                href={s.instagram_url}
                target="_blank"
                rel="noopener"
                className="hero-contact-ig"
                aria-label="Instagram"
                onClick={() => {
                  if (window.gtag) {
                    window.gtag('event', 'instagram_click', {
                      event_category: 'engagement',
                      event_label: 'hero'
                    });
                  }
                }}
              >
                <IgIcon />
              </a>
            )}
            <a
              href={`tel:${s.phone}`}
              className="hero-contact-phone"
              onClick={() => callClick('hero')}
            >
              {s.phone}
            </a>
            <span className="hero-contact-sep">—</span>
            <span
              className="hero-contact-status"
              style={{ color: isClosed ? 'var(--red)' : 'var(--teal)' }}
            >
              {isClosed ? 'Closed Today' : `Open · ${todayHrs}`}
            </span>
          </div>

        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </section >

      {/* ═══════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════ */}
      <section
        className={`services-section${servicesBg ? ' has-bg' : ''}`}
        style={servicesBg ? { '--section-bg-img': `url("${servicesBg}")` } : {}}
      >
        {/* Top edge transition */}
        <div className="section-edge-top" aria-hidden="true" />

        <div
          className="lbc-inner"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div className="services-header">
            <div>
              <div className="section-eyebrow">Our Services</div>
              <h2 className="section-headline">
                {s.services_section_title || (
                  <>Premium <strong>Grooming</strong><br />Menu</>
                )}
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="section-body" style={{ maxWidth: 320, textAlign: 'right' }}>
                Every service is precision-crafted to your style. Tailored, not templated.
              </p>
              {data.services.length > 4 && (
                <button
                  className="btn-ghost"
                  style={{ marginTop: 16, marginLeft: 'auto' }}
                  onClick={() => navigate('services')}
                >
                  View full menu →
                </button>
              )}
            </div>
          </div>

          <div className={`services-list${servicesBg ? ' on-bg' : ''}`}>
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

        <div className="section-edge-bottom" aria-hidden="true" />
      </section >

      {/* ═══════════════════════════════════════
          TEAM
      ═══════════════════════════════════════ */}
      {
        data.barbers.length > 0 && (
          <section
            className={`team-section${teamBg ? ' has-bg' : ''}`}
            style={teamBg ? { '--section-bg-img': `url("${teamBg}")` } : {}}
          >
            <div className="section-edge-top" aria-hidden="true" />

            <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div className="section-eyebrow">The Team</div>
              <h2 className="section-headline">Meet Your <strong>Barber</strong></h2>

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

            <div className="section-edge-bottom" aria-hidden="true" />
          </section>
        )
      }

      {/* ═══════════════════════════════════════
          GALLERY PREVIEW
      ═══════════════════════════════════════ */}
      {
        homeGallerySlides.length > 0 && (
          <section
            className={`home-gallery-section${galleryBg ? ' has-bg' : ''}`}
            style={galleryBg ? { '--section-bg-img': `url("${galleryBg}")` } : {}}
          >
            <div className="section-edge-top" aria-hidden="true" />

            <div className="home-gallery-inner" style={{ position: 'relative', zIndex: 1 }}>
              <div className="home-gallery-header">
                <div>
                  <div className="section-eyebrow">Portfolio</div>
                  <h2 className="section-headline">Our <strong>Work</strong></h2>
                </div>
                <button className="btn-ghost" onClick={() => navigate('gallery')}>
                  View all →
                </button>
              </div>

              {/* 3-up desktop / 1-up mobile — gallery logic unchanged */}
              <Swiper
                className="home-gallery-swiper"
                modules={[Autoplay, Pagination]}
                spaceBetween={16}
                slidesPerView={1.08}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                  0: {
                    slidesPerView: 1.08,
                    spaceBetween: 14,
                  },
                  640: {
                    slidesPerView: 1.25,
                    spaceBetween: 16,
                  },
                  900: {
                    slidesPerView: 2.1,
                    spaceBetween: 18,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                  },
                }}
              >
                {homeGallerySlides.map((img, i) => (
                  <SwiperSlide key={img.id || i}>
                    <div
                      className="home-gallery-card"
                      onClick={() => navigate('gallery')}
                    >
                      <img
                        src={img.url || img.thumbnail_url}
                        alt={img.caption || `Work ${i + 1}`}
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="section-edge-bottom" aria-hidden="true" />
          </section>
        )
      }

      {/* ═══════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════ */}
      <section
        className={`cta-section${ctaBg ? ' has-bg' : ''}`}
        style={ctaBg ? { '--section-bg-img': `url("${ctaBg}")` } : {}}
      >
        {/* Centered radial glow */}
        <div className="cta-glow" aria-hidden="true" />

        <div className="cta-inner">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Ready?</div>
          <h2 className="section-headline" style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', marginBottom: 20 }}>
            Book Your <strong>Next Cut</strong>
          </h2>
          <p className="section-body" style={{ margin: '0 auto 40px', textAlign: 'center', maxWidth: 380 }}>
            Walk out looking sharp. Book 24/7 online — no waiting, no phone calls needed.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <button
              className="btn-primary"
              onClick={() => bookClick('bottom_cta')}
              style={{ padding: '17px 40px', fontSize: '0.75rem' }}
            >
              Book on Vagaro →
            </button>
            <button className="btn-outline" onClick={() => navigate('contact')}>
              Send a Message
            </button>
          </div>
          <div className="social-row" style={{ justifyContent: 'center' }}>
            {s.instagram_url && (
              <a
                href={s.instagram_url}
                target="_blank"
                rel="noopener"
                className="social-btn"
                onClick={() => {
                  if (window.gtag) {
                    window.gtag('event', 'instagram_click', {
                      event_category: 'engagement',
                      event_label: 'bottom_cta'
                    });
                  }
                }}
              >
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
      </section>
    </>
  );
}

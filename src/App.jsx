import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSiteContent } from './hooks/useSiteContent.js';
import { track } from './lib/api.js';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import MobileBookBar from './components/MobileBookBar.jsx';
import PromoBanner from './components/PromoBanner.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { data, loading } = useSiteContent();
  const s = data.settings;
  const headerRef = useRef(null);

  // Inject SEO meta tags from admin settings whenever they change
  useEffect(() => {
    // Page title
    const title = s.seo_title || `${s.business_name || 'Luxury Barber Culture'} | Friendswood, TX`;
    document.title = title;

    // Meta description
    const desc = s.seo_description || 'Precision haircuts, beard sculpting, and top-tier grooming in Friendswood, TX. Book online 24/7 via Vagaro.';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;

    // OG tags
    const setOg = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el); }
      el.content = content;
    };
    setOg('og:title', title);
    setOg('og:description', desc);
    setOg('og:type', 'website');
    if (s.hero_bg_image) setOg('og:image', s.hero_bg_image);
  }, [s.seo_title, s.seo_description, s.business_name, s.hero_bg_image]);

  // Track scroll for nav glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Measure the fixed header (promo + nav) and expose height as CSS var.
  // Every non-hero page reads --header-h for its top padding.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty('--header-h', el.offsetHeight + 'px');
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [s.promo_text]); // re-measure if banner appears/disappears

  const navigate = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
    track('page_view', p);
  }, []);

  const bookClick = useCallback((source) => {
    track('book_click', source);
    window.open(s.vagaro_url || '#', '_blank', 'noopener');
  }, [s.vagaro_url]);

  const callClick = useCallback((source) => {
    track('call_click', source);
  }, []);

  const renderPage = () => {
    const props = { data, navigate, bookClick, callClick };
    switch (page) {
      case 'home':     return <HomePage {...props} />;
      case 'services': return <ServicesPage {...props} />;
      case 'gallery':  return <GalleryPage {...props} />;
      case 'about':    return <AboutPage {...props} />;
      case 'reviews':  return <ReviewsPage {...props} />;
      case 'faq':      return <FaqPage {...props} />;
      case 'contact':  return <ContactPage {...props} />;
      default:         return <HomePage {...props} />;
    }
  };

  return (
    <>
      {/* Single fixed header wrapper — promo banner + nav live together here.
          This eliminates the overlap bug where nav (fixed top:0) covered the banner. */}
      <div id="site-header" ref={headerRef} className="site-header">
        <PromoBanner text={s.promo_text} onBook={() => bookClick('promo_banner')} />
        <Nav
          page={page}
          navigate={navigate}
          scrolled={scrolled}
          s={s}
          onBook={() => bookClick('nav')}
          onCall={() => callClick('nav')}
        />
      </div>

      {/* Non-hero pages need top padding equal to the fixed header height.
          Hero page manages its own full-viewport height. */}
      <main
        key={page}
        className="page-fade"
        style={{ paddingTop: page === 'home' ? 0 : 'var(--header-h, 108px)' }}
      >
        {loading
          ? <div className="loading-wrap" style={{ minHeight: '100vh' }}><div className="spinner" /></div>
          : renderPage()}
      </main>

      <Footer s={s} navigate={navigate} onBook={() => bookClick('footer')} />
      <MobileBookBar
        onBook={() => bookClick('mobile_bar')}
        onCall={() => callClick('mobile_bar')}
        phone={s.phone}
      />
    </>
  );
}

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { siteData } from './data/siteData.js';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import MobileBookBar from './components/MobileBookBar.jsx';
import PromoBanner from './components/PromoBanner.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const data = siteData;
  const s = data.settings;
  const headerRef = useRef(null);

  // Inject SEO meta tags from settings
  useEffect(() => {
    const title = s.seo_title || `${s.business_name || 'Luxury Barber Culture'} | Friendswood, TX`;
    document.title = title;

    const desc =
      s.seo_description ||
      'Precision haircuts, beard sculpting, and top-tier grooming in Friendswood, TX. Book online 24/7 via Vagaro.';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;

    const setOg = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', prop);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setOg('og:title', title);
    setOg('og:description', desc);
    setOg('og:type', 'website');
    if (s.hero_bg_image) setOg('og:image', s.hero_bg_image);
  }, []);

  // Track scroll for nav glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Measure the fixed header and expose height as CSS var
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
  }, []);

useEffect(() => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: page,
      page_location: window.location.href,
      page_path: `/${page}`
    });
  }
}, [page]);

  const navigate = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const bookClick = useCallback((location = 'unknown') => {
  if (window.gtag) {
    window.gtag('event', 'book_now_click', {
      event_category: 'engagement',
      event_label: location
    });
  }

  window.open(s.vagaro_url || '#', '_blank', 'noopener');
}, [s.vagaro_url]);

  const callClick = useCallback((location = 'unknown') => {
  if (window.gtag) {
    window.gtag('event', 'call_click', {
      event_category: 'engagement',
      event_label: location
    });
  }
}, []);

  const renderPage = () => {
    const props = { data, navigate, bookClick, callClick };
    switch (page) {
      case 'home':     return <HomePage {...props} />;
      case 'services': return <ServicesPage {...props} />;
      case 'gallery':  return <GalleryPage {...props} />;
      case 'about':    return <AboutPage {...props} />;
      case 'faq':      return <FaqPage {...props} />;
      case 'contact':  return <ContactPage {...props} />;
      default:         return <HomePage {...props} />;
    }
  };

  return (
    <>
      <div id="site-header" ref={headerRef} className="site-header">
        <PromoBanner text={s.promo_text} onBook={bookClick} />
        <Nav
          page={page}
          navigate={navigate}
          scrolled={scrolled}
          s={s}
          onBook={bookClick}
          onCall={callClick}
        />
      </div>

      <main
        key={page}
        className="page-fade"
        style={{ paddingTop: page === 'home' ? 0 : 'var(--header-h, 108px)' }}
      >
        {renderPage()}
      </main>

      <Footer s={s} navigate={navigate} onBook={bookClick} />
      <MobileBookBar
        onBook={bookClick}
        onCall={callClick}
        phone={s.phone}
      />
    </>
  );
}

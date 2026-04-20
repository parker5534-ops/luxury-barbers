import React, { useState } from 'react';

const CATS = [
  { id: 'all', label: 'All' },
  { id: 'haircut', label: 'Haircuts' },
  { id: 'beard', label: 'Beard' },
  { id: 'fade', label: 'Fades' },
];

export default function GalleryPage({ data, bookClick }) {
  const [cat, setCat] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const hasBg = !!data.page_backgrounds?.gallery;
  const imgs = cat === 'all' ? data.gallery : data.gallery.filter(g => g.category === cat);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight')
        setLightbox(l => (l !== null ? Math.min(imgs.length - 1, l + 1) : l));
      if (e.key === 'ArrowLeft')
        setLightbox(l => (l !== null ? Math.max(0, l - 1) : l));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [imgs.length]);

  return (
    <section
      className={`gallery-page-section page-bg-section${hasBg ? ' has-page-bg' : ''}`}
      style={{
        minHeight: '80vh',
        ...(hasBg
          ? { '--page-bg-image': `url("${data.page_backgrounds.gallery}")` }
          : {}),
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="section-eyebrow">Portfolio</div>
        <h1 className="section-headline">Our <strong>Work</strong></h1>
        <p className="section-body" style={{ marginBottom: 40 }}>
          Every photo is a story of precision, culture, and craft.
        </p>

        <div className="gallery-filter">
          {CATS.map(c => (
            <button
              key={c.id}
              className={`gallery-filter-btn${cat === c.id ? ' active' : ''}`}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {imgs.length === 0 ? (
          <div className="gallery-empty">
            <p style={{ marginBottom: 16 }}>Gallery coming soon.</p>
            {data.settings.instagram_url && (
              <a
                href={data.settings.instagram_url}
                target="_blank"
                rel="noopener"
                className="btn-outline"
                style={{ display: 'inline-flex' }}
              >
                Follow us on Instagram →
              </a>
            )}
          </div>
        ) : (
          <div className="gallery-grid">
            {imgs.map((img, i) => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.thumbnail_url || img.url}
                  alt={img.caption || `Work ${i + 1}`}
                  loading="lazy"
                />
                <div className="gallery-item-overlay" />
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <button className="btn-primary" onClick={() => bookClick('gallery_cta')}>
            Book Your Appointment →
          </button>
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button
            className="lightbox-btn prev"
            onClick={e => {
              e.stopPropagation();
              setLightbox(l => Math.max(0, l - 1));
            }}
          >
            ‹
          </button>
          <img
            className="lightbox-img"
            src={imgs[lightbox].url}
            alt={imgs[lightbox].caption || ''}
            onClick={e => e.stopPropagation()}
          />
          <button
            className="lightbox-btn next"
            onClick={e => {
              e.stopPropagation();
              setLightbox(l => Math.min(imgs.length - 1, l + 1));
            }}
          >
            ›
          </button>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            ×
          </button>
        </div>
      )}
    </section>
  );
}

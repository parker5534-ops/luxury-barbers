import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const CATS = [
  { id: 'all', label: 'All' },
  { id: 'haircut', label: 'Haircuts' },
  { id: 'beard', label: 'Beard' },
  { id: 'fade', label: 'Fades' },
  { id: 'design', label: 'Designs' },
  { id: 'before-after', label: 'Before/After' },
];

function BeforeAfterSlider({ before, after, caption }) {
  const [pos, setPos] = React.useState(50);
  const ref = React.useRef(null);

  const move = (clientX) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;

    const x = clientX - box.left;
    const percent = Math.max(0, Math.min(100, (x / box.width) * 100));
    setPos(percent);
  };

  const handlePointerMove = (e) => {
    if (e.buttons !== 1 && e.pointerType === 'mouse') return;
    move(e.clientX);
  };

  return (
    <div
      ref={ref}
      className="before-after-slider"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        handlePointerMove(e);
      }}
    >
      <img src={before} alt={`Before ${caption || ''}`} className="ba-img" draggable="false" />
      <img
        src={after}
        alt={`After ${caption || ''}`}
        className="ba-img ba-after"
        draggable="false"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <div className="ba-label ba-label-before">Before</div>
      <div className="ba-label ba-label-after">After</div>

      <div className="ba-line" style={{ left: `${pos}%` }} />
      <div className="ba-handle" style={{ left: `${pos}%` }}>↔</div>
    </div>
  );
}

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

  React.useEffect(() => {
    if (lightbox !== null) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
    }

    return () => {
      document.body.classList.remove('lightbox-open');
    };
  }, [lightbox]);

  const openLightbox = (index) => {
    setLightbox(index);
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const activeImg = lightbox !== null ? imgs[lightbox] : null;

  const touchStartX = React.useRef(null);

  const handleLightboxTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleLightboxTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setLightbox(l => Math.min(imgs.length - 1, l + 1));
      } else {
        setLightbox(l => Math.max(0, l - 1));
      }
    }

    touchStartX.current = null;
  };

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
                rel="noopener noreferrer"
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
                onClick={() => openLightbox(i)}
              >
                {img.category === 'before-after' && img.before && img.after ? (
                  <div className="gallery-before-after-preview">
                    <BeforeAfterSlider
                      before={img.before}
                      after={img.after}
                      caption={img.caption}
                    />
                  </div>
                ) : (
                  <img
                    src={img.thumbnail_url || img.url}
                    alt={img.caption || `Work ${i + 1}`}
                    loading="lazy"
                  />
                )}
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

      {activeImg &&
  ReactDOM.createPortal(
    <div
      className="gallery-lightbox"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeLightbox();
        }
      }}
      onTouchStart={handleLightboxTouchStart}
      onTouchEnd={handleLightboxTouchEnd}
    >
      <button
        type="button"
        className="gallery-lightbox-close"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          closeLightbox();
        }}
      >
        ×
      </button>

      <button
        type="button"
        className="gallery-lightbox-btn gallery-lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          setLightbox(l => Math.max(0, l - 1));
        }}
      >
        ‹
      </button>

      <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
        {activeImg.category === 'before-after' && activeImg.before && activeImg.after ? (
          <BeforeAfterSlider
            before={activeImg.before}
            after={activeImg.after}
            caption={activeImg.caption}
          />
        ) : (
          <img
            className="gallery-lightbox-img"
            src={activeImg.url}
            alt={activeImg.caption || ''}
          />
        )}
      </div>

      <button
        type="button"
        className="gallery-lightbox-btn gallery-lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          setLightbox(l => Math.min(imgs.length - 1, l + 1));
        }}
      >
        ›
      </button>
    </div>,
    document.body
  )}
    </section>
  );
}
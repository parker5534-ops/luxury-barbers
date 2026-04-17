import React, { useState } from 'react';

const CATS = [
  { id:'all',label:'All' }, { id:'haircut',label:'Haircuts' },
  { id:'beard',label:'Beard' }, { id:'combo',label:'Combos' },
];

const DEFAULT_POLICY = `We require at least 1 hour notice for cancellations or rescheduling. Late cancellations or no-shows may be charged a fee. We respect your time — please respect ours. Thank you for your understanding.`;

export default function ServicesPage({ data, bookClick, navigate }) {
  const [cat, setCat] = useState('all');
  const s = data.settings;
  const services = cat === 'all' ? data.services : data.services.filter(sv => sv.category === cat);
  const policy = s.cancellation_policy || DEFAULT_POLICY;

  return (
    <section className="services-section" style={{ minHeight: '80vh' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="section-eyebrow">Services</div>
        <h1 className="section-headline">Our <strong>Full Menu</strong></h1>
        <p className="section-body" style={{ marginBottom: 40 }}>Precision crafted, every time. No rushing — just results.</p>

        {/* Category filter */}
        <div style={{ display:'flex', gap:0, border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:4, width:'fit-content', marginBottom:48 }}>
          {CATS.map(c => (
            <button
              key={c.id}
              style={{
                fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '8px 18px', borderRadius: 7, cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                background: cat === c.id ? 'var(--grad)' : 'none',
                color: cat === c.id ? '#fff' : 'var(--text-muted)',
              }}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Service list */}
        <div className="services-list">
          {services.map((svc, i) => (
            <div key={svc.id} className="service-row" onClick={() => bookClick(`service_${svc.id}`)}>
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
          {services.length === 0 && (
            <div style={{ padding: '48px 0', color: 'var(--text-muted)', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>
              No services in this category.
            </div>
          )}
        </div>

        {/* Book CTA */}
        <div style={{ marginTop: 56, padding: 40, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 300, marginBottom: 12 }}>
            Ready to look <strong style={{ fontWeight: 600 }}>sharp?</strong>
          </h3>
          <p style={{ color: 'var(--text-dim)', marginBottom: 28, fontSize: '0.92rem' }}>
            Book your appointment online 24/7 — no phone call needed.
          </p>
          <button className="btn-primary" onClick={() => bookClick('services_bottom')}>
            Book Now on Vagaro →
          </button>
        </div>

        {/* ── Cancellation & No-Show Policy ── */}
        <div style={{ marginTop: 48, padding: '32px 36px', background: 'rgba(224,85,85,0.04)', border: '1px solid rgba(224,85,85,0.14)', borderRadius: 'var(--radius)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--teal), var(--blue))',
              flexShrink: 0,
            }} />
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Cancellation &amp; No-Show Policy
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: 680 }}>
            {policy}
          </p>
        </div>
      </div>
    </section>
  );
}

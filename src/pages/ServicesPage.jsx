import React from 'react';

const DEFAULT_POLICY = `We require at least 1 hour notice for cancellations or rescheduling. Late cancellations or no-shows may be charged a fee. We respect your time — please respect ours. Thank you for your understanding.`;

export default function ServicesPage({ data, bookClick, navigate }) {
  const s = data.settings;
  const policy = s.cancellation_policy || DEFAULT_POLICY;
  const hasBg = !!data.page_backgrounds?.services;
  const mainServices = data.services.filter(s => s.type !== 'addon');
  const addons = data.services.filter(s => s.type === 'addon');

  return (
    <section
      className={`services-page-section page-bg-section${hasBg ? ' has-page-bg' : ''}`}
      style={{
        minHeight: '80vh',
        ...(hasBg
          ? { '--page-bg-image': `url("${data.page_backgrounds.services}")` }
          : {}),
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="section-eyebrow">Services</div>
        <h1 className="section-headline">Our <strong>Full Menu</strong></h1>
        <p className="section-body" style={{ marginBottom: 28 }}>
          Precision crafted, every time. No rushing — just results.
        </p>

        {/* Main service list */}
        <div className={`services-list${hasBg ? ' on-bg' : ''}`}>
          {mainServices.map((svc, i) => (
            <div
              key={svc.id}
              className="service-row"
              onClick={() => bookClick(`service_${svc.id}`)}
            >
              <div className="service-row-num">0{i + 1}</div>
              <div className="service-row-info">
                <div className="service-row-name">{svc.name}</div>
                {svc.description && (
                  <div className="service-row-desc">{svc.description}</div>
                )}
              </div>
              <div>
                <div className="service-row-price">{svc.price}</div>
                {svc.duration && (
                  <div className="service-row-dur">{svc.duration}</div>
                )}
              </div>
              <div className="service-arrow">→</div>
              <div className="service-row-glow" />
            </div>
          ))}

          {mainServices.length === 0 && (
            <div
              style={{
                padding: '48px 0',
                color: 'var(--text-muted)',
                fontFamily: 'var(--mono)',
                fontSize: '0.8rem',
              }}
            >
              No services available right now.
            </div>
          )}
        </div>

        {/* Optional Add-Ons */}
        {addons.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <div className="section-eyebrow">Optional</div>
            <h2 className="section-headline" style={{ marginBottom: 16 }}>
              Add-Ons
            </h2>
            <p className="section-body" style={{ marginBottom: 24 }}>
              Upgrade your service with premium add-ons.
            </p>

            <div className={`services-list${hasBg ? ' on-bg' : ''}`}>
              {addons.map((svc) => (
                <div
                  key={svc.id}
                  className="service-row addon"
                  onClick={() => bookClick(`addon_${svc.id}`)}
                >
                  <div className="service-row-info">
                    <div className="service-row-name">{svc.name}</div>
                    {svc.description && (
                      <div className="service-row-desc">{svc.description}</div>
                    )}
                  </div>

                  <div>
                    <div className="service-row-price">{svc.price}</div>
                    {svc.duration && (
                      <div className="service-row-dur">{svc.duration}</div>
                    )}
                  </div>

                  <div className="service-arrow">+</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Book CTA */}
        <div className="services-cta-box">
          <h3 className="services-cta-headline">
            Ready to look <strong>sharp?</strong>
          </h3>
          <p className="services-cta-body">
            Book your appointment online 24/7 — no phone call needed.
          </p>
          <button className="btn-primary" onClick={() => bookClick('services_bottom')}>
            Book Now on Vagaro →
          </button>
        </div>

        {/* Policy */}
        <div className="services-policy-box">
          <div className="services-policy-label-row">
            <div className="services-policy-dot" />
            <div className="services-policy-label">
              Cancellation &amp; No-Show Policy
            </div>
          </div>
          <p className="services-policy-text">{policy}</p>
        </div>
      </div>
    </section>
  );
}

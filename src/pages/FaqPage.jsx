import React, { useState } from 'react';

export default function FaqPage({ data, bookClick }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="faq-section" style={{ minHeight:'80vh' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
        <div className="section-eyebrow">FAQ</div>
        <h1 className="section-headline">Frequently Asked <strong>Questions</strong></h1>
        <p className="section-body">Everything you need to know before your visit.</p>
        <div className="faq-list">
          {data.faqs.map(faq => (
            <div key={faq.id} className="faq-item">
              <button className="faq-q-btn" onClick={() => setOpen(o => o===faq.id ? null : faq.id)}>
                <span>{faq.question}</span>
                <span className={`faq-q-icon${open===faq.id?' open':''}`}>+</span>
              </button>
              <div className={`faq-a${open===faq.id?' open':''}`}>
                <div className="faq-a-inner">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:64 }}>
          <p style={{ color:'var(--text-dim)', marginBottom:20, fontFamily:'var(--mono)', fontSize:'0.72rem', letterSpacing:'0.08em' }}>Still have questions?</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn-primary" onClick={() => bookClick('faq_cta')}>Book Now →</button>
            <a href={`tel:${data.settings.phone}`} className="btn-outline">Call Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}

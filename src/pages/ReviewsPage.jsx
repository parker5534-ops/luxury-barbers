import React from 'react';

export default function ReviewsPage({ data, bookClick }) {
  const avg = data.testimonials.length
    ? (data.testimonials.reduce((a,t)=>a+t.rating,0)/data.testimonials.length).toFixed(1)
    : '5.0';

  return (
    <section className="reviews-section" style={{ minHeight:'80vh' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
        <div className="section-eyebrow">Client Reviews</div>
        <h1 className="section-headline">What People <strong>Are Saying</strong></h1>

        <div style={{ display:'flex', gap:32, alignItems:'center', margin:'40px 0 52px', flexWrap:'wrap' }}>
          <div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'4.5rem', fontWeight:600, lineHeight:1, background:'var(--grad)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{avg}</div>
            <div style={{ display:'flex', gap:3, margin:'8px 0 4px' }}>
              {[1,2,3,4,5].map(i=><span key={i} style={{ color:'var(--gold)', fontSize:'0.9rem' }}>★</span>)}
            </div>
            <div style={{ fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.12em', color:'var(--text-muted)', textTransform:'uppercase' }}>{data.testimonials.length} reviews</div>
          </div>
          <div style={{ height:80, width:1, background:'var(--border)' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[5,4,3].map(r => {
              const count = data.testimonials.filter(t=>t.rating===r).length;
              const pct = data.testimonials.length ? (count/data.testimonials.length)*100 : 0;
              return (
                <div key={r} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ fontFamily:'var(--mono)', fontSize:'0.65rem', color:'var(--text-dim)', width:24 }}>{r}★</span>
                  <div style={{ width:160, height:4, background:'var(--border)', borderRadius:2 }}>
                    <div style={{ width:`${pct}%`, height:'100%', background:'var(--grad)', borderRadius:2 }} />
                  </div>
                  <span style={{ fontFamily:'var(--mono)', fontSize:'0.6rem', color:'var(--text-muted)' }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reviews-grid">
          {data.testimonials.map((r,i) => (
            <div key={r.id} className="review-card reveal" style={{ transitionDelay:`${i*0.08}s` }}>
              <div className="review-stars">{Array.from({length:5}).map((_,j)=><span key={j} className="review-star" style={{ opacity:j<r.rating?1:0.18 }}>★</span>)}</div>
              <div className="review-text">{r.text}</div>
              <div className="review-footer">
                <div className="review-avatar">{r.name[0]}</div>
                <div className="review-name">{r.name}</div>
                {r.source && <div className="review-source">{r.source}</div>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:64, padding:40, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)' }}>
          <h3 style={{ fontFamily:'var(--serif)', fontSize:'2rem', fontWeight:300, marginBottom:12 }}>Experience it <strong style={{ fontWeight:600 }}>yourself</strong></h3>
          <button className="btn-primary" style={{ marginTop:16 }} onClick={() => bookClick('reviews_cta')}>Book Your Appointment →</button>
        </div>
      </div>
    </section>
  );
}

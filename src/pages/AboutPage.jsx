import React from 'react';

const DAYS=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
const DAY_LABELS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const VALUES=['Precision Over Speed','Clean Environment','Client-First','Culture & Luxury','Attention to Detail'];

export default function AboutPage({ data, bookClick }) {
  const s = data.settings;
  const todayIdx = [6,0,1,2,3,4,5][new Date().getDay()];
  return (
    <>
      <section className="about-section">
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
          <div className="section-eyebrow">Our Story</div>
          <h1 className="section-headline">About <strong>Luxury Barber Culture</strong></h1>
          <div className="about-grid">
            <div className="about-photo-wrap">
              {data.barbers[0]?.photo_url
                ? <img src={data.barbers[0].photo_url} alt={data.barbers[0].name}/>
                : <div className="about-photo-placeholder">✂</div>}
            </div>
            <div>
              <p className="about-text-body">{s.about_text || 'Luxury Barber Culture was built on the belief that every cut is a statement.'}</p>
              <p className="about-text-body">Located in Friendswood, TX, we bring top-tier grooming to the Gulf Coast — a clean, upscale environment where precision meets culture.</p>
              <p className="about-text-body">Every appointment is crafted around you. Your style. Your personality. Your look.</p>
              <div className="about-values">
                {VALUES.map(v => <span key={v} className="about-value-chip">{v}</span>)}
              </div>
              <button className="btn-primary" style={{ marginTop:32 }} onClick={() => bookClick('about_cta')}>Book with Alfonso →</button>
            </div>
          </div>
        </div>
      </section>

      {data.barbers.length > 0 && (
        <section className="team-section" style={{ background:'var(--ink)' }}>
          <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
            <div className="section-eyebrow">The Team</div>
            <h2 className="section-headline">Meet Your <strong>Barbers</strong></h2>
            <div className="barbers-grid">
              {data.barbers.map(b => (
                <div key={b.id} className="barber-card">
                  <div className="barber-photo-wrap">
                    {b.photo_url ? <img className="barber-photo-img" src={b.photo_url} alt={b.name}/> : <div className="barber-photo-placeholder">✂</div>}
                  </div>
                  <div className="barber-card-info">
                    <div className="barber-card-name">{b.name}</div>
                    <div className="barber-card-title">{b.title}</div>
                    {b.bio && <div className="barber-card-bio">{b.bio}</div>}
                    {b.specialties?.length > 0 && <div className="barber-tags">{b.specialties.map(sp=><span key={sp} className="barber-tag">{sp}</span>)}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding:'clamp(80px,10vw,140px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(40px,6vw,80px)' }}>
          <div>
            <div className="section-eyebrow">Hours</div>
            <h2 className="section-headline" style={{ fontSize:'2.4rem' }}>When We're <strong>Open</strong></h2>
            <table className="hours-table" style={{ marginTop:24 }}>
              <tbody>
                {DAYS.map((d,i) => {
                  const hrs = s['hours_'+d] || 'Closed';
                  const isToday = i === todayIdx;
                  return (
                    <tr key={d} className={isToday ? 'hours-today' : ''}>
                      <td style={{ fontWeight: isToday?700:400 }}>{DAY_LABELS[i]}{isToday && ' ·'}</td>
                      <td className={hrs==='Closed'?'hours-closed':''}>{hrs}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <div className="section-eyebrow">Location</div>
            <h2 className="section-headline" style={{ fontSize:'2.4rem' }}>Find <strong>Us</strong></h2>
            <p style={{ color:'var(--text-dim)', marginBottom:24, lineHeight:1.8 }}>{s.address}</p>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`} target="_blank" rel="noopener" className="btn-outline" style={{ display:'inline-flex', marginBottom:32 }}>Get Directions →</a>
            <div style={{ marginTop:8 }}>
              <div className="contact-info-label" style={{ marginBottom:8 }}>Phone</div>
              <a href={`tel:${s.phone}`} style={{ fontSize:'1.1rem', fontWeight:500, color:'#fff' }}>{s.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

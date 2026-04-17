import React, { useState } from 'react';
import { submitLead, track } from '../lib/api.js';

const DAYS=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
const DAY_LABELS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const IgIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const FbIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TkIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;

export default function ContactPage({ data, bookClick }) {
  const s = data.settings;
  const todayIdx = [6,0,1,2,3,4,5][new Date().getDay()];
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [status, setStatus] = useState('idle');
  const update = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    setStatus('loading');
    try {
      await submitLead({...form, source:'contact_form'});
      track('form_submit','contact_page');
      setStatus('success');
      setForm({ name:'', email:'', phone:'', message:'' });
    } catch { setStatus('error'); }
  };

  return (
    <section className="contact-section" style={{ minHeight:'80vh' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
        <div className="section-eyebrow">Get In Touch</div>
        <h1 className="section-headline">Contact <strong>Us</strong></h1>
        <p className="section-body">Questions? Want to reach us directly? We'll get back to you quickly.</p>
        <div className="contact-grid">
          <div>
            <h3 style={{ fontFamily:'var(--mono)', fontSize:'0.68rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:28 }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field"><label className="form-label">Name *</label><input className="form-input" value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Your name" required /></div>
                <div className="form-field"><label className="form-label">Phone</label><input className="form-input" type="tel" value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="(000) 000-0000" /></div>
              </div>
              <div className="form-field"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="you@example.com" /></div>
              <div className="form-field"><label className="form-label">Message</label><textarea className="form-input form-textarea" value={form.message} onChange={e=>update('message',e.target.value)} placeholder="How can we help?" /></div>
              <button type="submit" className="btn-primary" disabled={status==='loading'}>
                {status==='loading' ? 'Sending…' : 'Send Message →'}
              </button>
              {status==='success' && <div className="form-success">✓ Message sent! We'll be in touch soon.</div>}
              {status==='error' && <div className="form-error">Something went wrong. Please call us directly.</div>}
            </form>
            <div style={{ marginTop:28, padding:'16px 20px', background:'rgba(57,198,214,0.05)', border:'1px solid rgba(57,198,214,0.14)', borderRadius:'var(--radius-sm)' }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--teal)', marginBottom:10 }}>Fastest way to book</div>
              <button className="btn-primary" style={{ fontSize:'0.65rem', padding:'11px 22px' }} onClick={() => bookClick('contact_cta')}>Book on Vagaro →</button>
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily:'var(--mono)', fontSize:'0.68rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:28 }}>Find Us</h3>

            {/* Google Maps embed — uses the address from admin settings */}
            {s.address && (
              <div style={{ marginBottom: 28, borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <iframe
                  title="Luxury Barber Culture Location"
                  width="100%"
                  height="220"
                  style={{ display: 'block', filter: 'invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(s.address)}&output=embed&z=15`}
                />
              </div>
            )}

            <div className="contact-info-block">
              <div className="contact-info-label">Address</div>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`} target="_blank" rel="noopener" className="contact-info-value" style={{ display:'block', color:'#fff', lineHeight:1.6 }}>{s.address}</a>
            </div>
            <div className="contact-info-block">
              <div className="contact-info-label">Phone</div>
              <a href={`tel:${s.phone}`} className="contact-info-value" style={{ display:'block', color:'#fff' }}>{s.phone}</a>
            </div>
            <div className="contact-info-block">
              <div className="contact-info-label">Email</div>
              <a href={`mailto:${s.email}`} className="contact-info-value" style={{ display:'block', color:'#fff', fontSize:'0.9rem' }}>{s.email}</a>
            </div>
            <div className="contact-info-block">
              <div className="contact-info-label" style={{ marginBottom:12 }}>Follow</div>
              <div className="social-row">
                {s.instagram_url && <a href={s.instagram_url} target="_blank" rel="noopener" className="social-btn" onClick={() => track('instagram_click','contact')}><IgIcon /></a>}
                {s.facebook_url  && <a href={s.facebook_url}  target="_blank" rel="noopener" className="social-btn" onClick={() => track('facebook_click','contact')}><FbIcon /></a>}
                {s.tiktok_url    && <a href={s.tiktok_url}    target="_blank" rel="noopener" className="social-btn" onClick={() => track('tiktok_click','contact')}><TkIcon /></a>}
              </div>
            </div>
            <div>
              <div className="contact-info-label" style={{ marginBottom:8 }}>Hours</div>
              <table className="hours-table">
                <tbody>
                  {DAYS.map((d,i) => {
                    const hrs = s['hours_'+d]||'Closed';
                    const isToday = i===todayIdx;
                    return (
                      <tr key={d} className={isToday?'hours-today':''}>
                        <td style={{ fontWeight:isToday?700:400 }}>{DAY_LABELS[i]}</td>
                        <td className={hrs==='Closed'?'hours-closed':''}>{hrs}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

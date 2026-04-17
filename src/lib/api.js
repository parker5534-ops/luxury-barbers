const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

let sessionId = sessionStorage.getItem('lbc_sid');
if (!sessionId) {
  sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
  sessionStorage.setItem('lbc_sid', sessionId);
}

export async function getSiteContent() {
  const res = await fetch(`${BASE}/api/public/site-content`);
  if (!res.ok) throw new Error('Failed to load site content');
  return res.json();
}

export async function submitLead(payload) {
  const res = await fetch(`${BASE}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Submission failed');
  return res.json();
}

export function track(event_type, event_source = '') {
  fetch(`${BASE}/api/track/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_type, event_source, session_id: sessionId }),
  }).catch(() => {});
}

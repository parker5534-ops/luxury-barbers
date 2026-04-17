import { useState, useEffect } from 'react';
import { getSiteContent } from '../lib/api';

// Fallback data so site renders even if API is down
const FALLBACK = {
  settings: {
    business_name: 'Luxury Barber Culture',
    hero_headline: 'Luxury Cuts.',
    hero_subheadline: 'Precision Grooming.',
    hero_bg_image: '',
    phone: '(832) 899-9191',
    email: 'luxurybarberculture1@gmail.com',
    address: '19056 Gulf Freeway, Suite 11, Friendswood, TX 77546',
    vagaro_url: 'https://www.vagaro.com/luxurybarberculture',
    instagram_url: 'https://instagram.com/luxurybarberculture',
    facebook_url: 'https://facebook.com/luxurybarberculture',
    tiktok_url: 'https://tiktok.com/@luxurybarberculture',
    hours_monday: 'Closed', hours_tuesday: '10:00 AM – 7:00 PM',
    hours_wednesday: '10:00 AM – 7:00 PM', hours_thursday: '10:00 AM – 7:00 PM',
    hours_friday: '10:00 AM – 7:00 PM', hours_saturday: '9:00 AM – 5:00 PM',
    hours_sunday: 'Closed',
    promo_text: 'Now accepting new clients — Book online 24/7 via Vagaro',
    about_text: 'Luxury Barber Culture was built on the belief that every cut is a statement.',
    cancellation_policy: 'We require at least 1 hour notice for cancellations or rescheduling. Late cancellations or no-shows may be charged a fee. We respect your time — please respect ours.',
    seo_title: 'Luxury Barber Culture | Premium Cuts in Friendswood, TX',
    seo_description: 'Precision haircuts, beard sculpting, and top-tier grooming in Friendswood, TX. Book online 24/7 via Vagaro.',
  },
  services: [
    { id: '1', name: 'Haircut', price: '$45', duration: '45 min', description: 'A customized haircut designed to fit your individual style. Precision over speed, every time.' },
    { id: '2', name: "Child's Haircut", price: '$35', duration: '30 min', description: "Elevate your child's style with an expertly crafted haircut." },
    { id: '3', name: 'Haircut & Quick Beard Trim', price: '$55', duration: '60 min', description: 'The full look, dialed in. A precision haircut paired with a clean beard trim.' },
    { id: '4', name: 'Quick Beard Trim', price: '$20', duration: '20 min', description: 'Keep your beard clean, defined, and on-point between cuts.' },
  ],
  gallery: [],
  barbers: [
    { id: '1', name: 'Alfonso Arredondo', title: 'Owner & Master Barber', bio: 'Alfonso built Luxury Barber Culture on the belief that every cut is a statement.', specialties: ['Precision Cuts', 'Fades', 'Beard Sculpting'] },
  ],
  testimonials: [
    { id: '1', name: 'Michael R.', rating: 5, text: "Alfonso is the real deal. Best cut I've had in years. The shop is clean, professional, and he takes his time to make sure everything is perfect." },
    { id: '2', name: 'Carlos T.', rating: 5, text: "Brought my son here for the first time — Alfonso was patient, professional, and my son left looking amazing. Highly recommend." },
    { id: '3', name: 'David M.', rating: 5, text: "The beard trim was on point. He listens to exactly what you want and executes it perfectly. This is my go-to shop now." },
  ],
  faqs: [
    { id: '1', question: 'Do I need an appointment?', answer: 'Appointments are strongly recommended. Walk-ins welcome based on availability. Book 24/7 via Vagaro.' },
    { id: '2', question: 'How do I book?', answer: 'Click any Book Now button to go to our Vagaro booking page.' },
    { id: '3', question: 'What payment do you accept?', answer: 'Credit/debit cards, Apple Pay, Google Pay, Cash App, Zelle, and cash.' },
    { id: '4', question: 'Where are you located?', answer: '19056 Gulf Freeway, Suite 11, Friendswood, TX 77546.' },
    { id: '5', question: 'What are your hours?', answer: 'Tue–Fri 10AM–7PM, Sat 9AM–5PM. Closed Mon & Sun.' },
  ],
};

export function useSiteContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSiteContent()
      .then(setData)
      .catch(err => { setError(err); setData(FALLBACK); })
      .finally(() => setLoading(false));
  }, []);

  return { data: data || FALLBACK, loading, error };
}

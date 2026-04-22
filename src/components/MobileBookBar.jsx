import React from 'react';
export default function MobileBookBar({ onBook, onCall, phone }) {
  return (
    <div className="mobile-book-bar">
      <a href={`tel:${phone}`} className="mb-call" onClick={() => onCall('mobile_bar')}>Call</a>
      <button className="mb-book" onClick={onBook}>Book Now</button>
    </div>
  );
}

import React, { useState } from 'react';
export default function PromoBanner({ text, onBook }) {
  const [hidden, setHidden] = useState(false);
  if (hidden || !text) return null;
  return (
    <div className="promo-banner">
      <span onClick={onBook} style={{ cursor: 'pointer' }}>{text}</span>
      <button className="close-btn" onClick={() => setHidden(true)}>×</button>
    </div>
  );
}

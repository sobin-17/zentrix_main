import React from 'react';

export default function Orb({ size = 500 }) {
  return (
    <div className="orb-container" style={{ width: size, height: size }}>
      <div className="orb-ring"></div>
      <div className="orb-core"></div>
    </div>
  );
}

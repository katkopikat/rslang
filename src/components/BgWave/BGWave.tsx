import React from 'react';

interface IBgWave {
  classWave: string;
}

const BgWave = ({ classWave } : IBgWave) => (
  <svg
    className={classWave}
    viewBox="0 0 500 150"
    preserveAspectRatio="none"
  >
    <path
      d="M0.00,49.99 C300.45,252.92 271.49,-49.99 500.00,49.99 L500.00,0.00 L0.00,0.00 Z"
    />
  </svg>
);

export default BgWave;

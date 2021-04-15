import React from 'react';

interface IBgGradient {
  gameName: string;
}

const BgGradient: React.FC<IBgGradient> = ({ gameName }: IBgGradient) => (
  <div className="anim bg-game">
    <div className="inner">
      <div className={`bg_${gameName}`} />
      <div className={`bg_${gameName} bg2`} />
      <div className={`bg_${gameName} bg3`} />
    </div>
  </div>
);
export default BgGradient;

import React from 'react';

interface IBgGradient {
  gameName: string;
}

const BgGradient: React.FC<IBgGradient> = ({ gameName }) => (
  <>
    <div className={`bg game-bg-${gameName}`} />
    <div className="bg bg2" />
    <div className="bg bg3" />
  </>
);
export default BgGradient;

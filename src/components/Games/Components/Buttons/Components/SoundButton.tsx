import React, { useState } from 'react';
import '../GameButtons.scss';
import '../tooltip.scss';

const SoundButton = () => {
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  const soundButton = isSoundOn ? (
    <span className="material-icons">volume_up</span>
  ) : (
    <span className="material-icons">volume_off</span>
  );

  const handleClick = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <div
      className="game-button"
      data-title="звуки"
      data-flow="left"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={() => null}
    >
      {soundButton}
    </div>
  );
};

export default SoundButton;

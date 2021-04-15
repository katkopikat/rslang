import React, { useState, useEffect } from 'react';
import '../GameButtons.scss';
import '../tooltip.scss';

import toggleFullScreen from '../../../../../helpers/fullScreen';

const FullScreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const fullScreenButton = !isFullScreen ? (
    <span className="material-icons">fullscreen</span>
  ) : (
    <span className="material-icons">fullscreen_exit</span>
  );

  const handleClick = () => {
    setIsFullScreen(!isFullScreen);
    toggleFullScreen();
  };

  const handleKeyPress = () => {
    if (!document.fullscreenElement) setIsFullScreen(false);
    if (document.fullscreenElement) setIsFullScreen(true);
  };

  useEffect(() => {
    window.addEventListener('fullscreenchange', handleKeyPress);
    return () => window.removeEventListener('fullscreenchange', handleKeyPress);
  });

  return (
    <div
      className="game-button"
      data-title="фулскрин"
      data-flow="left"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={() => null}
    >
      {fullScreenButton}
    </div>
  );
};

export default FullScreenButton;

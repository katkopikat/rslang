import React from 'react';
import { Link } from 'react-router-dom';
import '../GameButtons.scss';
import '../tooltip.scss';

const ExitButton = () => {
  const exitButton = <span className="material-icons">close</span>;

  return (
    <Link to="/textbook">
      <div className="game-button" data-title="в учебник" data-flow="left">
        {exitButton}
      </div>
    </Link>
  );
};

export default ExitButton;

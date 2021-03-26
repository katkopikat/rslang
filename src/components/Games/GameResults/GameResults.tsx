import React from 'react';
import ModalWindow from '../GameResults/ModalWindow/ModalWindow';
import ProgressBar from '../GameResults/ProgressBar/ProgressBar';

import './GameResults.scss';

const GameResults: React.FC = () => {
  return (
    <div>
      <ModalWindow>
        <div className='progress-bar__container'>
          <ProgressBar value={80} />
        </div>
      </ModalWindow>
    </div>
  );
};
export default GameResults;

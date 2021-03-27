import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import ModalWindow from '../GameResults/ModalWindow/ModalWindow';
import ProgressBar from '../GameResults/ProgressBar/ProgressBar';
import ResultTitle from '../GameResults/ResultTitle/ResultTitle';
import Counting from '../GameResults/ResultsCounting/Counting';
import WordList from '../GameResults/WordList/WordList';
import { IWord } from '../Savanna/interfaces';

import './GameResults.scss';

interface IGameResults {
  wrong: IWord[];
  correct: IWord[];
}

const GameResults: React.FC<IGameResults> = ({ wrong, correct }) => {
  const [index, setIndex] = useState<number>(0);

  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };

  const handleClick = () => {
    if (index === 0) setIndex(1);
    if (index === 1) setIndex(0);
  }

  const wrongAnswers = Array.from(new Set(wrong));
  const correctAnswers = Array.from(new Set(correct));

  let percentage: number = Math.round(
    (correctAnswers.length * 100) /
      (wrongAnswers.length + correctAnswers.length)
  );

  Number.isNaN(percentage) ? (percentage = 0) : (percentage = percentage);

  return (
    <div style={{ color: 'black' }}>
      <ModalWindow>
        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
          <div className='results-wrapper__main' onClick={handleClick}>
            <ResultTitle percentage={percentage} />
            <Counting wrong={wrongAnswers} correct={correctAnswers} />
            <ProgressBar percentage={percentage} />
          </div>
          <div className='results-wrapper__words' onClick={handleClick}>
            <WordList wrong={wrongAnswers} correct={correctAnswers} />
          </div>
        </SwipeableViews>
      </ModalWindow>
    </div>
  );
};
export default GameResults;

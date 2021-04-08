import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

interface IGameStatisticCard {
  learnedWords: number;
  procentCorrectAnsw: number;
  longestCorrectSer: number;
  name: string;
  id: string;
}

const GameStatisticCard = ({
  learnedWords, procentCorrectAnsw, longestCorrectSer, name, id,
} : IGameStatisticCard) => (
  <div className="game-statistic-card">
    <h2>
      {name}
    </h2>
    <h3>
      <CheckCircleOutlineIcon />
      {`Изучено ${learnedWords} слов.`}
    </h3>
    <h3>
      <DoneIcon />
      {`Правильных ответов: ${procentCorrectAnsw}%.`}
    </h3>
    <h3>
      <DoneAllIcon />
      {`Самая длинная серия правильных ответов: ${longestCorrectSer}.`}
    </h3>
    {/* <div className="circle" /> */}
    <svg
      className={`card__wave--${id}`}
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
      // style={{ height: '20%', width: '100%', transform: 'rotate(180deg)' }}
    >
      <path
        d="M0.00,49.99 C300.45,252.92 271.49,-49.99 500.00,49.99 L500.00,0.00 L0.00,0.00 Z"
        style={{ stroke: 'none', fill: '#bbb' }}
      />
    </svg>
  </div>
);

export default GameStatisticCard;

import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

interface IGameStatisticCard {
  learnedWords: number;
  procentCorrectAnsw: number;
  longestStreak: number;
  name: string;
}

const GameStatisticCard = ({
  learnedWords, procentCorrectAnsw, longestStreak, name,
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
      {`Самая длинная серия правильных ответов: ${longestStreak}.`}
    </h3>
    <div className="circle" />
  </div>
);

export default GameStatisticCard;

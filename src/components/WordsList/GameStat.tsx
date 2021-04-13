import React from 'react';

interface IGameStat {
  name: string;
  right: number;
  allTry: number;
}
const GameStat = ({ name, right, allTry }: IGameStat) => (
  <div className="game-statistic-wrapper">
    <span className="game-name">
      {' '}
      {name}
      {' '}
    </span>
    <span className="game-stat">
      {`${right} из ${allTry}`}
    </span>
  </div>
);

export default GameStat;

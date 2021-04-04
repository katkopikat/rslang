import React from 'react';
import GameStatisticCard from './GameStatisticCard';
import cardGameData from '../../GamesCards/cardGameData';

const GamesStatistic = () => (
  <>
    <div className="games-statistic-wrapper">
      { cardGameData.map((game) => (
        <GameStatisticCard
          learnedWords={15}
          procentCorrectAnsw={75}
          longestCorrectSer={13}
          name={game.name}
          key={game.name}
        />
      ))}
    </div>
  </>
);

export default GamesStatistic;

import React from 'react';
import GameStatisticCard from './GameStatisticCard';
import cardGameData from '../GamesCards/cardGameData';

const GamesStatistic = () => (
  <>
    <div className="games-statistic-wrapper">
      { cardGameData.map((game, i) => (
        <GameStatisticCard
          learnedWords={15}
          procentCorrectAnsw={75}
          longestCorrectSer={13}
          img={game.img}
          name={game.name}
        // name={game.name}
        // img={game.img}
          key={game.name}
        />
      ))}
    </div>
  </>
);

export default GamesStatistic;

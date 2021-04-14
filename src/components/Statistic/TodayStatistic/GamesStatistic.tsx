import React from 'react';
import GameStatisticCard from './GameStatisticCard';
import { ILSGames } from '../../../api';
import { gameTranslate } from '../../../data/apiData';

const GamesStatistic = ({ games }: { games: ILSGames }) => (
  <>
    <div className="games-statistic-wrapper">
      { Object.entries(games).map((item, index) => (
        <GameStatisticCard
          learnedWords={item[1].newWords}
          procentCorrectAnsw={item[1].rightPercent}
          longestStreak={item[1].bestSeries}
          name={gameTranslate[index]}
          key={item[0]}
        />
      ))}
    </div>
  </>
);

export default GamesStatistic;

import React from 'react';
import GameStatisticCard from './GameStatisticCard';
import cardGameData from '../../../data/cardGameData';

const GamesStatistic = () => (
  <>
    <div className="games-statistic-wrapper">
      { cardGameData.map((game) => (
        <GameStatisticCard // TODO DATA: данные по каждой игре за день
          learnedWords={15} // кол-во изученных слов
          procentCorrectAnsw={75} // кол-во правильных ответов
          longestStreak={13} // длинная серия
          name={game.name} // название игры
          key={game.name}
          // id={game.id}
        />
      ))}
    </div>
  </>
);

export default GamesStatistic;

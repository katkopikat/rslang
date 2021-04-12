import React from 'react';
import GameStatisticCard from './GameStatisticCard';
import cardGameData from '../../../data/cardGameData';
import { ILSGames } from '../../../api';

const GamesStatistic = ({ games }: { games: ILSGames }) => (
  <>
    <div className="games-statistic-wrapper">
      {/* { cardGameData.map((game) => (
        <GameStatisticCard // TODO DATA: данные по каждой игре за день
          learnedWords={15} // кол-во изученных слов
          procentCorrectAnsw={75} // кол-во правильных ответов
          longestStreak={13} // длинная серия
          name={game.name} // название игры
          key={game.name}
          // id={game.id}
        />
      ))} */}
      { Object.entries(games).map((item) => (
        <GameStatisticCard // TODO DATA: данные по каждой игре за день
          learnedWords={item[1].newWords} // кол-во изученных слов
          procentCorrectAnsw={item[1].rightPercent} // кол-во правильных ответов
          longestStreak={item[1].bestSeries} // длинная серия
          name={item[0]} // название игры
          key={item[0]}
          // id={game.id}
        />
      ))}
    </div>
  </>
);

export default GamesStatistic;

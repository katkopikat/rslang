/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import GamesStatistic from './GamesStatistic';
import { ILSGames } from '../../../api';
import { gamesDefault } from '../../../data/apiData';

interface ITodayStatistic {
  learnedWords: number;
  correctPercent: number;
  games: ILSGames;
}

const TodayStatistic = ({
  learnedWords = 0,
  correctPercent = 0,
  games = gamesDefault,
}:ITodayStatistic) => (
  <div className="wrapper">
    <div className="statistic__today">
      <h3> <b> {learnedWords} </b> слов изучено</h3>
      <h3> <b> {correctPercent}% </b> правильных ответов</h3>
    </div>
    <GamesStatistic games={games} />
  </div>
);
export default TodayStatistic;

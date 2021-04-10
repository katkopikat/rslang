/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import GamesStatistic from './GamesStatistic';

interface ITodayStatistic {
  learnedWords: number;
  correctPercent: number;
}

const TodayStatistic = ({ learnedWords = 0, correctPercent = 0 }:ITodayStatistic) => (
  <div className="wrapper">
    <div className="statistic__today">
      <h3> <b> {learnedWords} </b> слов изучено</h3>
      <h3> <b> {correctPercent}% </b> правильных ответов</h3>
    </div>
    <GamesStatistic />
  </div>
);
export default TodayStatistic;

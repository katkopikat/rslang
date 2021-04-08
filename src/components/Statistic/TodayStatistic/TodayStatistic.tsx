/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import GamesStatistic from './GamesStatistic';

const TodayStatistic = () => {
  const [learnedWords, setLearnedWords] = useState<number>(13);
  const [procentCorrect, setProcentCorrect] = useState<number>(74);

  return (
    <div className="wrapper">
      <div className="statistic__today">
        <h3> <b> {learnedWords} </b> слов изучено</h3>
        <h3> <b> {procentCorrect}% </b> правильных ответов</h3>
      </div>
      <GamesStatistic />
    </div>
  );
};

export default TodayStatistic;

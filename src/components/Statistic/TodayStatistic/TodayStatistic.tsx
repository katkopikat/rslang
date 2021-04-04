/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import GamesStatistic from './GamesStatistic';

const TodayStatistic = () => {
  const [learnedWords, setLearnedWords] = useState<number>(13);
  const [procentCorrect, setProcentCorrect] = useState<number>(74);

  return (
    <>
      <h2>cегодня:</h2>
      <div className="statistic-today">
        <h3> <b> {learnedWords} </b> слов изучено</h3>
        <h3> <b> {procentCorrect}% </b> правильных ответов</h3>
      </div>
      <GamesStatistic />
    </>
  );
};

export default TodayStatistic;

/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Letters from './Letters';
import StatusBadge from './StatusBadge';
import Hints from './Hints';
import GameResults from '../GameResults/GameResults';
import './WriteWord.scss';
import { IWord } from '../../../interfaces';

interface ILetterStatus {
  letter: string;
  status: string;
}

interface IStatistic {
  date: Date;
  correct: number;
  correctSeries: number;
}

interface IWriteWord {
  words: IWord[];
}

const WriteWord: React.FC<IWriteWord> = ({ words }) => {
  // const [words, setWords] = useState<IWord[]>([]);
  const [sentence, setSentence] = useState<string>();
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userWord, setUserWord] = useState<string>('');
  const [isEndGame, setEndGame] = useState<boolean>(false);
  // for wrong answer
  const [wrongWord, setWrong] = useState<boolean>(false);
  const [letterList, setLetterList] = useState<ILetterStatus[]>([]);
  const [disableCheckBtn, setDisableCheckBtn] = useState<boolean>(false);
  // for results
  const [countCorrect, setCountCorrect] = useState<number>(0);
  const [countWrong, setCountWrong] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<IWord[]>([]);
  const [correctSeries, setСorrectSeries] = useState<number>(0);

  const replaceWordInSentence = (word: IWord) : string => {
    const { textMeaning } = word;
    const str = textMeaning;
    const start = textMeaning.indexOf('*');
    const newStr = str.substr(start, word.word.length + 2);
    return str.replace(newStr, ('_'.repeat(newStr.length)));
  };

  // answers
  const colorLetterInWrongWord = (answer: string, word: string) => {
    const letter: Array<ILetterStatus> = [];

    for (let i = 0; i < answer.length; i += 1) {
      letter.push({
        letter: answer[i],
        status: answer[i] === word[i] ? 'correct' : 'wrong',
      });
    }
    setLetterList(letter);
  };

  const showAnswer = () => {
    setUserWord(currentWord.word);
    setCountWrong(countWrong + 1);
    setDisableCheckBtn(true);
    setWrongAnswers([...wrongAnswers, currentWord]);
  };

  const checkAnswer = (answer: string, word: string) => {
    const userAnswer = answer.toLowerCase();
    const questWord = word.toLowerCase();

    if (userAnswer === questWord) {
      setCountCorrect(countCorrect + 1);
      setCurrentIndex(currentIndex + 1);
      setСorrectSeries(correctSeries + 1);
      setUserWord('');
      setWrong(false);
      setCorrectAnswers([...correctAnswers, currentWord]);
    } else {
      colorLetterInWrongWord(userAnswer, questWord);
      setUserWord('');
      setWrong(true);
      setWrongAnswers([...wrongAnswers, currentWord]);
    }
  };

  // for statistic
  // const saveStatisticInLS = () => {
  //   const statistic: IStatistic = {
  //     date: new Date(),
  //     correct: countCorrect,
  //     correctSeries,
  //   };
  //   localStorage.setItem('writeWordGame', statistic);
  // };

  // const checkLS = () => {
  //   const savedData: string | undefined = localStorage.getItem('writeWordGame');

  //   if (savedData) {
  //     const dataObj: IStatistic = JSON.parse(savedData);
  //     if (dataObj.date.getDay() === (new Date()).getDay()) {
  //       // ДОЛЖНЫ СЛОЖИТЬ ДАННЫЕ
  //     } else {
  //       saveStatisticInLS();
  //     }
  //   } else {
  //     saveStatisticInLS();
  //   }
  // };

  // handle events
  const handleFocus = () => {
    setUserWord('');
    setWrong(false);
  };

  const handlePressEnter: any = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      checkAnswer(userWord, currentWord.word);
    }
  };

  useEffect(() => {
    !isEndGame
      ? window.addEventListener<'keydown'>('keydown', handlePressEnter)
      : null;

    return () => window.removeEventListener('keydown', handlePressEnter);
  });

  useEffect(() => {
    if (words.length) {
      if (currentIndex === words.length) {
        console.log('Finish');
        setEndGame(true);
        // checkLS();
      } else {
        const word = words[currentIndex];
        setUserWord('');
        setWrong(false);
        setCurrentWord(word);
        setSentence(replaceWordInSentence(word));
        setDisableCheckBtn(false);
      }
    }
  }, [words, currentIndex]);

  return (
    <>
      <div className="write-game">
        {!isEndGame && (
        <div className="write-game__wrapper">
          <StatusBadge correct={countCorrect} error={countWrong} />
          <Hints currentWord={currentWord} setUserWord={setUserWord} />

          <p>
            {' '}
            { sentence }
            {' '}
          </p>

          <form className="write-game__input" noValidate autoComplete="off">
            {wrongWord ? <Letters letterList={letterList} /> : null }
            <TextField
              id="standard-basic"
              variant="filled"
              value={userWord}
              onChange={(e) => { setUserWord(e.target.value); }}
              onFocus={() => handleFocus()}
            />

            { disableCheckBtn
              ? (
                <Button
                  variant="contained"
                  onClick={() => { setCurrentIndex(currentIndex + 1); }}
                >
                  Далее
                </Button>
              )
              : (
                <div className="btns-wrapper">
                  <Button
                    variant="contained"
                    onClick={() => { checkAnswer(userWord, currentWord.word); }}
                  >
                    Проверить
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => { showAnswer(); }}
                  >
                    Не знаю
                  </Button>
                </div>
              ) }
          </form>
        </div>
        )}
        {/* {isEndGame && <GameResults wrong={wrongAnswers} correct={correctAnswers} />} */}
      </div>

      <div className="bg"/>
    <div className="bg bg2"/>
    <div className="bg bg3"/>

      {/* <div className="wrapper">
        <div className="ball" />
        <div className="ball" />
        <div className="ball" />
      </div>

      <svg>
        <defs>
          <filter id="filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -10" result="filter" />
            <feComposite in="SourceGraphic" in2="filter" operator="atop" />
          </filter>
        </defs>
      </svg> */}
    </>
  );
};

export default WriteWord;

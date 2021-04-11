/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import StatusBadge from './Components/StatusBadge';
import Hints from './Components/Hints';
import Letters from './Components/Letters';
import Sentence from './Components/Sentence';

import GameResults from '../Components/GameResults/GameResults';
// import BgGradient from '../BgGradient';
import './Oasis.scss';

import '../Styles/background.scss';
import { IWord } from '../../../interfaces';
import initialState from '../wordInitialState';
import StartScreen from '../Components/GameStartScreen/StartScreen';
import Menu from '../../Menu/Menu';

interface ILetterStatus {
  letter: string;
  status: string;
}

// interface IStatistic {
//   date: Date;
//   correct: number;
//   correctSeries: number;
// }

interface IOasis {
  words: IWord[];
}

const Oasis: React.FC<IOasis> = ({ words }) => {
  const [currentWord, setCurrentWord] = useState<IWord>(initialState);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userWord, setUserWord] = useState<string>('');
  const [isStartGame, setIsStartGame] = useState<boolean>(false);
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
  const [correctSeries, setCorrectSeries] = useState<number>(0);

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
      setCorrectSeries(correctSeries + 1);
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
    if (!isEndGame) window.addEventListener<'keydown'>('keydown', handlePressEnter);
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

        setDisableCheckBtn(false);
      }
    }
  }, [words, currentIndex]);

  return (
    <>
      <Menu />
      <div className="oasis">
        {!isStartGame && (
          <StartScreen
            game="oasis"
            onClick={() => setIsStartGame(true)}
          />
        )}

        {!isEndGame && isStartGame && (
          <div className="oasis__wrapper">
            <StatusBadge correct={countCorrect} error={countWrong} />
            <Hints currentWord={currentWord} setUserWord={setUserWord} />
            <Sentence currentWord={currentWord} />

            <form className="oasis__input" noValidate autoComplete="off">
              {wrongWord ? <Letters letterList={letterList} /> : null}
              <TextField
                id="standard-basic"
                variant="filled"
                value={userWord}
                onChange={(e) => {
                  setUserWord(e.target.value);
                }}
                onFocus={() => handleFocus()}
              />

              {disableCheckBtn ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    setCurrentIndex(currentIndex + 1);
                  }}
                >
                  Далее
                </Button>
              ) : (
                <div className="oasis__btns">
                  <Button
                    variant="contained"
                    onBlur={() => setWrong(false)}
                    onClick={() => {
                      checkAnswer(userWord, currentWord.word);
                    }}
                  >
                    Проверить
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => {
                      showAnswer();
                    }}
                  >
                    Не знаю
                  </Button>
                </div>
              )}
            </form>
          </div>
        )}
        {isEndGame && (
          <GameResults wrong={wrongAnswers} correct={correctAnswers} />
        )}
      </div>
      {/*
      <BgGradient gameName="oasis" />  */}

      <div className="bg_oasis" />
      <div className="bg_oasis bg2" />
      <div className="bg_oasis bg3" />

    </>
  );
};

export default Oasis;

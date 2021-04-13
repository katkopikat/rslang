import React, { useEffect, useState } from 'react';
import { Badge } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import CloseIcon from '@material-ui/icons/Close';
import { IWord } from '../../../interfaces';
import { setUserWord } from '../../../api';
import shuffleArray from '../../../helpers/shuffleArray';
import StartScreen from '../Components/GameStartScreen/StartScreen';
import GameResults from '../Components/GameResults/GameResults';
import Menu from '../../Menu/Menu';
import GameButtons from '../Components/Buttons/Buttons';
import BgGradient from '../Components/BgGradient/BgGradient';
import './Sprint.scss';
import '../Styles/background.scss';
import '../../MainPage/BgAnimation.scss';

interface ISprint {
  wordsList: IWord[];
}

const Sprint: React.FC<ISprint> = ({ wordsList }: ISprint) => {
  const [words, setWords] = useState<IWord[]>(wordsList);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [countCorrect, setCountCorrect] = useState<number>(0);
  const [countError, setCountError] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<IWord[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);
  const [currentTranslate, setCurrentTranslate] = useState<IWord>();
  const [isGameStart, setIsGmeStart] = useState<boolean>(false);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
  const [isCurrentWorldCorrect, setIsCurrentWorldCorrect] = useState<boolean>(
    false,
  );
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [multiply, setMultiply] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [curStreak, setCurStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  useEffect(() => {
    setWords(wordsList);
    setCurrentIndex(0);
  }, [wordsList]);

  useEffect(() => {
    if (words.length) {
      if (currentIndex < words.length) {
        setCurrentWord(words[currentIndex]);
      } else {
        setIsGameEnd(true);
      }
    }
  }, [words, currentIndex]);

  useEffect(() => {
    if (currentWord) {
      const wrongWord = shuffleArray(
        words.filter((item) => item.id !== currentWord?.id),
      )[0];
      setCurrentTranslate(shuffleArray([currentWord, wrongWord])[0]);
    }
  }, [currentWord, words]);

  useEffect(() => {
    if (currentTranslate?.id === currentWord?.id) {
      setIsCurrentWorldCorrect(true);
    } else {
      setIsCurrentWorldCorrect(false);
    }
  }, [currentTranslate, currentWord?.id]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isGameEnd === false && timeLeft > 0) {
      timer = setTimeout(() => {
        if (timeLeft > 0) setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setIsGameEnd(true);
    }
    return () => clearTimeout(timer);
  }, [isGameEnd, timeLeft]);

  const CheckAnswer = async (answer: boolean) => {
    if (answer === isCurrentWorldCorrect) {
      setCountCorrect(countCorrect + 1);
      setCurrentIndex(currentIndex + 1);
      if (currentWord) {
        setCorrectAnswers([...correctAnswers, currentWord]);
        setScore(score + multiply * 10);
        setStreak(streak + 1);
        if (curStreak === 3) {
          setCurStreak(0);
          setMultiply(multiply + 1);
        } else setCurStreak(curStreak + 1);
        if (maxStreak < streak) setMaxStreak(streak + 1);
      }
    } else {
      setCountError(countError + 1);
      setCurrentIndex(currentIndex + 1);
      setCurStreak(0);
      setMultiply(1);
      if (currentWord) setWrongAnswers([...wrongAnswers, currentWord]);
    }
    if (currentWord !== undefined) {
      const result = await setUserWord(
        currentWord,
        // 'studied',
        'sprint',
        answer === isCurrentWorldCorrect,
      );
      return result;
    }
    return null;
  };

  const handleKey: any = (e: React.KeyboardEvent) => {
    if (!isGameEnd) {
      if (e.key === 'ArrowLeft') {
        CheckAnswer(true);
      } else if (e.key === 'ArrowRight') {
        CheckAnswer(false);
      }
    }
    e.preventDefault();
  };

  useEffect(() => {
    if (!isGameEnd) window.addEventListener('keyup', handleKey);
    return () => window.removeEventListener('keyup', handleKey);
  });

  return (
    <>
      <Menu />
      <div className="wrapper wrapper_sprint">
        <GameButtons />
        <div className="sprint">
          {!isGameStart && (
            <StartScreen game="sprint" onClick={() => setIsGmeStart(true)} />
          )}
          {isGameStart && !isGameEnd && (
            <div className="sprint__wrapper">
              <div className="sprint__content">
                <div className="sprint__timer">
                  {' '}
                  <AccessAlarmsIcon />
                  {`${timeLeft}`}
                </div>
                <div className="sprint__stat">
                  <div className="sprint__stat-multiply">
                    Умножение:
                    <CloseIcon />
                    {' '}
                    {multiply}
                    <div className="sprint__stat-current-score">

                      {`+${multiply * 10}`}
                    </div>
                  </div>

                  <div className="sprint__score">{`Очки: ${score}`}</div>
                </div>

                <Badge badgeContent={curStreak} color="primary">
                  <CheckIcon />
                </Badge>

              </div>
              <div className="sprint__words">
                <h2>{currentWord?.word}</h2>
                <h4>это</h4>
                <h2>{currentTranslate?.wordTranslate}</h2>
                <h4>?</h4>
              </div>

              <div className="sprint__btns">
                <button
                  className="sprint__btns-true"
                  type="button"
                  id="0"
                  onClick={() => (!isGameEnd ? CheckAnswer(true) : null)}
                >
                  ВЕРНО
                </button>
                <button
                  className="sprint__btns-false"
                  type="button"
                  id="1"
                  onClick={() => (!isGameEnd ? CheckAnswer(false) : null)}
                >
                  НЕВЕРНО
                </button>
              </div>
            </div>
          )}
          {isGameEnd && (
            <GameResults wrong={wrongAnswers} correct={correctAnswers} />
          )}
        </div>
      </div>
      <BgGradient gameName="sprint" />
    </>
  );
};

export default Sprint;

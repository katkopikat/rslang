import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Typography,
  Badge,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { IWord } from '../../../interfaces';
import { createUserWord, setUserWord } from '../../../api';
import shuffleArray from '../../../helpers/shuffleArray';
import StartScreen from '../Components/GameStartScreen/StartScreen';
import GameResults from '../Components/GameResults/GameResults';
import './Sprint.scss';

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
        setScore(score + (multiply * 10));
        setStreak(streak + 1);
        if (curStreak === 3) {
          setCurStreak(0);
          setMultiply(multiply + 1);
        } else setCurStreak(curStreak + 1);
        if (maxStreak < streak) setMaxStreak(streak + 1);
        console.log(maxStreak);
      }
    } else {
      setCountError(countError + 1);
      setCurrentIndex(currentIndex + 1);
      setCurStreak(0);
      setMultiply(1);
      if (currentWord) setWrongAnswers([...wrongAnswers, currentWord]);
    }
    if (currentWord !== undefined) {
      // const result = await
      // createUserWord(currentWord, 'studied', 'sprint', answer === isCurrentWorldCorrect);
      const result = await setUserWord(
        currentWord,
        // 'studied',
        'sprint',
        answer === isCurrentWorldCorrect,
      );
      console.log(result);
    }
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
      <div className="sprint">
        {!isGameStart && (<StartScreen game="sprint" onClick={() => setIsGmeStart(true)} />)}
        {isGameStart && (
        <div className="sprint-wrapper">
          <div className="sprint-stat">
            <div className="score">{`score: ${score}`}</div>
            <Badge badgeContent={curStreak} color="primary">
              <CheckIcon />
            </Badge>
            <div className="timer">{`time: ${timeLeft}`}</div>
          </div>
          <Card className="sprint_card">
            <Typography variant="h5" component="h2">{ currentWord?.word }</Typography>
            <Typography>{ currentTranslate?.wordTranslate }</Typography>
            <div className="buttons">
              <Button
                type="button"
                id="0"
                style={{ color: 'green' }}
                variant="outlined"
                onClick={() => (!isGameEnd ? CheckAnswer(true) : null)}
              >
                true
              </Button>
              <Button
                type="button"
                style={{ color: 'red' }}
                id="1"
                onClick={() => (!isGameEnd ? CheckAnswer(false) : null)}
              >
                false
              </Button>
            </div>
          </Card>
          <div className="sprint-stat">
            <div className="multiply">{`x:${multiply}`}</div>
            <div className="current-score">{`+${multiply * 10}`}</div>
          </div>
        </div>
        )}
        {isGameEnd && <GameResults wrong={wrongAnswers} correct={correctAnswers} />}
      </div>
      <div className="bg_sprint" />
      <div className="bg_sprint bg2" />
      <div className="bg_sprint bg3" />
    </>
  );
};

export default Sprint;

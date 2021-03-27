import React, { useEffect, useState } from 'react';
import { Button, Card, Typography } from '@material-ui/core';
import { IWord } from '../../../interfaces';
import shuffleArray from '../../../helpers/shuffleArray';

import './Sprint.scss';

interface ISpringSettings {
  group: number;
  page: number;
}

const apiURL = 'https://rslang-team69.herokuapp.com/words?group=';

// eslint-disable-next-line react/prop-types
const Sprint: React.FC<ISpringSettings> = ({ group, page }) => {
  const [words, setWords] = useState<IWord[]>([]);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [countCorrect, setCountCorrect] = useState<number>(0);
  const [countError, setCountError] = useState<number>(0);
  const [correctAnswer, setCorrectAnswers] = useState<IWord[]>([]);
  const [wrongAnswer, setWrongAnswer] = useState<IWord[]>([]);
  const [currentTranslate, setCurrentTranslate] = useState<IWord>();
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
  const [isCurrentWorldCorrect, setIsCurrentWorldCorrect] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    // TODO write api or utils method for getting data for games
    fetch(`${apiURL}${group}&page=${page}`)
      .then((response) => response.json())
      .then((data) => shuffleArray(data))
      .then((data) => {
        setWords(data);
      })
      .catch();
    setCurrentIndex(0);
  }, []);

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
      const wrongWord = shuffleArray(words.filter((item) => item.id !== currentWord?.id))[0];
      setCurrentTranslate(shuffleArray([currentWord, wrongWord])[0]);
    }
  }, [currentWord]);

  useEffect(() => {
    if (currentTranslate?.id === currentWord?.id) {
      setIsCurrentWorldCorrect(true);
    } else {
      setIsCurrentWorldCorrect(false);
    }
  }, [currentTranslate]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isGameEnd === false && timeLeft > 0) {
      timer = setTimeout(() => {
        if (timeLeft > 0) setTimeLeft(timeLeft - 1);
      }, 1000);
    } else { setIsGameEnd(true); }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const CheckAnswer = (answer: boolean) => {
    if (answer === isCurrentWorldCorrect) {
      setCountCorrect(countCorrect + 1);
      setCurrentIndex(currentIndex + 1);
      if (currentWord) setCorrectAnswers([...correctAnswer, currentWord]);
    } else {
      setCountError(countError + 1);
      setCurrentIndex(currentIndex + 1);
      if (currentWord) setWrongAnswer([...wrongAnswer, currentWord]);
    }
  };

  const handleKey: any = (e:React.KeyboardEvent) => {
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
    <div className="sprint">
      <div className="timer">{timeLeft}</div>
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
    </div>
  );
};

export default Sprint;

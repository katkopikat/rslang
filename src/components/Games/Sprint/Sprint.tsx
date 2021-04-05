import React, { useEffect, useState } from 'react';
import { Button, Card, Typography } from '@material-ui/core';
import { IWord } from '../../../interfaces';
import shuffleArray from '../../../helpers/shuffleArray';
import GameResults from '../GameResults/GameResults';
import './Sprint.scss';

interface ISprint {
  wordsList: IWord[];
}

const Sprint: React.FC<ISprint> = ({ wordsList } : ISprint) => {
  const [words, setWords] = useState<IWord[]>(wordsList);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [countCorrect, setCountCorrect] = useState<number>(0);
  const [countError, setCountError] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<IWord[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);
  const [currentTranslate, setCurrentTranslate] = useState<IWord>();
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
  const [isCurrentWorldCorrect, setIsCurrentWorldCorrect] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);

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
      const wrongWord = shuffleArray(words.filter((item) => item.id !== currentWord?.id))[0];
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
    } else { setIsGameEnd(true); }
    return () => clearTimeout(timer);
  }, [isGameEnd, timeLeft]);

  const CheckAnswer = (answer: boolean) => {
    if (answer === isCurrentWorldCorrect) {
      setCountCorrect(countCorrect + 1);
      setCurrentIndex(currentIndex + 1);
      if (currentWord) setCorrectAnswers([...correctAnswers, currentWord]);
    } else {
      setCountError(countError + 1);
      setCurrentIndex(currentIndex + 1);
      if (currentWord) setWrongAnswers([...wrongAnswers, currentWord]);
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
      {!isGameEnd && (
        <>
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
        </>
      )}
      {isGameEnd && <GameResults wrong={wrongAnswers} correct={correctAnswers} />}
    </div>
  );
};

export default Sprint;

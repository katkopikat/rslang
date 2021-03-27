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
  const [options, setOptions] = useState<IWord[]>([]);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);

  useEffect(() => {
    // write api or utils method for getting data for games
    fetch(`${apiURL}${group}&page=${page}`)
      .then((response) => response.json())
      .then((data) => shuffleArray(data))
      .then((data) => {
        setWords(data);
      })
      .catch();
    setIsGameEnd(false);
  }, []);

  useEffect(() => {
    if (words.length && currentIndex < words.length && (isGameEnd === false)) {
      setCurrentWord(words[currentIndex]);
      const wrongWord = shuffleArray(words.filter((item) => item.id !== currentWord?.id))[0];
      setOptions(shuffleArray([words[currentIndex], wrongWord]));
    }
  }, [words, currentIndex]);

  const CheckAnswer = (answer: string, word: string) => {
    if (answer === word) {
      setCountCorrect(countCorrect + 1);
      setCurrentIndex(currentIndex + 1);
    } else {
      setCountError(countError + 1);
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === words.length - 1) setIsGameEnd(true);
  };

  return (
    <div className="sprint">
      <Card className="sprint_card">
        <Typography variant="h5" component="h2">{ currentWord?.word }</Typography>
        <Typography>{ options[0]?.wordTranslate}</Typography>
        <div className="buttons">
          <Button
            type="button"
            id="0"
            style={{ color: 'green' }}
            variant="outlined"
            onClick={() => (!isGameEnd ? CheckAnswer(options[0]?.id, currentWord ? currentWord.id : '') : null)}
          >
            true
          </Button>
          <Button
            type="button"
            style={{ color: 'red' }}
            id="1"
            onClick={() => (!isGameEnd ? CheckAnswer(options[1]?.id, currentWord ? currentWord.id : '') : null)}
          >
            false
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Sprint;

import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Letters from './Letters';
import StatusBadge from './StatusBadge';
import shuffleArray from '../../helpers/shuffleArray';
import { IWord } from '../../interfaces';
import './WriteWord.scss';
import { AUDIO_LINK, WORDS_GROUP_LINK, NUMBER_OF_THE_WORDS } from '../../constants';

interface ILetterStatus {
  letter: string;
  status: string;
}

interface IWriteWord {
  group: number;
  page: number;
}

const WriteWord: React.FC<IWriteWord> = ({ group, page }) => {
  const [words, setWords] = useState<IWord[]>([]);
  const [sentence, setSentence] = useState<string>();
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userWord, setUserWord] = useState<string>('');
  const [errorWord, setError] = useState<boolean>(false);
  const [letterList, setLetterList] = useState<ILetterStatus[]>([]);
  const [countCorrect, setCountCorrect] = useState<number>(0);
  const [countError, setCountError] = useState<number>(0);

  const replaceWordInSentence = (word: IWord) : string => {
    const { textMeaning } = word;
    const str = textMeaning;
    const start = textMeaning.indexOf('*');
    const newStr = str.substr(start, word.word.length + 2);
    return str.replace(newStr, ('_'.repeat(newStr.length)));
  };

  const colorLetterInWrongWord = (answer: string, word: string) => {
    const letter: Array<ILetterStatus> = [];

    for (let i = 0; i < answer.length; i += 1) {
      letter.push({
        letter: answer[i],
        status: answer[i] === word[i] ? 'correct' : 'error',
      });
    }
    setLetterList(letter);
  };

  const checkAnswer = (answer: string, word: string) => {
    const userAnswer = answer.toLowerCase();
    const questWord = word.toLowerCase();

    if (userAnswer === questWord) {
      setCountCorrect(countCorrect + 1);
      setCurrentIndex(currentIndex + 1);
      setUserWord('');
      setError(false);
    } else {
      colorLetterInWrongWord(userAnswer, questWord);
      setUserWord('');
      setError(true);
    }
  };

  const playSound = (word: IWord) => {
    const audio = new Audio(`${AUDIO_LINK}${word.audioMeaning}`);
    audio.play();
  };

  const showFirstLetter = () => {
    setUserWord(currentWord.word[0]);
  };

  const showLettersCount = () => {
    const str = '*'.repeat(currentWord.word.length);
    setUserWord(str);
  };

  const showAnswer = () => {
    setError(false);
    setUserWord(currentWord.word);
    setCountError(countError + 1);
  };

  // const generateSentence = (word: IWord) => replaceWord(word);

  useEffect(() => {
    fetch(
      `${WORDS_GROUP_LINK}${group}&page=${page}`,
    )
      .then((response) => response.json())
      .then((data) => data.slice(0, NUMBER_OF_THE_WORDS))
      .then((data) => shuffleArray(data))
      .then((data) => setWords(data))
      .catch();
  }, []);

  useEffect(() => {
    if (words.length) {
      const word = words[currentIndex];
      setCurrentWord(word);
      setSentence(replaceWordInSentence(word));
    }
  }, [words, currentIndex]);

  return (
    <div className="write-game">
      <div className="write-game__wrapper">
        <StatusBadge correct={countCorrect} error={countError} />
        <span className="write-game__hints"> Нужна помощь? </span>
        <div className="hints__wrapper">
          <button
            className="write-game__hint"
            type="button"
            onClick={() => playSound(currentWord)}
          >
            Послушаю аудио!
          </button>

          <button
            className="write-game__hint"
            type="button"
            onClick={() => showFirstLetter()}
          >
            Покажи первую букву!
          </button>

          <button
            className="write-game__hint"
            type="button"
            onClick={() => showLettersCount()}
          >
            Сколько букв в слове?
          </button>
        </div>

        <p>
          { sentence }
        </p>
        <form className="write-game__input" noValidate autoComplete="off">
          {errorWord ? <Letters letterList={letterList} /> : null }
          <TextField
            id="standard-basic"
            variant="filled"
            value={userWord}
            onChange={(e) => { setUserWord(e.target.value); }}
          />
          { errorWord
            ? (
              <Button
                variant="contained"
                onClick={() => { console.log('Далее'); }}
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
    </div>
  );
};

export default WriteWord;

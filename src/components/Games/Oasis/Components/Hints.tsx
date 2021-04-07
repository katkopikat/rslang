/* eslint-disable react/prop-types */
import React from 'react';
import { IWord } from '../../../../interfaces';
import { API_URL } from '../../../../constants';
import './Hints.scss';

interface IHints {
  currentWord: IWord;
  setUserWord: (hint: string) => void;
}

const Hints: React.FC<IHints> = ({ currentWord, setUserWord }) => {
  const showWordTranslate = () => {
    setUserWord(currentWord.wordTranslate);
  };

  const playSound = (word: IWord) => {
    const audio = new Audio(`${API_URL}/${word.audioMeaning}`);
    audio.play();
  };

  const showFirstLetter = () => {
    setUserWord(currentWord.word[0]);
  };

  const showLettersCount = () => {
    const str = '*'.repeat(currentWord.word.length);
    setUserWord(str);
  };

  return (
    <>
      <span className="oasis__help"> Нужна помощь? </span>
      <div className="hints__wrapper">
        <button
          className="hint__btn"
          type="button"
          onClick={() => playSound(currentWord)}
        >
          Послушаю аудио!
        </button>

        <button
          className="hint__btn"
          type="button"
          onClick={() => showWordTranslate()}
        >
          Перевод слова
        </button>

        <button
          className="hint__btn"
          type="button"
          onClick={() => showFirstLetter()}
        >
          Покажи первую букву!
        </button>

        <button
          className="hint__btn"
          type="button"
          onClick={() => showLettersCount()}
        >
          Сколько букв в слове?
        </button>
      </div>
    </>
  );
};

export default Hints;

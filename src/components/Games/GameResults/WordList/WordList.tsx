import React from 'react';
import useSound from 'use-sound';
import './WordList.scss';
import { IWord } from '../../Savanna/interfaces';

const AUDIO_LINK: string = 'https://rslang-team69.herokuapp.com/';

interface IWordList {
  wrong: IWord[];
  correct: IWord[];
}

interface IWordItem {
  word: IWord;
}

const WordItem: React.FC<IWordItem> = ({ word }) => {
  const [play] = useSound(`${AUDIO_LINK}${word.audio}`);

  const handleClick = () => {
    play();
  };

  return (
    <div className='word-item'>
      <span className='word-item__sound material-icons' onClick={handleClick}>
        volume_up
      </span>
      <span className='word-item__word'>{word.word}&nbsp;</span>
      <span className='word-item__translate'> - {word.wordTranslate}</span>
    </div>
  );
};

const WordList: React.FC<IWordList> = ({ wrong, correct }) => {
  return (
    <div className='word-list__wrapper'>
      {wrong.length > 0 && (
        <div className='word-list__wrong'>
          <div className='word-list__title'>
            <span>Ошибок</span>
            <span className='count-label count-label__wrong'>
              {wrong.length}
            </span>
          </div>
          {wrong.map((item: IWord) => (
            <WordItem key={item.id} word={item} />
          ))}
          <hr />
        </div>
      )}
      {correct.length > 0 && (
        <div className='word-list__correct'>
          <div className='word-list__title'>
            <span>Знаю</span>
            <span className='count-label count-label__correct'>
              {correct.length}
            </span>
          </div>
          {correct.map((item: IWord) => (
            <WordItem key={item.id} word={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WordList;

import React, { useEffect, useState } from 'react';
import shuffle from '../../../commonFunc/shuffle';
import randomInteger from '../../../commonFunc/random';
import { IWord, IOption, ISavanna } from './interfaces';
import './Savanna.scss';

const NUMBER_OF_THE_WORDS: number = 20;
const NUMBER_OF_THE_OPTIONS: number = 4;
const LIVES: number = 5;

const TranslateOption: React.FC<IOption> = ({ id, index, word, onClick }) => {
  return (
    <div onClick={() => onClick(id)}>
      {index + 1} {word.toLowerCase()}
    </div>
  );
};

const Savanna: React.FC<ISavanna> = ({ group }) => {
  const [words, setWords] = useState<IWord[]>([]);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [NewCurrentWord, setNewCurrentWord] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [translateOptions, setTranslateOptions] = useState<IWord[]>([]);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [backgroundPosition, setBackgroundPosition] = useState(50);
  const [lives, setLives] = useState<number>(LIVES);

  const page = randomInteger(0, 29);

  useEffect(() => {
    fetch(
      `https://rslang-team69.herokuapp.com/words?group=${group}&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => data.slice(0, NUMBER_OF_THE_WORDS))
      .then((data) => shuffle(data))
      .then((data) => setWords(data))
      .catch();
  }, []);

  useEffect(() => {
    if (words.length) {
      index < words.length ? setCurrentWord(words[index]) : setIsEnd(true);
    }
    const timer = setTimeout(() => {
      setNewCurrentWord(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [words, isClick]);

  useEffect(() => {
    const wrong: IWord[] = shuffle(words)
      .filter((el: IWord) => el.id !== currentWord?.id)
      .slice(0, NUMBER_OF_THE_OPTIONS - 1);
    const right: IWord[] = words.filter(
      (el: IWord) => el.id === currentWord?.id
    );
    const options = shuffle(wrong.concat(right));
    setTranslateOptions(options);
  }, [currentWord]);

  useEffect(() => {
    lives <= 0 ? setIsEnd(true) : null;
  }, [lives]);

  const setNewWord = () => {
    setIsClick(!isClick);
    setIndex(index + 1);
    setNewCurrentWord(false);
  };

  const handleClick = (id: string) => {
    setNewWord();
    if (id == currentWord?.id) {
      setBackgroundPosition(backgroundPosition + 2);
    } else {
      setLives(lives - 1);
    }
  };

  return (
    <div
      style={{
        backgroundPosition: `50% ${backgroundPosition}%`,
      }}
      className='savanna'
    >
      {!isEnd && (
        <div className='savanna__field'>
          {NewCurrentWord && (
            <div
              onAnimationEnd={() => {
                setNewWord();
                setLives(lives - 1);
              }}
              className='current-word animation'
            >
              {currentWord && currentWord?.word.toLowerCase()}
            </div>
          )}
          <div className='savanna__options'>
            {translateOptions.length &&
              translateOptions.map((item: any, index: number) => (
                <TranslateOption
                  key={item.id}
                  index={index}
                  word={item.wordTranslate}
                  onClick={handleClick}
                  id={item.id}
                />
              ))}
          </div>
          <div>Lives: {lives}</div>
        </div>
      )}
      {isEnd && <div>End</div>}
    </div>
  );
};

export default Savanna;

import React, { useEffect, useState } from 'react';
import shuffle from '../../../commonFunc/shuffle';
import randomInteger from '../../../commonFunc/random';
import { IWord, IOption, ISavanna } from './interfaces';
import './Savanna.scss';
import Lives from './LivesIndicator/Lives';

const NUMBER_OF_THE_WORDS: number = 20;
const NUMBER_OF_THE_OPTIONS: number = 4;
const LIVES: number = 5;

const TranslateOption: React.FC<IOption> = ({
  id,
  index,
  word,
  onClick,
  isAnswer,
}) => {
  return (
    <div className={`${isAnswer ? 'answer' : ''}`} onClick={() => onClick(id)}>
      {index + 1} {word.toLowerCase()}
    </div>
  );
};

const Savanna: React.FC<ISavanna> = ({ group }) => {
  const [words, setWords] = useState<IWord[]>([]);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [newCurrentWord, setNewCurrentWord] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [translateOptions, setTranslateOptions] = useState<IWord[]>([]);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [backgroundPosition, setBackgroundPosition] = useState(50);
  const [lostLives, setLostLives] = useState<number>(0);
  const [lostLivesArray, setLostLivesArray] = useState<number[]>([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // TODO: add page number to props
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
    setNewCurrentWord(true);
    setIsWrong(false);
  }, [words, newCurrentWord]);

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
    lostLives >= LIVES ? setIsEnd(true) : null;
  }, [lostLives]);

  const setNewWord = () => {
    setIndex(index + 1);
    setNewCurrentWord(false);
    setShowAnswer(false);
  };

  const setWrongAnswer = () => {
    setLostLives(lostLives + 1);
    setLostLivesArray([...lostLivesArray, lostLives]);
    setNewWord();
  };

  const handleClick = (id: string) => {
    setIsClick(!isClick);
    if (id == currentWord?.id) {
      setNewWord();
      setBackgroundPosition(backgroundPosition + 2);
    } else {
      setIsWrong(true);
      setShowAnswer(true);
      setLostLives(lostLives + 1);
      setLostLivesArray([...lostLivesArray, lostLives]);
      setTimeout(() => {
        setNewWord();
      }, 1000);
    }
  };

  return (
    <div
      style={{
        backgroundPosition: `50% ${backgroundPosition}%`,
      }}
      className='savanna'
    >
      <Lives number={LIVES} disabled={lostLivesArray} />
      {!isEnd && (
        <div className='savanna__field'>
          {newCurrentWord && (
            <div
              onAnimationEnd={() => {
                setWrongAnswer();
              }}
              className={`current-word animation ${isWrong ? 'wrong' : ''}`}
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
                  isAnswer={showAnswer && item.id === currentWord?.id}
                />
              ))}
          </div>
        </div>
      )}
      {isEnd && <div>End</div>}
    </div>
  );
};

export default Savanna;

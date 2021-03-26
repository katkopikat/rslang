import React, { useEffect, useState } from 'react';
import shuffle from '../../../commonFunc/shuffle';
import randomInteger from '../../../commonFunc/random';
import { IWord } from './interfaces';
import './Savanna.scss';
import Lives from './LivesIndicator/Lives';

const NUMBER_OF_THE_WORDS: number = 20;
const NUMBER_OF_THE_OPTIONS: number = 4;
const LIVES: number = 5;

export interface IOption {
  id: string;
  index: number;
  word: string;
  onClick: (id: string) => void;
  isAnswer: boolean;
  isWrongAnswer: boolean;
  isPressed: boolean;
}

export interface ISavanna {
  group: number;
}

const TranslateOption: React.FC<IOption> = ({
  id,
  index,
  word,
  onClick,
  isAnswer,
  isWrongAnswer,
  isPressed,
}) => {
  return (
    <div
      className={`${isAnswer ? 'answer' : ''} 
      ${isWrongAnswer ? 'wrong-answer' : ''}
      ${isPressed ? 'pressed' : ''}`}
      onClick={() => onClick(id)}
    >
      {index + 1} {word.toLowerCase()}
    </div>
  );
};

const Savanna: React.FC<ISavanna> = ({ group }) => {
  const [words, setWords] = useState<IWord[]>([]);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [newCurrentWord, setNewCurrentWord] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [translateOptions, setTranslateOptions] = useState<IOption[]>([]);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [backgroundPosition, setBackgroundPosition] = useState(50);
  const [lostLives, setLostLives] = useState<number>(0);
  const [lostLivesArray, setLostLivesArray] = useState<number[]>([]);
  const [currentAnswerId, setCurrentAnswerId] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

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
    setIsPressed(false);
  };

  const setWrongAnswer = () => {
    setLostLives(lostLives + 1);
    setLostLivesArray([...lostLivesArray, lostLives]);
    setNewWord();
  };

  const handleClick = (id: string) => {
    setCurrentAnswerId(id);
    if (id == currentWord?.id) {
      setBackgroundPosition(backgroundPosition + 2);
      setTimeout(() => {
        setNewWord();
      }, 500);
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

  useEffect(() => {
    window.addEventListener<'keydown'>('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });

  const handleKeyPress: any = (event: React.KeyboardEvent) => {
    setIsPressed(true);
    event.key === '1' ? handleClick(translateOptions[0].id) : null;
    event.key === '2' ? handleClick(translateOptions[1].id) : null;
    event.key === '3' ? handleClick(translateOptions[2].id) : null;
    event.key === '4' ? handleClick(translateOptions[3].id) : null;
  };

  return (
    <div
      style={{
        backgroundPosition: `50% ${backgroundPosition}%`,
      }}
      className='savanna'
    >
      <div className='savanna__wrapper'>
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
                    isWrongAnswer={showAnswer && item.id === currentAnswerId}
                    isPressed={isPressed && item.id === currentAnswerId}
                  />
                ))}
            </div>
          </div>
        )}
        {isEnd && <div>End</div>}
      </div>
    </div>
  );
};

export default Savanna;

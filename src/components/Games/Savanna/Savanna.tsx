import React, { useEffect, useState } from 'react';
import shuffle from '../../../commonFunc/shuffle';
import randomInteger from '../../../commonFunc/random';
import { IWord } from './interfaces';
import './Savanna.scss';
import Lives from './LivesIndicator/Lives';
import GameResults from '../GameResults/GameResults';

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
  // TODO: fix type any
  const [currentWord, setCurrentWord] = useState<any>();
  const [translateOptions, setTranslateOptions] = useState<IOption[]>([]);
  const [newCurrentWord, setNewCurrentWord] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [backgroundPosition, setBackgroundPosition] = useState(50);

  // for lives indicator
  const [lostLives, setLostLives] = useState<number>(0);
  const [lostLivesArray, setLostLivesArray] = useState<number[]>([]);

  //for highlight words
  const [currentAnswerId, setCurrentAnswerId] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  // for results
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<IWord[]>([]);

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
    let timer: any;
    if (lostLives >= LIVES) {
      timer = setTimeout(() => {
        setIsEnd(true);
      }, 1000);
    }
    return () => clearTimeout(timer);
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
    setWrongAnswers([...wrongAnswers, currentWord]);
  };

  const handleClick = (id: string) => {
    setCurrentAnswerId(id);
    if (id == currentWord?.id) {
      setBackgroundPosition(backgroundPosition + 2);
      setCorrectAnswers([...correctAnswers, currentWord]);
      setTimeout(() => {
        setNewWord();
      }, 500);
    } else {
      setIsWrong(true);
      setShowAnswer(true);
      setLostLives(lostLives + 1);
      setLostLivesArray([...lostLivesArray, lostLives]);
      setWrongAnswers([...wrongAnswers, currentWord]);
      setTimeout(() => {
        setNewWord();
      }, 1000);
    }
  };

  useEffect(() => {
    !isEnd
      ? window.addEventListener<'keydown'>('keydown', handleKeyPress)
      : null;
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
      {!isEnd && (
        <div className='savanna__wrapper'>
          <Lives number={LIVES} disabled={lostLivesArray} />
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
              {translateOptions.length > 0 &&
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
        </div>
      )}
      {isEnd && <GameResults wrong={wrongAnswers} correct={correctAnswers} />}
    </div>
  );
};

export default Savanna;

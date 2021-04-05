import React, { useEffect, useState } from 'react';
import shuffle from '../../../commonFunc/shuffle';
import { IWord } from '../../../interfaces';
import './Savanna.scss';
import Lives from './LivesIndicator/Lives';
import GameResults from '../GameResults/GameResults';
import initialState from '../wordInitialState';
import BgGradient from '../BgGradient';
import '../BgGradient.scss';

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
  wordsList: IWord[];
}

const TranslateOption = ({
  id,
  index,
  word,
  onClick,
  isAnswer,
  isWrongAnswer,
  isPressed,
}: IOption) => (
  <div
    role="button"
    tabIndex={0}
    className={`${isAnswer ? 'answer' : ''} 
      ${isWrongAnswer ? 'wrong-answer' : ''}
      ${isPressed ? 'pressed' : ''}`}
    onClick={() => onClick(id)}
    onKeyDown={() => onClick(id)}
  >
    {index + 1}
    {' '}
    {word.toLowerCase()}
  </div>
);

const Savanna = ({ wordsList }: ISavanna) => {
  const [words, setWords] = useState<IWord[]>(wordsList);
  const [currentWord, setCurrentWord] = useState<IWord>(initialState);
  const [translateOptions, setTranslateOptions] = useState<IOption[]>([]);
  const [newCurrentWord, setNewCurrentWord] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [backgroundPosition, setBackgroundPosition] = useState(50);

  // for lives indicator
  const [lostLives, setLostLives] = useState<number>(0);
  const [lostLivesArray, setLostLivesArray] = useState<number[]>([]);

  // for highlight words
  const [currentAnswerId, setCurrentAnswerId] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  // for results
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<IWord[]>([]);

  useEffect(() => {
    setWords(wordsList);
  }, [wordsList]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (words.length) {
      if (index < words.length) {
        setCurrentWord(words[index]);
      } else {
        setIsEnd(true);
      }
    }
    setNewCurrentWord(true);
    setIsWrong(false);
  }, [words, newCurrentWord]);

  useEffect(() => {
    const wrong: IWord[] = shuffle(words)
      .filter((el: IWord) => el.id !== currentWord?.id)
      .slice(0, NUMBER_OF_THE_OPTIONS - 1);
    const right: IWord[] = words.filter(
      (el: IWord) => el.id === currentWord?.id,
    );
    const options = shuffle(wrong.concat(right));
    setTranslateOptions(options);
  }, [words, currentWord]);

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
    if (id === currentWord?.id) {
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

  const handleKeyPress: any = (event: React.KeyboardEvent) => {
    setIsPressed(true);
    if (event.key === '1') handleClick(translateOptions[0].id);
    if (event.key === '2') handleClick(translateOptions[1].id);
    if (event.key === '3') handleClick(translateOptions[2].id);
    if (event.key === '4') handleClick(translateOptions[3].id);
  };

  useEffect(() => {
    if (!isEnd) window.addEventListener<'keydown'>('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });

  return (
    <div
      style={{
        backgroundPosition: `50% ${backgroundPosition}%`,
      }}
      className="savanna"
    >
      {!isEnd && (
        <div className="savanna__wrapper">
          <Lives number={LIVES} disabled={lostLivesArray} />
          <div className="savanna__field">
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
            <div className="savanna__options">
              {translateOptions.length > 0
                && translateOptions.map((item: any, idx: number) => (
                  <TranslateOption
                    key={item.id}
                    index={idx}
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
      <BgGradient gameName="savanna" />
    </div>
  );
};

export default Savanna;

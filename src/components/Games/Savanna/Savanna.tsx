import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import shuffle from '../../../commonFunc/shuffle';
import { IWord } from '../../../interfaces';
import './Savanna.scss';
import '../Styles/background.scss';
import sounds from '../sounds';
import Lives from './LivesIndicator/Lives';
import GameResults from '../Components/GameResults/GameResults';
import initialState from '../wordInitialState';
import Menu from '../../Menu/Menu';

import Crystal from './Crystal/Crystal';
import StartScreen from '../Components/GameStartScreen/StartScreen';
import Loader from '../Components/Loader/Loader';

import GameButtons from '../Components/Buttons/Buttons';

const NUMBER_OF_THE_OPTIONS: number = 4;
const LIVES: number = 5;

const classNames = {
  fall: 'savanna__question-fall',
  successFall: 'savanna__question-success-fall',
  successEnd: 'savanna__question-success-end',
  fail: 'savanna__question-start',
};

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
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [canIChoose, setCanIChoose] = useState<boolean>(true);

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

  // for transitions
  const [className, setClassName] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isAnswer, setIsAnswer] = useState<boolean>(false);

  // for loader
  const [count, setCount] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // sounds
  const [isSoundsOn, setIsSoundsOn] = useState<boolean>(true);
  const [playCorrect] = useSound(sounds.correct);
  const [playWrong] = useSound(sounds.wrong);
  const [playComplete] = useSound(sounds.complete);

  const tick = () => {
    if (isLoading && count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    let timer: any;
    if (count <= 0) {
      setIsStart(true);
      timer = setTimeout(() => {
        setClassName(classNames.fall);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [count]);

  useEffect(() => {
    if (isStart) {
      setWords(wordsList);
    }
  }, [wordsList, isStart]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let timer: any;
    if (words.length) {
      if (index < words.length && lostLives < LIVES) {
        setCurrentWord(words[index]);
        setNewCurrentWord(true);
      } else {
        timer = setTimeout(() => {
          setIsEnd(true);
          if (isSoundsOn) playComplete();
        }, 1000);
      }
    }
    return () => clearTimeout(timer);
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

  const setNewWord = () => {
    setIsCorrect(false);
    setIndex(index + 1);
    setNewCurrentWord(false);
    setShowAnswer(false);
    setIsPressed(false);
    setIsCorrect(false);
    setClassName(classNames.successEnd);
    setTimeout(() => {
      setClassName(classNames.fall);
      setIsAnswer(false);
      setCanIChoose(true);
    }, 500);
  };

  const setWrongAnswer = () => {
    setIsAnswer(true);
    setShowAnswer(true);
    setLostLives(lostLives + 1);
    setLostLivesArray([...lostLivesArray, lostLives]);
    setWrongAnswers([...wrongAnswers, currentWord]);
    setClassName(classNames.fail);
    setTimeout(() => {
      setNewWord();
    }, 600);
  };

  const handleClick = (id: string) => {
    setCurrentAnswerId(id);
    setIsAnswer(true);

    if (canIChoose) {
      if (id === currentWord?.id) {
        setCanIChoose(false);
        setIsCorrect(true);
        setCorrectAnswers([...correctAnswers, currentWord]);
        setClassName(classNames.successFall);
        setTimeout(() => {
          setNewWord();
        }, 500);
        if (isSoundsOn) playCorrect();
      } else {
        setCanIChoose(false);
        setShowAnswer(true);
        setLostLives(lostLives + 1);
        setLostLivesArray([...lostLivesArray, lostLives]);
        setWrongAnswers([...wrongAnswers, currentWord]);
        setClassName(classNames.fail);
        if (isSoundsOn) playWrong();
        setTimeout(() => {
          setNewWord();
        }, 1000);
      }
    }
  };

  const handleKeyPress: any = (event: React.KeyboardEvent) => {
    setIsPressed(true);
    if (!translateOptions[0]) return;
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
    <>
      <Menu />
      <div className="savanna">
        <div className="wrapper savanna__wrapper">
          <GameButtons onClick={() => setIsSoundsOn(!isSoundsOn)} />
          {!isStart && !isLoading && (
            <StartScreen
              game="savanna"
              onClick={() => {
                setIsLoading(true);
              }}
            />
          )}
          {isLoading && !isStart && <Loader seconds={count} />}
          {!isEnd && isStart && (
          <>
            <div
              className={`savanna__question ${className}`}
              onTransitionEnd={() => {
                if (className === classNames.fall && !isAnswer) {
                  setWrongAnswer();
                }
              }}
            >
              <div className="savanna__question-word">
                {currentWord && currentWord?.word.toLowerCase()}
              </div>
            </div>

            <Lives number={LIVES} disabled={lostLivesArray} />
            <div className="savanna__field">
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
                        isWrongAnswer={
                          showAnswer && item.id === currentAnswerId
                        }
                        isPressed={isPressed && item.id === currentAnswerId}
                      />
                    ))}
              </div>
            </div>
            <Crystal isCorrect={isCorrect} />
          </>
          )}
          {isEnd && (
            <GameResults wrong={wrongAnswers} correct={correctAnswers} />
          )}
        </div>
      </div>
      <div className="bg_savanna" />
      <div className="bg_savanna bg2" />
      <div className="bg_savanna bg3" />
    </>
  );
};

export default Savanna;

import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import CloseIcon from '@material-ui/icons/Close';
import wordsApi from '../../../redux/actions/wordsApiActions';
import { ViewMode } from '../../../constants';
import { RootState } from '../../../redux/rootReducer';
import { useAuth } from '../../AuthContext';
import { IWord } from '../../../interfaces';
import { setUserWord, setLSStatistic, setUserStatistic } from '../../../api';
import shuffleArray from '../../../helpers/shuffleArray';
import StartScreen from '../Components/GameStartScreen/StartScreen';
import GameResults from '../Components/GameResults/GameResults';
import Menu from '../../Menu/Menu';
import GameButtons from '../Components/Buttons/Buttons';
import BgGradient from '../Components/BgGradient/BgGradient';
import './Sprint.scss';
import '../Styles/background.scss';
import '../../MainPage/BgAnimation.scss';
import sounds from '../sounds';
import { setPage } from '../../../redux/actions/appActions';
import randomInteger from '../../../commonFunc/random';

const NUMBER_OF_THE_PAGES: number = 30;

interface ISprint {
  wordsList: IWord[];
}

const Sprint: React.FC<ISprint> = ({ wordsList }: ISprint) => {
  const [words, setWords] = useState<IWord[]>(wordsList);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [countCorrect, setCountCorrect] = useState<number>(0);
  const [countError, setCountError] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<IWord[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);
  const [currentTranslate, setCurrentTranslate] = useState<IWord>();
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
  const [isCurrentWorldCorrect, setIsCurrentWorldCorrect] = useState<boolean>(
    false,
  );
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [multiply, setMultiply] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [curStreak, setCurStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  // sounds
  const [isSoundsOn, setIsSoundsOn] = useState<boolean>(true);
  const [playCorrect] = useSound(sounds.correct);
  const [playWrong] = useSound(sounds.wrong);
  const [playComplete] = useSound(sounds.complete);

  const dispatch = useDispatch();
  const { userId, token } = useAuth();

  const group = useSelector((state: RootState) => state.app.group);
  const page = useSelector((state: RootState) => state.app.page);
  const viewMode = useSelector((state: RootState) => state.app.viewMode);
  const isStartedFromMenu = useSelector(
    (state: RootState) => state.app.startGameFromMenu,
  );
  const additionalWords = useSelector(
    (state: RootState) => state.app.additionalWordsSprint,
  );

  useEffect(() => {
    setLSStatistic('sprint', correctAnswers, wrongAnswers, maxStreak);
    if (isGameEnd && isGameStart) {
      setUserStatistic(correctAnswers, wrongAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameEnd]);

  useEffect(() => {
    setWords(wordsList);
    setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameStart]);

  useEffect(() => {
    if (!isGameStart || isGameEnd || viewMode === ViewMode.Dictionary) return;
    if (timeLeft > 1 && words.length - currentIndex < 3) {
      if (!userId) {
        dispatch(wordsApi.fetchForAdditionalWordsSprintAnon(group, page - 1));
      }
      if (userId && isStartedFromMenu) {
        dispatch(
          wordsApi.fetchForAdditionalWordsSprintUser(
            group,
            page - 1,
            userId,
            token,
          ),
        );
      }
      if (page > 0) {
        dispatch(setPage(page - 1));
      } else {
        dispatch(setPage(randomInteger(0, NUMBER_OF_THE_PAGES - 1)));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    setWords((w) => [...w, ...additionalWords]);
  }, [additionalWords]);

  useEffect(() => {
    if (words.length) {
      if (currentIndex < words.length) {
        setCurrentWord(words[currentIndex]);
      } else {
        setIsGameEnd(true);
        if (isSoundsOn) playComplete();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, currentIndex]);

  useEffect(() => {
    if (currentWord) {
      const wrongWord = shuffleArray(
        words.filter((item) => item.id !== currentWord?.id),
      )[0];
      setCurrentTranslate(shuffleArray([currentWord, wrongWord])[0]);
    }
  }, [currentWord, words]);

  useEffect(() => {
    if (currentTranslate?.id === currentWord?.id) {
      setIsCurrentWorldCorrect(true);
    } else {
      setIsCurrentWorldCorrect(false);
    }
  }, [currentTranslate, currentWord?.id]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!isGameEnd && isGameStart) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      setIsGameEnd(true);
      if (isSoundsOn) playComplete();
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameEnd, timeLeft, isGameStart]);

  const CheckAnswer = async (answer: boolean) => {
    if (answer === isCurrentWorldCorrect) {
      setCountCorrect(countCorrect + 1);
      setCurrentIndex(currentIndex + 1);
      if (isSoundsOn) playCorrect();
      if (currentWord) {
        setCorrectAnswers([...correctAnswers, currentWord]);
        setScore(score + multiply * 10);
        setStreak(streak + 1);
        if (curStreak === 3) {
          setCurStreak(0);
          setMultiply(multiply + 1);
        } else setCurStreak(curStreak + 1);
        if (maxStreak < streak) setMaxStreak(streak + 1);
      }
    } else {
      setCountError(countError + 1);
      setCurrentIndex(currentIndex + 1);
      setCurStreak(0);
      setMultiply(1);
      setStreak(0);
      if (isSoundsOn) playWrong();
      if (currentWord) setWrongAnswers([...wrongAnswers, currentWord]);
    }
    if (currentWord !== undefined) {
      const result = await setUserWord(
        currentWord,
        'sprint',
        answer === isCurrentWorldCorrect,
      );
      return result;
    }
    return null;
  };

  const handleKey: any = (e: React.KeyboardEvent) => {
    if (!isGameEnd) {
      if (e.key === 'ArrowLeft') {
        CheckAnswer(true);
      } else if (e.key === 'ArrowRight') {
        CheckAnswer(false);
      }
    }
    e.preventDefault();
  };

  useEffect(() => {
    if (!isGameEnd) window.addEventListener('keyup', handleKey);
    return () => window.removeEventListener('keyup', handleKey);
  });

  return (
    <>
      <Menu />
      <div className="wrapper wrapper_sprint">
        <GameButtons onClick={() => setIsSoundsOn(!isSoundsOn)} />
        <div className="sprint">
          {!isGameStart && (
            <StartScreen
              game="sprint"
              onClick={() => {
                setIsGameStart(true);
                setTimeLeft(30);
              }}
            />
          )}
          {isGameStart && !isGameEnd && (
            <div className="sprint__wrapper">
              <div className="sprint__content">
                <div className="sprint__timer">
                  {' '}
                  <AccessAlarmsIcon />
                  {`${timeLeft}`}
                </div>
                <div className="sprint__stat">
                  <div className="sprint__stat-multiply">
                    Умножение:
                    <CloseIcon />
                    {' '}
                    {multiply}
                    <div className="sprint__stat-current-score">
                      {`+${multiply * 10}`}
                    </div>
                  </div>

                  <div className="sprint__score">{`Очки: ${score}`}</div>
                </div>

                <Badge badgeContent={curStreak} color="primary">
                  <CheckIcon />
                </Badge>
              </div>
              <div className="sprint__words">
                <h2>{currentWord?.word}</h2>
                <h4>это</h4>
                <h2>{currentTranslate?.wordTranslate}</h2>
                <h4>?</h4>
              </div>

              <div className="sprint__btns">
                <button
                  className="sprint__btns-true"
                  type="button"
                  id="0"
                  onClick={() => (!isGameEnd ? CheckAnswer(true) : null)}
                >
                  ВЕРНО
                </button>
                <button
                  className="sprint__btns-false"
                  type="button"
                  id="1"
                  onClick={() => (!isGameEnd ? CheckAnswer(false) : null)}
                >
                  НЕВЕРНО
                </button>
              </div>
            </div>
          )}
          {isGameEnd && (
            <GameResults wrong={wrongAnswers} correct={correctAnswers} />
          )}
        </div>
        <BgGradient gameName="sprint" />
      </div>
    </>
  );
};

export default Sprint;

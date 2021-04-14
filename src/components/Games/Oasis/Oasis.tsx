import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StatusBadge from './Components/StatusBadge';
import Hints from './Components/Hints';
import Letters from './Components/Letters';
import Sentence from './Components/Sentence';
import GameResults from '../Components/GameResults/GameResults';
import { IWord } from '../../../interfaces';
import initialState from '../wordInitialState';
import StartScreen from '../Components/GameStartScreen/StartScreen';
import Menu from '../../Menu/Menu';
import { setLSStatistic, setUserStatistic, setUserWord as setWordInDB } from '../../../api';
import GameButtons from '../Components/Buttons/Buttons';
import BgGradient from '../Components/BgGradient/BgGradient';
import './Oasis.scss';
import '../Styles/background.scss';
import '../../MainPage/BgAnimation.scss';
import sounds from '../sounds';

interface ILetterStatus {
  letter: string;
  status: string;
}

interface IOasis {
  wordsList: IWord[];
}

const Oasis = ({ wordsList }: IOasis) => {
  const [currentWord, setCurrentWord] = useState<IWord>(initialState);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userWord, setUserWord] = useState<string>('');
  const [isStartGame, setIsStartGame] = useState<boolean>(false);
  const [isEndGame, setEndGame] = useState<boolean>(false);
  const [finishedCurWord, setFinishedCurWord] = useState<boolean | null >(null);
  // for wrong answer
  const [wrongWord, setWrong] = useState<boolean>(false);
  const [letterList, setLetterList] = useState<ILetterStatus[]>([]);
  const [disableCheckBtn, setDisableCheckBtn] = useState<boolean>(false);
  const [answWithError, setAnswWithError] = useState<boolean>(false);
  // for results
  const [countCorrect, setCountCorrect] = useState<number>(0);
  const [countWrong, setCountWrong] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<IWord[]>([]);
  const [correctSeries, setCorrectSeries] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  // sounds
  const [isSoundsOn, setIsSoundsOn] = useState<boolean>(true);
  const [playCorrect] = useSound(sounds.correct);
  const [playWrong] = useSound(sounds.wrong);
  const [playComplete] = useSound(sounds.complete);

  const colorLetterInWrongWord = (answer: string, word: string) => {
    const letter: Array<ILetterStatus> = [];

    for (let i = 0; i < answer.length; i += 1) {
      letter.push({
        letter: answer[i],
        status: answer[i] === word[i] ? 'correct' : 'wrong',
      });
    }
    setLetterList(letter);
  };

  const showAnswer = () => {
    if (isSoundsOn) playWrong();
    setUserWord(currentWord.word);
    setWrong(false);
    setDisableCheckBtn(true);
    setAnswWithError(true);
  };

  const checkAnswer = (answer: string, word: string) => {
    const userAnswer = answer.toLowerCase();
    const questWord = word.toLowerCase();

    if (userAnswer === questWord) {
      setFinishedCurWord(true);
    } else {
      setUserWord('');
      setWrong(true);
      setAnswWithError(true);
      colorLetterInWrongWord(userAnswer, questWord);
      if (isSoundsOn) playWrong();
    }
  };

  const finishCorrectAnsw = () => {
    setCorrectAnswers([...correctAnswers, currentWord]);
    setCountCorrect(countCorrect + 1);
    setCorrectSeries(correctSeries + 1);
    setUserWord('');
    setWrong(false);
    setStreak(streak + 1);
    if (isSoundsOn) playCorrect();
    if (maxStreak < streak + 1) setMaxStreak(streak + 1);
    if (answWithError) setAnswWithError(true);
    setCurrentIndex(currentIndex + 1);
  };

  const finishWrongAnsw = () => {
    setCountWrong(countWrong + 1);
    setStreak(0);
    setWrongAnswers([...wrongAnswers, currentWord]);
  };

  const showNextWord = () => {
    setFinishedCurWord(true);
    setCurrentIndex(currentIndex + 1);
  };

  const handleFocus = () => {
    setUserWord('');
    setWrong(false);
  };

  const handlePressEnter: any = (event: React.KeyboardEvent) => {
    if (wrongWord) {
      setWrong(false);
    }

    if (event.keyCode === 13) {
      event.preventDefault();
      checkAnswer(userWord, currentWord.word);
    }
  };

  useEffect(() => {
    if (!isEndGame) window.addEventListener<'keydown'>('keydown', handlePressEnter);
    return () => window.removeEventListener('keydown', handlePressEnter);
  });

  useEffect(() => {
    if (wordsList.length) {
      if (currentIndex === wordsList.length) {
        setEndGame(true);
        if (isSoundsOn) playComplete();
      } else {
        const word = wordsList[currentIndex];
        setUserWord('');
        setWrong(false);
        setCurrentWord(word);
        setDisableCheckBtn(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsList, currentIndex]);

  useEffect(() => {
    setLSStatistic('oasis', correctAnswers, wrongAnswers, maxStreak);
    if (isEndGame && isStartGame) {
      setUserStatistic(correctAnswers, wrongAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEndGame]);

  useEffect(() => {
    if (finishedCurWord) {
      (async () => {
        if (currentWord !== undefined) {
          const result = await setWordInDB(
            currentWord,
            'oasis',
            !answWithError,
          );

          if (answWithError) {
            finishWrongAnsw();
          } else {
            finishCorrectAnsw();
          }
          setFinishedCurWord(false);
          setAnswWithError(false);
          return result;
        }
        return null;
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedCurWord]);

  return (
    <>
      <Menu />
      <div className="wrapper wrapper_oasis">
        <GameButtons onClick={() => setIsSoundsOn(!isSoundsOn)} />
        <div className="oasis">
          {!isStartGame && (
          <StartScreen
            game="oasis"
            onClick={() => setIsStartGame(true)}
          />
          )}

          {!isEndGame && isStartGame && (
          <div className="oasis__wrapper">
            <StatusBadge correct={countCorrect} error={countWrong} />
            <Hints currentWord={currentWord} setUserWord={setUserWord} setWrong={setWrong} />
            <Sentence currentWord={currentWord} />

            <form className="oasis__input" noValidate autoComplete="off">
              {wrongWord ? <Letters letterList={letterList} /> : null}
              <TextField
                id="standard-basic"
                variant="filled"
                value={userWord}
                onChange={(e) => {
                  setUserWord(e.target.value);
                }}
                onFocus={() => handleFocus()}
              />

              {disableCheckBtn ? (
                <Button
                  variant="contained"
                  onClick={() => { showNextWord(); }}
                >
                  Далее
                </Button>
              ) : (
                <div className="oasis__btns">
                  <Button
                    variant="contained"
                    onBlur={() => setWrong(false)}
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
              )}
            </form>
          </div>
          )}
          {isEndGame && (<GameResults wrong={wrongAnswers} correct={correctAnswers} />)}
        </div>
      </div>
      <BgGradient gameName="oasis" />
    </>
  );
};

export default Oasis;

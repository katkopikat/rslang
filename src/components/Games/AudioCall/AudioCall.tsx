import React, { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { IWord } from '../../../interfaces';
import player from '../../../utils/AudioPlayer';
import shuffle from '../../../helpers/shuffleArray';
import { API_URL } from '../../../constants';
import GameResults from '../Components/GameResults/GameResults';
import StartPage from '../Components/GameStartScreen/StartScreen';
import Menu from '../../Menu/Menu';
import GameButtons from '../Components/Buttons/Buttons';
import BgGradient from '../Components/BgGradient/BgGradient';
import { setLSStatistic, setUserStatistic } from '../../../api';
import '../Styles/background.scss';
import '../../MainPage/BgAnimation.scss';
import sounds from '../sounds';
import './AudioCall.scss';

enum GameState {
  StartScreen,
  Question,
  Answer,
  GameOver,
}

interface IProps {
  wordsList: IWord[];
}

const numWordOptions = 5;

const AudioCall = ({ wordsList }: IProps): JSX.Element => {
  // const classes = useStyles();
  const [gameState, setGameState] = useState(GameState.StartScreen);
  const [wordsToGuess, setWordsToGuess] = useState([] as IWord[]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<null | IWord>(null);
  const [levelWords, setLevelWords] = useState([] as IWord[]);

  // statistics
  const answers = useRef({ wrong: [] as IWord[], right: [] as IWord[] });
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  // sounds
  const [isSoundsOn, setIsSoundsOn] = useState<boolean>(true);
  const [playCorrect] = useSound(sounds.correct);
  const [playWrong] = useSound(sounds.wrong);
  const [playComplete] = useSound(sounds.complete);

  // game end
  useEffect(() => {
    if (gameState === GameState.GameOver) {
      setLSStatistic('audioCall', answers.current.right, answers.current.wrong, maxStreak);
      setUserStatistic(answers.current.right, answers.current.wrong);
    }
  }, [gameState, maxStreak]);

  // new game
  useEffect(() => {
    if (!wordsList) return;
    setWordsToGuess(shuffle<IWord>(wordsList).slice(0, 10));
    answers.current = { wrong: [] as IWord[], right: [] as IWord[] };
  }, [wordsList]);

  const handleChoiceClick = (word: IWord) => {
    if (gameState !== GameState.Question) return;
    setSelectedWord(word);
    setGameState(GameState.Answer);
    const guessingWord = wordsToGuess[currentWordIndex];
    if (word.id === guessingWord.id) {
      answers.current.right.push(guessingWord);
      setStreak(streak + 1);
      if (maxStreak < streak + 1) setMaxStreak(streak + 1);
      if (isSoundsOn) playCorrect();
    } else {
      answers.current.wrong.push(guessingWord);
      setStreak(0);
      if (isSoundsOn) playWrong();
    }
  };

  const handleStartClick = () => {
    setGameState(GameState.Question);
  };

  const handleNextClick = () => {
    if (currentWordIndex + 1 < wordsToGuess.length) {
      setCurrentWordIndex(currentWordIndex + 1);
      setGameState(GameState.Question);
      setSelectedWord(null);
    } else {
      if (isSoundsOn) playComplete();
      setGameState(GameState.GameOver);
    }
  };

  const handleDontKnowClick = () => {
    setSelectedWord(null);
    setStreak(0);
    setGameState(GameState.Answer);
    answers.current.wrong.push(wordsToGuess[currentWordIndex]);
  };

  const handleSoundClick = () => player.play(wordsToGuess[currentWordIndex].audio);

  // next level
  useEffect(() => {
    if (!wordsToGuess.length || gameState !== GameState.Question) return;
    const guessingWord = wordsToGuess[currentWordIndex];
    const wrongWords = shuffle<IWord>(wordsList)
      .filter((word) => word.id !== guessingWord.id)
      .slice(0, numWordOptions - 1);
    setLevelWords(
      shuffle<IWord>([guessingWord, ...wrongWords]),
    );
    player.play(guessingWord.audio);
  }, [currentWordIndex, gameState, wordsList, wordsToGuess]);

  useEffect(() => {
    if (gameState !== GameState.Question && gameState !== GameState.Answer) return undefined;
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.key === '1') handleChoiceClick(levelWords[0]);
      if (event.key === '2') handleChoiceClick(levelWords[1]);
      if (event.key === '3') handleChoiceClick(levelWords[2]);
      if (event.key === '4') handleChoiceClick(levelWords[3]);
      if (event.key === '5') handleChoiceClick(levelWords[4]);
      if (event.key === ' ') {
        if (gameState === GameState.Question) handleDontKnowClick();
        else handleNextClick();
      }
    };
    window.addEventListener<'keypress'>('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  });

  const AnswerOption = (word: IWord, index: number) => {
    let style = 'answerOption';
    if (gameState === GameState.Answer) {
      if (word.id === selectedWord?.id) style = 'answerOptionWrong';
      if (word.id === wordsToGuess[currentWordIndex].id) style = 'answerOptionRight';
    }
    return (
      <Button
        variant="outlined"
        className={`${style} answer-btn`}
        onClick={() => handleChoiceClick(word)}
      >
        {`${index + 1} ${word.wordTranslate}`}
      </Button>
    );
  };

  const wordsChoice = () => levelWords.map((word, index) => (
    <div key={word.id} className="audiocall__btns">
      {AnswerOption(word, index)}
    </div>
  ));

  if (gameState === GameState.StartScreen) {
    return (
      <>
        <Menu />
        <div className="wrapper wrapper_audiocall">
          <GameButtons onClick={() => setIsSoundsOn(!isSoundsOn)} />
          <div className="audiocall">
            <StartPage game="audiocall" onClick={handleStartClick} />
            <BgGradient gameName="audiocall" />
          </div>
        </div>
      </>
    );
  }
  if (gameState === GameState.GameOver) {
    return (
      <>
        <Menu />
        <div className="wrapper wrapper_audiocall">
          <GameButtons onClick={() => setIsSoundsOn(!isSoundsOn)} />
          <div className="audiocall">
            <GameResults
              wrong={answers.current.wrong}
              correct={answers.current.right}
            />
            <BgGradient gameName="audiocall" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Menu />
      <div className="wrapper wrapper_audiocall">
        <GameButtons onClick={() => setIsSoundsOn(!isSoundsOn)} />
        <div className="audiocall">
          <div className="audiocall__wrapper">
            {gameState === GameState.Answer ? (
              <>
                <img
                  className="audiocall__image"
                  src={`${API_URL}/${wordsToGuess[currentWordIndex].image}`}
                  alt=""
                />
                <h2 className="audiocall__current-word">
                  {wordsToGuess[currentWordIndex].word}
                  <IconButton onClick={handleSoundClick}>
                    <VolumeUpIcon className="soundIcon" />
                  </IconButton>
                </h2>
              </>
            ) : (
              <IconButton onClick={handleSoundClick}>
                <VolumeUpIcon className="soundIconBig" />
              </IconButton>
            )}

            <div className="audiocall__words">
              {' '}
              {wordsChoice()}
              {' '}
            </div>

            <div>
              {gameState === GameState.Answer ? (
                <Button variant="contained" onClick={handleNextClick} className="next-btn">
                  Дальше
                </Button>
              ) : (
                <Button variant="contained" onClick={handleDontKnowClick} className="audiocall-btn">
                  Не знаю
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <BgGradient gameName="audiocall" />
    </>
  );
};

export default AudioCall;

import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { IWord } from '../../../interfaces';
import player from '../../../utils/AudioPlayer';
import shuffle from '../../../helpers/shuffleArray';
import { API_URL } from '../../../constants';
import GameResults from '../Components/GameResults/GameResults';
import StartPage from '../Components/GameStartScreen/StartScreen';
import useStyles from './styles';
import Menu from '../../Menu/Menu';
import GameButtons from '../Components/Buttons/Buttons';
import BgGradient from '../Components/BgGradient/BgGradient';
import '../Styles/background.scss';
import '../../MainPage/BgAnimation.scss';
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
  const classes = useStyles();
  const [gameState, setGameState] = useState(GameState.StartScreen);
  const [wordsToGuess, setWordsToGuess] = useState([] as IWord[]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<null | IWord>(null);
  const [levelWords, setLevelWords] = useState([] as IWord[]);

  // statistics
  const answers = useRef({ wrong: [] as IWord[], right: [] as IWord[] });

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
    } else answers.current.wrong.push(guessingWord);
  };

  const handleStartClick = () => {
    setGameState(GameState.Question);
  };

  const handleNextClick = () => {
    if (currentWordIndex + 1 < wordsToGuess.length) {
      setCurrentWordIndex(currentWordIndex + 1);
      setGameState(GameState.Question);
      setSelectedWord(null);
    } else setGameState(GameState.GameOver);
  };

  const handleDontKnowClick = () => {
    setSelectedWord(null);
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
    let style = classes.answerOption;
    if (gameState === GameState.Answer) {
      if (word.id === selectedWord?.id) style = classes.answerOptionWrong;
      if (word.id === wordsToGuess[currentWordIndex].id) style = classes.answerOptionRight;
    }
    return (
      <Button
        variant="outlined"
        className={style}
        onClick={() => handleChoiceClick(word)}
      >
        {`${index + 1} ${word.wordTranslate}`}
      </Button>
    );
  };

  const wordsChoice = () => levelWords.map((word, index) => (
    <Grid item key={word.id}>
      {AnswerOption(word, index)}
    </Grid>
  ));

  if (gameState === GameState.StartScreen) {
    return (
      <>
        <Menu />
        <div className="wrapper wrapper_audiocall">
          <GameButtons />
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
          <GameButtons />
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
        <GameButtons />
        <div className="audiocall">
          <Grid container direction="column" className={classes.gameGrid}>
            <Grid item container justify="center">
              <Grid item>
                {gameState === GameState.Answer ? (
                  <>
                    <img
                      className={classes.wordImage}
                      src={`${API_URL}/${wordsToGuess[currentWordIndex].image}`}
                      alt=""
                    />
                    <Typography variant="h4" align="center">
                      {wordsToGuess[currentWordIndex].word}
                      <IconButton onClick={handleSoundClick}>
                        <VolumeUpIcon className={classes.soundIcon} />
                      </IconButton>
                    </Typography>
                  </>
                ) : (
                  <IconButton onClick={handleSoundClick}>
                    <VolumeUpIcon className={classes.soundIconBig} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              container
              justify="space-evenly"
              className={`${classes.wordChoise} audoicall-words`}
            >
              {wordsChoice()}
            </Grid>
            <Grid item container justify="center">
              <Grid item>
                {gameState === GameState.Answer ? (
                  <Button variant="contained" onClick={handleNextClick}>
                    <ArrowRightAltIcon className={classes.arrow} />
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleDontKnowClick} className="audiocall-btn">
                    Не знаю
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <BgGradient gameName="audiocall" />
    </>
  );
};

export default AudioCall;

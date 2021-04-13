import React, { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import Container from '@material-ui/core/Container';
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
// import useStyles from './styles';
import Menu from '../../Menu/Menu';
import GameButtons from '../Components/Buttons/Buttons';
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

  // sounds
  const [isSoundsOn, setIsSoundsOn] = useState<boolean>(true);
  const [playCorrect] = useSound(sounds.correct);
  const [playWrong] = useSound(sounds.wrong);
  const [playComplete] = useSound(sounds.complete);

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
      if (isSoundsOn) playCorrect();
    } else {
      answers.current.wrong.push(guessingWord);
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
    // let style = classes.answerOption;
    let style = 'answerOption';
    if (gameState === GameState.Answer) {
      if (word.id === selectedWord?.id) style = 'answerOptionWrong';
      if (word.id === wordsToGuess[currentWordIndex].id) style = 'answerOptionRight';
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
          <GameButtons onClick={() => setIsSoundsOn(!isSoundsOn)} />
          <Container className="root" maxWidth={false}>
            <StartPage game="audiocall" onClick={handleStartClick} />
            <div className="bg_audiocall" />
            <div className="bg_audiocall bg2" />
            <div className="bg_audiocall bg3" />
          </Container>
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
          <Container className="root" maxWidth={false}>
            <GameResults
              wrong={answers.current.wrong}
              correct={answers.current.right}
            />
            <div className="bg_audiocall" />
            <div className="bg_audiocall bg2" />
            <div className="bg_audiocall bg3" />
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <Menu />
      <div className="wrapper wrapper_oasis">
        <GameButtons onClick={() => setIsSoundsOn(!isSoundsOn)} />
        <Container className="root" maxWidth={false}>
          <Grid container direction="column" className="gameGrid">
            <Grid item container justify="center">
              <Grid item>
                {gameState === GameState.Answer ? (
                  <>
                    <img
                      className="wordImage"
                      src={`${API_URL}/${wordsToGuess[currentWordIndex].image}`}
                      alt=""
                    />
                    <Typography variant="h4" align="center" className="current-word">
                      {wordsToGuess[currentWordIndex].word}
                      <IconButton onClick={handleSoundClick}>
                        <VolumeUpIcon className="soundIcon" />
                      </IconButton>
                    </Typography>
                  </>
                ) : (
                  <IconButton onClick={handleSoundClick}>
                    <VolumeUpIcon className="soundIconBig" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              container
              justify="space-evenly"
              className="wordChoise"
            >
              {wordsChoice()}
            </Grid>
            <Grid item container justify="center">
              <Grid item>
                {gameState === GameState.Answer ? (
                  <Button variant="contained" onClick={handleNextClick}>
                    <ArrowRightAltIcon className="arrow" />
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleDontKnowClick}>
                    Не знаю
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="bg bg_audiocall" />
      <div className="bg bg_audiocall bg2" />
      <div className="bg bg_audiocall bg3" />
    </>
  );
};

export default AudioCall;

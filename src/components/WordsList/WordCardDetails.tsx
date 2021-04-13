import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import DoneIcon from '@material-ui/icons/Done';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import IconButton from '@material-ui/core/IconButton';
import player from '../../utils/AudioPlayer';
import { IWord } from '../../interfaces';
import { API_URL, ViewMode } from '../../constants';
import request from '../../helpers/request';
import { useAuth } from '../AuthContext';
import GameStat from './GameStat';

const useStyles = makeStyles(() => ({
  cardImage: {
    height: 200,
  },
}));

interface IProps {
  word: IWord;
  showTranslate: boolean;
  showBtns: boolean;
  forceUpdate: () => void;
  viewMode: ViewMode;
}

const WordCardDetails = ({
  word,
  showTranslate,
  showBtns,
  forceUpdate,
  viewMode,
}: IProps) => {
  const classes = useStyles();
  const { userId, token } = useAuth();

  useEffect(() => {
    if (word) {
      player.updatePlaylist([word.audio, word.audioMeaning, word.audioExample]);
    }
  }, [word]);

  const playWordAudio = () => player.play();

  const deleteUserWord = async () => {
    if (!userId) return;
    const userWordsApi = `${API_URL}/users/${userId}/words/${word.id}`;
    const wordParam = { optional: { isDeleted: true } };
    if (word.userWord) await request('PUT', userWordsApi, wordParam, token);
    else await request('POST', userWordsApi, wordParam, token);
    forceUpdate();
  };

  const setWordDifficult = async () => {
    if (!userId) return;
    const userWordsApi = `${API_URL}/users/${userId}/words/${word.id}`;
    const wordParam = { difficulty: 'difficult' };
    if (word.userWord) await request('PUT', userWordsApi, wordParam, token);
    else await request('POST', userWordsApi, wordParam, token);
    forceUpdate();
  };

  const restoreUserWord = async () => {
    if (!userId) return;
    const userWordsApi = `${API_URL}/users/${userId}/words/${word.id}`;
    await request('DELETE', userWordsApi, false, token);
    forceUpdate();
  };

  if (!word) return (<></>);

  return (
    <Card id="card-details">
      <CardMedia
        className={`${classes.cardImage} word-image`}
        image={`${API_URL}/${word?.image}`}
      />

      <CardContent>
        <div>
          <h2 className="word-word">{word?.word}</h2>
          <h3 className="word-translate">{showTranslate ? word?.wordTranslate : null}</h3>
          <span className="word-transcription">{word?.transcription}</span>
          <IconButton onClick={playWordAudio}><VolumeUpIcon /></IconButton>
        </div>
        {showBtns && viewMode === ViewMode.Textbook && (
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              id="add-in-hard"
              className="userActionButton"
              onClick={setWordDifficult}
            >
              + в сложные слова
            </Button>
            <Button
              size="small"
              variant="outlined"
              id="delete-word"
              className="userActionButton"
              onClick={deleteUserWord}
            >
              удалить слово
            </Button>
          </CardActions>
        )}

        {showBtns && viewMode === ViewMode.Dictionary && (
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              id="restore-word"
              className="userActionButton"
              onClick={restoreUserWord}
            >
              Восстановить
            </Button>
          </CardActions>
        )}

        <div className="word-description">
          <h3 className="word-subheading"> Значение </h3>
          <ReactMarkdown source={word?.textMeaning} />
          <ReactMarkdown source={showTranslate ? word?.textMeaningTranslate : ''} />

          <h3 className="word-subheading">  Пример </h3>
          <ReactMarkdown source={word?.textExample} />
          <ReactMarkdown source={showTranslate ? word?.textExampleTranslate : ''} />

        </div>
        <h3 className="word-subheading sub-answ">
          Ответы в играх
          <DoneIcon />
        </h3>
        <div className="word-game-statistic">
          {/* {gamesStat.map((game) => (
          <GameStat
            key={}
            name={} // Имя игры вида "Оазис"
            right={}
            allTry={}
          />
        ))} */}

          {/* КОГДА БУДУТ ДАННЫЕ, ВСЁ, ЧТО СНИЗУ, СНЕСТИ! */}

          <div className="game-statistic-wrapper">
            <span className="game-name"> Саванна </span>
            <span className="game-stat">
              1 из 3
            </span>
          </div>

          <div className="game-statistic-wrapper">
            <span className="game-name"> Оазис </span>
            <span className="game-stat">
              3 из 3
            </span>
          </div>

          <div className="game-statistic-wrapper">
            <span className="game-name"> Спринт </span>
            <span className="game-stat">
              2 из 4
            </span>
          </div>

          <div className="game-statistic-wrapper">
            <span className="game-name"> Аудивызов </span>

            <span className="game-stat">
              1 из 5
            </span>
          </div>

          {/* ДО СЮДА! */}
        </div>
      </CardContent>
    </Card>
  );
};

export default WordCardDetails;

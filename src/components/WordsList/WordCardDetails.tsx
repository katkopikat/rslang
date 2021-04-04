import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import IconButton from '@material-ui/core/IconButton';
import player from '../../utils/AudioPlayer';
import { IWord } from '../../interfaces';
import { API_URL } from '../../constants';
import request from '../../helpers/request';
import { useAuth } from '../AuthContext';

const useStyles = makeStyles(() => ({
  cardImage: {
    height: 200,
  },
}));

interface IProps {
  word: IWord;
  showTranslate: boolean;
  showBtns: boolean;
}

const WordCardDetails = ({ word, showTranslate, showBtns }: IProps) => {
  const classes = useStyles();
  const { userId, token } = useAuth();

  useEffect(() => {
    if (word) {
      player.updatePlaylist([word.audio, word.audioMeaning, word.audioExample]);
    }
  }, [word]);

  const playWordAudio = () => player.play();

  const deleteUserWord = () => {
    if (!userId) return;
    const userWordsApi = `${API_URL}/users/${userId}/words/${word.id}`;
    const wordParam = { optional: { deleted: true } };
    request('POST', userWordsApi, wordParam, token);
  };

  const setWordDifficult = () => {
    if (!userId) return;
    const userWordsApi = `${API_URL}/users/${userId}/words/${word.id}`;
    const wordParam = { difficulty: 'difficult' };
    request('POST', userWordsApi, wordParam, token);
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
        {showBtns
          ? (
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                id="add-in-hard"
                onClick={setWordDifficult}
              >
                + в сложные слова
              </Button>
              <Button
                size="small"
                variant="outlined"
                id="delete-word"
                onClick={deleteUserWord}
              >
                удалить слово
              </Button>
            </CardActions>
          )
          : null}

        <div className="word-description">
          <h3 className="word-subheading"> Значение </h3>
          <ReactMarkdown source={word?.textMeaning} />
          <ReactMarkdown source={showTranslate ? word?.textMeaningTranslate : ''} />

          <h3 className="word-subheading">  Пример </h3>
          <ReactMarkdown source={word?.textExample} />
          <ReactMarkdown source={showTranslate ? word?.textExampleTranslate : ''} />

        </div>

      </CardContent>
    </Card>
  );
};

export default WordCardDetails;

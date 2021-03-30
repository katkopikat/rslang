import React, { useEffect } from 'react';
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

const useStyles = makeStyles(() => ({
  cardImage: {
    height: 200,
  },
}));

interface IProps {
  word: IWord;
}

const WordCardDetails = ({ word }: IProps) => {
  const classes = useStyles();

  useEffect(() => {
    if (word) {
      player.updatePlaylist([word.audio, word.audioMeaning, word.audioExample]);
    }
  }, [word]);

  const playWordAudio = () => player.play();

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
          <h3 className="word-translate">{word?.wordTranslate}</h3>
          <span className="word-transcription">{word?.transcription}</span>
          <IconButton onClick={playWordAudio}><VolumeUpIcon /></IconButton>
        </div>

        <CardActions>
          <Button size="small" variant="outlined">+ в сложные слова</Button>
          <Button size="small" variant="outlined">удалить слово</Button>
        </CardActions>

        <div className="word-description">
          <h3 className="word-subheading"> Значение </h3>
          <p>
            {word?.textMeaning}
          </p>
          <p>
            {word?.textMeaningTranslate}
          </p>

          <h3 className="word-subheading">  Пример </h3>
          <p>
            {word?.textExample}
          </p>
          <p>
            {word?.textExampleTranslate}
          </p>
        </div>

      </CardContent>
    </Card>
  );
};

export default WordCardDetails;

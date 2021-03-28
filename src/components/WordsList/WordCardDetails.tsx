import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import IconButton from '@material-ui/core/IconButton';
import { IWord } from '../../interfaces';
import { API_URL } from '../../constants';

const useStyles = makeStyles(() => ({
  cardImage: {
    height: 150,
  },
  cardHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  cardText: {
    paddingBottom: 20,
  },
  cardExamples: {
    paddingTop: 20,
  },
}));

interface IProps {
  word: IWord;
}

const WordCardDetails = ({ word }: IProps) => {
  const classes = useStyles();

  const playWordAudio = () => {
    new Audio(`${API_URL}/${word?.audio}`).play();
  };

  if (!word) return (<></>);

  return (
    <Card>
      <CardMedia
        className={classes.cardImage}
        image={`${API_URL}/${word?.image}`}
      />
      <CardContent>
        <div className={classes.cardHeader}>
          <Typography variant="h4">{word?.word}</Typography>
          &nbsp;&nbsp;
          <Typography variant="h6">{word?.transcription}</Typography>
          <IconButton onClick={playWordAudio}><VolumeUpIcon /></IconButton>
        </div>
        <Typography gutterBottom>
          {word?.wordTranslate}
        </Typography>
        <CardActions>
          <Button size="small" variant="outlined">+ в сложные слова</Button>
          <Button size="small" variant="outlined">удалить слово</Button>
        </CardActions>
        <div className={classes.cardExamples}>
          <Divider variant="middle" />
          <Typography gutterBottom variant="body2">{word?.textExample}</Typography>
          <Typography className={classes.cardText} variant="body2">
            {word?.textExampleTranslate}
          </Typography>
          <Divider variant="middle" />
          <Typography gutterBottom variant="body2">{word?.textMeaning}</Typography>
          <Typography variant="body2">{word?.textMeaningTranslate}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordCardDetails;

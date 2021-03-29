import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { IWord } from '../../interfaces';

const useStyles = makeStyles(() => ({
  wordCard: {
    height: 130,
    width: 130,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    overflowWrap: 'break-word',
  },
}));

interface IProps {
  word: IWord;
  onClick: () => void;
}

const WordCardSmall = ({ word, onClick }: IProps) => {
  const classes = useStyles();
  return (
    <Grid item xs key={word.id}>
      <Paper className={classes.wordCard} onClick={onClick}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          {word.word}
        </Typography>
        <Typography align="center">
          {word.wordTranslate}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default WordCardSmall;

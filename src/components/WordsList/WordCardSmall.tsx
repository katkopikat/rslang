import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { IWord } from '../../interfaces';
import './WordCard.scss';

interface IProps {
  word: IWord;
  id: string;
  activeId: string;
  onClick: () => void;
  showTranslate: boolean;
}

const WordCardSmall = ({
  word, activeId, id, onClick, showTranslate,
}: IProps) => {
  // <Paper className={activeId === id ? 'card-word active-word' : 'card-word'} onClick={onClick}>
  const classIfActive = activeId === id ? 'active-word' : '';
  const classIfDifficult = word.userWord?.difficulty === 'difficult' ? 'difficult-word' : '';
  return (
    <Paper
      className={`card-word ${classIfActive} ${classIfDifficult}`}
      onClick={onClick}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {word.word}
      </Typography>
      <Typography>
        {showTranslate ? word.wordTranslate : null}
      </Typography>
    </Paper>
  );
};
export default WordCardSmall;

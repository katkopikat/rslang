import React from 'react';
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
  const classIfActive = activeId === id ? 'active-word' : '';
  const classIfDifficult = word.userWord?.difficulty === 'difficult' ? 'difficult-word' : '';
  return (
    <button
      className={`card-word ${classIfActive} ${classIfDifficult}`}
      onClick={onClick}
      type="button"
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {word.word}
      </Typography>
      <Typography>
        {showTranslate ? word.wordTranslate : null}
      </Typography>
    </button>
  );
};
export default WordCardSmall;

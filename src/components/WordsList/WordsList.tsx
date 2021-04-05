import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import WordCardSmall from './WordCardSmall';
import WordCardDetails from './WordCardDetails';
import { IWord } from '../../interfaces';

interface IProps {
  words: IWord[];
  showBtns: boolean;
  showTranslate: boolean;
}

const WordsList = ({ words = [], showBtns, showTranslate }: IProps) => {
  const [activeWord, setActiveWord] = useState(words[0]);

  useEffect(() => setActiveWord(words[0]), [words]);

  return (
    <Grid container spacing={1}>
      <Grid container item spacing={1} xs={8}>
        { words.map((word) => (
          <WordCardSmall
            word={word}
            activeId={activeWord ? activeWord.id : ''}
            id={word.id}
            onClick={() => setActiveWord(word)}
            key={word.id}
            showTranslate={showTranslate}
          />
        ))}
      </Grid>
      <Grid container item xs={4}>
        <Grid item xs>
          <WordCardDetails word={activeWord} showBtns={showBtns} showTranslate={showTranslate} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WordsList;

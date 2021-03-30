import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import WordCardSmall from './WordCardSmall';
import WordCardDetails from './WordCardDetails';
import { IWord } from '../../interfaces';

interface IProps {
  words: IWord[];
}

const WordsList = ({ words = [] }: IProps) => {
  const [activeWord, setActiveWord] = useState(words[0]);

  useEffect(() => setActiveWord(words[0]), [words]);

  return (
    <Grid container spacing={2}>
      <Grid container item spacing={1} xs={8}>
        { words.map((word) => (
          <WordCardSmall word={word} onClick={() => setActiveWord(word)} key={word.id} />
        ))}
      </Grid>
      <Grid container item spacing={3} xs={4}>
        <Grid item xs>
          <WordCardDetails word={activeWord} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WordsList;

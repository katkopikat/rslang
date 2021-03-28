import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import WordsList from '../WordsList/WordsList';
import { API_URL } from '../../constants';

const Textbook: React.FC = () => {
  const [words, setWords] = useState([]);
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [wordsUrl, setWordsUrl] = useState(`${API_URL}/words?group=${group}&page=${page}`);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    setWordsUrl(`${API_URL}/words?group=${group}&page=${page}`);
  }, [group, page, isLoading]);

  useEffect(() => {
    (async () => {
      setisLoading(true);
      const wordsResponce = await fetch(wordsUrl);
      const wordsResult = await wordsResponce.json();
      setisLoading(false);
      setWords(wordsResult);
    })();
  }, [wordsUrl]);

  const handleGroupChange = (event: React.MouseEvent<HTMLElement>, value: number | null) => {
    if (value === null) return;
    setGroup(value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    <Container>
      <Grid container justify="center" spacing={6}>
        <Grid item>
          <ToggleButtonGroup value={group} exclusive onChange={handleGroupChange}>
            {['easy1', 'easy2', 'medium1', 'medium2', 'hard1', 'hard2']
              .map((groupName, groupIndex) => (
                <ToggleButton value={groupIndex} key={groupName}>{groupName}</ToggleButton>
              ))}
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <WordsList words={words} />
        </Grid>
        <Grid item>
          <Pagination count={30} page={page + 1} onChange={handlePageChange} color="primary" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Textbook;

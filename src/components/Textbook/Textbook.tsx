/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { API_URL } from '../../constants';
import GamesCards from '../GamesCards/GamesCards';
import Levels from '../LevelsCards/Levels';
import Settings from './Settings/Settings';
import WordsList from '../WordsList/WordsList';
import './Textbook.scss';
import { IWord } from '../../interfaces';

interface ITextbook {
  setWordsInGames: (words: IWord[]) => void;
}

const Textbook: React.FC<ITextbook> = ({ setWordsInGames }) => {
  const [words, setWords] = useState([]);
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [wordsUrl, setWordsUrl] = useState(`${API_URL}/words?group=${group}&page=${page}`);
  const [isLoading, setisLoading] = useState(false);
  const [showTranslate, setShowTranslate] = useState(true);
  const [showBtns, setShowBtns] = useState(true);
  const [groupColorClass, setGroupColorClass] = useState('easy1-group');

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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    switch (group) {
      case 1:
        setGroupColorClass('easy2-group');
        break;
      case 2:
        setGroupColorClass('medium1-group');
        break;
      case 3:
        setGroupColorClass('medium2-group');
        break;
      case 4:
        setGroupColorClass('hard1-group');
        break;
      case 5:
        setGroupColorClass('hard2-group');
        break;
      default:
        setGroupColorClass('easy1-group');
        break;
    }
  }, [group]);

  useEffect(() => {
    setWordsInGames(words);
  }, [words]);

  const handleGroupChange = (value: number | null) => {
    if (value === null) return;
    setGroup(value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    // className="pre-publish"
    <Container>

      <div className="main-heading">
        <h1 className="main-heading--active"> Учебник </h1>
        <h1 className="main-heading--unactive"> Словарь </h1>

        <Settings
          showTranslate={showTranslate}
          setShowTranslate={setShowTranslate}
          showBtns={showBtns}
          setShowBtns={setShowBtns}
        />

      </div>
      <h2 className="main-subheading"> Уровни сложности слов </h2>

      <Levels handleGroupChange={handleGroupChange} activeGroup={group} />

      <Grid container justify="center" spacing={6} className={groupColorClass}>

        <Grid item>
          <h1>Слова</h1>
          <WordsList words={words} showTranslate={showTranslate} showBtns={showBtns} />
        </Grid>

        <Grid item>
          <Pagination count={30} page={page + 1} onChange={handlePageChange} color="primary" />
        </Grid>

        <Grid item className="games-card-container">
          <h1>Игры</h1>
          <h3>Закрепи новые слова при помощи игр.</h3>
          <GamesCards />
        </Grid>

      </Grid>
    </Container>
  );
};

export default Textbook;

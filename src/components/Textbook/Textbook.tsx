/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../constants';
import GamesCards from '../GamesCards/GamesCards';
import Levels from '../LevelsCards/Levels';
import Settings from './Settings/Settings';
import WordsList from '../WordsList/WordsList';
import './Textbook.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { fetchWords } from '../../redux/actions/appActions';
import { RootState } from '../../redux/rootReducer';

const Textbook: React.FC = () => {
  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.app.words);

  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [wordsUrl, setWordsUrl] = useState(
    `${API_URL}/words?group=${group}&page=${page}`,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showTranslate, setShowTranslate] = useState(true);
  const [showBtns, setShowBtns] = useState(true);
  const [groupColorClass, setGroupColorClass] = useState('easy1-group');

  useEffect(() => {
    setPage(Number(localStorage.getItem('page')) || 0);
    setGroup(Number(localStorage.getItem('group')) || 0);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    setWordsUrl(`${API_URL}/words?group=${group}&page=${page}`);
  }, [group, page, isLoading]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      dispatch(fetchWords(wordsUrl));
      setIsLoading(false);
    })();
  }, [wordsUrl]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    localStorage.setItem('page', String(page));
    localStorage.setItem('group', String(group));
  }, [group, page]);

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

  const handleGroupChange = (value: number | null) => {
    if (value === null) return;
    setGroup(value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value - 1);
  };

  return (
    // className="pre-publish"
    <div className="header-container">
      <Header />
      <Container>
        <div className="main-heading">
          <button type="button" className="main-heading--active">
            {' '}
            Учебник
            {' '}
          </button>
          <button type="button" className="main-heading--unactive">
            {' '}
            Словарь
            {' '}
          </button>

          <Settings
            showTranslate={showTranslate}
            setShowTranslate={setShowTranslate}
            showBtns={showBtns}
            setShowBtns={setShowBtns}
          />
        </div>
        <h2 className="main-subheading"> Уровни сложности слов </h2>
        <Levels handleGroupChange={handleGroupChange} activeGroup={group} />

        <Grid
          container
          justify="center"
          spacing={6}
          className={groupColorClass}
        >
          <Grid item>
            <h1>Слова</h1>
            <WordsList
              words={words}
              showTranslate={showTranslate}
              showBtns={showBtns}
            />
          </Grid>

          <Grid item>
            <Pagination
              count={30}
              page={page + 1}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>

          <Grid item className="games-card-container">
            <h1>Игры</h1>
            <h3>Закрепи новые слова при помощи игр.</h3>
            <GamesCards />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Textbook;

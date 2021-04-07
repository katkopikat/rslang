/* eslint-disable react/prop-types */
import React, { useState, useEffect, useReducer } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { API_URL, ViewMode } from '../../constants';
import GamesCards from '../GamesCards/GamesCards';
import Levels from '../LevelsCards/Levels';
import LevelCard from '../LevelsCards/LevelCard';
import Settings from './Settings/Settings';
import WordsList from '../WordsList/WordsList';
import { useAuth } from '../AuthContext';
import request from '../../helpers/request';
import './Textbook.scss';
import { IWord } from '../../interfaces';

const wordFilters = {
  excludeDeleted: { 'userWord.optional.isDeleted': { $ne: true } },
  onlyDeleted: { 'userWord.optional.isDeleted': true },
  onlyDifficult: {
    $and: [
      { 'userWord.difficulty': 'difficult' },
      { 'userWord.optional.isDeleted': { $ne: true } }],
  },
  learning: {
    $and: [
      { userWord: { $exists: true } },
      { 'userWord.optional.isDeleted': { $ne: true } }],
  },
};

const userWordsUrl = (userId: string, group: number, page: number, filter = {}) => {
  const filterPage = { page };
  const filterQuery = encodeURIComponent(JSON.stringify({ ...filterPage, ...filter }));
  return `${API_URL}/users/${userId}/aggregatedWords?group=${group}&filter=${filterQuery}&wordsPerPage=0`;
};

enum DictTabs {
  Difficult = 1,
  Deleted,
  Learning,
  HaveLearned,
}

interface ITextbook {
  setWordsInGames: (words: IWord[]) => void;
}

const Textbook: React.FC<ITextbook> = ({ setWordsInGames }) => {
  const { userId, token } = useAuth();
  const [viewMode, setViewMode] = useState(ViewMode.Textbook);
  const [dictActiveTab, setDictActiveTab] = useState(DictTabs.Difficult);
  const [words, setWords] = useState<IWord[]>([]);
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [wordsUrl, setWordsUrl] = useState(`${API_URL}/words?group=${group}&page=${page}`);
  const [isLoading, setisLoading] = useState(false);
  const [showTranslate, setShowTranslate] = useState(true);
  const [showBtns, setShowBtns] = useState(true);
  const [groupColorClass, setGroupColorClass] = useState('easy1-group');
  const [wordsListNeedsUpdate, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setPage(Number(localStorage.getItem('page')) || 0);
    setGroup(Number(localStorage.getItem('group')) || 0);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (userId) {
      if (viewMode === ViewMode.Textbook) {
        setWordsUrl(userWordsUrl(userId, group, page, wordFilters.excludeDeleted));
      } else if (dictActiveTab === DictTabs.Difficult) {
        setWordsUrl(userWordsUrl(userId, group, page, wordFilters.onlyDifficult));
      } else if (dictActiveTab === DictTabs.Deleted) {
        setWordsUrl(userWordsUrl(userId, group, page, wordFilters.onlyDeleted));
      } else if (dictActiveTab === DictTabs.Learning) {
        setWordsUrl(userWordsUrl(userId, group, page, wordFilters.learning));
      }
    } else setWordsUrl(`${API_URL}/words?group=${group}&page=${page}`);
  }, [group, page, isLoading, userId, viewMode, dictActiveTab]);

  useEffect(() => {
    (async () => {
      setisLoading(true);
      // const wordsResponce = await fetch(wordsUrl);
      const wordsResponce = await request('GET', wordsUrl, false, userId ? token : '');
      const wordsResult = await wordsResponce.json();
      setisLoading(false);
      setWords(wordsResult);
    })();
  }, [wordsUrl, token, userId, wordsListNeedsUpdate]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    localStorage.setItem('page', String(page));
    localStorage.setItem('group', String(group));
  }, [group, page]);

  useEffect(() => {
    setWordsInGames(words);
  }, [words]);

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    // className="pre-publish"
    <Container>

      <div className="main-heading">
        <button
          type="button"
          className={`main-heading--${viewMode === ViewMode.Textbook ? 'active' : 'unactive'}`}
          onClick={() => setViewMode(ViewMode.Textbook)}
        >
          Учебник
        </button>
        <button
          type="button"
          className={`main-heading--${viewMode === ViewMode.Dictionary ? 'active' : 'unactive'}`}
          onClick={() => userId && setViewMode(ViewMode.Dictionary)}
        >
          Словарь
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

      {viewMode === ViewMode.Dictionary && (
        <div className="levels-wrapper">
          <LevelCard
            name="Сложные"
            words=""
            abbr="C"
            level={DictTabs.Difficult}
            activeGroup={dictActiveTab}
            handleGroupChange={() => setDictActiveTab(DictTabs.Difficult)}
          />
          <LevelCard
            name="Удаленные"
            words=""
            abbr="У"
            level={DictTabs.Deleted}
            activeGroup={dictActiveTab}
            handleGroupChange={() => setDictActiveTab(DictTabs.Deleted)}
          />
          <LevelCard
            name="Изучаемые"
            words=""
            abbr="И"
            level={DictTabs.Learning}
            activeGroup={dictActiveTab}
            handleGroupChange={() => setDictActiveTab(DictTabs.Learning)}
          />
        </div>
      )}

      <Grid container justify="center" spacing={6} className={groupColorClass}>

        <Grid item>
          <h1>Слова</h1>
          <WordsList
            words={words}
            showTranslate={showTranslate}
            showBtns={showBtns}
            forceUpdate={forceUpdate}
            viewMode={viewMode}
          />
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

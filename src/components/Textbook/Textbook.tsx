/* eslint-disable react/prop-types */
import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { API_URL, ViewMode } from '../../constants';
import { useAuth } from '../AuthContext';
import { fetchWords } from '../../redux/actions/appActions';
import { RootState } from '../../redux/rootReducer';
import WordsList from '../WordsList/WordsList';
import GamesCards from '../GamesCards/GamesCards';
import Levels from '../LevelsCards/Levels';
import LevelCard from '../LevelsCards/LevelCard';
import Settings from './Settings/Settings';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Textbook.scss';

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

const groupClasses: Array<string> = [
  'easy1-group',
  'easy2-group',
  'medium1-group',
  'medium2-group',
  'hard1-group',
  'hard2-group',
];

enum DictTabs {
  Difficult = 1,
  Deleted,
  Learning,
  HaveLearned,
}

const Textbook: React.FC = () => {
  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.app.words);
  const { userId, token } = useAuth();
  const [viewMode, setViewMode] = useState(ViewMode.Textbook);
  const [dictActiveTab, setDictActiveTab] = useState(DictTabs.Difficult);
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [wordsUrl, setWordsUrl] = useState(
    `${API_URL}/words?group=${group}&page=${page}`,
  );
  const [isLoading, setIsLoading] = useState(false);
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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      dispatch(fetchWords(wordsUrl, userId ? token : ''));
      setIsLoading(false);
      // setisLoading(true);
      // // const wordsResponce = await fetch(wordsUrl);
      // const wordsResponce = await request('GET', wordsUrl, false, userId ? token : '');
      // const wordsResult = await wordsResponce.json();
      // setisLoading(false);
      // setWords(wordsResult);
    })();
  }, [wordsUrl, token, userId, wordsListNeedsUpdate]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    localStorage.setItem('page', String(page));
    localStorage.setItem('group', String(group));
  }, [group, page]);

  useEffect(() => {
    setGroupColorClass(groupClasses[group]);
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
    <>
      <Header />
      <div className="textbook wrapper">
        <div className="textbook__heading">
          <button
            type="button"
            className={`textbook__heading-${viewMode === ViewMode.Textbook ? 'active' : 'unactive'}`}
            onClick={() => setViewMode(ViewMode.Textbook)}
          >
            Учебник
          </button>
          <button
            type="button"
            className={`textbook__heading-${viewMode === ViewMode.Dictionary ? 'active' : 'unactive'}`}
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
        <h2 className="textbook__subheading"> Уровни сложности слов </h2>
        <Levels handleGroupChange={handleGroupChange} activeGroup={group} />

        {viewMode === ViewMode.Dictionary && (
        <div className="textbook__levels levels-wrapper levels-status">
          <LevelCard
            name="Сложные"
            words="Слов: 17"
            abbr="C"
            level={DictTabs.Difficult}
            activeGroup={dictActiveTab}
            handleGroupChange={() => setDictActiveTab(DictTabs.Difficult)}
          />
          <LevelCard
            name="Удаленные"
            words="Cлов: 134"
            abbr="У"
            level={DictTabs.Deleted}
            activeGroup={dictActiveTab}
            handleGroupChange={() => setDictActiveTab(DictTabs.Deleted)}
          />
          <LevelCard
            name="Изучаемые"
            words="Слов: 68"
            abbr="И"
            level={DictTabs.Learning}
            activeGroup={dictActiveTab}
            handleGroupChange={() => setDictActiveTab(DictTabs.Learning)}
          />
        </div>
        )}

        <div className={groupColorClass}>
          <h1>Слова</h1>
          <WordsList
            words={words}
            showTranslate={showTranslate}
            showBtns={showBtns}
            forceUpdate={forceUpdate}
            viewMode={viewMode}
          />
          <Pagination
            className="textbook__pagination"
            count={30}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
          />
          <div className="games-card__container">
            <h1>Игры</h1>
            <h3>Закрепи новые слова при помощи игр.</h3>
            <GamesCards />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Textbook;

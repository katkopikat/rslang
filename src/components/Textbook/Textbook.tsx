/* eslint-disable react/prop-types */
import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { ViewMode, DictTabs } from '../../constants';
import { useAuth } from '../AuthContext';
import { setGroup, setPage, setDictActiveTab } from '../../redux/actions/appActions';
import wordsApi from '../../redux/actions/wordsApiActions';
import { RootState } from '../../redux/rootReducer';
import WordsList from '../WordsList/WordsList';
import GamesCards from '../GamesCards/GamesCards';
import Levels from '../LevelsCards/Levels';
import LevelCard from '../LevelsCards/LevelCard';
import Settings from './Settings/Settings';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Textbook.scss';

const groupClasses: Array<string> = [
  'easy1-group',
  'easy2-group',
  'medium1-group',
  'medium2-group',
  'hard1-group',
  'hard2-group',
];

const Textbook: React.FC = () => {
  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.app.words);
  const group = useSelector((state: RootState) => state.app.group);
  const page = useSelector((state: RootState) => state.app.page);
  const paginationCount = useSelector((state: RootState) => state.app.paginationCount);
  const dictActiveTab = useSelector((state: RootState) => state.app.dictActiveTab);
  const deletedWordsCount = useSelector((state: RootState) => state.app.deletedWordsCount);
  const difficultWordsCount = useSelector((state: RootState) => state.app.difficultWordsCount);
  const learningWordsCount = useSelector((state: RootState) => state.app.learningWordsCount);
  const { userId, token } = useAuth();
  const [viewMode, setViewMode] = useState(ViewMode.Textbook);
  const [showTranslate, setShowTranslate] = useState(true);
  const [showBtns, setShowBtns] = useState(true);
  const [groupColorClass, setGroupColorClass] = useState('easy1-group');
  const [wordsListNeedsUpdate, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // setPage(Number(localStorage.getItem('page')) || 0);
    // setGroup(Number(localStorage.getItem('group')) || 0);
    dispatch(setGroup(Number(localStorage.getItem('group')) || 0));
    dispatch(setPage(Number(localStorage.getItem('page')) || 0));
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      if (viewMode === ViewMode.Textbook) {
        // setWordsUrl(userWordsUrl(userId, group, page, wordFilters.excludeDeleted));
        dispatch(wordsApi.fetchForUserTextbook(group, page, userId, token));
      } else if (dictActiveTab === DictTabs.Difficult) {
        dispatch(wordsApi.fetchDifficult(group, page, userId, token));
        dispatch(wordsApi.fetchFilteredCounts(userId, token));
      } else if (dictActiveTab === DictTabs.Deleted) {
        dispatch(wordsApi.fetchDeleted(group, page, userId, token));
        dispatch(wordsApi.fetchFilteredCounts(userId, token));
      } else if (dictActiveTab === DictTabs.Learning) {
        dispatch(wordsApi.fetchLearning(group, page, userId, token));
        dispatch(wordsApi.fetchFilteredCounts(userId, token));
      }
    } else {
      dispatch(wordsApi.fetchForAnonTextbook(group, page));
    }
  }, [group, page, userId, token, viewMode, dictActiveTab, wordsListNeedsUpdate, dispatch]);

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
    dispatch(setGroup(value));
    dispatch(setPage(0));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    dispatch(setPage(value - 1));
  };

  return (
    <>
      <Header />
      <div className="textbook wrapper">
        <div className="textbook__heading">
          <button
            type="button"
            className={`textbook__heading-${viewMode === ViewMode.Textbook ? 'active' : 'unactive'}`}
            onClick={() => {
              setViewMode(ViewMode.Textbook);
              dispatch(setPage(0));
            }}
          >
            Учебник
          </button>
          {userId && (
          <button
            type="button"
            className={`textbook__heading-${viewMode === ViewMode.Dictionary ? 'active' : 'unactive'}`}
            onClick={() => {
              setViewMode(ViewMode.Dictionary);
              dispatch(setPage(0));
            }}
          >
            Словарь
          </button>
          )}

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
            name="Изучаемые"
            words={`Слов: ${learningWordsCount}`}
            abbr="И"
            level={DictTabs.Learning}
            activeGroup={dictActiveTab}
            handleGroupChange={() => {
              dispatch(setDictActiveTab(DictTabs.Learning));
              dispatch(setPage(0));
            }}
          />
          <LevelCard
            name="Сложные"
            words={`Слов: ${difficultWordsCount}`}
            abbr="C"
            level={DictTabs.Difficult}
            activeGroup={dictActiveTab}
            handleGroupChange={() => {
              dispatch(setDictActiveTab(DictTabs.Difficult));
              dispatch(setPage(0));
            }}
          />
          <LevelCard
            name="Удаленные"
            words={`Слов: ${deletedWordsCount}`}
            abbr="У"
            level={DictTabs.Deleted}
            activeGroup={dictActiveTab}
            handleGroupChange={() => {
              dispatch(setDictActiveTab(DictTabs.Deleted));
              dispatch(setPage(0));
            }}
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
          { words.length > 0 && (
          <Pagination
            className="textbook__pagination"
            count={paginationCount}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
            // renderItem={(item) => {
            //   console.log(item);
            //   if (item.page === 3 && item.type === 'page') return null;
            //   return <PaginationItem {...item} />;
            // }}
          />
          )}
          <div className={`games-card__container ${words.length ? '' : 'games-card-inactive'}`}>
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

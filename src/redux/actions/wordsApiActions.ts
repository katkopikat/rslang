import request from '../../helpers/request';
import { API_URL, WORDS_PER_PAGE } from '../../constants';
import {
  setWords,
  // setPage,
  setAdditionalWords,
  setAdditionalAnswerOptions,
  setPaginationCount,
  setPaginationPages,
  setLearningWordsCount,
  setDeletedWordsCount,
  setDifficultWordsCount,
  setAdditionalWordsForSprint,
} from './appActions';

const wordFilters = {
  excludeDeleted: { 'userWord.optional.isDeleted': { $ne: true } },
  onlyDeleted: { 'userWord.optional.isDeleted': true },
  onlyDifficult: {
    $and: [
      { 'userWord.difficulty': 'difficult' },
      { 'userWord.optional.isDeleted': { $ne: true } },
    ],
  },
  learning: {
    $and: [
      { userWord: { $exists: true } },
      { 'userWord.optional.isDeleted': { $ne: true } },
    ],
  },
};

const composeUrl = (
  userId: string,
  group: number,
  page: number,
  filter = {},
) => {
  const filterQuery = encodeURIComponent(JSON.stringify(filter));
  const apiQueryParams = `group=${group}&page=${page}&filter=${filterQuery}&wordsPerPage=${WORDS_PER_PAGE}`;
  return `${API_URL}/users/${userId}/aggregatedWords?${apiQueryParams}`;
};

const fetchForAnonTextbook = (group: number, page: number) => async (
  dispatch: any,
) => {
  const url = `${API_URL}/words?group=${group}&page=${page}`;
  const response = await request('GET', url);
  const words = await response.json();
  dispatch(setWords(words));
  dispatch(setPaginationCount(30));
};

const fetchForAdditionalAnswerOptions = (group: number, page: number) => async (
  dispatch: any,
) => {
  const url = `${API_URL}/words?group=${group}&page=${page}`;
  const response = await request('GET', url);
  const words = await response.json();
  dispatch(setAdditionalAnswerOptions(words));
};

const fetchForUserTextbook = (
  group: number,
  page: number,
  userId: string,
  token: string,
) => (
  async (dispatch: any) => {
    // const filterQuery = encodeURIComponent(JSON.stringify(
    //   { page, ...wordFilters.excludeDeleted },
    // ));
    // const apiQueryParams = `group=${group}&filter=${filterQuery}&wordsPerPage=0`;
    // const { app: { paginationPages } } = getState();
    // const realPage = paginationPages[page]?.page || page;
    const apiQueryParams = `group=${group}&page=${page}`;
    const url = `${API_URL}/users/${userId}/aggregatedWords/forTextbook?${apiQueryParams}`;
    // const url = `${API_URL}/users/${userId}/aggregatedWords?${apiQueryParams}`;
    const [words] = await (await request('GET', url, false, token)).json();

    dispatch(setWords(words.words));
    // dispatch(setWords(words));
    dispatch(setPaginationCount(30));
    dispatch(setPaginationPages(words.pagination));
  }
);

const fetchAdditionalWordsForGame = (
  group: number,
  page: number,
  userId: string,
  token: string,
) => async (dispatch: any) => {
  const filterQuery = encodeURIComponent(
    JSON.stringify({ page, ...wordFilters.excludeDeleted }),
  );
  const apiQueryParams = `group=${group}&filter=${filterQuery}&wordsPerPage=0`;
  const url = `${API_URL}/users/${userId}/aggregatedWords?${apiQueryParams}`;
  const words = await (await request('GET', url, false, token)).json();
  dispatch(setAdditionalWords(words));
};

const fetchFiltered = (
  group: number,
  page: number,
  userId: string,
  token: string,
  filter = {},
) => async (dispatch: any) => {
  const url = composeUrl(userId, group, page, filter);
  const [words] = await (await request('GET', url, false, token)).json();
  const [wordsTotal] = words.totalCount;
  dispatch(setWords(words.paginatedResults));
  dispatch(
    setPaginationCount(Math.ceil((wordsTotal?.count || 0) / WORDS_PER_PAGE)),
  );
};

const fetchDeleted = (
  group: number,
  page: number,
  userId: string,
  token: string,
) => fetchFiltered(group, page, userId, token, wordFilters.onlyDeleted);

const fetchDifficult = (
  group: number,
  page: number,
  userId: string,
  token: string,
) => fetchFiltered(group, page, userId, token, wordFilters.onlyDifficult);

const fetchLearning = (
  group: number,
  page: number,
  userId: string,
  token: string,
) => fetchFiltered(group, page, userId, token, wordFilters.learning);

const fetchFilteredCounts = (userId: string, token: string) => async (
  dispatch: any,
  getState: any,
) => {
  const {
    app: { group },
  } = getState();
  const url = `${API_URL}/users/${userId}/aggregatedWords/stat?group=${group}`;
  const [counts] = await (await request('GET', url, false, token)).json();
  const [deleted] = counts.deletedCount;
  const [difficult] = counts.difficultCount;
  const [learning] = counts.learningCount;
  dispatch(setDeletedWordsCount(deleted?.count || 0));
  dispatch(setDifficultWordsCount(difficult?.count || 0));
  dispatch(setLearningWordsCount(learning?.count || 0));
};

const fetchForAdditionalWordsSprintAnon = (
  group: number,
  page: number,
) => async (dispatch: any) => {
  const url = `${API_URL}/words?group=${group}&page=${page}`;
  const response = await request('GET', url);
  const words = await response.json();
  dispatch(setAdditionalWordsForSprint(words));
};

const fetchForAdditionalWordsSprintUser = (
  group: number,
  page: number,
  userId: string,
  token: string,
) => async (dispatch: any) => {
  const filterQuery = encodeURIComponent(
    JSON.stringify({ page, ...wordFilters.excludeDeleted }),
  );
  const apiQueryParams = `group=${group}&filter=${filterQuery}&wordsPerPage=0`;
  const url = `${API_URL}/users/${userId}/aggregatedWords?${apiQueryParams}`;
  const words = await (await request('GET', url, false, token)).json();
  dispatch(setAdditionalWordsForSprint(words));
};

export default {
  fetchForAnonTextbook,
  fetchForUserTextbook,
  fetchDeleted,
  fetchLearning,
  fetchDifficult,
  fetchFilteredCounts,
  fetchAdditionalWordsForGame,
  fetchForAdditionalAnswerOptions,
  fetchForAdditionalWordsSprintAnon,
  fetchForAdditionalWordsSprintUser,
};

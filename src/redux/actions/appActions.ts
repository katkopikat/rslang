import request from '../../helpers/request';
import { DictTabs, ViewMode } from '../../constants';
import {
  SET_WORDS,
  SET_IS_LEVEL,
  SET_GAME_INDEX,
  SET_PAGINATION_COUNT,
  SET_PAGE,
  SET_GROUP,
  SET_DICT_TAB,
  SET_DELETED_WORDS_COUNT,
  SET_DIFFICULT_WORDS_COUNT,
  SET_LEARNING_WORDS_COUNT,
  SET_ADDITIONAL_WORDS,
  SET_ADDITIONAL_ANSWER_OPTIONS,
  SET_VIEW_MODE,
} from '../types';

export const setWords = (words: any) => ({
  type: SET_WORDS,
  payload: words,
});

export const setAdditionalWords = (words: any) => ({
  type: SET_ADDITIONAL_WORDS,
  payload: words,
});

export const setAdditionalAnswerOptions = (words: any) => ({
  type: SET_ADDITIONAL_ANSWER_OPTIONS,
  payload: words,
});

export const fetchWords = (url: string, token: string = '') => async (dispatch: any) => {
  const response = await request('GET', url, false, token);
  const words = await response.json();
  dispatch(setWords(words));
};

export const setStartGameFromMenu = (startGameFromMenu: boolean) => ({
  type: SET_IS_LEVEL,
  value: startGameFromMenu,
});

export const setGameIndex = (index: number) => ({
  type: SET_GAME_INDEX,
  value: index,
});

export const setPage = (value: number) => ({
  type: SET_PAGE,
  value,
});

export const setGroup = (value: number) => ({
  type: SET_GROUP,
  value,
});

export const setPaginationCount = (value: number) => ({
  type: SET_PAGINATION_COUNT,
  value,
});

export const setDictActiveTab = (value: DictTabs) => ({
  type: SET_DICT_TAB,
  value,
});

export const setViewMode = (value: ViewMode) => ({
  type: SET_VIEW_MODE,
  value,
});

export const setDeletedWordsCount = (value: number) => ({
  type: SET_DELETED_WORDS_COUNT,
  value,
});

export const setDifficultWordsCount = (value: number) => ({
  type: SET_DIFFICULT_WORDS_COUNT,
  value,
});

export const setLearningWordsCount = (value: number) => ({
  type: SET_LEARNING_WORDS_COUNT,
  value,
});

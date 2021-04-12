import { DictTabs } from '../../constants';
import {
  SET_WORDS,
  SET_IS_LEVEL,
  SET_GAME_INDEX,
  SET_GROUP,
  SET_PAGE,
  SET_PAGINATION_COUNT,
  SET_DICT_TAB,
  SET_DIFFICULT_WORDS_COUNT,
  SET_DELETED_WORDS_COUNT,
  SET_LEARNING_WORDS_COUNT,
} from '../types';

interface IAction {
  type: string;
  value?: any;
  payload?: any;
}

const initialState = {
  words: [],
  isLevel: true,
  gameIndex: 0,
  page: 0,
  group: 0,
  paginationCount: 30,
  dictActiveTab: DictTabs.Difficult,
  difficultWordsCount: 0,
  deletedWordsCount: 0,
  learningWordsCount: 0,
};

const appReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_WORDS:
      return {
        ...state,
        words: action.payload,
      };
    case SET_IS_LEVEL:
      return {
        ...state,
        isLevel: action.value,
      };
    case SET_GAME_INDEX:
      return {
        ...state,
        gameIndex: action.value,
      };
    case SET_GROUP:
      return {
        ...state,
        group: action.value,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.value,
      };
    case SET_PAGINATION_COUNT:
      return {
        ...state,
        paginationCount: action.value,
      };
    case SET_DICT_TAB:
      return {
        ...state,
        dictActiveTab: action.value,
      };
    case SET_DIFFICULT_WORDS_COUNT:
      return {
        ...state,
        difficultWordsCount: action.value,
      };
    case SET_DELETED_WORDS_COUNT:
      return {
        ...state,
        deletedWordsCount: action.value,
      };
    case SET_LEARNING_WORDS_COUNT:
      return {
        ...state,
        learningWordsCount: action.value,
      };

    default:
      return state;
  }
};

export default appReducer;

import request from '../../helpers/request';
import { SET_WORDS, SET_IS_LEVEL } from '../types';

export const setWords = (words: any) => ({
  type: SET_WORDS,
  payload: words,
});

export const fetchWords = (url: string, token: string = '') => async (dispatch: any) => {
  const response = await request('GET', url, false, token);
  const words = await response.json();
  dispatch(setWords(words));
};

export const setIsLevel = (isLevel: boolean) => ({
  type: SET_IS_LEVEL,
  value: isLevel,
});

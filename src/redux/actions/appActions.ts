import { SET_WORDS, SET_IS_LEVEL } from '../types';
import { IWord } from '../../interfaces';

export const setWords = (words: IWord[]) => ({
  type: SET_WORDS,
  payload: words,
});

export const fetchWords = (url: string) => async (dispatch: any) => {
  const response = await fetch(url);
  const words = await response.json();
  dispatch(setWords(words));
};

export const setIsLevel = (isLevel: boolean) => ({
  type: SET_IS_LEVEL,
  value: isLevel,
})

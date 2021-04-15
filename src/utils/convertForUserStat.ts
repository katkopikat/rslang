import { IStatItem } from '../api';

export const getDatesList = (array:IStatItem[]) => array.map((item) => new Date(item.date)
  .toLocaleDateString());

export const getWordsListByDay = (array:IStatItem[]) => array.map((item) => item.newWords);

export const getAllWordsList = (array:IStatItem[]) => array.map((item) => item.allWords);

import {
  getDatesList,
  getWordsListByDay,
  getAllWordsList,
} from '../utils/convertForUserStat';

const standardUserStatItem = {
  date: new Date(),
  newWords: 0,
  allWords: 0,
};

const realCase = JSON.parse('[{"date":"2021-04-12T07:24:04.577Z","newWords":40,"allWords":40},{"date":"2021-04-13T07:25:38.504Z","newWords":74,"allWords":114},{"date":"2021-04-13T22:51:23.956Z","newWords":78,"allWords":192}]');

const errorCase = {
  date: new Date('sad'),
  newWords: null,
  allWords: null,
};

const firstCase = {
  date: new Date(122421),
  newWords: 12,
  allWords: 15,
};

const secondCase = {};

it('check getDatesList func', () => {
  expect(getDatesList([standardUserStatItem])).not.toContain('Invalid Date');
  expect(getDatesList([
    standardUserStatItem,
    standardUserStatItem,
    standardUserStatItem,
  ]).length).toBe(3);
  expect(getDatesList([errorCase])).toContain('Invalid Date');
  expect(getDatesList(realCase).length).toBe(3);
  expect(getDatesList([firstCase])).not.toContain('Invalid Date');
  expect(getDatesList([secondCase])).toContain('Invalid Date');
});

it('check getWordsListByDay func', () => {
  expect(getWordsListByDay([standardUserStatItem])).not.toContain('Invalid Date');
  expect(getWordsListByDay([
    standardUserStatItem,
    standardUserStatItem,
    standardUserStatItem,
  ]).length).toBe(3);
  expect(getWordsListByDay([errorCase])).toContain(null);
  expect(getWordsListByDay(realCase)).toEqual([40, 74, 78]);
  expect(Array.isArray(getWordsListByDay([firstCase]))).toBe(true);
  expect(getWordsListByDay([secondCase])).toContain(undefined);
});

it('check getAllWordsList func', () => {
  expect(getAllWordsList([standardUserStatItem])).not.toContain('Invalid Date');
  expect(getAllWordsList([
    standardUserStatItem,
    standardUserStatItem,
    standardUserStatItem,
  ]).length).toBe(3);
  expect(getAllWordsList([errorCase])).toContain(null);
  expect(getAllWordsList(realCase)).toEqual([40, 114, 192]);
  expect(Array.isArray(getAllWordsList([firstCase]))).toBe(true);
  expect(getAllWordsList([secondCase])).toContain(undefined);
});

it('check empty parameters', () => {
  expect(getAllWordsList([])).not.toContain('Invalid Date');
  expect(getAllWordsList([]).length).toBe(0);
  expect(Array.isArray(getAllWordsList([]))).toBe(true);
  expect(getDatesList([{}])).toContain('Invalid Date');
});

import getUniqWords from '../utils/checkUniq';

const mainArray = [1, 2, 3, 4, 5, 10, 12];

it('checkUniq return array', () => {
  const testArray1 = [];
  const testArray2 = Array(15).fill().map((item, index) => index);
  const testArray3 = Array(0).fill().map((item, index) => index);

  expect(Array.isArray(getUniqWords(mainArray, testArray1))).toBe(true);
  expect(Array.isArray(getUniqWords(mainArray, testArray2))).toBe(true);
  expect(Array.isArray(getUniqWords(mainArray, testArray3))).toBe(true);
});

it('checkUniq empty array', () => {
  const testArray = [];

  expect(getUniqWords(mainArray, testArray)).toEqual([]);
  expect(getUniqWords(mainArray, testArray)).toStrictEqual([]);
  expect(Array.isArray(getUniqWords(mainArray, testArray))).toBe(true);
  expect(getUniqWords(mainArray, testArray).length).toEqual(0);
});

it('checkUniq test', () => {
  const testArray1 = [];
  const testArray2 = Array(15).fill().map((item, index) => index);
  const testArray3 = Array(0).fill().map((item, index) => index);

  expect(getUniqWords(mainArray, testArray1)).toEqual([]);
  expect(getUniqWords(mainArray, testArray2)).toStrictEqual([0, 6, 7, 8, 9, 11, 13, 14]);
  expect(getUniqWords(mainArray, testArray3)).toStrictEqual([]);
  expect(Array.isArray(getUniqWords(mainArray, testArray2))).toBe(true);
  expect(getUniqWords(testArray1, mainArray)).toEqual(mainArray);
});

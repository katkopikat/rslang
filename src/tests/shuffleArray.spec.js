import shuffle from '../helpers/shuffleArray';

it('shuffle array', () => {
  const testArray1 = Array(100).fill().map((item, index) => index);
  const testArray2 = Array(100).fill().map((item, index) => index);
  const testArray3 = Array(100).fill().map((item, index) => index);
  const result1 = shuffle(testArray1);
  const result2 = shuffle(testArray2);
  const result3 = shuffle(testArray3);

  expect(result1).not.toEqual(testArray1);
  expect(result2).not.toEqual(testArray2);
  expect(result3).not.toEqual(testArray3);
});

it('return the same', () => {
  expect(shuffle([1])).toEqual([1]);
  expect(shuffle(['1'])).toEqual(['1']);
  expect(shuffle([{ 1: 10 }])).toEqual([{ 1: 10 }]);
  expect(shuffle([{}])).toEqual([{}]);
});

it('error', () => {
  expect(() => shuffle(undefined)).toThrowError(TypeError);
  expect(() => shuffle('asd')).toThrowError(TypeError);
  expect(() => shuffle({})).toThrowError(TypeError);
});

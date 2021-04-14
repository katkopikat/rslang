const getUniqWords = (main:string[], check:string[]) => {
  let result: string[] = [];
  check.forEach((item) => {
    if (main.includes(item) === false) result = [...result, item];
  });
  return result;
};

export default getUniqWords;

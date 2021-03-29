const shuffleArray = (array: any) => {
  const copyArray = array.slice(0);
  for (let i: number = 0; i < array.length; i += 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = copyArray[i];
    copyArray[i] = copyArray[randomIndex];
    copyArray[randomIndex] = temp;
  }
  return copyArray;
};

export default shuffleArray;

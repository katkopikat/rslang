const shuffle = (array: any) => {
  const copyArray = array.slice(0);
  for (let i: number = 0; i < array.length; i++) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = copyArray[i];
    copyArray[i] = copyArray[randomIndex];
    copyArray[randomIndex] = temp;
  }

  return copyArray;
};

export default shuffle;
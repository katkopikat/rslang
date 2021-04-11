import request from './helpers/request';
import { API_URL_USERS } from './constants';
import { IWord } from './interfaces';

const deepClone = require('rfdc/default');

enum GameNames {
  sprint = 'sprint',
  savanna = 'savanna',
  oasis = 'oasis',
  audioCall = 'audioCall',
}

interface IOptionalGame {
  right: number
  wrong: number
}

type IGames = {
  [key in GameNames]: IOptionalGame;
};

interface IOptionalWord {
  isDeleted: boolean;
  addTime: Date;
  allTry: number;
  games: IGames;
  // games: { [key: string]: IOptionalGame };
}

interface IWordBody {
  difficulty: string,
  optional: IOptionalWord
}

interface ILSStatisticOptionalGames extends IOptionalGame {
  rightPercent: number;
  bestSeries: number;
  newWords: number;
  wordsList: IWord[];
}
interface ILSStatistic {
  date: Date,
  allGamesRight: number;
  allGamesWrong: number;
  allGamesRightPercent: number;
  wordsList: IWord[];
  allNewWords: number;
  games: {[key in GameNames] : ILSStatisticOptionalGames};
}

const standartLSStatistic: ILSStatistic = {
  date: new Date(),
  allGamesRight: 0,
  allGamesWrong: 0,
  allGamesRightPercent: 0,
  wordsList: [],
  allNewWords: 0,
  games: {
    sprint: {
      rightPercent: 0,
      bestSeries: 0,
      right: 0,
      wrong: 0,
      newWords: 0,
      wordsList: [],
    },
    savanna: {
      rightPercent: 0,
      bestSeries: 0,
      right: 0,
      wrong: 0,
      newWords: 0,
      wordsList: [],
    },
    oasis: {
      rightPercent: 0,
      bestSeries: 0,
      right: 0,
      wrong: 0,
      newWords: 0,
      wordsList: [],
    },
    audioCall: {
      rightPercent: 0,
      bestSeries: 0,
      right: 0,
      wrong: 0,
      newWords: 0,
      wordsList: [],
    },
  },
};

// TODO use games for auth statistic

const standartBody: IWordBody = {
  difficulty: 'hard',
  optional: {
    isDeleted: false,
    addTime: new Date(),
    games: {
      sprint: {
        right: 0,
        wrong: 0,
      },
      savanna: {
        right: 0,
        wrong: 0,
      },
      oasis: {
        right: 0,
        wrong: 0,
      },
      audioCall: {
        right: 0,
        wrong: 0,
      },
    },
    allTry: 0,
  },
};

export const createUserWord = async (
  word:IWord,
  difficulty:string,
  game:string,
  isCorrect:boolean,
): Promise<Response|boolean> => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const { id: wordId } = word;
  const body:IWordBody = deepClone(standartBody);
  // const body = {
  //   ...standartBody,
  //   optional: {
  //     ...standartBody.optional,
  //     games: {
  //       ...standartBody.optional.games,
  //       [GameNames.sprint]: {
  //         standartBody.optional.games[GameNames.sprint].right,
  //         standartBody.optional.games[GameNames.sprint].wrong,
  //       },
  //       [GameNames.savanna]: {
  //         standartBody.optional.games[GameNames.savanna].right,
  //         standartBody.optional.games[GameNames.savanna].wrong,
  //       },
  //       [GameNames.oasis]: {
  //         standartBody.optional.games[GameNames.oasis].right,
  //         standartBody.optional.games[GameNames.oasis].wrong,
  //       },
  //       [GameNames.audioCall]: {
  //         standartBody.optional.games[GameNames.audioCall].right,
  //         standartBody.optional.games[GameNames.audioCall].wrong,
  //       },
  //     }
  //   },
  // };
  body.difficulty = difficulty;
  const currentGame = GameNames[game as keyof typeof GameNames];
  if (isCorrect) {
    body.optional.games[currentGame].right += 1;
    body.optional.games[currentGame].right += 1;
  } else {
    body.optional.games[currentGame].wrong += 1;
  }
  body.optional.allTry += 1;
  if (token) {
    try {
      const data = await request('POST', `${API_URL_USERS}/${userId}/words/${wordId}`, body, token);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  throw new Error('auth error');
};

export const updateUserWord = async (
  word:IWord,
  game:string,
  isCorrect:boolean,
  oldBody:IWordBody,
): Promise<Response|boolean> => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const { id: wordId } = word;
  const body = deepClone(oldBody);
  const currentGame = GameNames[game as keyof typeof GameNames];
  if (isCorrect) {
    body.optional.games[currentGame].right += 1;
  } else {
    body.optional.games[currentGame].wrong += 1;
  }
  body.optional.addTime = new Date();
  body.optional.allTry += 1;
  if (token) {
    try {
      const data = await request('PUT', `${API_URL_USERS}/${userId}/words/${wordId}`, body, token);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  throw new Error('auth error');
};

export const getUserWord = async (
  word:IWord,
  userId: string,
  token: string,
): Promise<Response|boolean> => {
  const { id: wordId } = word;
  if (token) {
    try {
      const data = await request('GET', `${API_URL_USERS}/${userId}/words/${wordId}`, false, token);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  return false;
};

export const setUserWord = async (
  word:IWord,
  // difficultyGame:string,
  game:string,
  isCorrect:boolean,
) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  if (token && userId) {
    const getWordResult = await getUserWord(word, userId, token);
    if (typeof getWordResult !== 'boolean' && getWordResult.ok) {
      const oldResult = deepClone(await getWordResult.json());
      delete oldResult.id;
      delete oldResult.wordId;
      // const pickedResult:IWordBody =
      // ({difficulty, optional} = oldResult, {difficulty, optional});
      const data = await updateUserWord(
        word,
        // difficulty,
        game,
        isCorrect,
        oldResult,
      );
      return data;
    }
    const data = await createUserWord(
      word,
      'studied',
      game,
      isCorrect,
    );
    return data;
  }
  return null;
};

const isToday = (checkDate:Date) => {
  const today = new Date();
  return checkDate.getDate() === today.getDate()
  && checkDate.getMonth() === today.getMonth()
  && checkDate.getFullYear() === today.getFullYear();
};

const getLSStatistic = ():ILSStatistic|undefined => {
  const item = localStorage.getItem('statistic');
  if (typeof item === 'string') {
    const result = JSON.parse(item);
    const dateLS = new Date(result.date);
    if (isToday(dateLS)) return result;
    localStorage.removeItem('statistic');
  }
  return undefined;
};

const updateLSStatistic = (item:ILSStatistic) => {
  localStorage.setItem('statistic', JSON.stringify(item));
};

const isNewWord = (
  searchWord: IWord,
  array: IWord[],
) => array.find((item) => item.id === searchWord.id);

export const setLSStatistic = (
  gameName: string,
  correctAnswers: IWord[],
  wrongAnswers: IWord[],
  bestStreak: number,
) => {
  const lastLSStat = getLSStatistic();
  if (lastLSStat) {
    const {
      allGamesRight: lastAllGameRigh,
      allGamesWrong: lastAllGameWrong,
      allNewWords: lastAllNewWords,
      wordsList: newWordList,
    } = lastLSStat;
    const allGameWords = [...correctAnswers, ...wrongAnswers];
    const currentGame = GameNames[gameName as keyof typeof GameNames];
    let newAllNewWords = lastAllNewWords;
    let newGameAllNewWords = lastLSStat.games[currentGame].newWords;
    const newGameWordsList = lastLSStat.games[currentGame].wordsList;
    allGameWords.forEach((item) => {
      const checkAll = isNewWord(item, newWordList);
      const checkGame = isNewWord(item, newGameWordsList);
      if (checkAll === undefined) {
        newWordList.push(item);
        newAllNewWords += 1;
      }
      if (checkGame === undefined) {
        newGameWordsList.push(item);
        newGameAllNewWords += 1;
      }
      return item;
    });
    const newAllGameRight = lastAllGameRigh + correctAnswers.length;
    const newAllGamesWrong = lastAllGameWrong + wrongAnswers.length;
    const newAllGamesRightPercent = ((newAllGameRight
       / (newAllGameRight + newAllGamesWrong)) * 100).toFixed(2);
    const newLSStat:ILSStatistic = deepClone(lastLSStat);
    newLSStat.date = new Date();
    newLSStat.allGamesRight = newAllGameRight;
    newLSStat.allGamesWrong = newAllGamesWrong;
    newLSStat.allGamesRightPercent = +newAllGamesRightPercent || 0;
    newLSStat.allNewWords = newAllNewWords;
    newLSStat.wordsList = newWordList;

    newLSStat.games[currentGame].right += correctAnswers.length;
    newLSStat.games[currentGame].wrong += wrongAnswers.length;
    const newGameRightPercent = ((newLSStat.games[currentGame].right
      / (newLSStat.games[currentGame].right + newLSStat.games[currentGame].wrong)) * 100)
      .toFixed(2);
    newLSStat.games[currentGame].rightPercent = +newGameRightPercent || 0;
    if (newLSStat.games[currentGame].bestSeries < bestStreak) {
      newLSStat.games[currentGame].bestSeries = bestStreak;
    }
    newLSStat.games[currentGame].newWords = newGameAllNewWords;
    newLSStat.games[currentGame].wordsList = newGameWordsList;
    updateLSStatistic(newLSStat);
  } else {
    const newLSStat:ILSStatistic = deepClone(standartLSStatistic);
    newLSStat.date = new Date();
    newLSStat.allGamesRight = correctAnswers.length;
    newLSStat.allGamesWrong = wrongAnswers.length;
    newLSStat.allNewWords = [...wrongAnswers, ...correctAnswers].length;
    newLSStat.wordsList = [...wrongAnswers, ...correctAnswers];
    const rightPercent = ((correctAnswers.length
      / (correctAnswers.length + wrongAnswers.length)) * 100).toFixed(2);
    newLSStat.allGamesRightPercent = +rightPercent || 0;
    const currentGame = GameNames[gameName as keyof typeof GameNames];
    newLSStat.games[currentGame].right += correctAnswers.length;
    newLSStat.games[currentGame].wrong += wrongAnswers.length;
    newLSStat.games[currentGame].wordsList = [...correctAnswers, ...wrongAnswers];
    newLSStat.games[currentGame].newWords = [...correctAnswers, ...wrongAnswers].length;
    newLSStat.games[currentGame].rightPercent = +rightPercent || 0;
    if (newLSStat.games[currentGame].bestSeries < bestStreak) {
      newLSStat.games[currentGame].bestSeries = bestStreak;
    }
    updateLSStatistic(newLSStat);
  }
};

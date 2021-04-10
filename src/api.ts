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

interface IGames {
  [key: string]: IOptionalGame;
}

interface IOptionalWord {
  isDeleted: boolean;
  addTime: Date;
  allTry: number;
  // for local statistic
  // allGamesRight: number;
  // allGamesWrong: number
  games: IGames;
  // games: { [key: string]: IOptionalGame };
}

interface IWordBody {
  difficulty: string,
  optional: IOptionalWord
}

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
      writeWord: {
        right: 0,
        wrong: 0,
      },
      audioCall: {
        right: 0,
        wrong: 0,
      },
    },
    allTry: 0,
    // for local statistic
    // allGamesRight: 0,
    // allGamesWrong: 0,
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

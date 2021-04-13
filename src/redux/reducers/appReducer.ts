import { SET_WORDS, SET_IS_LEVEL, SET_GAME_INDEX } from '../types';

interface IAction {
  type: string;
  value?: any;
  payload?: any;
}

const initialState = {
  words: [],
  startGameFromMenu: true,
  gameIndex: 0,
};

const appReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_WORDS:
      return {
        ...state,
        words: action.payload,
      };
    case SET_IS_LEVEL:
      return {
        ...state,
        startGameFromMenu: action.value,
      };
    case SET_GAME_INDEX:
      return {
        ...state,
        gameIndex: action.value,
      };

    default:
      return state;
  }
};

export default appReducer;

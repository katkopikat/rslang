import { SET_WORDS, SET_IS_LEVEL } from "../types";

interface IAction {
  type: string;
  value?: any;
  payload?: any;
}

const initialState = {
  words: [],
  isLevel: true,
};

export const appReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_WORDS:
      return {
        ...state,
        words: action.payload,
      };
    case SET_IS_LEVEL:
      return { ...state,
        isLevel: action.value };

    default:
      return state;
  }
};

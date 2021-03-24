export interface ISavanna {
  group: number;
}

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IOption {
  id: string;
  index: number;
  word: string;
  onClick: (id: string) => void;
}

export interface ILifeIcon {
  disabled: boolean;
}

export interface ILives {
  number: number;
  disabled: number[];
}

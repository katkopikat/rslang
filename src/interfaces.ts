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
  userWord?: {
    difficulty?: string;
    optional?: {
      games?: { [name: string]: { right: number, wrong: number } }
    };
  };
}

export interface IGameDescription {
  id: number,
  type: string,
  description: string,
}

export interface IAdvantages {
  id: number,
  image: string,
  title: string,
  description: string,
}

export interface IDeveloper {
  id: number,
  image: string,
  name: string,
  github: string,
  description: string,
}

/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { IWord } from '../../../interfaces';

interface ISentence {
  currentWord: IWord;
}

const Sentence: React.FC<ISentence> = ({ currentWord }) => {
  const [sentence, setSentence] = useState<string>();

  const replaceWordInSentence = (word: IWord) : string => {
    const { textMeaning } = word;
    const str = textMeaning;
    const start = textMeaning.indexOf('*');
    const newStr = str.substr(start, word.word.length + 2);
    return str.replace(newStr, ('_'.repeat(newStr.length)));
  };

  useEffect(() => {
    setSentence(replaceWordInSentence(currentWord));
  }, [currentWord]);

  return (
    <p>
      {' '}
      { sentence }
      {' '}
    </p>
  );
};

export default Sentence;

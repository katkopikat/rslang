/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { WORDS_GROUP_LINK, NUMBER_OF_THE_WORDS } from '../../constants';
import WriteWord from '../Games/WriteWords/WriteWord';
import shuffleArray from '../../helpers/shuffleArray';
import { IWord } from '../../interfaces';

interface IPage {
  group: number;
  page: number;
}

const VocabularyPage: React.FC<IPage> = ({ group, page }) => {
  const [words, setWords] = useState<IWord[]>([]);

  useEffect(() => {
    fetch(
      `${WORDS_GROUP_LINK}${group}&page=${page}`,
    )
      .then((response) => response.json())
      .then((data) => data.slice(0, NUMBER_OF_THE_WORDS))
      .then((data) => shuffleArray(data))
      .then((data) => setWords(data))
      .catch();
  }, []);

  return (
    <div>
      { words.length > 0 ? <WriteWord words={words} /> : null }
    </div>

  );
};

export default VocabularyPage;

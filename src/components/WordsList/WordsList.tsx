import React, { useEffect, useState } from 'react';
import WordCardSmall from './WordCardSmall';
import WordCardDetails from './WordCardDetails';
import { IWord } from '../../interfaces';
import { ViewMode } from '../../constants';

import './WordsList.scss';

interface IProps {
  words: IWord[];
  showBtns: boolean;
  showTranslate: boolean;
  forceUpdate: () => void;
  viewMode: ViewMode;
}

const WordsList = ({
  words = [],
  showBtns,
  showTranslate,
  forceUpdate,
  viewMode,
}: IProps) => {
  const [activeWord, setActiveWord] = useState(words[0]);

  useEffect(() => setActiveWord(words[0]), [words]);

  if (!words.length) return <h3 className="wordslist-nowords">нет слов в этом разделе</h3>;
  return (
    <div className="textbook__word-container">
      <div className="grid-container">
        { words.map((word) => (
          <WordCardSmall
            word={word}
            activeId={activeWord ? activeWord.id : ''}
            id={word.id}
            onClick={() => setActiveWord(word)}
            key={word.id}
            showTranslate={showTranslate}
          />
        ))}
      </div>

      <div className="card-detail">
        <WordCardDetails
          word={activeWord}
          showBtns={showBtns}
          showTranslate={showTranslate}
          forceUpdate={forceUpdate}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
};

export default WordsList;

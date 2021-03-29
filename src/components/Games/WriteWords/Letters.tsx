/* eslint-disable react/prop-types */
import React from 'react';

interface ILetterStatus {
  letter: string;
  status: string;
}

interface ILetterList{
  letterList: Array<ILetterStatus>;
}

const Letters: React.FC<ILetterList> = ({ letterList }) => (
  <div className="answer">
    { letterList.map((letter, i) => (

      <span
        className={letter.status}
        // eslint-disable-next-line react/no-array-index-key
        key={`${letter.letter}${i}`}
      >
        {' '}
        {letter.letter}
        {' '}
      </span>
    )) }
  </div>
);

export default Letters;

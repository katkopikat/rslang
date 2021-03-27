import React, { useEffect, useState } from 'react';
import { IWord } from '../../Savanna/interfaces';
import './Counting.scss';

interface ICounting {
  correct: IWord[];
  wrong: IWord[];
}

const Counting: React.FC<ICounting> = ({ correct, wrong }) => {
  const [wordOne, setWordOne] = useState<string>('слов');
  const [wordTwo, setWordTwo] = useState('слов');

  useEffect(() => {
    if (correct.length === 1) {
      setWordOne('слово');
    } else if (correct.length > 1 && correct.length < 5) {
      setWordOne('слова');
    }
    if (wrong.length === 1) {
      setWordTwo('слово');
    } else if (wrong.length > 1 && wrong.length < 5) {
      setWordTwo('слова');
    }
  });

  return (
    <p className='results__counting'>
      {`${correct.length} ${wordOne} изучено, ${wrong.length} ${wordTwo} на изучении`}
    </p>
  );
};

export default Counting;

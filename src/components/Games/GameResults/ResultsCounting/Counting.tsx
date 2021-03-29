import React, { useEffect, useState } from 'react';
import { IWord } from '../../../../interfaces';
import './Counting.scss';

interface ICounting {
  correct: IWord[];
  wrong: IWord[];
  onClick: () => void;
}

const Counting = ({ correct, wrong, onClick }: ICounting) => {
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
  }, [correct.length, wrong.length]);

  return (
    <div role="link" tabIndex={0} className="results__counting" onClick={onClick} onKeyDown={onClick}>
      {`${correct.length} ${wordOne} изучено, ${wrong.length} ${wordTwo} на изучении`}
    </div>
  );
};

export default Counting;

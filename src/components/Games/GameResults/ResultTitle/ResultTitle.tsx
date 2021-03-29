import React, { useEffect, useMemo, useState } from 'react';
import './ResultTitle.scss';

interface IResultTitle {
  percentage: number;
}

const ResultTitle: React.FC<IResultTitle> = ({ percentage }: IResultTitle) => {
  const [title, setTitle] = useState<string>('');

  const resultTitles = useMemo(() => ({
    bad: 'Ты можешь лучше! Повтори слова и возвращайся :)',
    'so-so': 'Хороший результат! Но ты можешь лучше :)',
    good: 'Круто, отличный результат!',
  }), []);

  useEffect(() => {
    if (percentage >= 0 && percentage < 50) {
      setTitle(resultTitles.bad);
    } else if (percentage >= 50 && percentage < 80) {
      setTitle(resultTitles['so-so']);
    } else if (percentage >= 80) {
      setTitle(resultTitles.good);
    }
  }, [percentage, resultTitles]);

  return <div className="result__title">{title}</div>;
};

export default ResultTitle;

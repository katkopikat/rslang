import React from 'react';
import LevelCard from './LevelCard';

interface ILevelCards {
  handleGroupChange: (group: number) => void;
  activeGroup: number;
}

interface ILevelData {
  name: string;
  words: string;
  abbr: string;
  group: number;
}

const levelCardsData: ILevelData[] = [
  {
    name: 'Easy',
    words: '1-600',
    abbr: 'A1',
    group: 0,
  },
  {
    name: 'Easy',
    words: '601-1200',
    abbr: 'A2',
    group: 1,
  },
  {
    name: 'Medium',
    words: '1201-1800',
    abbr: 'B1',
    group: 2,
  },
  {
    name: 'Medium',
    words: '1801-2400',
    abbr: 'B2',
    group: 3,
  },
  {
    name: 'Hard',
    words: '2401-3000',
    abbr: 'C1',
    group: 4,

  },
  {
    name: 'Hard',
    words: '3001-3600',
    abbr: 'C2',
    group: 5,

  },
];

const Levels = ({ handleGroupChange, activeGroup }: ILevelCards) => (
  <div className="levels-wrapper">
    { levelCardsData.map((level: ILevelData) => (
      <LevelCard
        name={level.name}
        words={level.words}
        abbr={level.abbr}
        level={level.group}
        activeGroup={activeGroup}
        // onClick={() => handleGroupChange(level.group)}
        handleGroupChange={handleGroupChange}
        key={level.abbr}
      />
    ))}
  </div>

);

export default Levels;

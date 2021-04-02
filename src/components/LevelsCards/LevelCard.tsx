import React from 'react';
import './LevelCard.scss';

interface ILevelCard {
  name: string;
  words: string;
  abbr: string;
  level: number;
  handleGroupChange: (group: number) => void;
  activeGroup: number;
}

const LevelCard = ({
  name, words, abbr, level, handleGroupChange, activeGroup,
}: ILevelCard) => (
  <button
    className={activeGroup === level ? 'level-card' : 'level-card level-card--unactive'}
    type="button"
    onClick={() => handleGroupChange(level)}
  >
    <div className="level-card-left">
      <h2>
        {name}
      </h2>
      <p>{words}</p>
    </div>

    <div className="level-card-right">
      <h2>
        {abbr}
      </h2>
    </div>

    <div className="circle" />
  </button>
);

export default LevelCard;

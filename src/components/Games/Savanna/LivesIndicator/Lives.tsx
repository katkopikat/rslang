import React from 'react';
import './Lives.scss';

export interface ILifeIcon {
  disabled: boolean;
}

export interface ILives {
  number: number;
  disabled: number[];
}

const LifeIcon = ({ disabled }: ILifeIcon) => (
  <div className={`life-icon ${disabled ? 'life-icon__disabled' : ''}`} />
);

const Lives = ({ number, disabled }: ILives) => {
  const array = [];
  for (let i: number = 0; i < number; i += 1) {
    array.push(i);
  }
  return (
    <div className="lives">
      {array.map((el, index) => (
        <LifeIcon key={index} disabled={disabled.includes(index)} />
      ))}
    </div>
  );
};

export default Lives;

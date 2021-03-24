import React from 'react';
import './Lives.scss';
import { ILifeIcon, ILives } from '../interfaces';

const LifeIcon: React.FC<ILifeIcon> = ({ disabled }) => {
  return (
    <div className={`life-icon ${disabled ? 'life-icon__disabled' : ''}`}></div>
  );
};

const Lives: React.FC<ILives> = ({ number, disabled }) => {
  const array = [];
  for (let i: number = 0; i < number; i++) {
    array.push(i);
  }
  return (
    <div className='lives'>
      {array.map((el, index) => (
        <LifeIcon key={index} disabled={disabled.includes(index)} />
      ))}
    </div>
  );
};

export default Lives;

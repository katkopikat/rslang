import React from 'react';
import './AdvantageCard.scss';
import { IAdvantages } from '../../../interfaces';
import advantages from '../../../data/advantages.json';

interface IAdvantageCard {
  id: number;
}

const AdvantageCard = ({ id }: IAdvantageCard) => {
  const advantage: { [dynamic: number]: IAdvantages } = advantages;

  return (
    <div className="card">
      <div className="card__image"><img alt={advantage[id].title} src={advantage[id].image} /></div>
      <div className="card__text">
        <div className="card__title-wrapper">
          <div className="card__title-dot" />
          <span className="card__title">{advantage[id].title}</span>
        </div>
        <p className="card__description">{advantage[id].description}</p>
      </div>
    </div>
  );
};

export default AdvantageCard;

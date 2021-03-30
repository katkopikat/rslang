import React from 'react';
import './LevelCard.scss';

// interface IGameCard {
//   linkTo: string;
//   name: string;
//   description: string;
//   badge: string;
//   img: string;
// }

const LevelCard = () => (
  <div className="level-card">
    <div className="level-card-left">
      <h2>
        Easy
      </h2>
      <p> Слова 1-599</p>
    </div>

    <div className="level-card-right">
      <h2>
        B1
      </h2>
    </div>

    <div className="circle" />
  </div>
);

export default LevelCard;

import React from 'react';
import GameCard from './GameCard';
import cardGameData from '../../data/cardGameData';
import './GameCards.scss';

const GamesCards = () => (
  <>
    <div className="games-card__wrapper">
      { cardGameData.map((game) => (
        <GameCard
          linkTo={game.linkTo}
          name={game.name}
          description={game.description}
          badge={game.badge}
          img={game.img}
          key={game.name}
        />
      ))}
    </div>
  </>
);

export default GamesCards;

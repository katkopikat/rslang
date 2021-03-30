import React from 'react';
import GameCard from './GameCard';
import cardGameData from './cardGameData';

const GamesCards = () => (
  <>
    <h1>Игры</h1>
    <div className="card-games-wrapper">
      { cardGameData.map((game) => (
        <GameCard
          linkTo={game.linkTo}
          name={game.name}
          description={game.description}
          badge={game.badge}
          img={game.img}
        />
      ))}
    </div>
  </>
);

export default GamesCards;

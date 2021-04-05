import React from 'react';
import './StartScreen.scss';

import games from '../../../../data/games.json';
import { IGameDescription } from '../../../../interfaces';

interface IStartScreen {
  game: string;
  isLevel: boolean;
  onClick: () => void;
}

const StartScreen = ({ game, isLevel, onClick }: IStartScreen) => {
  const gamePresets: { [dynamic: string]: IGameDescription } = games;

  return (
    <div>
      <p>{gamePresets[game].type}</p>
      <p>{gamePresets[game].description}</p>
      <button type="button" onClick={onClick}>Начать</button>
    </div>
  );
};

export default StartScreen;

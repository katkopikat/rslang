import React from 'react';
import './GameButtons.scss';
import ExitButton from './Components/ExitButton';
import FullScreenButton from './Components/FullScreenButton';
import SoundButton from './Components/SoundButton';

interface IButtons {
  onClick: () => void;
}

const Buttons = ({ onClick }: IButtons) => (
  <div className="game-buttons">
    <ExitButton />
    <FullScreenButton />
    <SoundButton onClick={onClick} />
  </div>
);
export default Buttons;

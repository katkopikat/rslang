import React from 'react';
import './GameButtons.scss';
import ExitButton from './Components/ExitButton';
import FullScreenButton from './Components/FullScreenButton';
import SoundButton from './Components/SoundButton';

const Buttons = () => (
  <div className="game-buttons">
    <ExitButton />
    <FullScreenButton />
    <SoundButton />
  </div>
);
export default Buttons;

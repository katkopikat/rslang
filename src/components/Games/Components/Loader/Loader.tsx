import React from 'react';
import './Loader.scss';
import Circle from '../Circle/Circle';

interface ILoader {
  seconds: number;
}

const Loader = ({ seconds }: ILoader) => (
  <div className="loader__timer">
    <div className="loader__loading">
      <Circle visible />
      <div className="loader__count">{seconds}</div>
    </div>
  </div>
);

export default Loader;

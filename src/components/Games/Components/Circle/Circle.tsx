import React from 'react';
import './Circle.scss';

interface ICircle {
  visible: boolean;
}

const Circle = ({ visible }: ICircle) => (
  <div className={`crystal__circle ${visible ? 'crystal__circle-visible' : ''}`}>
    <div className="crystal__circle-1" />
    <div className="crystal__circle-2" />
    <div className="crystal__circle-3" />
  </div>
);

export default Circle;

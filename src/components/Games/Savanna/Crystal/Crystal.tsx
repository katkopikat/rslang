import React from 'react';
import './Crystal.scss';
import Circle from '../../Components/Circle/Circle';

interface ICrystal {
  isCorrect: boolean;
}

const Crystal = ({ isCorrect }: ICrystal) => (
  <div className="crystal">
    <div className="crystal__img-move">
      <div className="crystal__img">
        <i className="crystal-bg crystal__img-1" />
        <i className="crystal-bg crystal__img-2" />
        <i className="crystal-bg crystal__img-3" />
        <i className="crystal-bg crystal__img-4" />
      </div>
    </div>
    <Circle visible={isCorrect} />
    <div className="crystal__point">
      <i className="crystal__point-base crystal__point-1" />
      <i className="crystal__point-base crystal__point-2" />
      <i className="crystal__point-base crystal__point-3" />
      <i className="crystal__point-base crystal__point-4" />
      <i className="crystal__point-base crystal__point-5" />
      <i className="crystal__point-base crystal__point-6" />
      <i className="crystal__point-base crystal__point-7" />
      <i className="crystal__point-base crystal__point-8" />
      <i className="crystal__point-base crystal__point-9" />
      <i className="crystal__point-base crystal__point-10" />
    </div>
  </div>
);

export default Crystal;

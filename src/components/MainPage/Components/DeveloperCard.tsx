import React from 'react';
import './DeveloperCard.scss';
import { IDeveloper } from '../../../interfaces';
import developers from '../../../data/developers.json';

interface IDeveloperCard {
  id: number;
}

const DeveloperCard = ({ id }: IDeveloperCard) => {
  const developer: { [dynamic: number]: IDeveloper } = developers;
  return (
    <div className={`developer ${id % 2 !== 0 ? 'reverse' : ''}`}>
      <div className="developer__column_one">
        <div
          className="developer__picture"
          style={{ backgroundImage: `url(${developer[id].image})` }}
        />
      </div>
      <div className="developer__column_two">
        <div className="developer__name">
          <h3>{developer[id].name}</h3>
          <a href={`${developer[id].github}`}>
            <img
              className="github_logo"
              src="../../../assets/img/logo/github_dark.svg"
              alt="github-logo"
            />
          </a>
        </div>
        <p className="developer__tab">developer</p>
        <div className="developer__description">
          {developer[id].description}
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;

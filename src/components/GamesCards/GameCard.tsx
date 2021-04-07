import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLevel } from '../../redux/actions/appActions';

interface IGameCard {
  linkTo: string;
  name: string;
  description: string;
  badge: string;
  img: string;
}

const GameCards = ({
  linkTo, name, description, badge, img,
}: IGameCard) => {
  const dispatch = useDispatch();

  return (
    <Link to={linkTo}>
      <div className="card-games" onClick={() => dispatch(setIsLevel(false))}>
        <img className="card-games-image" src={img} alt={name} />
        <div className="card-games-text">
          <div className="card-games-badge">{badge}</div>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCards;

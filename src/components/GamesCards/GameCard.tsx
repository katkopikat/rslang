import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setStartGameFromMenu } from '../../redux/actions/appActions';

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
      <div
        role="presentation"
        className="card-game"
        onClick={() => dispatch(setStartGameFromMenu(false))}
        onKeyDown={() => null}
      >
        <img className="card-game-image" src={img} alt={name} />
        <div className="card-game-text">
          <div className="card-game-badge">{badge}</div>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCards;

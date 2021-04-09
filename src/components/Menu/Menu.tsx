import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLevel } from '../../redux/actions/appActions';
import './Menu.scss';

const Menu: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <nav className="header">
      <div className="wrapper header__wrapper">
        <Link to="/">
          <span className="logo header__logo">Ulearning</span>
        </Link>
        <nav className="header__nav">
          <ul className="navigation">
            <Link to="/textbook">
              <li className="navigation__item">Учебник</li>
            </Link>
            <li className="navigation__item navigation__item_list">
              Игры
              {' '}
              <span className="material-icons arrow">expand_more</span>
              <ul
                role="presentation"
                className="navigation_submenu"
                onClick={() => dispatch(setIsLevel(true))}
                onKeyDown={() => null}
              >
                <Link to="/games/savanna">
                  <li className="navigation_submenu__item item_one">Саванна</li>
                </Link>
                <Link to="/games/oasis">
                  <li className="navigation_submenu__item">Оазис</li>
                </Link>
                <Link to="/games/sprint">
                  <li className="navigation_submenu__item">Спринт</li>
                </Link>
                <Link to="/games/audiocall">
                  <li className="navigation_submenu__item">Аудиовызов</li>
                </Link>
              </ul>
            </li>
            <Link to="/statistic">
              <li className="navigation__item">Статистика</li>
            </Link>
            <li className="navigation__item">О разработчиках</li>
          </ul>
          <Link to="/login">
            <button type="button" className="button button_bordered">
              Вход
            </button>
          </Link>
        </nav>
      </div>
    </nav>
  );
};
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Avatar from '@material-ui/core/Avatar';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { useAuth } from '../AuthContext';

// const Header: React.FC = () => {
//   const {
//     userId,
//     logout,
//     avatarURL,
//   } = useAuth();
//   const currentURL = useLocation();
//   const isAuthPage = currentURL.pathname === '/login' || currentURL.pathname === '/register';
//   const authLinkEl = avatarURL ? (
//     <Avatar alt="user avatar" src={avatarURL} />
//   ) : (
//     <AccountCircle />
//   );
//   const logoutEl = userId && !isAuthPage ? <ExitToAppIcon onClick={logout} /> : null;

//   return (
//     <header>
//       <div className="header-wrapper">
//         <div className="header-left">
//           <Link to="/" className="logo">
//             logo
//           </Link>
//         </div>
//         <div className="header-right">
//           {!isAuthPage && <Link to="/login">{authLinkEl}</Link>}
//           {logoutEl}
//         </div>
//       </div>
//     </header>
//   );
// };

export default Menu;

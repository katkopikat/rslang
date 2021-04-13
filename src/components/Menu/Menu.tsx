import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Menu.scss';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Hamburger from './Hamburger/Hamburger';
import { useAuth } from '../AuthContext';
import { setStartGameFromMenu } from '../../redux/actions/appActions';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isGameMenu, setIsGameMenu] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { userId, logout, avatarURL } = useAuth();
  const currentURL = useLocation();
  const body: HTMLBodyElement | null = document.querySelector('body');

  const isAuthPage = currentURL.pathname === '/login' || currentURL.pathname === '/register';
  const authLinkEl = avatarURL ? (
    <Avatar alt="user avatar" src={avatarURL} />
  ) : (
    <AccountCircle />
  );
  const logoutEl = userId && !isAuthPage ? <ExitToAppIcon onClick={logout} /> : null;

  useEffect(() => {
    if (currentURL.pathname.includes('/games')) {
      setIsGameMenu(true);
    }
  }, [currentURL.pathname]);

  const handleEvent = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleEvent);
    return () => window.removeEventListener('resize', handleEvent);
  }, []);

  useEffect(() => {
    if (isOpen) body?.classList.add('body_fixed');
    if (!isOpen) body?.classList.remove('body_fixed');
  }, [isOpen, body?.classList]);

  return (
    <>
      <div
        className={`overlay ${isOpen ? 'overlay_active' : ''}`}
        onClick={() => setIsOpen(false)}
        role="presentation"
      />
      <div className={`header ${isGameMenu ? 'game-menu' : ''}`}>
        <div
          className={`wrapper header__wrapper ${
            isOpen ? 'header__wrapper_active' : ''
          }`}
        >
          <div className="header__part">
            <Hamburger
              onClick={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
              isVisible={isGameMenu}
            />
            <Link to="/" className="logo_link" onClick={handleEvent}>
              <span
                className={`logo header__logo ${
                  isOpen ? 'header__logo_active' : ''
                }`}
              >
                ULearning.
              </span>
            </Link>
          </div>
          <div className="header__part">
            <div
              className={`circle__wrapper ${
                isOpen ? 'circle__wrapper_active' : ''
              }`}
            >
              <div
                className={`header__circle  ${
                  isOpen ? 'header__circle_active' : ''
                }`}
              >
                <div
                  className={`box-animation ${isOpen ? 'waves-opacity' : ''}`}
                >
                  <div className="box-inner" />
                </div>
                <nav
                  className={`header__nav ${
                    isOpen ? 'header__nav_active' : ''
                  }`}
                >
                  <ul className={`navigation ${isOpen ? 'animate' : ''}`}>
                    <Link to="/" onClick={handleEvent}>
                      <li className="anim_one navigation__item">Главная</li>
                    </Link>
                    <Link to="/textbook" onClick={handleEvent}>
                      <li className="anim_two navigation__item">Учебник</li>
                    </Link>
                    <li className="navigation__item navigation__item_list">
                      <span className="anim_three">Игры </span>
                      <span className="material-icons arrow">expand_more</span>
                      <ul
                        role="presentation"
                        className="navigation_submenu"
                        onClick={() => dispatch(setStartGameFromMenu(true))}
                        onKeyDown={() => null}
                      >
                        <Link to="/games/savanna" onClick={handleEvent}>
                          <li className="anim_four anim-item navigation_submenu__item item_one">
                            <div className="item-dot_savanna" />
                            <div>Саванна</div>
                          </li>
                        </Link>
                        <Link to="/games/oasis" onClick={handleEvent}>
                          <li className="anim_five anim-item navigation_submenu__item">
                            <div className="item-dot_oasis" />
                            <div>Оазис</div>
                          </li>
                        </Link>
                        <Link to="/games/sprint" onClick={handleEvent}>
                          <li className="anim_six anim-item navigation_submenu__item">
                            <div className="item-dot_sprint" />
                            <div>Спринт</div>
                          </li>
                        </Link>
                        <Link to="/games/audiocall" onClick={handleEvent}>
                          <li className="anim_seven anim-item navigation_submenu__item">
                            <div className="item-dot_audio" />
                            <div>Аудиовызов</div>
                          </li>
                        </Link>
                      </ul>
                    </li>
                    <Link to="/statistic" onClick={handleEvent}>
                      <li className="anim_eight anim-item navigation__item">
                        Статистика
                      </li>
                    </Link>
                  </ul>
                </nav>
              </div>
            </div>
            <div
              className={`header__auth ${
                isOpen ? 'header__auth_invisible' : ''
              }`}
            >
              {!userId && (
                <Link to="/authorization">
                  <button type="button" className="button button_bordered">
                    Вход
                  </button>
                </Link>
              )}
              {!isAuthPage && userId && (
                authLinkEl
              )}
              {logoutEl}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

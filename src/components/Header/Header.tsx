import React from 'react';
import './Header.scss';

const Header: React.FC = () => (
  <header className="header">
    <div className="wrapper header__wrapper">
      <span className="logo header__logo">RS LANG</span>
      <nav className="header__nav">
        <ul className="navigation">
          <li className="navigation__item">Учебник</li>
          <li className="navigation__item navigation__item_list">
            Игры
            {' '}
            <span className="material-icons arrow">expand_more</span>
            <ul className="navigation_submenu">
              <li className="navigation_submenu__item">Саванна</li>
              <li className="navigation_submenu__item">Оазис</li>
              <li className="navigation_submenu__item">Спринт</li>
              <li className="navigation_submenu__item">Аудиовызов</li>
            </ul>
          </li>
          <li className="navigation__item">Статистика</li>
          <li className="navigation__item">О разработчиках</li>
        </ul>
        <button type="button" className="button button_bordered">Вход</button>
      </nav>
    </div>
  </header>
);

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import '../MainPage/BgAnimation.scss';

const Footer: React.FC = () => (
  <footer className="footer anim">
    <div className="inner">
      <svg
        className="svg svg_footer"
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0.00,49.99 C277.31,153.25 209.59,-22.40 500.00,49.99 L500.00,0.00 L0.00,0.00 Z"
        />
      </svg>

      <div className="wrapper footer__wrapper">
        <div className="footer__top-block">
          <div>
            <p className="footer__logo">RS LANG</p>
            <div className="logo-container">
              <a href="https://github.com/katkopikat/rslang/tree/develop">
                <img src="../../../assets/img/logo/github.svg" alt="github" />
              </a>
              <img src="../../../assets/img/logo/youtube.svg" alt="youtube" />
              <a href="https://rs.school/js/">
                <img src="../../../assets/img/logo/rs.svg" alt="rs-school" />
              </a>
            </div>
          </div>
          <div className="column">
            <p className="column__title">Меню</p>
            <Link to="/">
              <p className="column__item">Главная</p>
            </Link>
            <Link to="/textbook">
              <p className="column__item">Учебник</p>
            </Link>

            <p className="column__item">Статистика</p>
            <p className="column__item">О разработчиках</p>
          </div>
          <div className="column">
            <p className="column__title">Разработчики</p>
            <a className="column__item" href="https://github.com/katkopikat">
              katkopikat
            </a>
            <a className="column__item" href="https://github.com/ulyana-zh">
              ulyana-zh
            </a>
            <a className="column__item" href="https://github.com/v0f">
              v0f
            </a>
            <a
              className="column__item"
              href="https://github.com/akulaualiaksei"
            >
              akulaualiaksei
            </a>
          </div>
        </div>
        <div className="footer__bottom-block">
          ©2021 RS LANG. Project for&nbsp;
          <a href="https://rs.school/js/">RS School React Course.</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

import React from 'react';

import './MainPage.scss';
import './BgAnimation.scss';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AdvantageCard from './Components/AdvantageCard';
import advantages from '../../data/advantages.json';
import DeveloperCard from './Components/DeveloperCard';
import developers from '../../data/developers.json';

const MainPage = () => (
  <div>
    <Header />
    <section className="greeting anim">
      <div className="inner">
        <div className="wrapper greeting__wrapper">
          <div className="greeting__text-block">
            <h1>
              Изучай английский
              {' '}
              <br />
              с RS Lang.
            </h1>
            <p>
              Приложение для эффективного изучения иностранных слов в игровой
              форме. Всегда под рукой. На любом устройстве.
            </p>
          </div>
          <img
            className="greeting__img"
            src="../../../assets/img/main.png"
            alt="rslang"
          />
        </div>
        <svg
          className="svg svg_main"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            d="M0,288L60,261.3C120,235,240,181,360,160C480,139,600,149,720,176C840,203,960,245,1080,229.3C1200,
              213,1320,139,1380,101.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,
              320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
    </section>
    <section>
      <div className="wrapper advantages__wrapper">
        <div className="advantages__items">
          {advantages.map((item) => (
            <AdvantageCard key={item.id} id={item.id} />
          ))}
        </div>
      </div>
    </section>
    <section className="developers">
      <svg
        className="developers_top"
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        style={{ height: '20%', width: '100%' }}
      >
        <path
          d="M0.00,49.99 C300.45,252.92 271.49,-49.99 500.00,49.99 L500.00,0.00 L0.00,0.00 Z"
          style={{ stroke: 'none', fill: '#fff' }}
        />
      </svg>
      <div className="wrapper developers__wrapper">
        {developers.map((item) => (
          <DeveloperCard key={item.id} id={item.id} />
        ))}
      </div>
      <svg
        className="developers_bottom"
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        style={{ height: '20%', width: '100%', transform: 'rotate(180deg)' }}
      >
        <path
          d="M0.00,49.99 C300.45,252.92 271.49,-49.99 500.00,49.99 L500.00,0.00 L0.00,0.00 Z"
          style={{ stroke: 'none', fill: '#fff' }}
        />
      </svg>
    </section>
    <Footer />
  </div>
);

export default MainPage;

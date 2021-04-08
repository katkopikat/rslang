import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import EachDayStatistic from './AllTimeStatistic/EachDayStatistic';
import GrowthStatistic from './AllTimeStatistic/GrowthStatistic';
import TodayStatistic from './TodayStatistic/TodayStatistic';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import BGWave from '../BgWave/BGWave';
import './Statistic.scss';

const Statistic = () => {
  const [switchChart, setSwitch] = useState(true);

  const handleChartSwitch = (e) => {
    setSwitch(e.target.checked);
  };

  return (
    <>
      <Header />

      <section className="statistic__wrapper">
        <h1>Статистика за сегодня</h1>
        <BGWave classWave="statistic__wave--top" />
        <TodayStatistic />
        <BGWave classWave="statistic__wave--bottom" />
      </section>

      <section className="charts__wrapper">
        <BGWave classWave="charts__wave--top" />
        <Grid className="charts__content">
          <h1>Статистика за всё время</h1>
          <div className="charts__switch">
            <span className="switch__label"> Изученные слова за каждый день </span>
            <Switch
              checked={switchChart}
              onChange={handleChartSwitch}
              name="checkedA"
            />
            <span className="switch__label"> Увеличение общего кол-ва изученных слов </span>
          </div>

          <Grid container justify="center" spacing={1} xs={8}>
            { switchChart ? <GrowthStatistic /> : <EachDayStatistic /> }
          </Grid>
          {/*
          <Grid container justify="center" spacing={1} xs={8}>
            <EachDayStatistic />
          </Grid> */}

        </Grid>

        {/* <svg
          className="charts__wave--bottom"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <path d="M0.00,49.99 C300.45,252.92 271.49,-49.99 500.00,49.99 L500.00,0.00 L0.00,0.00 Z" />
        </svg> */}

      </section>
      <Footer />
    </>

  );
};

export default Statistic;

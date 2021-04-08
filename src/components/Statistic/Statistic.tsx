import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EachDayStatistic from './AllTimeStatistic/EachDayStatistic';
import GrowthStatistic from './AllTimeStatistic/GrowthStatistic';
import TodayStatistic from './TodayStatistic/TodayStatistic';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Statistic.scss';

const Statistic = () => (
  <>
    <Header />
    {/* <Container className="statistic-container"> */}
    <div className="main-heading wrapper">
      <h1>Статистика</h1>
    </div>

    <section className="statistic__wrapper">
      <svg
        className="statistic__wave--top"
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        // style={{ height: '25%', width: '100%' }}
      >
        <path
          d="M0.00,49.99 C300.45,252.92 271.49,-49.99 500.00,49.99 L500.00,0.00 L0.00,0.00 Z"
          style={{ stroke: 'none', fill: '#fff' }}
        />
      </svg>
      <TodayStatistic />

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

    <section className="section-charts">
      <Grid className="charts-wrapper">
        <Grid container justify="center" spacing={1} xs={8}>
          <GrowthStatistic />
        </Grid>

        <Grid container justify="center" spacing={1} xs={8}>
          <EachDayStatistic />
        </Grid>

      </Grid>
    </section>

    {/* </Container> */}
    <Footer />
  </>

);

export default Statistic;

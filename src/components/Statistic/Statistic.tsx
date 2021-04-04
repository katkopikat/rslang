import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EachDayStatistic from './EachDayStatistic';
import GrowthStatistics from './GrowthStatistics';
import TodayStatistic from './TodayStatistic';
import './Statistic.scss';

const Statistic = () => (

  <Container className="statistic-container">

    <div className="main-heading">
      <h1>Статистика</h1>
    </div>
    <h2>cегодня:</h2>
    <TodayStatistic />

    <Grid className="charts-wrapper">

      <Grid container justify="center" spacing={1} xs={8}>
        <GrowthStatistics />
      </Grid>

      <Grid container justify="center" spacing={1} xs={8}>
        <EachDayStatistic />
      </Grid>

    </Grid>
  </Container>

);

export default Statistic;

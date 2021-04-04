import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EachDayStatistic from './AllTimeStatistic/EachDayStatistic';
import GrowthStatistic from './AllTimeStatistic/GrowthStatistic';
import TodayStatistic from './TodayStatistic/TodayStatistic';
import './Statistic.scss';

const Statistic = () => (

  <Container className="statistic-container">

    <div className="main-heading">
      <h1>Статистика</h1>
    </div>

    <TodayStatistic />

    <Grid className="charts-wrapper">

      <Grid container justify="center" spacing={1} xs={8}>
        <GrowthStatistic />
      </Grid>

      <Grid container justify="center" spacing={1} xs={8}>
        <EachDayStatistic />
      </Grid>

    </Grid>
  </Container>

);

export default Statistic;

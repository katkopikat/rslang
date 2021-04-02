import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EachDayStatistic from './EachDayStatistic';
import GrowthStatistics from './GrowthStatistics';
import './Statistic.scss';

const Statistic = () => (

    <Container className="statistic-container">

      <div className="main-heading">
        <h1>Статистика</h1>
        <button type="button" className="main-heading--active"> Сегодня </button>
        <button type="button" className="main-heading--unactive"> Прогресс слов </button>
      </div>
      <h2 className="main-subheading"> Статистика изученных слов за сегодня </h2>

      <Grid className="charts-wrapper">

      <Grid container justify="center" spacing={1} xs={8}>
        <h1>Прогресс изученных слов</h1>
        <GrowthStatistics />
      </Grid>

      <Grid container justify="center" spacing={1} xs={8}>
       <h1>Статистика</h1>
        <EachDayStatistic />
      </Grid>

      </Grid>
    </Container>

);

export default Statistic;

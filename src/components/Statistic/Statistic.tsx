import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import EachDayStatistic from './AllTimeStatistic/EachDayStatistic';
import GrowthStatistic from './AllTimeStatistic/GrowthStatistic';
import TodayStatistic from './TodayStatistic/TodayStatistic';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BGWave from '../BgWave/BGWave';
import './Statistic.scss';

// TEMP DATA, когда будут данные из БД - удалить
const datesList: Array<string> = [
  '31.03.2021',
  '17.01.2021',
  '15.12.2020',
  '1дата1',
  'дата1',
  'дата1',
  '31.03.2021',
  '17.01.2021',
  '15.12.2020',
  '1дата1',
  'дата1',
  'дата1',
];
const wordsListByDay: Array<number> = [3, 8, 15, 8, 7, 0, 0, 11, 18, 5, 8, 21];
const wordsPeriodtList: Array<number> = [5, 5, 12, 12, 12, 22, 31, 50, 50, 50, 62, 70, 78];

const Statistic = () => {
  const [switchChart, setSwitch] = useState(true);

  const handleChartSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitch(event.target.checked);
  };

  return (
    <>
      <Header />
      <section className="statistic__wrapper">
        <h1>Статистика за сегодня</h1>
        <BGWave classWave="statistic__wave--top" />
        {/* // TODO DATA learnedWords -  общее количество изученных слов за день
            // TODO DATA correctPercent- общий процент правильных ответов за день */}
        <TodayStatistic learnedWords={13} correctPercent={74} />
        <BGWave classWave="statistic__wave--bottom" />
      </section>
      <section className="charts__wrapper">
        <BGWave classWave="charts__wave--top" />
        <div className="charts__content">
          <h1>Статистика за всё время</h1>
          <div className="charts__switch">
            <span className="switch__label"> Кол-во изученных слов </span>
            <Switch
              checked={switchChart}
              onChange={handleChartSwitch}
              name="checkedA"
            />
            <span className="switch__label"> Прогресс </span>
          </div>

          <div>
            { switchChart
              ? <GrowthStatistic datesList={datesList} wordsPeriodtList={wordsPeriodtList} />
              : <EachDayStatistic datesList={datesList} wordsListByDay={wordsListByDay} /> }
            { /* TODO DATA:
                      GrowthStatistic datesList: массив дат, в которые юзер учил какие-то слова
                      GrowthStatistic wordsPeriodtList: массив чисел, каждое число
                                      - общее количество изученных слов к этому дню

                      EachDayStatistic datesList: массив дат, в которые юзер учил какие-то слова
                      EachDayStatistic wordsListByDay - массив чисел - кол-во слов,
                                       изученных в эти даты по каждому дню)
            */}
          </div>
        </div>
        <svg
          className="charts__wave--bottom"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <path d="M0.00,49.99 C300.45,252.92 271.49,-49.99 500.00,49.99 L500.00,0.00 L0.00,0.00 Z" />
        </svg>
      </section>
      <Footer />
    </>
  );
};

export default Statistic;

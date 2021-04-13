import React, { useEffect, useState } from 'react';
import Switch from '@material-ui/core/Switch';
import EachDayStatistic from './AllTimeStatistic/EachDayStatistic';
import GrowthStatistic from './AllTimeStatistic/GrowthStatistic';
import TodayStatistic from './TodayStatistic/TodayStatistic';
import {
  getLSStatistic,
  getUserStatistic,
  IStatItem,
  standardUserStatItem,
} from '../../api';
import { gamesDefault } from '../../data/apiData';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BGWave from '../BgWave/BGWave';
import './Statistic.scss';

const Statistic = () => {
  const [switchChart, setSwitch] = useState(true);
  const [dataLSStatistic, setDataLSStatistic] = useState(getLSStatistic());
  const [dataUserStatisticArray, setDataUserStatisticArray] = useState([] as IStatItem[]);
  const [isAuth, setIsAuth] = useState(true);

  const handleChartSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitch(event.target.checked);
  };

  useEffect(() => {
    setDataLSStatistic(getLSStatistic());
    async function fetchData() {
      try {
        const response = await getUserStatistic();
        if (response.ok) {
          const data = await response.json();
          setDataUserStatisticArray(JSON.parse(data.optional.stat));
        } else {
          setDataUserStatisticArray([standardUserStatItem]);
        }
      } catch (error) {
        if (error.message === 'auth error') {
          setIsAuth(false);
        }
      }
    }
    fetchData();
    // )();
  }, []);

  return (
    <>
      <Header />
      <section className="statistic__wrapper">
        <h1>Статистика за сегодня</h1>
        <BGWave classWave="statistic__wave--top" />
        <TodayStatistic
          learnedWords={dataLSStatistic?.allNewWords || 0}
          correctPercent={dataLSStatistic?.allGamesRightPercent || 0}
          games={dataLSStatistic?.games || gamesDefault}
        />
        <BGWave classWave="statistic__wave--bottom" />
      </section>
      <section className="charts__wrapper">
        <BGWave classWave="charts__wave--top" />
        <div className="charts__content">
          <h1>Статистика за всё время</h1>
          {!isAuth && (<p>Статистика доступна только авторизованным пользователям </p>)}
          <div className="charts__switch">
            <span className="switch__label"> Кол-во изученных слов </span>
            <Switch
              checked={switchChart}
              onChange={handleChartSwitch}
              name="checkedA"
            />
            <span className="switch__label"> Прогресс </span>
          </div>
          { switchChart
            ? (
              <GrowthStatistic
                // datesList={dataUserStatisticArray || []}
                // wordsPeriodtList={dataUserStatisticArray || []}
                data={dataUserStatisticArray || []}
              />
            )
            : (
              <EachDayStatistic
                // datesList={dataUserStatisticArray || []}
                // wordsListByDay={dataUserStatisticArray || []}
                data={dataUserStatisticArray || []}
              />
            ) }
          { /* TODO DATA:
                      GrowthStatistic datesList: массив дат, в которые юзер учил какие-то слова
                      GrowthStatistic wordsPeriodtList: массив чисел, каждое число
                                      - общее количество изученных слов к этому дню

                      EachDayStatistic datesList: массив дат, в которые юзер учил какие-то слова
                      EachDayStatistic wordsListByDay - массив чисел - кол-во слов,
                                       изученных в эти даты по каждому дню)
            */}
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

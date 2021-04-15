import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Bar } from 'react-chartjs-2';
import { IStatItem } from '../../../api';
import { getDatesList, getWordsListByDay } from '../../../utils/convertForUserStat';

const EachDayStatistic = ({ data } : { data: IStatItem[] }) => {
  const datesList = getDatesList(data);
  const wordsListByDay = getWordsListByDay(data);

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const [fontSize, setFontSize] = useState(14);
  const [fontSizeY, setFontSizeY] = useState(8);

  useEffect(() => {
    if (isMobile) {
      setFontSize(8);
      setFontSizeY(8);
    } else {
      setFontSize(14);
      setFontSizeY(10);
    }
  }, [isMobile]);

  const dataSett = {
    labels: datesList.length ? datesList : ['Вы еще ничего не учили!'],
    datasets: [
      {
        minBarLength: 10,
        label: 'Изученные слова',
        data: wordsListByDay.length ? wordsListByDay : [0],
        backgroundColor: 'rgba(76, 203, 183, 1)',
        borderColor: ['rgba(76, 203, 183, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const optionsSett = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontSize: fontSizeY,
            fontColor: 'rgba(255, 255, 255, 1)',
            fontFamily: 'Gilroy-Regular',
          },

          scaleLabel: {
            display: true,
            labelString: 'Кол-во слов',
            fontColor: '#fff',
            fontFamily: 'Gilroy-Regular',
            fontSize,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false,
          },

          scaleLabel: {
            display: true,
            labelString: 'Период изучения',
            fontColor: '#fff',
            fontFamily: 'Gilroy-Regular',
            fontSize,
          },
        },
      ],
    },
  };

  return (
    <>
      <Bar data={dataSett} options={optionsSett} />
    </>
  );
};

export default EachDayStatistic;

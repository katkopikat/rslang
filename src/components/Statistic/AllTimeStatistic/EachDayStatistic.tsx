import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Bar } from 'react-chartjs-2';

interface IEachDayStatistic {
  datesList: Array<string>;
  wordsListByDay: Array<number>;
}

const EachDayStatistic = ({ datesList, wordsListByDay }: IEachDayStatistic) => {
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

  const data = {
    labels: datesList,
    datasets: [
      {
        minBarLength: 2,
        label: 'Изученные слова',
        data: wordsListByDay,
        backgroundColor: 'rgba(76, 203, 183, 1)',
        borderColor: ['rgba(76, 203, 183, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
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

  // useEffect(() => {

  // }, []);

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default EachDayStatistic;

import React, { useEffect } from 'react';
import { Chart, ChartPoint } from 'chart.js';

interface IEachDayStatistic {
  datesList: Array<string>;
  wordsListByDay: Array<number>;
}

const EachDayStatistic = ({ datesList, wordsListByDay }: IEachDayStatistic) => {
  const createChart = () => {
    const barContainer = document.querySelector('.bar-container') as HTMLCanvasElement;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const barChart = new Chart(barContainer, {
      type: 'bar',
      data: {
        labels: datesList,
        datasets: [
          {
            minBarLength: 2,
            label: 'Изученные слова',
            data: wordsListByDay as ChartPoint[],
            backgroundColor: 'rgba(76, 203, 183, 1)',
            borderColor: ['rgba(76, 203, 183, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 10,
                fontColor: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Gilroy-Regular',
              },

              scaleLabel: {
                display: true,
                labelString: 'Кол-во слов',
                fontColor: '#fff',
                fontFamily: 'Gilroy-Regular',
                fontSize: 14,
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
                fontSize: 14,
              },
            },
          ],
        },
      },

    });
  };

  useEffect(() => {
    createChart();
    // TODO
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <canvas className="bar-container" />
    </>
  );
};

export default EachDayStatistic;

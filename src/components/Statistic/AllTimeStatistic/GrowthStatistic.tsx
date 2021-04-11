import React, { useEffect } from 'react';
import { Chart, ChartPoint } from 'chart.js';

interface IGrowthStatistic {
  datesList: Array<string>;
  wordsPeriodtList: Array<number>;
}

const GrowthStatistic = ({ datesList, wordsPeriodtList }: IGrowthStatistic) => {
  const createChart = () => {
    const chartContainer = document.querySelector('.charts__container') as HTMLCanvasElement;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lineChart = new Chart(chartContainer, {
      type: 'line',
      data: {
        labels: datesList,
        datasets: [
          {
            minBarLength: 2,
            label: ' Изучено слов к этому дню ',
            data: wordsPeriodtList as ChartPoint[],
            backgroundColor: ['rgba(67, 121, 255, 0.9)'],
            borderColor: ['rgba(76, 203, 183, 1)'],
            borderWidth: 3,
            fill: false,
            // borderDash: [5, 5],
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            pointRadius: 5,
            pointHoverRadius: 10,
            pointHitRadius: 30,
            pointBorderWidth: 0,
            // fontColor: '#FFF',
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas className="charts__container" />;
};

export default GrowthStatistic;

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

const GrowthStatistic = () => {
  const createChart = () => {
    const chartContainer = document.querySelector('.growth-container') as HTMLCanvasElement;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lineChart = new Chart(chartContainer, {
      type: 'line',
      data: {
        labels: [
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
        ],
        datasets: [
          {
            minBarLength: 2,
            label: ' Изучено слов к этому дню ',
            data: [5, 5, 12, 12, 12, 22, 31, 50, 50, 50, 62, 70, 78],
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
                fontColor: 'rgba(255, 255, 255, 0.1)',
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
        // gridLines: {
        //   color: 'rgba(255, 255, 255, 0.5)',
        // },
      },
    });
  };

  useEffect(() => {
    createChart();
  }, []);

  return <canvas className="growth-container" />;
};

export default GrowthStatistic;

import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js';

const tempData = {
  2021: {
    1: {
      1: 13,
      2: 9,
      5: 21,
      17: 8,
    },
    2: {
      1: 17,
      2: 4,
      5: 11,
      17: 8,
    },
    7: {
      1: 20,
      2: 9,
      5: 11,
      17: 8,
    },
    11: {
      1: 5,
      2: 9,
      5: 15,
      17: 8,
    },

  },
  2020: {
    3: {
      1: 13,
      2: 9,
      5: 21,
      17: 8,
    },
    4: {
      1: 17,
      2: 4,
      5: 11,
      17: 8,
    },
    5: {
      1: 20,
      2: 9,
      5: 11,
      17: 8,
    },
    10: {
      1: 5,
      2: 9,
      5: 15,
      17: 8,
    },

  },

};
const EachDayStatistic = () => {
  const [years, setYears] = useState([]);
  const [choosenYear, setChoosenYear] = useState(new Date().getFullYear());
  //   const yearsList = [];
  //   const totalByMonth = {};

  const countYears = () => {
    const yearsList = [];

    tempData.forEach((data) => {
      const year = new Date(data.date).getFullYear();
      if (!yearsList.includes(year)) {
        yearsList.push(year);
      }
    });

    yearsList.sort((a, b) => b - a);

    setYears(yearsList);
  };

  const generateDaysLabels = () => {
    const days: number[] = [];

    for (let i = 1; i <= 31; i += 1) {
      days.push(i);
    }
    return days;
  };

  const createChart = () => {
    const barContainer = document.querySelector('.bar-container');
    const barChart = new Chart(barContainer, {
      type: 'bar',
      data: {
        labels: generateDaysLabels(),
        datasets: [
          {
            minBarLength: 2,
            label: 'Изученные слова',
            data: ['13', '9', '0', '10', '15', '4', '', '1', '8', '13', '9', '8', '13', '6', '8', '10', '9', '12'],
            backgroundColor:
             'rgba(76, 203, 183, 1)',
            borderColor: [
              'rgba(76, 203, 183, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 10,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 10,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });
  };

  useEffect(() => {
    // if (daysData) {

    createChart();

    // }
  }, []);

  return (
    <>
      <canvas className="bar-container" />
      { years.map((year) => (
        <button
          onClick={() => setChoosenYear(year)}
        >
          {' '}
          {year}
          {' '}
        </button>
      ))}
    </>
  );
};

export default EachDayStatistic;

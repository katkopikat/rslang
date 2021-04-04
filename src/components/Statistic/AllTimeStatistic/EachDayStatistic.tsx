import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

const EachDayStatistic = () => {
  // const [years, setYears] = useState([]);
  // const [choosenYear, setChoosenYear] = useState(new Date().getFullYear());
  //   const yearsList = [];
  //   const totalByMonth = {};

  // const countYears = () => {
  //   const yearsList = [];

  //   tempData.forEach((data) => {
  //     const year = new Date(data.date).getFullYear();
  //     if (!yearsList.includes(year)) {
  //       yearsList.push(year);
  //     }
  //   });

  //   yearsList.sort((a, b) => b - a);

  //   setYears(yearsList);
  // };

  const generateDaysLabels = () => {
    const days: number[] = [];

    for (let i = 1; i <= 31; i += 1) {
      days.push(i);
    }
    return days;
  };

  const createChart = () => {
    const barContainer = document.querySelector('.bar-container');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  useEffect(() => { createChart(); }, []);

  return (
    <>
      <canvas className="bar-container" />
      {/* { years.map((year) => (
        <button
          type="button"
          onClick={() => setChoosenYear(year)}
        >
          {' '}
          {year}
          {' '}
        </button>
      ))} */}
    </>
  );
};

export default EachDayStatistic;

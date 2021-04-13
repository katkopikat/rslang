import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Line } from 'react-chartjs-2';
import { IStatItem } from '../../../api';

const getDatesList = (array:IStatItem[]) => array.map((item) => item.date);
const getAllWordsList = (array:IStatItem[]) => array.map((item) => item.allWords);

const GrowthStatistic = ({ data } : { data: IStatItem[] }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const [borderWidth, setBorderWidth] = useState(2);
  const [pointRadius, setPointRadius] = useState(5);
  const [pointHoverRadius, setPointHoverRadius] = useState(10);
  const [fontSize, setFontSize] = useState(14);
  const [fontSizeY, setFontSizeY] = useState(10);

  const datesList = getDatesList(data);
  const wordsPeriodtList = getAllWordsList(data);

  useEffect(() => {
    if (isMobile) {
      setPointRadius(3);
      setPointHoverRadius(6);
      setBorderWidth(1);
      setFontSize(8);
      setFontSizeY(7);
    } else {
      setPointRadius(5);
      setPointHoverRadius(10);
      setBorderWidth(3);
      setFontSize(14);
      setFontSizeY(10);
    }
  }, [isMobile]);

  const dataSett = {
    labels: datesList.length ? datesList : ['Вы еще ничего не учили!', 'Вы еще ничего не учили!'],
    datasets: [
      {
        data: wordsPeriodtList.length ? wordsPeriodtList : [0, 0],
        label: ' Изучено слов к этому дню ',
        backgroundColor: ['rgba(67, 121, 255, 0.9)'],
        borderColor: ['rgba(76, 203, 183, 1)'],
        fill: false,
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth,
        pointRadius,
        pointHoverRadius,
        minBarLength: 2,
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
    <Line data={dataSett} options={optionsSett} />
  );
};

export default GrowthStatistic;

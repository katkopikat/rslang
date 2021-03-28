import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import ModalWindow from '../GameResults/ModalWindow/ModalWindow';
import ProgressBar from '../GameResults/ProgressBar/ProgressBar';
import ResultTitle from '../GameResults/ResultTitle/ResultTitle';
import Counting from '../GameResults/ResultsCounting/Counting';
import WordList from '../GameResults/WordList/WordList';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IWord } from '../Savanna/interfaces';
import './GameResults.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0.3),
        width: '200px',
        marginBottom: '15px',
      },
    },
  })
);

interface IGameResults {
  wrong: IWord[];
  correct: IWord[];
}

const GameResults: React.FC<IGameResults> = ({ wrong, correct }) => {
  const [index, setIndex] = useState<number>(0);

  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };

  const handleClick = () => {
    if (index === 0) setIndex(1);
    if (index === 1) setIndex(0);
  };

  const wrongAnswers = Array.from(new Set(wrong));
  const correctAnswers = Array.from(new Set(correct));

  let percentage: number = Math.round(
    (correctAnswers.length * 100) /
      (wrongAnswers.length + correctAnswers.length)
  );

  Number.isNaN(percentage) ? (percentage = 0) : (percentage = percentage);

  const classes = useStyles();

  return (
    <div style={{ color: 'black' }}>
      <ModalWindow>
        <Tabs
          value={index}
          onChange={handleClick}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          <Tab label='Результат' />
          <Tab label='Посмотреть мои слова' />
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
          <div className='results-wrapper results-wrapper__main'>
            <ResultTitle percentage={percentage} />
            <Counting
              wrong={wrongAnswers}
              correct={correctAnswers}
              onClick={handleClick}
            />
            <ProgressBar percentage={percentage} />
          </div>
          <div className='results-wrapper results-wrapper__words'>
            <WordList wrong={wrongAnswers} correct={correctAnswers} />
          </div>
        </SwipeableViews>
        <div className={`${classes.root} results__buttons`}>
          <Button variant='contained' color='primary'>
            Сыграть еще раз
          </Button>
          <Button variant='contained' color='primary'>
            Перейти в учебник
          </Button>
        </div>
      </ModalWindow>
    </div>
  );
};
export default GameResults;

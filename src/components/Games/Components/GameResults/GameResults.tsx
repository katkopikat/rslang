import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ModalWindow from './ModalWindow/ModalWindow';
import ProgressBar from './ProgressBar/ProgressBar';
import ResultTitle from './ResultTitle/ResultTitle';
import Counting from './ResultsCounting/Counting';
import WordList from './WordList/WordList';
import { IWord } from '../../../../interfaces';
import './GameResults.scss';
import { setGameIndex } from '../../../../redux/actions/appActions';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      padding: 0,
      margin: theme.spacing(0.3),
      width: '200px',
      marginBottom: '15px',
    },
  },
}));

interface IGameResults {
  wrong: IWord[];
  correct: IWord[];
}

const GameResults: React.FC<IGameResults> = ({
  wrong,
  correct,
}: IGameResults) => {
  const [index, setIndex] = useState<number>(0);

  const dispatch = useDispatch();

  const handleChangeIndex = (i: number) => {
    setIndex(i);
  };

  const handleClick = () => {
    if (index === 0) setIndex(1);
    if (index === 1) setIndex(0);
  };

  const wrongAnswers = Array.from(new Set(wrong));
  const correctAnswers = Array.from(new Set(correct));

  let percentage: number = Math.round(
    (correctAnswers.length * 100)
      / (wrongAnswers.length + correctAnswers.length),
  );

  if (Number.isNaN(percentage)) {
    percentage = 0;
  }

  const classes = useStyles();

  return (
    <div style={{ color: 'black' }}>
      <ModalWindow>
        <Tabs
          value={index}
          onChange={handleClick}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab className="tabs-container" label="Результат" />
          <Tab className="tabs-container" label="Посмотреть мои слова" />
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
          <div className="results-wrapper results-wrapper__main">
            <ResultTitle percentage={percentage} />
            <Counting
              wrong={wrongAnswers}
              correct={correctAnswers}
              onClick={handleClick}
            />
            <ProgressBar percentage={percentage} />
          </div>
          <div className="results-wrapper results-wrapper__words">
            <WordList wrong={wrongAnswers} correct={correctAnswers} />
          </div>
        </SwipeableViews>
        <div className={`${classes.root} results__buttons`}>
          <Button
            className="results__buttons_new-game"
            variant="contained"
            color="primary"
            onClick={() => dispatch(setGameIndex(Math.random()))}
          >
            Сыграть еще раз
          </Button>

          <Button variant="contained" color="primary">
            <Link className="button-link" to="/textbook">Перейти в учебник</Link>
          </Button>
        </div>
      </ModalWindow>
    </div>
  );
};
export default GameResults;

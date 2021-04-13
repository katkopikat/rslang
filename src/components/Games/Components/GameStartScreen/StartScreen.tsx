import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/rootReducer';
import {
  fetchWords,
  setGroup,
  setPage,
} from '../../../../redux/actions/appActions';
import { API_URL, ViewMode } from '../../../../constants';
import './StartScreen.scss';
import games from '../../../../data/games.json';
import { IGameDescription } from '../../../../interfaces';
import randomInteger from '../../../../commonFunc/random';

import wordsApi from '../../../../redux/actions/wordsApiActions';
import { useAuth } from '../../../AuthContext';

const NUMBER_OF_THE_PAGES = 30;

interface IStartScreen {
  game: string;
  onClick: () => void;
}

interface ILevel {
  id: number;
  text: string;
  isActive: boolean;
  onClick: (id: number) => void;
}

const Level = ({
  id, text, isActive, onClick,
}: ILevel) => (
  <div
    className={`level-button ${isActive ? 'active' : ''}`}
    role="button"
    tabIndex={0}
    onClick={() => onClick(id)}
    onKeyDown={() => onClick(id)}
  >
    {text}
  </div>
);

const StartScreen = ({ game, onClick }: IStartScreen) => {
  const gamePresets: { [dynamic: string]: IGameDescription } = games;

  const dispatch = useDispatch();
  const { userId, token } = useAuth();

  const words = useSelector((state: RootState) => state.app.words);
  const group = useSelector((state: RootState) => state.app.group);
  const page = useSelector((state: RootState) => state.app.page);
  const viewMode = useSelector((state: RootState) => state.app.viewMode);
  const isLevel = useSelector(
    (state: RootState) => state.app.startGameFromMenu,
  );

  const [active, setActive] = useState<number[]>([]);
  const [buttonActive, setButtonActive] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [wordsUrl, setWordsUrl] = useState(
    `${API_URL}/words?group=${group}&page=${page}`,
  );

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  useEffect(() => {
    if (isLevel) setButtonDisabled(true);
  }, [isLevel]);

  useEffect(() => {
    setWordsUrl(`${API_URL}/words?group=${group}&page=${page}`);
  }, [group, page]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isLevel) {
      (async () => {
        dispatch(fetchWords(wordsUrl));
      })();
    }
  }, [wordsUrl]);

  useEffect(() => {
    if (viewMode === ViewMode.Textbook) {
      if (userId && !isLevel) {
        for (let i = page - 1; i >= 0; i -= 1) {
          if (words.length >= 20) break;
          dispatch(
            wordsApi.fetchAdditionalWordsForGame(group, i, userId, token),
          );
        }
      }
    }
    if (viewMode === ViewMode.Dictionary) {
      if (words.length < 6) {
        dispatch(
          wordsApi.fetchForAdditionalAnswerOptions(
            group,
            randomInteger(0, NUMBER_OF_THE_PAGES - 1),
          ),
        );
      }
    }
  }, []);

  const handleClick = (id: number) => {
    dispatch(setGroup(id));
    dispatch(setPage(randomInteger(0, NUMBER_OF_THE_PAGES - 1)));
    setButtonDisabled(false);
    setButtonActive(true);
    setActive([id]);
  };

  return (
    <div className="start-screen">
      <div className="start-screen_block-one">
        <p className="start-screen__title">{gamePresets[game].type}</p>
        <p className="start-screen__description">
          {gamePresets[game].description}
        </p>
      </div>
      <div className="start-screen_block-two">
        {isLevel && (
          <div className="start-screen__title_two">Выбери уровень:</div>
        )}
        <div className="level-buttons">
          {isLevel
            && levels.map((item: string, index: number) => (
              <Level
                key={item}
                id={index}
                text={item}
                isActive={buttonActive && active.includes(index)}
                onClick={handleClick}
              />
            ))}
        </div>
        {!isLevel && (
          <div className="start-screen__title_two">
            Игра начнется с текущими словами из словаря. Удачи!
          </div>
        )}
        <button
          className="start-screen__button"
          disabled={buttonDisabled}
          type="button"
          onClick={onClick}
        >
          Начать
        </button>
      </div>
    </div>
  );
};

export default StartScreen;

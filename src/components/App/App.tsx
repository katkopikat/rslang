import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainPage from '../MainPage/MainPage';
import Textbook from '../Textbook/Textbook';
import Statistic from '../Statistic/Statistic';
import AuthPage from '../Auth/AuthPage';

import Oasis from '../Games/Oasis/Oasis';
import Savanna from '../Games/Savanna/Savanna';
import AudioCall from '../Games/AudioCall/AudioCall';
import Sprint from '../Games/Sprint/Sprint';

import shuffle from '../../commonFunc/shuffle';
import { AuthProvider } from '../AuthContext';
import { RootState } from '../../redux/rootReducer';

import ScrollToTop from '../ScrollToTop/ScrollToTop';

interface HistoryProps extends RouteComponentProps<any> {}

const App: React.FC = () => {
  const words = useSelector((state: RootState) => shuffle(state.app.words));
  const gameIndex = useSelector((state: RootState) => state.app.gameIndex);

  return (
    <>
      <Router>
        <ScrollToTop />
        <AuthProvider>

          <Route
            path="/authorization"
            render={({ history }: HistoryProps) => (
              <AuthPage history={history} />
            )}
          />

          <Route path="/" exact render={() => <MainPage />} />
          <Route path="/textbook" render={() => <Textbook />} />
          <Route path="/statistic" render={() => <Statistic />} />

          <Route
            path="/games/savanna"
            render={() => <Savanna wordsList={words} key={gameIndex} />}
          />

          <Route
            path="/games/oasis"
            render={() => <Oasis wordsList={words} key={gameIndex} />}
          />
          <Route
            path="/games/sprint"
            render={() => <Sprint wordsList={words} key={gameIndex} />}
          />
          <Route
            path="/games/audiocall"
            render={() => <AudioCall wordsList={words} key={gameIndex} />}
          />
        </AuthProvider>
      </Router>
    </>
  );
};
export default App;

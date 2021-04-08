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
// import LoginPage from '../Auth/LoginPage';
import AuthPage from '../Auth/AuthPage';
// import RegistrationPage from '../Auth/RegistrationPage';

import Oasis from '../Games/Oasis/Oasis';
import Savanna from '../Games/Savanna/Savanna';
import AudioCall from '../Games/AudioCall/AudioCall';
import Sprint from '../Games/Sprint/Sprint';

import shuffle from '../../commonFunc/shuffle';
import { AuthProvider } from '../AuthContext';
import { RootState } from '../../redux/rootReducer';

interface HistoryProps extends RouteComponentProps<any> {}

const App: React.FC = () => {
  const words = useSelector((state: RootState) => shuffle(state.app.words));

  return (
    <>
      <Router>
        <AuthProvider>

          <Route
            path="/authorization"
            render={({ history }: HistoryProps) => (
              <AuthPage history={history} />
            )}
          />

          {/* <Route
            path="/login"
            render={({ history }: HistoryProps) => (
              <LoginPage history={history} />
            )}
          />
          <Route
            path="/register"
            render={({ history }: HistoryProps) => (
              <RegistrationPage history={history} />
            )}
          /> */}

          <Route path="/" exact render={() => <MainPage />} />
          <Route path="/textbook" render={() => <Textbook />} />
          <Route path="/statistic" render={() => <Statistic />} />
          {/* <Route path="/games/main" render={() => <span> Main </span>} /> */}

          <Route
            path="/games/savanna"
            render={() => <Savanna wordsList={words} />}
          />

          <Route
            path="/games/oasis"
            render={() => <Oasis words={words} />}
          />
          <Route
            path="/games/sprint"
            render={() => <Sprint wordsList={words} />}
          />
          <Route
            path="/games/audiocall"
            render={() => <AudioCall words={words} />}
          />
        </AuthProvider>
      </Router>
    </>
  );
};
export default App;

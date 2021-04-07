import React, { useState } from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import Textbook from '../Textbook/Textbook';
import Statistic from '../Statistic/Statistic';
import LoginPage from '../Auth/LoginPage';
import RegistrationPage from '../Auth/RegistrationPage';

import Oasis from '../Games/Oasis/Oasis';
import Savanna from '../Games/Savanna/Savanna';
import AudioCall from '../Games/AudioCall/AudioCall';
import Sprint from '../Games/Sprint/Sprint';

import shaffle from '../../commonFunc/shuffle';
import { IWord } from '../../interfaces';
import { AuthProvider } from '../AuthContext';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

interface HistoryProps extends RouteComponentProps<any> {}

const App: React.FC = () => {
  const [words, setWords] = useState<IWord[]>([]);

  const setWordsInGames = (arr: IWord[]) => {
    setWords(shaffle(arr));
  };

  return (
    <>
      <Router>
        <AuthProvider>
          {/* <Header /> */}
          <Route
            path="/login"
            render={({ history }: HistoryProps) => <LoginPage history={history} />}
          />
          <Route
            path="/register"
            render={({ history }: HistoryProps) => <RegistrationPage history={history} />}
          />
          <Route path="/" exact component={MainPage} />
          <Route path="/textbook" render={() => <Textbook setWordsInGames={setWordsInGames} />} />
          <Route path="/games/savanna" render={() => <Savanna wordsList={words} />} />
          <Route path="/games/oasis" render={() => <Oasis words={words} />} />
          <Route path="/games/sprint" render={() => <Sprint wordsList={words} />} />
          <Route path="/games/audiocall" render={() => <AudioCall words={words} />} />
          <Route path="/statistic" component={Statistic} />
        </AuthProvider>
        {/* <Footer /> */}
      </Router>

    </>
  );
};
export default App;

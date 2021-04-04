import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Textbook from '../Textbook/Textbook';
import WriteGame from '../Games/WriteWords/WriteWord';
import Savanna from '../Games/Savanna/Savanna';
import AudioCall from '../Games/AudioCall/AudioCall';
import Sprint from '../Games/Sprint/Sprint';
import shaffle from '../../commonFunc/shuffle';
import { IWord } from '../../interfaces';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App: React.FC = () => {
  const [words, setWords] = useState<IWord[]>([]);

  const setWordsInGames = (arr: IWord[]) => {
    setWords(shaffle(arr));
  };

  return (
    <>
      <Header />
      <Router>
        {/* <Route path='/login' component={LoginPage} /> */}
        <Route path="/" exact render={() => <Textbook setWordsInGames={setWordsInGames} />} />
        <Route path="/games/main" render={() => <span> Main </span>} />
        <Route path="/games/savanna" render={() => <Savanna wordsList={words} />} />
        <Route path="/games/writegame" render={() => <WriteGame words={words} />} />
        <Route path="/games/sprint" render={() => <Sprint wordsList={words} />} />
        <Route path="/games/audiocall" render={() => <AudioCall words={words} />} />
      </Router>
      <Footer />
    </>
  );
};

export default App;

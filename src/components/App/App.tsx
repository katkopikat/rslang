import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Textbook from '../Textbook/Textbook';
import WriteGame from '../Games/WriteWords/WriteWord';
import Savanna from '../Games/Savanna/Savanna';
import shaffle from '../../commonFunc/shuffle';
import { IWord } from '../../interfaces';

import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

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
        <Route path="/games/sprint" render={() => <span>Игра Спринт</span>} />
        <Route path="/games/audiocall" render={() => <span>Игра Аудиовызов</span>} />
      </Router>
      {/* <Footer /> */}
    </>
  );
};

export default App;

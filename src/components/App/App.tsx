import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Textbook from '../Textbook/Textbook';
import WriteGame from '../Games/WriteWords/WriteWord';

// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

const App: React.FC = () => {
  const [words, setWordsInGames] = useState([]);

  return (
  //  {/* <Header /> */}
    <Router>
      {/* <Route path='/login' component={LoginPage} /> */}
      <Route path="/" exact render={() => <Textbook setWordsInGames={setWordsInGames}/>} />
      <Route path="/games/main" render={() => <span> Игра Саванна</span>} />
      <Route path="/games/savanna" render={() => <span> Игра Саванна</span>} />
      <Route path="/games/writegame" render={() => <WriteGame words={words} />} />
      <Route path="/games/sprint" render={() => <span>Игра Спринт</span>} />
      <Route path="/games/audiocall" render={() => <span>Игра Аудиовызов</span>} />
    </Router>
  //  {/* <Footer /> */}
  );
};

export default App;

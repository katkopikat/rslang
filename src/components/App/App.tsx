import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Textbook from '../Textbook/Textbook';

// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

const App: React.FC = () => (
  //  {/* <Header /> */}
  <Router>
    {/* <Route path='/login' component={LoginPage} /> */}
    <Route path="/" exact component={Textbook} />
    <Route path="/games/savanna" render={() => <span> Игра Саванна</span>} />
    <Route path="/games/writegame" render={() => <span>Игра WriteGame</span>} />
    <Route path="/games/sprint" render={() => <span>Игра Спринт</span>} />
    <Route path="/games/audiocall" render={() => <span>Игра Аудиовызов</span>} />
  </Router>
  //  {/* <Footer /> */}
);

export default App;

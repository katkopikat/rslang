import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Savanna from '../Games/Savanna/Savanna';

const App: React.FC = () => (
  <Router>
    {/* <Header />
    <Footer /> */}
    <Savanna group={1}/>
  </Router>
);

export default App;

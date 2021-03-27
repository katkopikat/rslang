import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sprint from '../Games/Sprint/Sprint';

const App: React.FC = () => (
  <Router>
    {/* <Header /> */}
    <Sprint group={1} page={2} />
    <Footer />
  </Router>
);

export default App;

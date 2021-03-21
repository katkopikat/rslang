import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App: React.FC = () => (
  <Router>
    <Header />

    <Footer />
  </Router>
);

export default App;

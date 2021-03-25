import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import WriteWord from '../Games/WriteWord';

// import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App: React.FC = () => (
  <Router>
    {/* <Header /> */}
    <WriteWord group={1} page={1} />
    <Footer />
  </Router>
);

export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Textbook from '../Textbook/Textbook';

// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

const App: React.FC = () => (
  <Router>
    {/* <Header /> */}
    <Textbook />
    {/* <Footer /> */}
  </Router>
);

export default App;

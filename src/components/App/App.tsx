import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import VocabularyPage from '../VocabularyPage/VocabularyPage';

// import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App: React.FC = () => {
  // temp data:
  const group: number = 0;
  const page: number = 0;

  return (

    <Router>
      {/* <Header /> */}
      <VocabularyPage group={group} page={page} />
      <Footer />
    </Router>
  );
};

export default App;

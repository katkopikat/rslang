import React from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';

import { AuthProvider } from '../AuthContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LoginPage from '../Auth/LoginPage';
// import Register from '../LoginPage/Register';

interface HistoryProps extends RouteComponentProps<any> {}

const App: React.FC = () => (
  <Router>
    <>
      <AuthProvider>
        <Header />
        <Route
          path="/login"
          render={({ history }: HistoryProps) => <LoginPage history={history} />}
        />
        {/* <Route
          path="/register"
          render={({ history }: HistoryProps) => <Register history={history} />}
        /> */}
        <Footer />
      </AuthProvider>
    </>
  </Router>
);

export default App;

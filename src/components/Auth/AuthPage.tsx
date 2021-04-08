import React, { useState } from 'react';
import LoginPage from './LoginPage';
import ILoginPage from './interface';
import RegistrationPage from './RegistrationPage';
import './LoginPage.scss';
import './AuthPage.scss';
import '../MainPage/BgAnimation.scss';

const AuthPage: React.FC<ILoginPage> = ({ history }: ILoginPage) => {
  const [page, setPage] = useState('registration');

  const handleChangePage = (redirectTo: string) => {
    setPage(redirectTo);
  };

  return (
    <>
      <section className={`auth wave-bg-${page === 'registration' ? 'registr' : 'login'} anim`}>
        <div className="inner">
          <div className="wrapper greeting__wrapper">
            {
            page === 'registration'

              ? <RegistrationPage history={history} handleChangePage={handleChangePage} />
              : <LoginPage history={history} handleChangePage={handleChangePage} />
            }
            <img
              className="greeting__img"
              src=""
              alt="login"
            />
          </div>
          <svg
            className={`svg auth__svg svg-${page === 'registration' ? 'registr' : 'login'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              d="M0,288L60,261.3C120,235,240,181,360,160C480,139,600,149,720,176C840,203,960,245,1080,229.3C1200,
                213,1320,139,1380,101.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,
                320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default AuthPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import { IAuthPage } from './interface';
import RegistrationPage from './RegistrationPage';
import './AuthPage.scss';
import '../MainPage/BgAnimation.scss';

const AuthPage: React.FC<IAuthPage> = ({ history } : IAuthPage) => {
  const [page, setPage] = useState('login');

  const handleChangePage = (redirectTo: string) => {
    setPage(redirectTo);
  };

  return (
    <>
      <Link to="/"><span className="logo auth__logo">Ulearning.</span></Link>
      <section className={`auth wave-bg-${page === 'registration' ? 'registr' : 'login'} anim`}>
        <div className="inner">
          <div className="wrapper auth__wrapper">

            {
            page === 'registration'

              ? <RegistrationPage history={history} handleChangePage={handleChangePage} />
              : <LoginPage history={history} handleChangePage={handleChangePage} />
            }
            <img
              className="auth__img"
              src="https://res.cloudinary.com/travel-app/image/upload/v1617929190/rslang/login.png"
              alt="rslang"
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

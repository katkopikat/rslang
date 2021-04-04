import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from '../AuthContext';

const Header: React.FC = () => {
  const {
    userId,
    logout,
    avatarURL,
  } = useAuth();
  const currentURL = useLocation();
  const isAuthPage = currentURL.pathname === '/login' || currentURL.pathname === '/register';
  const authLinkEl = avatarURL ? (
    <Avatar alt="user avatar" src={avatarURL} />
  ) : (
    <AccountCircle />
  );
  const logoutEl = userId && !isAuthPage ? <ExitToAppIcon onClick={logout} /> : null;

  return (
    <header>
      <div className="header-wrapper">
        <div className="header-left">
          <Link to="/" className="logo">
            logo
          </Link>
        </div>
        <div className="header-right">
          {!isAuthPage && <Link to="/login">{authLinkEl}</Link>}
          {logoutEl}
        </div>
      </div>
    </header>
  );
};

export default Header;

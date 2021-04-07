import React from 'react';

import Menu from '../Menu/Menu';
import './Header.scss';

const Header: React.FC = () => (
  <>
    <Menu />
    <section className="header-anim greeting anim">
      <div className="inner">
        <svg
          className="svg svg_main"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            d="M0,288L60,261.3C120,235,240,181,360,160C480,139,600,149,720,176C840,203,960,245,1080,229.3C1200,
                213,1320,139,1380,101.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,
                320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  </>
);

// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Avatar from '@material-ui/core/Avatar';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { useAuth } from '../AuthContext';

// const Header: React.FC = () => {
//   const {
//     userId,
//     logout,
//     avatarURL,
//   } = useAuth();
//   const currentURL = useLocation();
//   const isAuthPage = currentURL.pathname === '/login' || currentURL.pathname === '/register';
//   const authLinkEl = avatarURL ? (
//     <Avatar alt="user avatar" src={avatarURL} />
//   ) : (
//     <AccountCircle />
//   );
//   const logoutEl = userId && !isAuthPage ? <ExitToAppIcon onClick={logout} /> : null;

//   return (
//     <header>
//       <div className="header-wrapper">
//         <div className="header-left">
//           <Link to="/" className="logo">
//             logo
//           </Link>
//         </div>
//         <div className="header-right">
//           {!isAuthPage && <Link to="/login">{authLinkEl}</Link>}
//           {logoutEl}
//         </div>
//       </div>
//     </header>
//   );
// };

export default Header;

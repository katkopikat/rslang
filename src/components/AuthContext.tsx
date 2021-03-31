import React, {
  useEffect,
  useState,
} from 'react';
import { API_URL } from '../constants';
import request from '../helpers/request';

export interface IAuthContext {
  userId: string;
  userName: string;
  userEmail: string;
  token: string;
  refreshToken: string;
  avatarUrl: string;
  signIn: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string, avatarUrl: string) => Promise<boolean>;
  logout?: () => void;
}

const loadFromLS = (item: string) => {
  const result = localStorage.getItem(item) ? localStorage.getItem(item) : '';
  if (result) return result;
  return '';
};

const contextDefaults = {
  userId: '',
  userName: '',
  userEmail: '',
  token: '',
  refreshToken: '',
  avatarUrl: '',
  signIn: () => new Promise<boolean>(() => true),
  register: () => new Promise<boolean>(() => true),
  logout: () => null,
};

// const userLS = {
//   userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
//   userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
//   userEmail: localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : '',
//   token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
//   refreshToken: localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : '',
//   avatarUrl: localStorage.getItem('avatarUrl') ? localStorage.getItem('avatarUrl') : '',
// };

const AuthContext = React.createContext<IAuthContext>(contextDefaults);

const AuthProvider: React.FC = (props) => {
  const children = props;
  AuthProvider.displayName = 'AuthProvider';

  const [user, setUser] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    token: '',
    refreshToken: '',
    avatarUrl: '',
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('avatarUrl');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    setUser({
      userId: '',
      userName: '',
      userEmail: '',
      token: '',
      refreshToken: '',
      avatarUrl: '',
    });
  };

  const autoLogin = () => {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (token) {
      request('GET', `${API_URL}/users/${id}`, false, token)
        .then((data) => {
          if (!data.ok) {
            logout();
          } else {
            setUser({
              userId: loadFromLS('userId'),
              userName: loadFromLS('userName'),
              userEmail: loadFromLS('userEmail'),
              token: loadFromLS('token'),
              refreshToken: loadFromLS('refreshToken'),
              avatarUrl: loadFromLS('avatarUrl'),
            });
          }
        })
        .catch();
    }
  };

  useEffect(autoLogin, []);

  const signIn = async (email: string, password: string) => {
    const data = await request('POST', `${API_URL}/signin`, { email, password });
    if (data.ok) {
      const {
        token,
        refreshToken,
        userId,
        name,
        avatarUrl,
      } = await data.json();
      localStorage.setItem('token', token);
      localStorage.getItem('avatarUrl');
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      setUser({
        token,
        refreshToken,
        userId,
        userName: name || '',
        avatarUrl,
        userEmail: email,
      });
      return true;
    }
    return false;
  };

  // TODO handle and display errors

  const register = async (
    name: string,
    email: string,
    password: string,
    avatarUrl: string,
  ) => {
    const data = await request('POST', `${API_URL}/users`, {
      name,
      email,
      password,
      avatarUrl,
    });
    if (data.ok) {
      const {
        id,
      } = await data.json();
      localStorage.setItem('avatarUrl', avatarUrl);
      localStorage.setItem('userId', id);
      // setUser({
      //   token: '',
      //   refreshToken: '',
      //   userId: id,
      //   userName: name || '',
      //   avatarUrl,
      //   userEmail: email,
      // });
      signIn(email, password);
      // localStorage.setItem('token', data.newUser.token);
      // setUser({
      //   userName: data.newUser.login,
      //   userName: data.newUser.name || '',
      //   avatarUrl,
      // });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        ...user,
        signIn,
        logout,
        register,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...children}
    />
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };

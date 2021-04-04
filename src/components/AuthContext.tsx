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
    // TODO constant for errors
    if (data.status === 404) {
      throw new Error('not found');
    }
    if (data.status === 403) {
      throw new Error('wrong credential');
    }
    return false;
  };

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
      signIn(email, password);
      return true;
    }
    if (data.status === 417) {
      throw new Error('user with this e-mail exists');
    }
    if (data.status === 422) {
      const errorsArray: Array<string> = (await data.json()).error.errors
        .map((item: { message: string; }) => item.message);

      if (errorsArray.length) {
        throw new Error(errorsArray.toString());
      }
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

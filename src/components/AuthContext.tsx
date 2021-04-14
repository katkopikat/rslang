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
  avatarURL: string;
  signIn: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string, avatarURL: string) => Promise<boolean>;
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
  avatarURL: '',
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
    avatarURL: '',
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('avatarURL');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    setUser({
      userId: '',
      userName: '',
      userEmail: '',
      token: '',
      refreshToken: '',
      avatarURL: '',
    });
  };

  useEffect(() => {
    const autoLogin = async () => {
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (token) {
        request('GET', `${API_URL}/users/${id}`, false, token)
          .then(async (data) => {
            if (!data.ok) {
              logout();
            } else {
              const {
                id: userId,
                name,
                avatarURL,
                email,
              } = await data.json();
              localStorage.setItem('userId', userId);
              localStorage.setItem('userName', name);
              localStorage.setItem('avatarURL', avatarURL);
              localStorage.setItem('userEmail', email);
              setUser({
                userId,
                userName: name,
                userEmail: email,
                token: loadFromLS('token'),
                refreshToken: loadFromLS('refreshToken'),
                avatarURL,
              });
            }
          })
          .catch();
      }
    };
    autoLogin();
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await request('POST', `${API_URL}/signin`, { email, password });
    if (data.ok) {
      const {
        token,
        refreshToken,
        userId,
        name,
        avatarURL,
      } = await data.json();
      localStorage.setItem('token', token);
      localStorage.setItem('avatarURL', avatarURL);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      setUser({
        token,
        refreshToken,
        userId,
        userName: name || '',
        avatarURL: avatarURL || '',
        userEmail: email,
      });
      return true;
    }
    if (data.status === 404) {
      throw new Error('Неправильный логин или пароль');
    }
    if (data.status === 403) {
      throw new Error('Неправильный логин или пароль');
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    avatarURL: string,
  ) => {
    const data = await request('POST', `${API_URL}/users`, {
      name,
      email,
      password,
      avatarURL,
    });
    if (data.ok) {
      const {
        id,
      } = await data.json();
      localStorage.setItem('avatarURL', avatarURL);
      localStorage.setItem('userId', id);
      signIn(email, password);
      return true;
    }
    if (data.status === 417) {
      throw new Error('Этот e-mail уже занят');
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

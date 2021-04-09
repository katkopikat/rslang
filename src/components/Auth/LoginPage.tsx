import React, { useRef, useState } from 'react';
import {
  Button,
  makeStyles,
  TextField,
  Popover,
} from '@material-ui/core';
import { useAuth } from '../AuthContext';
import ILoginPage from './interface';

import './LoginPage.scss';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage: React.FC<ILoginPage> = ({ history, handleChangePage }: ILoginPage) => {
  const classes = useStyles();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const signInButton = (document.getElementById('signInButton') as HTMLButtonElement);
  const [errors, setErrors] = useState('');
  const [openPopover, setOpenPopover] = useState(false);

  const id = openPopover ? 'simple-popover' : undefined;
  const handleClose = () => {
    setOpenPopover(false);
  };

  const { signIn } = useAuth();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let signInError;
    const emailValue = emailInput.current ? emailInput.current.value : '';
    const passwordValue = passwordInput.current ? passwordInput.current.value : '';
    const success = await signIn(emailValue, passwordValue).catch((error) => {
      signInError = error.message;
    });
    if (success === true && signInError === undefined) {
      history.push('/');
      return true;
    }
    if (signInError) {
      setErrors(signInError);
      setOpenPopover(true);
      return false;
    }
    return false;
  };
  return (
    <>
      <div className="auth__content">
        <h1> Уже с нами? </h1>
        <p>
          {' '}
          Войди в свой аккаунт Ulearning!
          {' '}
        </p>

        <div className="login__content">
          <Popover
            className="auth__popover"
            id={id}
            open={openPopover}
            anchorEl={signInButton}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <p>{errors}</p>
          </Popover>
          <form
            noValidate
            onSubmit={handleSignIn}
            className={classes.form}
          >
            <TextField
              inputRef={emailInput}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              inputRef={passwordInput}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              id="signInButton"
              className={classes.submit}
            >
              Войти
            </Button>
            <div className="auth__link">
              <span> Еще не с нами? Тогда </span>

              <button
                className="link-btn"
                onClick={() => handleChangePage('registration')}
                type="button"
              >
                зарегистрируйся
              </button>
            </div>
          </form>

        </div>

      </div>
      {/* <img
        className="auth__img"
        src="https://res.cloudinary.com/travel-app/image/upload/v1617929190/rslang/login.png"
        alt="rslang"
      /> */}
    </>
  );
};

export default LoginPage;

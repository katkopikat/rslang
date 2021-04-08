import React, { useRef, useState } from 'react';
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Popover,
} from '@material-ui/core';
import { useAuth } from '../AuthContext';
import ILoginPage from './interface';

import './LoginPage.scss';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    padding: theme.spacing(2),
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
          Войди в свой аккаунт RS Lang и изучай английский,
          используй все возможности приложения!
          {' '}
        </p>

        <div className="login__content">
          <Popover
            id={id}
            open={openPopover}
            anchorEl={signInButton}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Typography className={classes.typography}>{errors}</Typography>
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
              {/* <Link to="/register">register</Link> */}
            </div>
          </form>

        </div>

      </div>
      <img
        className="greeting__img"
        src="https://res.cloudinary.com/travel-app/image/upload/v1617908537/rslang/lo_r0477k.png"
        alt="rslang"
      />
    </>
  );
};

export default LoginPage;

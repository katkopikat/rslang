import React, { useCallback, useState, useRef } from 'react';
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Fab,
  Popover,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import { useAuth } from '../AuthContext';
import ILoginPage from './interface';

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
  file: {
    margin: theme.spacing(2, 0, 1),
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.grey[50],
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const RegistrationPage: React.FC<ILoginPage> = ({ history, handleChangePage }: ILoginPage) => {
  const classes = useStyles();
  const emailInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const signUpButton = (document.getElementById('signUpButton') as HTMLButtonElement);
  const [isLoaded, setIsLoaded] = useState('');
  const [errors, setErrors] = useState('');
  const [openPopover, setOpenPopover] = useState(false);

  const id = openPopover ? 'simple-popover' : undefined;
  const handleClose = () => {
    setOpenPopover(false);
  };

  const { register } = useAuth();

  const uploadPhoto = useCallback((event: React.ChangeEvent<{}>) => {
    const input: FileList | null = (document.getElementById('upload-photo') as HTMLInputElement)
      ?.files;
    if (event && input?.length) {
      const file = input[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'travel-app');
      fetch('https://api.cloudinary.com/v1_1/rssteam69/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          const imgURL = data.url;
          setIsLoaded(imgURL);
        })
        .catch();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let registerError;
    const emailValue = emailInput.current ? emailInput.current.value : '';
    const nameValue = nameInput.current ? nameInput.current.value : '';
    const passwordValue = passwordInput.current ? passwordInput.current.value : '';
    const confirmPasswordValue = confirmPasswordInput.current ? confirmPasswordInput.current.value : '';
    if (passwordValue !== confirmPasswordValue) {
      setErrors('Confirm password error');
      setOpenPopover(true);
      return false;
    }
    const success = await register(nameValue, emailValue, passwordValue, isLoaded)
      .catch((error) => {
        registerError = error.message;
      });
    if (success === true && registerError === undefined) {
      history.push('/');
      return true;
    }
    if (registerError) {
      setErrors(registerError);
      setOpenPopover(true);
      return false;
    }
    return false;
  };

  return (
    <>
      <div className="auth__content">
        <h1> Зарегистрируйся в RS Lang </h1>
        <p>  и изучай английский, используя все возможности приложения! </p>
        <div>

          <Popover
            id={id}
            open={openPopover}
            anchorEl={signUpButton}
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
            onSubmit={handleSubmit}
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
              inputRef={nameInput}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="имя"
              name="name"
              autoComplete="name"
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
            <TextField
              inputRef={confirmPasswordInput}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="подтвердите пароль"
              type="password"
              id="confirm-password"
              autoComplete="confirm-password"
            />
            <label htmlFor="upload-photo" className="upload-photo">
              <input
                onChange={uploadPhoto}
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
              />
              <Fab
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                className={`${classes.file} avatar-btn`}
              >
                {isLoaded ? <CheckIcon /> : <AddIcon />}
                {isLoaded ? 'готово' : 'Загрузить аватар'}
              </Fab>
            </label>
            <a href={isLoaded} className="img-link">
              {isLoaded}
            </a>
            <Button
              type="submit"
              id="signUpButton"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Зарегистрироваться
            </Button>
            <div className="auth__link">
              <span>Уже с нами? </span>
              <button
                className="link-btn"
                type="button"
                onClick={() => handleChangePage('login')}
              >
                Да, войти!
              </button>
              {/* <Link to="/login">Sign in</Link> */}
            </div>
          </form>
        </div>
      </div>
      <img
        className="auth__img"
        src="https://res.cloudinary.com/travel-app/image/upload/v1617908537/rslang/lo_r0477k.png"
        alt="rslang"
      />
    </>
  );
};

export default RegistrationPage;

import React, { useRef, useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography,
  Popover,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
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
  typography: {
    padding: theme.spacing(2),
  },
}));

const LoginPage: React.FC<ILoginPage> = ({ history }: ILoginPage) => {
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
    <Container
      component="main"
    >
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Войти
      </Typography>
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
          label="password"
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
          Sign In
        </Button>
        <Grid container>
          <Link to="/register">register</Link>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginPage;

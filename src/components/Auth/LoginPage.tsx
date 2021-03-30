import React, { useRef } from 'react';
import {
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  // Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface ILoginPage {
  // TODO ??
  // history: RouteComponentProps['history'];
  history: any;
}

const LoginPage: React.FC<ILoginPage> = (props) => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const { signIn } = useAuth();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailValue = emailInput.current ? emailInput.current.value : '';
    const passwordValue = passwordInput.current ? passwordInput.current.value : '';
    const success = await signIn(emailValue, passwordValue);
    if (success) props.history.push('/');
  };
  return (
    <Grid
      container
      component="main"
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div>
          <form
            noValidate
            onSubmit={handleSignIn}
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
            >
              Sign In
            </Button>
            <Grid container>
              <Link to="/register">register</Link>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

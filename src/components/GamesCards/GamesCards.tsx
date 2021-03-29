import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  wordCard: {
    height: 130,
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    overflowWrap: 'break-word',
  },
}));

const GamesCards = () => {
  const classes = useStyles();
  return (
    <Grid>

      <Link to="/games/savanna">
        <Paper className={classes.wordCard} onClick={() => console.log('Open Savanna page')}>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Savanna
          </Typography>
          <Typography align="center">
            Game description
          </Typography>
        </Paper>
      </Link>

      <Link to="/games/writegame">
        <Paper className={classes.wordCard} onClick={() => console.log('Open Write page')}>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Write Word
          </Typography>
          <Typography align="center">
            Game description
          </Typography>
        </Paper>
      </Link>

    </Grid>
  );
};

export default GamesCards;

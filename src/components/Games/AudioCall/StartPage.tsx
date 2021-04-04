import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

interface IProps {
  handleStartClick: () => void,
}

export default ({ handleStartClick }: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography>Аудиовызов</Typography>
      <br />
      <Typography>Игра улучшает восприятие английской речи на слух</Typography>
      <br />
      <Button variant="contained" onClick={handleStartClick}>Начать игру</Button>
    </Container>
  );
};

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'center',
    position: 'relative',
  },
  gameGrid: {
    maxWidth: 900,
  },
  soundIconBig: {
    fontSize: 90,
    borderRadius: '50%',
    margin: 20,
    color: '#fff',
    border: '3px solid white',
    padding: '0.5rem',
  },
  soundIcon: {
    color: '#fff',
  },
  wordChoise: {
    margin: '50px 0',
  },
  answerOption: {
    transition: 'none',
    color: '#fff',
    border: '2px solid #fff6',
    borderRadius: '1.5rem',
    fontFamily: 'Gilroy-Regular',
    letterSpacing: '0.05rem',
  },
  answerOptionRight: {
    background: 'lightgreen',
    '&:hover': {
      background: 'lightgreen',
    },
  },
  answerOptionWrong: {
    background: 'lightcoral',
    '&:hover': {
      background: 'lightcoral',
    },
  },
  arrow: {
    fontSize: 40,
    margin: '-10px 20px',
  },
  wordImage: {
    height: '50vmin',
    maxHeight: 200,
    display: 'block',
    marginBottom: 20,
    borderRadius: 20,
  },
}));

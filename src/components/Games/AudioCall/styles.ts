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
    boxShadow: '0 0 20px #fff',
    margin: 20,
    color: '#fff',
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
    border: '1px solid #fff6',
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
    // width: '50vw',
    // maxWidth: 300,
    height: '50vmin',
    maxHeight: 200,
    display: 'block',
    marginBottom: 20,
    borderRadius: 20,
  },
}));

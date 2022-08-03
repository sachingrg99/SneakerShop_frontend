import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  button: {
    padding: '5px 10px',
    backgroundColor: '#000',
    borderRadius: '15px',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      background: "#000",
      color: 'white',
    },
  },
  add: {
    backgroundColor: '#0D76FE',
    borderRadius: '15px',
    margin: '0 1px',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      background: "#0D76FE",
      color: 'white',
    },
  },
  minus: {
    backgroundColor: '#FE0D56',
    borderRadius: '15px',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      background: "#FE0D56",
      color: 'white',
    },
  },
  clear: {
    display: 'flex',
    margin: '30px 130px',
    justifyContent: 'space-between',
  }, [theme.breakpoints.down('sm')]: {
    clear: {
      margin: '40px 0px',
      display: 'block',
      textAlign: 'center'
    }
  },

  total: {
    padding: '7px 10px',
    backgroundColor: '#000',
    borderRadius: '15px',
    margin: '10px 0px',
    fontWeight: '600',
    color: 'white',
    '&:hover': {
      background: "#000",
      color: 'white',
    }
  },
  // cart
  marg: {
    padding: '120px 10px 0px 10px',
  },
  madia: {
    width: '100%',
    height: '220px',
    ObjectFit: 'cover',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    borderRadius: '20px',
    position: 'relative',
  },
  cartTitle: {
    fontWeight: '780',
    padding: '0.5rem 1rem',
    fontSize: '15px',
    color: '#000',
    // textAlign: 'center'
  },
  spanFood: {
    padding: '0.2rem 0rem',
    color: 'black',
    borderRadius: '8px'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    textAlign: 'center'
  },
  Food: {
    color: 'black',
    fontWeight: '800',
    marginBottom: '20px',
    textAlign: 'center',

  },
}));
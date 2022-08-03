import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '98%',
    maxWidth: '630px',
    maxHeight: '450px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 'auto',
    },
  },
  btn: {
    textTransform: 'capitalize',
    margin: 'auto',
    padding: '8px 20px',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 15px',
  },
  buy: {
    margin: 'auto',
    padding: '8px 20px',
    backgroundColor: '#000',
    border: '0px solid white',
    borderRadius: '12px',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      background: "#000",
      color: 'white',
    },
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize:"24px",
    display: 'inline-block',
    borderRadius: '7px',
    padding: ' 5px 12px',
    color: 'linear-gradient(to top,#0a0a0a 0%,#171717 100%)',
    letterSpacing: '1.3px',
    marginTop: '10px',
  },
  time: {
    display: 'inline-block',
    padding: '10px',
    color: 'black',
  },
  message: {
    padding: '10px',
    color: 'gray',
    margin: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      padding: '5px',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  section1: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  imageSection: {
    margin: 'auto',
  },
  recommendedPosts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '1rem',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  relatedImage: {
    // height: 0,
    // paddingTop: '100%',
    width: '220px',
    height: '200px',
    objectFit: 'contain',
    margin: 'auto',
    borderRadius: "5px"
  }
}));
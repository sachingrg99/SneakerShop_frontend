import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={4} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundImage: "linear-gradient(to top, rgb(10, 10, 10) 0%, rgb(23, 23, 23) 100%)",
    border: '0px solid white',
    borderRadius: '12px',
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: '1px',
    '&:hover': {
      backgroundImage: "linear-gradient(to top, rgb(10, 10, 10) 0%, rgb(23, 23, 23) 100%)",
      color: 'white',
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClick} className={classes.btn}>
        Add Cart
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose}>
          Product Added
        </Alert>
      </Snackbar>
    </div>
  );
}

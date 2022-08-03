import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Notify from './gmailM';
import MuiAlert from '@material-ui/lab/Alert';
import ArrowCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
function Alert(props) {
    return <MuiAlert variant='filled' {...props} />;
}
const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        maxWidth: "400px",
        margin: "auto",
        maxHeight: "400px",
        "@media (max-width: 420px)": {
            maxWidth: "250px",
            maxHeight: "250px",
        }
    },
    btn: {
        backgroundImage: "linear-gradient(to top, rgb(10, 10, 10) 0%, rgb(23, 23, 23) 100%)",
        border: '0px solid white',
        borderRadius: '12px',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
            backgroundImage: "linear-gradient(to top, rgb(10, 10, 10) 0%, rgb(23, 23, 23) 100%)",
            color: 'white',
        },
    },
    btnG: {
        textTransform: 'capitalize',
        padding: '0px 0px',
        backgroundImage: "linear-gradient(to top, rgb(10, 10, 10) 0%, rgb(23, 23, 23) 100%)",
        border: '0px solid white',
        borderRadius: '12px',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
            backgroundImage: "linear-gradient(to top, rgb(10, 10, 10) 0%, rgb(23, 23, 23) 100%)",
            color: 'white',
        },
    },
    mail: {
        textTransform: 'capitalize',
        padding: '20px',
        backgroundImage: "linear-gradient(to top, rgb(10, 10, 10) 0%, rgb(23, 23, 23) 100%)",
        border: '0px solid white',
        borderRadius: '12px',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
            backgroundImage: "linear-gradient(to top, rgb(10, 10, 10) 0%, rgb(23, 23, 23) 100%)",
            color: 'white',
        },
    },
    paper: {
        backgroundColor: 'lightGray',
        borderRadius: "20px",
        boxShadow: theme.shadows[10],
        padding: theme.spacing(3, 5, 4),
    },
    msg: {
        padding: '2px',
        color: 'gray',
        margin: '20px 0px 0px 0px',
    },
}));
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}
export default function ModalMessage({ openM, setOpenM }) {
    const [btnDisable, setbtnDisable] = useState(false);
    const form = useRef();
    const { Room } = useSelector((state) => state.Room);
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const date = new Date();
    const month = date.getMonth() + 1;
    const startDate = date.getDate();
    const endDate = date.getDate() + 1;
    const handleClose = () => {
        setOpenM(false);
    };
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_rctg66q', 'template_vvpm5oq', e.target,
            'user_EVrRItIvS1hm4Cm4xH8sg')
            .then((result) => {
                console.log(result.text);
                setbtnDisable(true);
            }, (error) => {
                console.log(error);
            });
    };
    const body = (
        <div className={classes.paper}>
            <h2 style={{ margin: "0px 0px 10px 0px" }} >Hy, {user?.result.name || user} 😊</h2>
            <h4 className={classes.msg}>Your are booking - {Room.title.split(' ').splice(0, 2).join(' ')}</h4>
            <h4 className={classes.msg}>From {startDate}/{month} to {endDate}/{month}</h4>
            <h4 className={classes.msg}>Total Price - Rs.{Room.price}</h4>
            <form ref={form} onSubmit={sendEmail}>
                <input name="subject" type="hidden" defaultValue={user?.result.number || between(1000, 2000000)} />
                <input type="hidden" name="email" defaultValue={user?.result.email || 'Fake'} />
                <input name="message" type="hidden" defaultValue={`Room - ${Room.title} `} />
                <input name="article" type="hidden" defaultValue={`Rs.${Room.price}`} />
                <br />
                <span> </span>
                {!btnDisable ? <button type="submit" className={classes.btnG}>
                    <Notify />
                </button> : <ArrowCircleDownIcon sx={{ color: 'green' }} />}
                <br /><br />
            </form>
            {!btnDisable ?
                <Alert severity="info">Payment Info Will Sent in Your Gmail</Alert>
                : <Alert severity="success">Payment Info is Sent in Your Gmail</Alert>}
        </div>
    );


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openM}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openM}>

                {body}

            </Fade>
        </Modal>
    );
}

import React from "react";
import {
  Grid,
  Typography,
  CardActions,
  CardMedia,
  Button,
  ButtonBase,
  Card,
  CardContent,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import Model from "../../Food/modal/messageM";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from "./styleRoom";
import useStyle from "../../Food/kalijFile/Component/onlyKalij";
import { roomLike } from "../../../redux/actions/roomaction";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
const All = ({ Room }) => {
  const [openM, setOpenM] = React.useState(false);
  const handleOpenM = () => {
    setOpenM(true);
  };
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const { Rooms, likeRoomMessage } = useSelector((state) => state.Room);
  const classes = useStyles();
  const dispatch = useDispatch();
  const classed = useStyle();
  const [likes, setLikes] = React.useState(Room?.likes);
  const [likeMessage, setLikeMessage] = React.useState('');
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedRoom = Room?.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(roomLike(Room._id));

    if (hasLikedRoom) {
      setLikes(Room.likes.filter((id) => id !== userId));
    } else {
      setLikes([...Room.likes, userId]);
    }
  };
  React.useEffect(() => {
    setLikeMessage(likeRoomMessage);
    setTimeout(() => {
      setLikeMessage(null);
    }, 3000);
  }, [likeRoomMessage]);
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <span className={classed.like}>
            <><ThumbUpAltIcon fontSize="small" style={{
              color: '#000'
            }} onClick={handleLike} />&nbsp;{likes.length > 2 ? `You & ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
          </span>
        ) : (
          <span className={classed.like}>
            <><ThumbUpAltOutlined fontSize="small" style={{
              color: '#000'
            }} onClick={handleLike} />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
          </span>
        );
    }

    return <span className={classed.like}><><ThumbUpAltOutlined fontSize="small" onClick={handleLike} />&nbsp;Like</></span>;
  };
  return (
    <>
      {Rooms?.length ?
        <Card className={classed.cards} raised elevation={4}>
          <ButtonBase
            component="span"
            name="test"
            className={classes.cardAction}
            onClick={() => {
              user?.result?.name ? navigate(`/accessories/${Room._id}`) : handleOpenM();
            }}
          >
            <img 
                className={classes.media}
                            src={Room.selectedFile}
                            title={Room?.title}
                          />
            <Typography
              className={classes.title}
              style={{color:"black"}}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {Room.title.split(" ").splice(0, 2).join(" ")}
            </Typography>
            <CardContent className={classes.cartTitle} >
              <Typography variant="body2" color="textSecondary" component="p">{Room.message.split(' ').splice(0, 4).join(' ')}...</Typography>
            </CardContent>
          </ButtonBase>
          <div className={classes.details}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="h2"
            >
              {Room.tags.map((tag) =>
              (
                <Button

                            style={{
                              fontSize:"12px",
                                borderRadius: "0px 30px 30px 0px",
                                backgroundColor: "#FF8C00",
                                "&:hover": {
                                    backgroundColor: "#FF8C00",
                                },
                                letterSpacing: "2px",
                                color: "white",
                                padding: "3px 8px",
                                margin: "0px 5px",
                                textTransform: "capitalize",
                            }}
                        >
                            {tag}
                        </Button>
                    ))
                    .splice(-2)}
            </Typography>
          </div>
          <CardActions className={user?.result?.name ? (classed.cardActionsIuser) : (classed.cardActionsI)}>
            {!user?.result?.name ? (
              <>
                <Button
                  size="small"
                  className={classed.btn}
                  onClick={handleOpenM}
                  type="button"
                >
                  Learn More
                </Button>
                <Model openM={openM} setOpenM={setOpenM} />
              </>
            ) : (
              <Likes />
            )}
          </CardActions>
        </Card>
        :
        <Grid item lg={12} >
          <Card className={classed.cardsearch} raised elevation={4}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ textAlign: "center", letterSpacing: '2px', color: 'gray', margin: '10px auto' }}
              >
                No Post Found 🧐
              </Typography>
            </CardContent>
          </Card>
        </Grid>}
    </>
  );
};
export default All;

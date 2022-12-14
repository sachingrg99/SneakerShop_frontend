import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  CardActions,
  Button,
  CardMedia,
} from "@material-ui/core/";
import { getRoom, getRoomBySearch } from "../../../../redux/actions/roomaction";
import useStyles from "./Pdetail";
import moment from "moment";
import Mail from "../../../Food/modal/buyRoom";

const KalijDetail = () => {
  const [openM, setOpenM] = React.useState(false);
  const navigate = useNavigate();
  const openPost = (id) => {
    navigate(`/accessories/${id}`);
  };
  const handleOpenM = () => {
    setOpenM(true);
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const { Room, Rooms, isLoading } = useSelector((state) => state.Room);
  const user = JSON.parse(localStorage.getItem("profile"));
  const { id } = useParams();
  useEffect(() => {
    dispatch(getRoom(id));
  }, [id]);
  useEffect(() => {
    dispatch(
      getRoomBySearch({ book: "", ps: "", pe: "", tags: Room?.tags.join(",") })
    );
  }, [Room]);
  if (user === null) return navigate("/auth");
  if (!Room) {
    return (
      <div style={{ padding: "80px 10px 0px 10px" }}>
        <Paper
          elevation={3}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            borderRadius: "15px",
            height: "70vh",
          }}
        >
          <CircularProgress
            size="7em"
            className={classes.gallery}
            style={{ display: "block", margin: "0px auto" }}
          />
        </Paper>
      </div>
    );
  } else {
    if (isLoading) {
      return (
        <div style={{ padding: "80px 10px 0px 10px " }}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              borderRadius: "15px",
              height: "70vh",
            }}
          >
            <CircularProgress size="7em" />
          </Paper>
        </div>
      );
    }
    const recommented = Rooms?.filter(({ _id }) => _id !== Room._id);
    return (
      <div style={{ borderRadius: "15px", padding: "80px 15px 20px 15px" }}>
        <Paper elevation={3} style={{ borderRadius: "20px", width:"80%", margin:"auto" }}>
          <div className={classes.card}>
            <div className={classes.section}>
              <div className={classes.section1}>
                <div className={classes.imageSection} style={{ flex: 1 }}>
                  <img
                    className={classes.media}
                    src={Room?.selectedFile}
                    title={Room?.title}
                  />
                </div>
                <div style={{ margin: "auto", flex: "1" }}>
                  <Typography className={classes.title}>
                    {Room?.title}
                  </Typography>
                  <Typography className={classes.time}>
                    {moment(Room?.createdAt).format("MMMM do")}
                  </Typography>
                  <div className={classes.details}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="h2"
                      style={{
                        marginTop: "10px",
                        letterSpacing: "1px",
                        color: "lightgray",
                      }}
                    >
                      {Room?.tags
                        .map((tag) => <Button

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
                )
                .splice(-2)}
                    </Typography>
                  </div>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="p"
                    style={{
                      textAlign: "justify",
                      letterSpacing: "2px",
                      lineHeight: "2",
                    }}
                    className={classes.message}
                  >
                    {Room?.message} and price of the product is Price{" "}
                    <br />
                    <span
                      style={{
                        padding: " 4.5px 15px",
                        borderRadius: "6px",
                        fontSize: "10px",
                        color: "black",
                      }}
                    >
                      {user?.result.role === 1 && `Id: ${Room?._id}`}
                    </span>
                  </Typography>
                  <Divider style={{ margin: "20px 0" }} />
                  {Room.booked === "false" ? (
                                      <CardActions className={classes.cardActionsS}>
                                      <Button
                                        size="small"
                                        className={classes.buy}
                                      >
                                        
                      Rs.{Room?.price}
                                      </Button>
                                      <Button
                                        size="small"
                                        className={classes.buy}
                                        onClick={handleOpenM}
                                      >
                                        Buy Now
                                      </Button>
                                      <Mail openM={openM} setOpenM={setOpenM} />
                                    </CardActions>
                  ) : (
                    <CardActions
                      className={classes.cardActionsS}
                      style={{
                        justifyContent: "space-around",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="h2"
                        textAlign="center"
                        style={{
                          marginTop: "10px",
                          letterSpacing: "1px",
                          color: "white",
                          fontWeight: "bold",
                          padding: "10px",
                          backgroundColor: "red",
                          borderRadius: "7px",
                        }}
                      >
                        Room is not available for today
                      </Typography>
                    </CardActions>
                  )}
                </div>
              </div>
            </div>
            <Divider style={{ margin: "20px 0" }} />
            {!!recommented?.length && (
              <div className={classes.section}>
                <Typography gutterBottom variant="h5">
                  Similar Products
                </Typography>
                <Divider />
                <div className={classes.recommendedPosts}>
                  {recommented
                    ?.slice(0, 12)
                    .map(({ title, tags, message, selectedFile, _id }) => (
                      <Paper
                        elevation={3}
                        style={{
                          padding: "12px 16px",
                          margin: "20px auto",
                          cursor: "pointer",
                        }}
                        onClick={() => openPost(_id)}
                        key={_id}
                      >
                                                <Paper style={{ width: "220px" }} elevation={0}>
                        <img 
                className={classes.relatedImage}
                            src={selectedFile}
                            title={selectedFile}
                          />
                        </Paper>
                        <Typography
                          gutterBottom
                          variant="h6"
                          style={{
                            letterSpacing: "2px",
                            marginTop: "10px",
                            textTransform: "capitalize",
                            fontWeight: "300",
                          }}
                        >
                          {title.split(" ").slice(0, 2).join(" ")}
                        </Typography>

                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          style={{
                            color: "gray",
                            letterSpacing: "1.1px",
                            fontWeight: "300",
                          }}
                        >
                          {message.split(" ").splice(0, 4).join(" ")}..
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          style={{
                            letterSpacing: "2px",
                            margin: "10px 0",
                            color: "lightgray",
                          }}
                        >
                          {tags
                            .map((tag) =><Button

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
                    )
                    .splice(-2)}
                        </Typography>
                      </Paper>
                    ))}
                </div>
              </div>
            )}
          </div>
        </Paper>
      </div>
    );
  }
};

export default KalijDetail;

import React, { useEffect } from 'react'
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Paper } from '@material-ui/core/';
import useStyles from './Component/kalijcs'
import useStyle from './Component/onlyKalij'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getKalijs } from '../../../redux/actions/kalijs';
import Model from '../modal/messageM'
import Loading from '../loading/indexkalij'

const Kalij = ({ handleAddProduct }) => {
  const [openM, setOpenM] = React.useState(false);
  const handleOpenM = () => {
    setOpenM(true);
  };
  const dispatch = useDispatch();
  const { Kalijs, isLoading } = useSelector((state) => state.Kalijs);
  useEffect(() => {
    dispatch(getKalijs());
  }, [dispatch]);
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const classes = useStyles();
  const classed = useStyle();
  return (
    isLoading ? <Loading /> : (
      <>
        <h2 className={classes.Food}>About <span className={classes.spanFood}>Sneakers</span></h2>
        <br />
        <Grid className={classes.container} container alignItems="stretch" spacing={2}>
          {Kalijs.slice(0, 4).map((kalij) => (
            <Grid key={kalij._id} item xs={12} sm={6} md={4} lg={3}>
              <Card className={classed.cards} raised elevation={3}>
                <ButtonBase component="span"
                  name="test"
                  className={classes.cardAction} onClick={() => { (user?.result?.name) ? navigate(`/sneaker/${kalij._id}`) : handleOpenM(); }} >
                                              <img
                            className={classes.media}
                            src={kalij?.selectedFile}
                            title={kalij?.title}
                          />
                  <Typography
                    className={classes.title}
                    style={{
                      color:"black"
                    }}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {kalij.title.split(" ").splice(0, 2).join(" ")}
                  </Typography>
                  <CardContent className={classes.cartTitle} >
                    <Typography variant="body2" color="textSecondary" component="p">{kalij.message.split(' ').splice(0, 4).join(' ')}...</Typography>
                  </CardContent>
                  <div className={classes.details}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="h2"
                    >
                      {kalij.tags.map((tag) =>
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
                </ButtonBase>
                <CardActions className={classes.cardActionsI}>
                  <><Button size="small" className={classed.btn} onClick={!user?.result?.name ? handleOpenM : () => navigate(`/sneaker/${kalij._id}`)} type="button">
                    Learn More
                  </Button>
                    {!user?.result?.name ? <Model openM={openM} setOpenM={setOpenM} /> : null}
                  </>

                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <br />
        <center><Button variant="contained" style={{
          backgroundImage: 'linear-gradient(to top,#0a0a0a 0%,#171717 100%)',
          padding: '10px 25px', letterSpacing: '2px', fontWeight: '600', color: 'white'
        }}><Link
          to='/food?page=1'
          className={classes.link}>
            View More
          </Link></Button></center>

      </>
    ))
}

export default Kalij;

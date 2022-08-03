import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, Button } from '@material-ui/core';
import Posts from './Posts/Posts';
import Form from './Form/Form';
import HomePage from '../kalijFile/UserIndex'
import AboutAdmin from './About/AboutPage'
import Gallery from './Gallery/gallery'
import { useLocation } from 'react-router-dom';
import Adminpagination from './pagination/pagination';
import RoomForm from '../../Restaurant/Admin/roomForm/Form'
import RoomPost from '../../Restaurant/Admin/roomPosts/Posts'
import RoomPagination from '../../Restaurant/Admin/roomPagination/pagination'
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Admin = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [currentId, setCurrentId] = useState('');
  const [currentRoomId, setcurrentRoomId] = useState('');
  const [activeFood, setactiveFood] = useState(false);
  const [activeRoom, setactiveRoom] = useState(false);
  const [activeAbout, setactiveAbout] = useState(false);
  const [activeGallery, setactiveGallery] = useState(false);
  const [activeVisitorCount, setActiveVisitorCount] = useState(false);

  const adminQuery = useQuery();
  const up = adminQuery.get('up' || 1);
  const [visitor, setVisitor] = useState();
  const getVisitor = () => {
    axios.get('https://api.countapi.xyz/info/rhinospotnkalij.com/rskf').then(res => {
      setVisitor(res.data.value);
    }
    ).catch(err => {
      console.log(err);
    }
    )
  }
  useEffect(() => {
    getVisitor();
  }, [])
  if (!user?.result.role) {
    return (
      <HomePage />
    )
  }
  return (
    <>
      <Container maxWidth="lg" style={{ paddingTop: '77px' }}>
        <Grow in>
          <Container style={{
            padding: '12px',
          }} >
        {/* start of image page */}
        <Grid container spacing={3}>
          <Button style={{ margin: ' 20px auto', 
          textAlign: 'left', color:"#000", fontWeight: 600, fontSize:"2rem" }} 
          variant="outline" size="large">Add Home Slider</Button> 
        </Grid>
        <Grid item xs={12} sm={12} style={{ display: '' }}>
          <Gallery />
        </Grid>
            {/* start of sneaker */}
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}
              style={{}} >
                        <Grid container spacing={3}>
          <Button style={{ margin: ' 20px auto', 
          textAlign: 'left', background: 'none',  color:"#000", fontWeight: 600, fontSize:"2rem" }} 
          variant="outline" size="large">Add Sneaker's</Button> 
        </Grid>
              <Grid item xs={12} md={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} md={8} style={{
                margin:"auto"
              }}>
                <Posts setCurrentId={setCurrentId} />
                <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
                  <Adminpagination up={up} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Grow>
        {/* end of food */}
        {/* start of room */}
        <Grid container spacing={3}>
        <Button style={{ margin: ' 20px auto', textAlign: 'center', 
          background: 'none',  color:"#000", fontWeight: 600, fontSize:"2rem" }} variant="outline"
           size="large">Add Accessories</Button></Grid>
        <Grow in>
          <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}
              style={{display: '' }} >
              <Grid item xs={12} md={4}>
                <RoomForm currentRoomId={currentRoomId} setcurrentRoomId={setcurrentRoomId} />
              </Grid>
              <Grid item xs={12} md={8} style={{
                margin:"auto"
              }}>
                <RoomPost setcurrentRoomId={setcurrentRoomId} />
                <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
                  <RoomPagination up={up} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Grow>
        {/* start of about page */}
        <Grid container spacing={3}>
          <Button style={{ margin: ' 20px auto', textAlign: 'center', 
          background: 'none',  color:"#000", fontWeight: 600, fontSize:"2rem" }} variant="outline"
           size="large">Add About</Button></Grid>

        <Grid item xs={12} sm={12} style={{ display: '' }}>
          <AboutAdmin />
        </Grid>
      </Container>
    </>
  )
};

export default Admin;
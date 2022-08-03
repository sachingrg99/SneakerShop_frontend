import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
import { createRooms, updateRooms } from '../../../../redux/actions/roomaction';
import { play } from '../../../../redux/actions/Auth';
import UpdateBook from './updateBook';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../Food/Admins/Form/firebase";

const Form = ({ currentRoomId, setcurrentRoomId }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], price: '', booked: '', comments: [], likes: [] });
  const [image, setimage] = useState({ selectedFile: '' });
  const [imageUrl, setimageUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [Error, setError] = useState(null);
  const [createMessage, setcreateMessage] = useState(null);
  const [updateMessage, setupdateMessage] = useState(null);
  const [playForm, setPlayForm] = useState({ bill: '', email: '', author: user?.result.email });
  const [playError, setplayError] = useState(null);
  const [playSuccess, setplaySuccess] = useState(null);
  const [playDisable, setplayDisable] = useState(false);
  const aRoom = useSelector((state) => state.Room.Rooms.filter(aRoom => aRoom._id === currentRoomId
  )[0]);
  const { errorRoom, createMsg, updateMsg } = useSelector((state) => state.Room);
  const { errorAuthPlay, successAuthplay } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    if (aRoom) {
      setPostData(aRoom);
      setimage(aRoom.selectedFile);
    };
  }, [aRoom]);
  useEffect(() => {
    setcreateMessage(createMsg);
    setupdateMessage(updateMsg);
    setTimeout(() => {
      setcreateMessage(null);
      setupdateMessage(null);
    }, 3000);
  }, [createMsg, updateMsg]);
  useEffect(() => {
    setplaySuccess(successAuthplay);
    setTimeout(() => {
      setplaySuccess(null);
    }, 3000);
  }, [successAuthplay]);
  useEffect(() => {
    setplayError(errorAuthPlay);
    setTimeout(() => {
      setplayError(null);
    }, 3000);
  }, [errorAuthPlay]);
  useEffect(() => {
    setError(errorRoom);
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [errorRoom]);


  const clear = () => {
    setcurrentRoomId
      (0);
    setcreateMessage(null);
    setupdateMessage(null);
    setError(null);
    setProgress(0);
    setPostData({ title: '', message: '', tags: [], price: '', booked: '' });
    setimage({ selectedFile: '' });
    setimageUrl(null);
    setProgress(0);
  };

  const upload = () => {
    if (!image.selectedFile) return;
    const sotrageRef = ref(storage, `files/${image.selectedFile.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, image.selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused": // or 'paused'
            setProgress("Upload is paused");
            break;
          case "running": // or 'running'
            setProgress("Upload is " + progress + "% done");
            break;
        }
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageUrl(downloadURL);
        });
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setplayDisable(true);
    setTimeout(() => {
      setplayDisable(false);
    }, 3000);
    if (currentRoomId
    ) {
      dispatch(updateRooms(currentRoomId
        , { ...postData, selectedFile: imageUrl, name: user?.result?.name }
      ));
    } else {
      dispatch(createRooms({ ...postData, selectedFile: imageUrl, name: user?.result?.name, booked:false }));
    }
  };
  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags?.filter((tag) => tag !== chipToDelete) });
  };
  // ok have to remove form if there is no login user
  return (
    <>
<Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} encType="multipart/form-data">
            <Typography variant="h6">{currentRoomId
              ? `Edit an Accessory` : 'Add an Accessory'}</Typography>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={2} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <TextField name="price" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
            <TextField name="booked" variant="outlined" label="Available" fullWidth value={postData.booked} onChange={(e) => setPostData({ ...postData, booked: e.target.value })} />
            <div style={{ padding: '7px 0', width: '98%' }}>
              <ChipInput
                name="tags"
                variant="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)} />
            </div>
            {progress ?
              <div style={{ padding: '7px 0', width: '98%', margin: '20px auto', textAlign: 'center' }}>
                <Typography variant="body1">{progress}</Typography>
              </div> :
              <div style={{ textAlign: "center" }}><input style={{ padding: '20px 0px', marginLeft: "10px", width:"40%" }} type="file" id='selectedFile' name='selectedFile' onChange={(e) => setimage({ ...image, selectedFile: e.target.files[0] })} />
                <Button variant="contained" style={{
                  background:"black"
                }} color="primary" size="large" onClick={upload}>Upload</Button></div>}
            {/* error or createMessage or updateMessage display*/}
            {(Error || createMessage || updateMessage) && <Button color="secondary"
              disabled
              className={Error ? classes.Error : classes.Success} fullWidth>{(Error?.slice(0, -2) || createMessage?.slice(0, -2) || updateMessage?.slice(0, -2))}</Button>}
            <Button className={classes.buttonSubmit}  style={{
                  background:"black"
                }} variant="contained" color="primary" size="large" type="submit" disabled={playDisable} fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper></>
  );
}

export default Form;
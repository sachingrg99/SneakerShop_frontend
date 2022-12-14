import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
import { createKalijing, updateKalij } from '../../../../redux/actions/kalijs';
import { play } from '../../../../redux/actions/Auth';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], price: '', comments: [], likes: [] });
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
  const kalijU = useSelector((state) => state.Kalijs.Kalijs.filter(kali => kali._id === currentId)[0]);
  const { errorKalij, createMsg, updateMsg } = useSelector((state) => state.Kalijs);
  const { errorAuthPlay, successAuthplay } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    if (kalijU) {
      setPostData(kalijU);
      setimage(kalijU.selectedFile);
    };
  }, [kalijU]);
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
    setError(errorKalij);
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [errorKalij]);


  const clear = () => {
    setCurrentId(0);
    setcreateMessage(null);
    setupdateMessage(null);
    setError(null);
    setProgress(0);
    setPostData({ title: '', message: '', tags: [], price: '' });
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
    if (currentId) {
      dispatch(updateKalij(currentId, { ...postData, selectedFile: imageUrl, name: user?.result?.name }
      ));
    } else {
      dispatch(createKalijing({ ...postData, selectedFile: imageUrl, name: user?.result?.name }));
    }
  };
  const handlePlay = async (e) => {
    e.preventDefault();
    if (!playForm.email || !playForm.bill) return;
    setplayDisable(true);
    setTimeout(() => {
      setplayDisable(false);
    }, 3000);
    dispatch(play({ ...playForm }));
  };
  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags?.filter((tag) => tag !== chipToDelete) });
  };
  // ok have to remove form if there is no login user
  return (
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} encType="multipart/form-data" >
            <Typography variant="h6">{currentId ? `Edit Sneaker` : 'Add Sneaker'}</Typography>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <TextField name="desciption" variant="outlined" label="Description" fullWidth multiline minRows={2} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <TextField name="price" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
            <div style={{ padding: '7px 0', width: '98%' }}>
              <ChipInput
                name="tags"
                variant="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
              />
            </div>
            {progress ?
              <div style={{ padding: '7px 0', width: '98%', margin: '20px auto', textAlign: 'center' }}>
                <Typography variant="body1">{progress}</Typography>
              </div> :
              <div style={{textAlign:"center"}} ><input style={{ padding: '20px 0px', display:"inline-block", width:"50%" }} 
              type="file" id='selectedFile' name='selectedFile' onChange={(e) => setimage({ ...image, selectedFile: e.target.files[0] })} />
            <Button variant="contained" size="large" style={{
              display:"inline-block",
              background:"black",
              color:"white"
            }}
             onClick={upload}>Upload</Button></div>}
            {/* error or createMessage or updateMessage display*/}
            {(Error || createMessage || updateMessage) && <Button color="secondary"
              disabled
              className={Error ? classes.Error : classes.Success} fullWidth>{(Error?.slice(0, -2) || createMessage?.slice(0, -2) || updateMessage?.slice(0, -2))}</Button>}
            <Button className={classes.buttonSubmit} style={{
              background:"black",
              color:"white"
            }} variant="contained" color="primary" size="large" type="submit" disabled={playDisable} fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper>
  );
}

export default Form;
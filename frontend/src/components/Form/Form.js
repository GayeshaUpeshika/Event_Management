import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';         



const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({title: '', artist: '',date:'',message: '',tags: '',selectedFile: '',});
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null );
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const usser = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();


    useEffect(() => {
        if (post) setPostData(post);
      }, [post])
    
      const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', artist: '',date:'',message: '',tags: '',selectedFile: ''});
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (currentId ===0) {
             dispatch(createPost({...postData, name: usser ?.result ?.name }, history));
             clear();
          } else {
             dispatch(updatePost(currentId,{ ...postData, name: usser ?.result ?.name }));
             clear();
          }
    };

   if (!usser?.result?.name) {
        return (
          <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
                  Welcome to ABC Entertainments
            </Typography>
          </Paper>
        );
    }

   
 
  
 
    return (
         <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
               <Typography variant="h6">{currentId ? `Editing ${post.title} Details` : 'Adding New Audio Album'}</Typography>
              
               <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
               <TextField name="artist" variant="outlined" label="Artist" fullWidth value={postData.artist} onChange={(e) => setPostData({ ...postData, artist: e.target.value })}/>
               <TextField name="date" variant="outlined" label="Release Date" fullWidth value={postData.date} onChange={(e) => setPostData({ ...postData, date: e.target.value })}/>
               <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
               <TextField name="tags" variant="outlined" label="Genre" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
               <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
               <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
               <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
              
            </form>
         </Paper>
    );
};

export default Form;
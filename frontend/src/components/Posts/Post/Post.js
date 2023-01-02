import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';

import useStyles from './styles';


import { getPost, likePost, deletePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
       const dispatch = useDispatch();
       const classes = useStyles();
       const history = useHistory();
       const usser = JSON.parse(localStorage.getItem('profile'));

       const Likes = () => {
            if (post?.likes?.length > 0) {
              return post.likes.find((like) => like === (usser?.result?.googleId || usser?.result?._id))
                ? (
                  <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
                ) : (
                  <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
            }
        
            return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
          };

const openPost = (e) => {
     // dispatch(getPost(post._id, history));
        
    history.push(`/posts/${post._id}`);
};

       
       return (
             <Card className={classes.card} raised elevation={6}>
                <ButtonBase  component="span" name="test"   className={classes.cardAction} onClick={openPost}> 

                
                    <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                    <div className={classes.overlay}>
                         <Typography variant="h6">{post.name}</Typography>
                         <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                    </div>
                    {(usser?.result?.googleId === post?.creator || usser?.result?._id === post?.creator) && (
                    <div className={classes.overlay2} name="edit">
                          <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentId(post._id);
                            }}
                            style={{ color: 'white' }}
                            size="small"
                           >
                             <MoreHorizIcon fontSize="medium" />
                          </Button>
                    </div>
                    )}
                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                   
                    <Typography className={classes.title}  gutterBottom variant="h5" component="h2" >{post.title}</Typography>
                  
                    <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
                          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography><br/>
                          <Typography variant="body2" color="textSecondary" component="p">{post.cost}</Typography>
                          <Typography variant="body2" color="textSecondary" component="p">{post.date}</Typography>
                    </CardContent>
                    
                    </ButtonBase>  
                    <CardActions className={classes.cardActions}>
                         <Button size="small" color="primary" disabled={!usser?.result} onClick={() => dispatch(likePost(post._id))}>
                               <Likes />
                          </Button>
                          {(usser?.result?.googleId === post?.creator || usser?.result?._id === post?.creator) && (
                          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                          <DeleteIcon fontSize="small" /> &nbsp; Delete
                          </Button>
                          )}
                    </CardActions>
       
      
       
    </Card>
  );

}

export default Post;
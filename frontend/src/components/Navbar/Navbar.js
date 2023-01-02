import React, { useState, useEffect } from 'react';
import { AppBar, Typography , Avatar , Toolbar, Button} from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import Logo from '../../images/Logo.jpg';
import memoriesText from '../../images/memoriesText.png';



const Navbar = () => {
    const classes = useStyles();
    const [usser, setUsser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const logout = () => {
      dispatch({ type: 'LOGOUT' });
  
      history.push('/');
  
      setUsser(null);
    };

    useEffect(() => {
      const token = usser?.token;
  
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
  
      setUsser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Link to="/" className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">ABC Entertainments</Typography>
            <img className={classes.image} src={Logo} alt="icon" height="60px" />
          </Link>
          
          
          <Toolbar className={classes.toolbar}>    
            {usser ?.result ? (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={usser?.result.name} src={usser?.result.imageUrl}>{usser?.result.name.charAt(0)}</Avatar>
                <Typography className={classes.usserName} variant="h6">{usser?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log out</Button>
              </div>
            ) : (
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
          </Toolbar>
        </AppBar>
      );
};


export default Navbar;
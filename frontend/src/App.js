import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect  } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Post from './components/Post';
import './App.css';


const App = () => {
  const usser = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
       
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => (!usser ? <Auth /> : <Redirect to="/posts" />)} />
                 
              
          
         
        </Switch>
        
        
      </Container>
    
    </BrowserRouter>
  );
};

export default App;
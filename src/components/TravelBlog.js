import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Home from './home/Home'
import CreatePost from './post/CreatePost';
import PostList from './post/PostList'
import PostDetail from './post/PostDetail'
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import NotFound from './home/NotFound';
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: calc(100vh - 376px);
}

`

export class TravelBlog extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Wrapper>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/post/:country' component={PostList} />
              <Route exact path='/post/:country/:post_id' component={PostDetail} />
              <Route path='/create' component={CreatePost} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Wrapper>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default TravelBlog

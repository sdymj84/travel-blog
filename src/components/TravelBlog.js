import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './layout/Navbar'
import Home from './home/Home'
import CreatePost from './post/CreatePost';

export class TravelBlog extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/create' component={CreatePost} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default TravelBlog

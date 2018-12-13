import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './layout/Navbar'
import Home from './home/Home'
import About from './home/About'

export class TravelBlog extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default TravelBlog

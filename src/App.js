import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TravelBlog from './components/TravelBlog'
import Welcome from './components/Welcome'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/welcome' component={Welcome} />
            <Route path='/' component={TravelBlog} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

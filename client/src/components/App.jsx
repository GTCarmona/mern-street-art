import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Secret from './pages/Secret';
import Login from './pages/Login';
import List from './pages/List';

import Signup from './pages/Signup';
import api from '../api';
import MainNavbar from '../MainNavbar';
import StreetArtDetail from './pages/StreetArtDetail';
import NewStreetArt from './pages/NewStreetArt';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
      <MainNavbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/list" exact component={List} />
          <Route path="/street-art-detail/:streetArtId" component={StreetArtDetail} />
          <Route path="/new-street-art" component={NewStreetArt} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}
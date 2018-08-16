import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Statistics from './Statistics';
import Ride from './Ride';
import Header from '../components/Header';

export default class Home extends Component {
  render() {
    return (
      <div className="lift-stats-home container-fluid">
        <Header></Header>
        <Switch>
          <Route exact path='/' component={Ride}/>
          <Route path='/statistics' component={Statistics}/>
        </Switch>
      </div>
    );
  }
}
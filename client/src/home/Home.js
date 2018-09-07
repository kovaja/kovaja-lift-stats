import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Record from './pages/record/Record';
import Statistics from './pages/statistics/Statistics';
import About from './pages/about/About';
import appData from './tools/appData';

export default class Home extends Component {
  render() {

    return (
      <div className="lift-stats-home container-fluid">
        <Header></Header>
        <Switch>
          <Route exact path='/' component={Record}/>
          <Route path='/statistics' component={Statistics}/>
          <Route path='/about' component={About}/>
        </Switch>
        <span style={{color: '#b3b0b0', fontSize: '10px'}}>Version: ({appData.version})</span>
      </div>
    );
  }
}
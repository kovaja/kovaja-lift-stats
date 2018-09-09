import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Record from './pages/record/Record';
import Statistics from './pages/statistics/Statistics';
import About from './pages/about/About';
import appData from './tools/appData';

export default class Home extends Component {
  render() {
    return (
      <div className="lift-stats-home container">
        <Header></Header>
        <div className="row">
          <div className="col-12">
            <Switch>
              <Route exact path="/" render={() => (<Redirect to="/record"/>)} />
              <Route exact path='/record' component={Record} />
              <Route path='/statistics' component={Statistics} />
              <Route path='/about' component={About} />
            </Switch>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <span style={{ color: '#b3b0b0', fontSize: '10px' }}>Version: ({appData.version})</span>
          </div>
        </div>




        <style jsx>{`
          .col-12 {
            padding: 0 20px;
          }
        `}</style>
      </div>
    );
  }
}
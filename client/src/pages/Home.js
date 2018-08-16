import React, { Component } from 'react';
import Statistics from './Statistics';
import Ride from './Ride';
import Header from '../components/Header';

export default class Home extends Component {
  render() {
    return (
      <div className="lift-stats-home container-fluid">
        <Header></Header>
        <Ride></Ride>
        <Statistics></Statistics>
      </div>
    );
  }
}
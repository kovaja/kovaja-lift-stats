import React, { Component } from 'react';
import Statistics from '../statistics/Statistics';

export default class Home extends Component {
    render() {
      return (
        <div className="lift-stats-home container-fluid">
          <div className="row header">
            LIFT STATISTICS
          </div>
          
          <div className="row">
            ENTER YOUR LIFT TRIP
            <ul>
              <li>Time</li>
              <li>Floor</li>
              <li>Direction</li>
              <hr/>
              <li>Lift number</li>
            </ul>
          </div>
          <Statistics></Statistics>
        </div>
      );
    }
  }
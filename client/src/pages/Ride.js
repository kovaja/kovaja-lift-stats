import React, { Component } from 'react';

export default class Ride extends Component {
  render() {
    return (
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
    );
  }
}
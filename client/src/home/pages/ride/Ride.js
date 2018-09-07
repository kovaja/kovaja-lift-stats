import React, { Component } from 'react';
import RideForm from './components/rideForm/RideForm';

export default class Ride extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <RideForm></RideForm>
        </div>
      </div>
    );
  }
}
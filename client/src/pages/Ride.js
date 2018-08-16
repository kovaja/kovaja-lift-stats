import React, { Component } from 'react';
import RideForm from '../components/RideForm/RideForm';

export default class Ride extends Component {

  render() {
    return (
      <div className="row">

        <div className="col-md-6">
          <RideForm></RideForm>
        </div>

        <div className="col-md-6">
          <h3 className="text-left">
            How does it work ?
			    </h3>
          <p>
            Fill in the form, I will guess the lift
          </p>
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-6">
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
import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="fill">
        <h3 className="text-left">
          How does it work ?
        </h3>
        <p>
          Fill in the form, I will guess the lift
        </p>
        <p>
          Give me the correct answer, I will learn.
        </p>
      </div>
    );
  }
}
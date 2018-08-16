import React, { Component } from 'react';
import FloorSelector from './FloorSelector';
import DirectionSelector from './DirectionSelector';

export default class RideForm extends Component {
  initTime;
  initTimeString;
  constructor() {
    super();

    this.setInitTime();
  }

  setInitTime() {
    this.initTime = new Date();
    this.initTimeString = this.initTime.toISOString().slice(0, -5).split('T').join(' ');
  }

  render() {
    return (
      <div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input type="text" className="form-control" id="time" readOnly value={this.initTimeString} />
        </div>

        <FloorSelector></FloorSelector>
        <DirectionSelector></DirectionSelector>


        <button type="submit" className="btn btn-primary">
          Submit
        </button>

      </div>
    );
  }
}
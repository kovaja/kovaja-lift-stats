import React, { Component } from 'react';
import FloorSelector from './FloorSelector';

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

        <div className="form-check">
          <input className="form-check-input" type="radio" name="direction" id="up" value="up" />
          <label className="form-check-label" htmlFor="up">
            Going up
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="direction" id="down" value="down" />
          <label className="form-check-label" htmlFor="down">
            Going down
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

      </div>
    );
  }
}
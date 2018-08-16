import React, { Component } from 'react';
import FloorSelector from './FloorSelector';
import DirectionSelector from './DirectionSelector';

export default class RideForm extends Component {
  initTimeString;
  constructor(props) {
    super(props);

    const now = new Date();

    this.state = {
      time: now.getTime(),
      floor: null,
      direction: null
    }

    this.setTimeFieldValue(now);
  }

  setTimeFieldValue(now) {
    this.initTimeString = now.toISOString().slice(0, -5).split('T').join(' ');
  }

  onFloorChange(newFloorValue) {
    this.setState({
      floor: newFloorValue
    });
  }

  onDirectionChange(newDirectionValue) {
    this.setState({
      direction: newDirectionValue
    });
  }

  submitRideData() {
    const floorNotValid = this.state.floor === null;
    const directionNotValid = this.state.direction === null;

    if (floorNotValid || directionNotValid) {
      alert('Please fill the full form');
      return;
    }

    const data = {
      time: this.state.time,
      floor: this.state.floor,
      direction: this.state.direction,
    };

    console.log('Data to send: ', data)
  }

  render() {
    return (
      <div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input type="text" className="form-control" id="time" readOnly value={this.initTimeString} />
        </div>

        <FloorSelector floorChange={this.onFloorChange.bind(this)}></FloorSelector>
        <DirectionSelector directionChange={this.onDirectionChange.bind(this)}></DirectionSelector>


        <button className="btn btn-primary" onClick={this.submitRideData.bind(this)}>
          Submit
        </button>

      </div>
    );
  }
}
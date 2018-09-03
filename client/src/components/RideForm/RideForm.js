import React, { Component } from 'react';
import Axios from 'axios';
import FloorSelector from './FloorSelector';
import DirectionSelector from './DirectionSelector';

export default class RideForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const now = new Date();

    return {
      ride: {
        time: now.getTime(),
        floor: null,
        direction: null
      },
      initTimeString: this.getTimeFieldValue(now),
      guess: null
    };
  }

  getTimeFieldValue(now) {
    return now.toISOString().slice(0, -5).split('T').join(' ');
  }

  onFloorChange(newFloorValue) {
    const newRide = {
      ...this.state.ride,
      floor: newFloorValue
    };

    this.setState({
      ride: newRide
    });
  }

  onDirectionChange(newDirectionValue) {
    const newRide = {
      ...this.state.ride,
      direction: newDirectionValue
    };

    this.setState({
      ride: newRide
    });
  }

  submitRideData() {
    const floorNotValid = this.state.floor === null;
    const directionNotValid = this.state.direction === null;

    if (floorNotValid || directionNotValid) {
      alert('Please fill the full form');
      return;
    }

    Axios.post('/api/guess', this.state.ride)
      .then(response => {
        this.setState({ guess: response.data.guess });
      })
      .catch(e => { alert(a); }
      );
  }

  resetRide() {
    this.setState(this.getInitialState());
  }

  renderForm() {
    const submitStyle = {
      marginTop: '10px'
    };

    return (
      <div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input type="text" className="form-control" id="time" readOnly value={this.state.initTimeString} />
        </div>

        <FloorSelector floorChange={this.onFloorChange.bind(this)}></FloorSelector>
        <DirectionSelector directionChange={this.onDirectionChange.bind(this)}></DirectionSelector>


        <button style={submitStyle} className="btn btn-primary" onClick={this.submitRideData.bind(this)}>
          Submit
        </button>

      </div>
    );
  }

  renderGuess() {
    return (
      <div>
        <hr />
        <div style={{ 'textAlign': 'center' }} >
          <h2>MY GUESS:</h2>
          <h3>{this.state.guess}</h3>
        </div>

        <hr />
          <span>Thank you! See you next ride...</span>
          <button style={{ 'display': 'block' }} className="btn btn-primary" onClick={this.resetRide.bind(this)}>
            Reset ride
          </button>
      </div>
    );
  }

  render() {
    return this.state.guess ? this.renderGuess() : this.renderForm();
  }
}
import React, { Component } from 'react';
import Axios from 'axios';
import FloorSelector from './FloorSelector';
import DirectionSelector from './DirectionSelector';

const DAYS = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

export default class RideForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const now = new Date();
    const hour = now.getHours() + 1;
    const day = now.getDay();

    return {
      ride: {
        hour: hour,
        day: day,
        floor: null,
        direction: null
      },
      initTimeString: this.getTimeFieldValue(day, hour),
      guess: null,
      guessId: null,
      correctLift: null,
    };
  }

  getTimeFieldValue(dayNumber, hour) {
    const day = DAYS[dayNumber - 1];
    return day + ', ' + (hour) + '. hour';
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
        this.setState({
          guess: response.data.guess,
          guessId: response.data.guessId
        });
      })
      .catch(e => {
        let errorMessage = e + '';

        if (e.response && e.response.data) {
          errorMessage += '\n message: ' + e.response.data.message;
        }

        alert(errorMessage);
      });
  }

  saveResult() {
    const correctLift = parseInt(this.state.correctLift);
    if (isNaN(correctLift) || correctLift < 1 || correctLift > 4) {
      alert('Please fill in correct lift number [1,2,3,4]')
      return;
    }

    console.log(correctLift);

    const postData = {
      lift: correctLift,
      guessId: this.state.guessId
    };

    // should be PUT but whatever for now
    Axios.post('/api/lift', postData)
      .then(response => {
        this.setState(this.getInitialState());
      })
      .catch(e => {
        let errorMessage = e + '';

        if (e.response && e.response.data) {
          errorMessage += '\n message: ' + e.response.data.message;
        }

        alert(errorMessage);
      });
  }

  setLiftChange(event) {
    this.setState({
      correctLift: event.target.value
    });
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
        <div className="form-group">
          <label htmlFor="time">Please fill in lift:</label>
          <input type="text" className="form-control" id="lift" onChange={this.setLiftChange.bind(this)} />
        </div>

        <hr />
          <span>Thank you! See you next ride...</span>
          <button style={{ 'display': 'block' }} className="btn btn-primary" onClick={this.saveResult.bind(this)}>
            Save result
          </button>
      </div>
    );
  }

  render() {
    return this.state.guess ? this.renderGuess() : this.renderForm();
  }
}
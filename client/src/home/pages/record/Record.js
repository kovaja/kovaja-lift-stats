import React, { Component } from 'react';
import FloorSelector from './components/FloorSelector';
import DirectionSelector from './components/DirectionSelector';
import LiftSelector from './components/LiftSelector';
import ApiService from '../../services/api.service';

const DAYS = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.api = new ApiService();
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
      recordId: null,
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

  onLiftChange(newLiftValue) {
    this.setState({
      correctLift: newLiftValue
    });
  }

  afterRecordSaved(serverData) {
    this.setState({
      guess: serverData.guess,
      recordId: serverData.recordId
    });
  }

  submitRideData() {
    const floorNotValid = this.state.floor === null;
    const directionNotValid = this.state.direction === null;

    if (floorNotValid || directionNotValid) {
      alert('Please fill the full form');
      return;
    }

    this.api.createRecord(this.state.ride)
      .then(this.afterRecordSaved.bind(this));
  }

  saveResult() {
    const correctLift = parseInt(this.state.correctLift);
    if (isNaN(correctLift) || correctLift < 1 || correctLift > 4) {
      alert('Please fill in correct lift number [1,2,3,4]');
      return;
    }

    const postData = {
      lift: correctLift
    };

    this.api.patchRecord(this.state.recordId, postData)
      .then(() => this.setState(this.getInitialState()));
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

  renderResult() {
    return (
      <div>
        <hr />
        <div style={{ 'textAlign': 'center' }} >
          <h2>MY GUESS:</h2>
          <h3>{this.state.guess}</h3>
        </div>

        <hr />
        <div className="form-group">
          <span>Please select the lift:</span>
          <LiftSelector liftChange={this.onLiftChange.bind(this)}></LiftSelector>
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
    return (
      <div className="row">
        <div className="col-xs-12">
          { this.state.guess ? this.renderResult() : this.renderForm() }
        </div>
      </div>
    );
  }
}
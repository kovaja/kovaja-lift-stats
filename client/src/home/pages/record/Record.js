import React, { Component } from 'react';
import ApiService from '../../services/api.service';
import appData from '../../tools/appData';
import DummySelector from './components/DummySelector';

const DAYS = appData.days;

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
        timestamp: now.getTime(),
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

  afterRecordSaved(record) {
    this.setState({
      guess: record.guess,
      recordId: record._id
    });
  }

  submitRecord() {
    this.api.createRecord(this.state.ride)
      .then(this.afterRecordSaved.bind(this));
  }

  updateRecord() {
    const correctLift = this.state.correctLift;

    if (isNaN(correctLift) || correctLift < 1 || correctLift > 4) {
      alert('Please select lift number');
      return;
    }

    const data = {
      lift: correctLift
    };

    this.api.patchRecord(this.state.recordId, data)
      .then(() => this.setState(this.getInitialState()));
  }

  renderForm() {
    const submitStyle = {
      marginTop: '10px'
    };

    return (
      <div>
        <span>Time: {this.state.initTimeString}</span>

        <DummySelector
          options={appData.floors}
          onChange={this.onFloorChange.bind(this)}
          prefix={'Floor'}
          buttonType={'info'}
        >
        </DummySelector>
        <DummySelector
          options={appData.directions}
          onChange={this.onDirectionChange.bind(this)}
          prefix={'Direction'}
          buttonType={'warning'}
        >
        </DummySelector>


        <button style={submitStyle} className="btn btn-primary" onClick={this.submitRecord.bind(this)}>
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
          <DummySelector
            options={appData.lifts}
            onChange={this.onLiftChange.bind(this)}
            prefix={''}
            buttonType={'info'}
          >
          </DummySelector>
        </div>

        <hr />
        <span>Thank you! See you next ride...</span>
        <button style={{ 'display': 'block' }} className="btn btn-primary" onClick={this.updateRecord.bind(this)}>
          Save result
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 page">
          {this.state.guess ? this.renderResult() : this.renderForm()}
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';

export default class Ride extends Component {
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
      <div className="row">
        <div className="col-md-6">
          <form>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input type="text" className="form-control" id="time" readOnly value={this.initTimeString} />
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="floor" id="floor0" value="0" />
              <label className="form-check-label" htmlFor="floor0">
                Floor 0
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="floor" id="floor3" value="3" />
              <label className="form-check-label" htmlFor="floor3">
                Floor 3
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="floor" id="floor6" value="6" />
              <label className="form-check-label" htmlFor="floor6">
                Floor 6
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="floor" id="floor7" value="7" />
              <label className="form-check-label" htmlFor="floor7">
                Floor 7
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="floor" id="floor14" value="14" />
              <label className="form-check-label" htmlFor="floor14">
                Floor 14
              </label>
            </div>

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

          </form>
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
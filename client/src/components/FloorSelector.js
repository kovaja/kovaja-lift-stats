import React, { Component } from 'react';

export default class FloorSelector extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

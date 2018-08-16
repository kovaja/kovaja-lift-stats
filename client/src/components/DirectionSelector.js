import React, { Component } from 'react';

export default class DirectionSelector extends Component {
  render() {

    const divStyle = {
      paddingTop: '10px',
      paddingLeft: '30px',
    };

    return (
      <div style={divStyle}>
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
      </div>
    );
  }
}

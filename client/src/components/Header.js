import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <div className="row header">
        <div>
          <h1>LIFT STATISTICS</h1>
        </div>
        <div>
          <Link to='/'>Ride</Link>
          <Link to='/statistics'>Statistics</Link>
        </div>
      </div>
    );
  }
}
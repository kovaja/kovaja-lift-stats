import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="page-header">
            <h1>
              Lift-stats! <small>Smart way how to be first in the right lift</small>
            </h1>
          </div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link active" to='/'>Ride</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/statistics'>Statistics</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
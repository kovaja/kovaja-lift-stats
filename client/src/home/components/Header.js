import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="page-header fill">
            <h1>
              Lift-stats
            </h1>
            <span><i>Trying to be smart...</i></span>

          </div>
          <ul className="nav fill">
            <li className="">
              <NavLink className="nav-link" activeClassName="active" to='/record'><u>Record</u></NavLink>
            </li>
            <li className="">
              <NavLink className="nav-link" activeClassName="active" to='/statistics'><u>Statistics</u></NavLink>
            </li>
            <li className="">
              <NavLink className="nav-link" activeClassName="active"  to='/about'><u>About</u></NavLink>
            </li>
          </ul>
        </div>

        <style jsx>{`

          .col-md-12 {
            padding: 20px;
          }

          .page-header {
            text-align: center;
            font-family: courier new, courier, monospace;

            padding: 25px 5px 25px 5px;
            margin-bottom: 20px;
          }

          h1 {
            text-shadow: 1px 1px 1px rgba(0,0,0,1);
            font-weight: normal;
            color: #ffb914;
            font-size: 3.0em;
            letter-spacing: 1pt;

            line-height: 1;
          }

          span.page-header {
            font-weight: 500;
            font-size: 1.1rem;
          }
        `}</style>
      </div>
    );
  }
}

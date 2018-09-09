import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="page-header fill">
            <h1>
              Lift-stats!
            </h1>
            <span><i>Let me tell you what lift will arrive!!</i></span>

          </div>
          <ul className="nav fill">
            <li className="">
              <Link className="nav-link active" to='/'>Record</Link>
            </li>
            <li className="">
              <Link className="nav-link" to='/statistics'>Statistics</Link>
            </li>
            <li className="">
              <Link className="nav-link" to='/about'>About</Link>
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
            color: #FFFFFF;
            font-size: 3.0em;
            letter-spacing: 1pt;

            line-height: 1;
          }

          span.page-header {
            font-weight: 500;
            font-size: 1.1rem;
          }

          .nav-link {
            border: 0 solid;
            border-radius: 0;
          }

          .nav-link.active {
            color: red;
          }
        `}</style>
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class RecordCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  onToggle(){
    this.setState({
      open: !this.state.open
    })
  }

  renderResult(r,i) {
    return (<span key={i}> {r.toPrecision(3)} |</span> );
  }

  render() {
    const record = this.props.record;

    const date = new Date(record.timestamp)
    const hour = date.getHours() + 1;
    const dateStrings = date.toDateString().split(' ');

    const recordTime = dateStrings[0] + ', ' + hour + '.hour'
    const recordDate = dateStrings.slice(1,3).join('-');

    const isCorrectGuess = record.lift === record.guess;

    const headerClass = 'card-header ' + (isCorrectGuess ? 'success': 'fail');
    const openClass = 'collapse' + (this.state.open ? ' show' : '');

    return (
      <div className="card">
        <div className={headerClass} onClick={this.onToggle.bind(this)}>
          <span>
            { recordTime }, <small>{recordDate}</small>
          </span>
          <span>
            { isCorrectGuess ? 'SUCCESS' : 'FAIL' }
          </span>
        </div>
        <div className={ openClass }>
          <div className="card-body">
          <div>
              Time: { new Date(record.timestamp).toLocaleString() }
            </div>

            <div>
              Floor: { record.floor }
            </div>

            <div>
              Direction: { record.direction ? 'UP' : 'DOWN' }
            </div>

            <div>
              Guess: { record.guess }
            </div>

            <div>
              Lift: { record.lift }
            </div>

            <div>
              Results: [ { record.results.map(this.renderResult.bind(this)) } ]
            </div>
          </div>
        </div>

        <style jsx>{`

          .success {
            background-color: #87ff87;
          }

          .fail {
            background-color: #ffc6c6;
          }

          .card-header {
            text-align: center;
            margin-top: 10px;
          }

          .card-header span {
            display: inline-block;
            width: 50%;
            font-size: 15px;
            font-weight: 600;
          }

          .card-body {
            padding: 2rem;
            font-size: 14px;
            font-weight: 600;
          }
        `}</style>
      </div>
    );
  }
}

RecordCard.propTypes = {
  record: PropTypes.object
};


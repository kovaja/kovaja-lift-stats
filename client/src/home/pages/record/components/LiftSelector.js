import React, { Component } from 'react';
import PropTypes from 'prop-types';
import appData from '../../../tools/appData';

const LIFTS = appData.lifts;

export default class LiftSelector extends Component {


  constructor(props) {
    super(props);

    this.state = {
      lift: null
    };
  }

  changeLift(newLift) {
    this.props.liftChange(newLift);
    this.setState({lift: newLift});
  }

  renderButton(liftValue) {
    const buttonStyle = {
      marginRight: '2px',
      marginTop: '2px',
      width: '65px'
    };

    return (
      <button
        className="btn btn-md btn-info"
        key={'lift-' + liftValue}
        style={buttonStyle}
        onClick={this.changeLift.bind(this, liftValue)}
        disabled={this.state.lift === liftValue}
      >
        {liftValue}
      </button>
    );
  }

  render() {

    const divStyle = {
      paddingTop: '10px',
      paddingLeft: '30px',
    };

    return (
      <div style={divStyle}>
        {LIFTS.map(this.renderButton.bind(this))}
      </div>
    );
  }
}

LiftSelector.propTypes = {
  liftChange: PropTypes.func
};

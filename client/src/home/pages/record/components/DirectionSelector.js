import React, { Component } from 'react';
import PropTypes from 'prop-types';
import appData from '../../../tools/appData';

const DIRECTIONS = appData.directions;

export default class DirectionSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: null
    };
  }

  changeDirection(newDirection) {
    this.props.directionChange(newDirection);
    this.setState({direction: newDirection});
  }

  getDirection(directionAsNumber) {
    return directionAsNumber === -1 ? 'down' : 'up';
  }

  renderButton(directionValue) {
    const buttonStyle = {
      marginRight: '2px',
      marginTop: '2px'
    };

    return (
      <button
        className="btn btn-md btn-warning"
        key={'direction-' + (directionValue)}
        style={buttonStyle}
        onClick={this.changeDirection.bind(this, directionValue)}
        disabled={this.state.direction === directionValue}
      >
        {'Direction ' + this.getDirection(directionValue)}
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
        {DIRECTIONS.map(this.renderButton.bind(this))}
      </div>
    );
  }
}

DirectionSelector.propTypes = {
  directionChange: PropTypes.func
};

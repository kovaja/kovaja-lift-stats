import React, { Component } from 'react';

const FLOORS = [1,3,6,7,14]

export default class FloorSelector extends Component {


  constructor(props) {
    super(props);

    this.state = {
      floor: null
    };
  }

  changeFloor(newFloor) {
    this.props.floorChange(newFloor);
    this.setState({floor: newFloor});
  }

  renderButton(floorValue) {
    const buttonStyle = {
      marginRight: '2px',
      marginTop: '2px'
    };

    return (
      <button
        className="btn btn-md btn-info"
        key={'floor-' + floorValue}
        style={buttonStyle}
        onClick={this.changeFloor.bind(this, floorValue)}
        disabled={this.state.floor === floorValue}
      >
       {'Floor ' + floorValue}
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
        {FLOORS.map(this.renderButton.bind(this))}
      </div>
    );
  }
}

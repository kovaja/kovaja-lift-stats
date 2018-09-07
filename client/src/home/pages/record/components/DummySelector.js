import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DummySelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  changeSelected(newSelected) {
    this.props.onChange(newSelected);
    this.setState({selected: newSelected});
  }

  renderButton(value) {
    const buttonStyle = {
      marginRight: '2px',
      marginTop: '2px'
    };

    return (
      <button
        className={'btn btn-md btn-'+this.props.buttonType}
        key={'element-' + value}
        style={buttonStyle}
        onClick={this.changeSelected.bind(this, value)}
        disabled={this.state.selected === value}
      >
        {this.props.prefix + ' ' + value}
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
        {this.props.options.map(this.renderButton.bind(this))}
      </div>
    );
  }
}

DummySelector.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  buttonType: PropTypes.string
};

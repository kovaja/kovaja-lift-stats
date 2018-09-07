import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Table extends Component {
  renderHeadCells() {
    const firstRecord = this.props.records[0];
    return Object.keys(firstRecord).map(recordKey => <th key={recordKey}>{recordKey}</th>);
  }

  renderCells(record, row) {
    return Object.keys(record).map(k => <td key={'cell-' + k + '-' + row}>{record[k] !== null ? record[k] : 'N/A'}</td>);
  }

  renderRows() {
    return this.props.records.map((r, i) => {
      return (<tr key={'row-' + i}>{this.renderCells(r, i)}</tr>);
    });
  }

  render() {
    return (
      <table className="table table-striped table-responsive">
        <thead className="thead-dark">
          <tr>
            {this.renderHeadCells()}
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  records: PropTypes.array
};

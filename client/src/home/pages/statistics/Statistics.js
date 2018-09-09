import React, { Component } from 'react';
import Table from './components/table/Table';
import ApiService from '../../services/api.service';

export default class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: []
    };

    this.api = new ApiService();
    this.loadRecords();
  }

  loadRecords() {
    this.api.readRecords().then(data => this.setState({records: data}));
  }

  render() {
    return (
      <div>
          {
            this.state.records.length > 0
              ? <Table records={this.state.records}></Table>
              : <span>No records yet!</span>
          }
      </div>
    );
  }
}
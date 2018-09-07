import React, { Component } from 'react';
import Axios from 'axios';
import Table from './components/table/Table';

export default class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
    this.fetchRecords();
  }

  getInitialState() {
    return {
      records: []
    };
  }

  fetchRecords() {
    Axios.get('/api/record')
      .then(response => {
        this.setState({records: response.data});
      })
      .catch(e => {
        let errorMessage = e + '';

        if (e.response && e.response.data) {
          errorMessage += '\n message: ' + e.response.data.message;
        }

        alert(errorMessage);
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          {
            this.state.records.length > 0
              ? <Table records={this.state.records}></Table>
              : <span>No records yet!</span>
          }
        </div>
      </div>
    );
  }
}
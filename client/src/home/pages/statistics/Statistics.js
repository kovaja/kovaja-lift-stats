import React, { Component } from 'react';
import RecordCard from './components/record-card/RecordCard';
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
      <div className="fill accordion">
          {
            this.state.records.length > 0
              ? this.state.records.map((r,i) =><RecordCard key={i} record={r}></RecordCard>)
              : <span>No records yet!</span>
          }
      </div>
    );
  }
}
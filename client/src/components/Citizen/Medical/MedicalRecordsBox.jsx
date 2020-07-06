import React, { Component } from 'react';
import { handleRequest } from '../../../functions';

export default class MedicalRecordsBox extends Component {
  constructor() {
    super();

    this.state = {
      records: [],
    };
  }

  getMedicalRecords = () => {
    handleRequest(`/medical/${this.props.fullName}`, 'GET')
      .then((res) => {
        this.setState({
          records: res.data.records,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getMedicalRecords();
  }

  render() {
    const { records } = this.state;
    return (
      <div className='card bg-dark border-dark mt-3 text-light'>
        <div className='card-header'>
          <h4>
            Medical Records{' '}
            <a
              href={
                '/medical-records/add/' +
                this.props.citizenId +
                '-' +
                this.props.fullName
              }
              className='btn btn-primary float-right'>
              Add Medical Record
            </a>
          </h4>
        </div>
        {!records[0] ? (
          <div className='list-group-item bg-dark border-dark'>
            No medical records, Stay Healthy
          </div>
        ) : (
          <table className='table table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Type</th>
                <th scope='col'>Short Information</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => {
                return (
                  <tr key={index}>
                    <th scope='row'> {++index} </th>
                    <td> {record.type} </td>
                    <td> {record.short_info} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

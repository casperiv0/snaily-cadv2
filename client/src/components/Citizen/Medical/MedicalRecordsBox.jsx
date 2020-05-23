import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';

export default class MedicalRecordsBox extends Component {
  constructor() {
    super();

    this.state = {
      records: [],
    };
  }

  getMedicalRecords = () => {
    axios({
      url: backendURL + '/medical/' + this.props.fullName,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
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
              href='/medical-records/add'
              className='btn btn-primary float-right'>
              Add Medical Record
            </a>
          </h4>
        </div>
        <div className='card-body'>
          {!records[0] ? (
            <div className='list-group-item bg-dark border-dark'>No medical records, Stay Healthy <span aria-label="smiley" role="img">🙂</span></div>
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
      </div>
    );
  }
}

import React, { Component } from 'react';
import { handleRequest } from '../../../functions';
import lang from '../../../language.json';

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
            {lang.citizen.medical_records}
            <a
              href={
                '/medical-records/add/' +
                this.props.citizenId +
                '-' +
                this.props.fullName
              }
              className='btn btn-primary float-right'>
              {lang.citizen.medical.add}
            </a>
          </h4>
        </div>
        {!records[0] ? (
          <div className='list-group-item bg-dark border-dark'>
            {lang.citizen.medical.no_med}
          </div>
        ) : (
          <table className='table table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>{lang.citizen.medical.type2}</th>
                <th scope='col'>{lang.citizen.medical.short_info}</th>
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

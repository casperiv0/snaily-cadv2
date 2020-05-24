import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';

export default class SearchMedicalRecordModal extends Component {
  constructor() {
    super();

    this.state = {
      citizenName: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  search = (e) => {
    e.preventDefault();
    const resultsTable = document.getElementById('resultsTable');
    const { citizenName } = this.state;

    Axios({
      url: backendURL + '/ems-fd/search/' + citizenName,
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        let results = '';
        const { medicalRecords } = res.data;

        if (medicalRecords.length > 0) {
          medicalRecords.forEach((inf, index) => {
            results +=
              '<tr>' +
              '<th scope="row">' +
              ++index +
              '</th>' +
              '<td> ' +
              inf.type +
              ' </td>' +
              '<td>' +
              inf.short_info +
              '</td>' +
              '<td>' +
              inf.name +
              '</td>' +
              '</tr>';
          });
        } else {
          results += 'No Medical Records found for this citizen';
        }

        resultsTable.innerHTML = results;
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { citizenName } = this.state;
    return (
      <div
        className='modal fade'
        id='searchMedicalRecords'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog  modal-xl'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Search Medical Records
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.search}>
              <div className='modal-body'>
                <input
                  type='text'
                  name='citizenName'
                  value={citizenName}
                  onChange={this.onChange}
                  id='searchInput'
                  className='form-control bg-secondary border-secondary text-light'
                />

                <table className='table table-dark'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Type</th>
                      <th scope='col'>Short Information</th>
                      <th scope='col'>Name</th>
                    </tr>
                  </thead>
                  <tbody id='resultsTable'></tbody>
                </table>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Close
                </button>
                <button type='submit' className='btn btn-primary'>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

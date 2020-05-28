import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';

export default class JoinCompanyModal extends Component {
  constructor() {
    super();

    this.state = {
      citizenName: '',
      company: '',
      error: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    axios({
      url: backendURL + '/company/join',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        joinedCompany: this.state.company,
        citizenName: this.state.citizenName,
      },
    }).then((res) => {
      if (res.data.msg === 'pending') {
        sessionStorage.setItem(
          'message',
          'You are awaiting access for this company.'
        );
        window.location = '/citizen';
      } else if (res.data.msg === 'Joined') {
        sessionStorage.setItem('message', 'Successfully Joined Company!');
        window.location = '/citizen';
      } else {
        this.setState({
          error: res.data.msg,
        });
      }
    });
  };

  render() {
    const { error } = this.state;
    return (
      <div
        className='modal fade'
        id='joinCompanyModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='joinCompanyModal'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='joinCompanyModal'>
                Join Company
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
            <div className='modal-body'>
              {error ? <ErrorMessage message={error} /> : null}
              <div className='form-group'>
                <label htmlFor='citizen'>Select Citizen</label>
                <select
                  className='form-control bg-secondary border-secondary text-light'
                  name='citizenName'
                  id='citizenName'
                  onChange={this.onChange}>
                  <option>Select Citizen..</option>
                  {!this.props.citizens[0] ? (
                    <option>You don't have any citizens!</option>
                  ) : (
                    this.props.citizens.map((citizen, index) => {
                      return (
                        <option key={index} value={citizen.full_name}>
                          {citizen.full_name}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='company'>Select Company</label>
                <select
                  className='form-control bg-secondary border-secondary text-light'
                  name='company'
                  id='company'
                  onChange={this.onChange}>
                  <option>Select Company..</option>
                  {!this.props.companies[0] ? (
                    <option>There are no companies!</option>
                  ) : (
                    this.props.companies.map((company, index) => {
                      return (
                        <option key={index} value={company.business_name}>
                          {company.business_name}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary'>
                Join Company
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

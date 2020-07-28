import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import lang from "../../../../language.json";

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
          lang.citizen.company.awaiting
        );
        window.location = '/citizen';
      } else if (res.data.msg === 'Joined') {
        sessionStorage.setItem('message', lang.citizen.company.joined);
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
                {lang.citizen.company.join}
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
                <label htmlFor='citizen'>{lang.citizen.company.select_cit}</label>
                <select
                  className='form-control bg-secondary border-secondary text-light'
                  name='citizenName'
                  id='citizenName'
                  onChange={this.onChange}>
                  <option>{lang.citizen.company.select_cit}</option>
                  {!this.props.citizens[0] ? (
                    <option>{lang.citizen.company.no_cit}!</option>
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
                <label htmlFor='company'>{lang.citizen.company.select_com}</label>
                <select
                  className='form-control bg-secondary border-secondary text-light'
                  name='company'
                  id='company'
                  onChange={this.onChange}>
                  <option>{lang.citizen.company.select_com}</option>
                  {!this.props.companies[0] ? (
                    <option>{lang.citizen.company.no_com}!</option>
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
                {lang.global.cancel}
              </button>
              <button type='submit' className='btn btn-primary'>
                {lang.citizen.company.join}
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

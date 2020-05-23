import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';

export default class componentName extends Component {
  constructor() {
    super();

    this.state = {
      dmv: '',
      firearmsLicense: '',
      pilotLicense: '',
      ccw: '',
      statuses: [],
    };
  }

  getCitizensLicenses = () => {
    Axios({
      url:
        backendURL + '/licenses/' + this.props.match.params.citizenId + '/edit',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.current) {
          const current = res.data.current[0];

          this.setState({
            statuses: res.data.licenses,
            dmv: current.dmv,
            firearmsLicense: current.fire_license,
            pilotLicense: current.pilot_license,
            ccw: current.ccw,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentWillMount() {
    this.getCitizensLicenses();
  }

  editLicenses = (event) => {
    event.preventDefault();

    Axios({
      url:
        backendURL + '/licenses/' + this.props.match.params.citizenId + '/edit',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        dmv: this.state.dmv,
        pilotLicense: this.state.pilotLicense,
        firearmsLicense: this.state.firearmsLicense,
        ccw: this.state.ccw,
      },
    }).then((res) => {
      if (res.data.msg === 'Updated') {
        sessionStorage.setItem('message', 'Successfully Updated Licenses');
        return window.location = '/citizen/'
      }
    });
  };

  render() {
    const { dmv, firearmsLicense, pilotLicense, ccw, statuses } = this.state;
    return (
      <form className='container text-light' onSubmit={this.editLicenses}>
        <div className='form-group'>
          <label htmlFor='dmv'>Edit Drivers License</label>
          <select
            type='text'
            name='dmv'
            id='dmv'
            value={dmv}
            className='form-control bg-dark border-dark text-light'
            onChange={this.onChange}>
            <option value={dmv}> {dmv} </option>
            <option disabled>--------</option>
            {!statuses[0]
              ? ''
              : statuses.map((status, index) => {
                  return (
                    <option key={index} value={status.status}>
                      {' '}
                      {status.status}{' '}
                    </option>
                  );
                })}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='dmv'>Edit Firearms License</label>
          <select
            type='text'
            name='firearmsLicense'
            id='firearmsLicense'
            value={firearmsLicense}
            className='form-control bg-dark border-dark text-light'
            onChange={this.onChange}>
            <option value={firearmsLicense}> {firearmsLicense} </option>
            <option disabled>--------</option>
            {!statuses[0]
              ? ''
              : statuses.map((status, index) => {
                  return (
                    <option key={index} value={status.status}>
                      {' '}
                      {status.status}{' '}
                    </option>
                  );
                })}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='dmv'>Edit Pilots License</label>
          <select
            type='text'
            name='pilotLicense'
            id='pilotLicense'
            value={pilotLicense}
            className='form-control bg-dark border-dark text-light'
            onChange={this.onChange}>
            <option value={pilotLicense}> {pilotLicense} </option>
            <option disabled>--------</option>
            {!statuses[0]
              ? ''
              : statuses.map((status, index) => {
                  return (
                    <option key={index} value={status.status}>
                      {' '}
                      {status.status}{' '}
                    </option>
                  );
                })}
          </select>
        </div>

        {/* CCW */}
        <div className='form-group'>
          <label htmlFor='dmv'>Edit CCW</label>
          <select
            type='text'
            name='ccw'
            id='ccw'
            value={ccw}
            className='form-control bg-dark border-dark text-light'
            onChange={this.onChange}>
            <option value={ccw}> {ccw} </option>
            <option disabled>--------</option>
            {!statuses[0]
              ? ''
              : statuses.map((status, index) => {
                  return (
                    <option key={index} value={status.status}>
                      {' '}
                      {status.status}{' '}
                    </option>
                  );
                })}
          </select>
        </div>

        <div className='form-group float-right'>
          <a
            href={'/citizen/' + this.props.match.params.citizenId}
            className='btn btn-danger'>
            Cancel
          </a>
          <button type='submit' className='btn btn-primary ml-2'>
            Edit Licenses
          </button>
        </div>
      </form>
    );
  }
}

import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../../Partials/Messages/ErrorMessage';
import lang from '../../../../../language.json';

export default class EditCompany extends Component {
  constructor() {
    super();

    this.state = {
      current: [],
      whitelisted: '',
      business_address: '',
      business_name: '',
      error: '',
    };
  }

  getCurrentCompany = () => {
    Axios({
      url: this.props.backendUrl,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        business_address: res.data.company[0].business_address,
        business_name: res.data.company[0].business_name,
        whitelisted: res.data.company[0].whitelisted,
        current: res.data.company[0],
      });
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: this.props.backendUrl + '/edit',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        whitelisted: this.state.whitelisted,
        business_address: this.state.business_address,
        business_name: this.state.business_name,
      },
    }).then((res) => {
      if (res.data.msg === 'Updated') {
        sessionStorage.setItem('message', lang.citizen.company.updated_company);
        return (window.location = '/citizen');
      }

      this.setState({
        error: res.data.msg,
      });
    });
  };

  deleteCompany = () => {
    Axios({
      url: this.props.backendUrl,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.msg === 'Deleted') {
        sessionStorage.setItem('message', lang.citizen.company.deleted_company);
        return (window.location = '/citizen');
      }
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.getCurrentCompany();
  }

  render() {
    const { current, business_address, business_name, error } = this.state;
    return (
      <div>
        <form className='mt-2' onSubmit={this.onSubmit}>
          {error ? <ErrorMessage message={error} dismiss /> : null}
          <div className='form-group'>
            <label htmlFor='business_name'>{lang.citizen.company.name}</label>
            <input
              value={business_name}
              onChange={this.onChange}
              className='form-control bg-secondary border-secondary text-light'
              name='business_name'
              id='business_name'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='whitelisted'>
              {lang.citizen.company.whitelisted}
            </label>
            <select
              onChange={this.onChange}
              className='form-control bg-secondary border-secondary text-light'
              name='whitelisted'
              id='whitelisted'>
              <option value={current.whitelisted}>{current.whitelisted}</option>
              <option disabled>--------</option>
              <option value='true'>{lang.global.yes}</option>
              <option value='false'>{lang.global.no}</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='business_address'>
              {lang.citizen.company.address}
            </label>
            <input
              onChange={this.onChange}
              className='form-control bg-secondary border-secondary text-light'
              name='business_address'
              id='business_address'
              value={business_address}
            />
          </div>
          <div className='form-group float-right'>
            <button className='btn btn-primary' type='submit'>
              {lang.citizen.company.update_company}
            </button>
          </div>
        </form>

        <button
          type='button'
          className='btn btn-danger'
          onClick={this.deleteCompany}>
          {lang.admin.company.delete_company}
        </button>
      </div>
    );
  }
}

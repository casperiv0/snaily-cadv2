import React, { Component } from 'react';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import Axios from 'axios';
import ErrorMessage from '../Partials/Messages/ErrorMessage';

export default class CreateWarrant extends Component {
  constructor() {
    super();

    this.state = {
      fullName: '',
      status: 'Active',
      details: '',
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

    Axios({
      url: backendURL + '/officers/create-warrant',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        fullName: this.state.fullName,
        status: this.state.status,
        details: this.state.details,
      },
    }).then((res) => {
      if (res.data.msg === 'Added') {
        sessionStorage.setItem(
          'leo-message',
          'Successfully Created Warrant, Target Name: ' + this.state.fullName
        );
        return (window.location = '/leo/dash');
      }

      this.setState({
        error: res.data.msg,
      });
    });
  };

  render() {
    const { status, fullName, details, error } = this.state;
    return (
      <div className='col-md-3 list-group'>
        <div className='list-group-item bg-secondary border-secondary text-light'>
          Create Warrant
        </div>
        <form
          className='list-group-item bg-dark border-dark'
          onSubmit={this.onSubmit}>
          {error ? <ErrorMessage message={error} /> : null}
          <div className='form-group'>
            <label htmlFor='fullName'>Enter Full Name</label>
            <input
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='fullName'
              id='fullName'
              value={fullName}
              onChange={this.onChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='status'>Select Status</label>
            <select
              className='form-control bg-secondary border-secondary text-light'
              value={status}
              name='status'
              id='status'
              onChange={this.onChange}>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='details'>Enter Details</label>
            <input
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='details'
              id='details'
              value={details}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
              <button type='submit' className="btn btn-success container">Create Warrant</button>
          </div>
        </form>
      </div>
    );
  }
}

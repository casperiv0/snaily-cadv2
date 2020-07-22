import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import lang from '../../../../language.json';

export default class AddLegalStatus extends Component {
  constructor() {
    super();

    this.state = {
      status: '',
      error: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/admin/legal-statuses/add',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        legalStatus: this.state.status,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Added') {
          sessionStorage.setItem(
            'admin-message',
            lang.admin.values.legal.added_ls
          );
          return (window.location = '/admin/legal-statuses');
        }

        this.setState({
          error: res.data.msg,
        });
      })
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    document.title = 'Add Legal Status - Admin';
  }

  render() {
    const { status, error } = this.state;
    return (
      <form className='col-md-9 container text-light' onSubmit={this.onSubmit}>
        {error ? <ErrorMessage message={error} /> : null}

        <div className='form-group'>
          <label htmlFor='status'>{lang.admin.values.legal.enter_name}</label>
          <input
            type='text'
            name='status'
            id='status'
            className='form-control bg-dark border-dark text-light'
            value={status}
            onChange={this.onChange}
          />
        </div>
        <div className='form-group float-right'>
          <a href='/admin/legal-statuses' className='btn btn-danger'>
            Cancel
          </a>
          <button className='btn btn-primary ml-2' type='submit'>
            {lang.admin.values.legal.add_ls}
          </button>
        </div>
      </form>
    );
  }
}

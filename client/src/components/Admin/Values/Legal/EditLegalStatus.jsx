import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import lang from '../../../../language.json';

export default class EditLegalStatus extends Component {
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
      url:
        backendURL + '/admin/legal-statuses/edit/' + this.props.match.params.id,
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        legalStatus: this.state.status,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem(
            'admin-message',
            lang.admin.values.legal.update_ls
          );
          return (window.location = '/admin/legal-statuses');
        }

        this.setState({
          error: res.data.msg,
        });
      })
      .catch((err) => console.log(err));
  };

  //   Get Current Data
  getCurrentData = () => {
    Axios({
      url:
        backendURL + '/admin/legal-statuses/edit/' + this.props.match.params.id,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          status: res.data.legalStatus[0].status,
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
    this.getCurrentData();
    document.title = 'Edit Legal Status - Admin';
  }

  render() {
    const { status, error } = this.state;
    return (
      <form className='col-md-9 container text-light' onSubmit={this.onSubmit}>
        {error ? <ErrorMessage message={error} /> : null}

        <div className='form-group'>
          <label htmlFor='status'>{  lang.admin.values.legal.enter_name}</label>
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
            {lang.global.cancel}
          </a>
          <button className='btn btn-primary ml-2' type='submit'>
            {lang.global.update}
          </button>
        </div>
      </form>
    );
  }
}

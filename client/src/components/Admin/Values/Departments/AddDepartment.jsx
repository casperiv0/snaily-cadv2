import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import lang from '../../../../language.json';

export default class AddDepartment extends Component {
  constructor() {
    super();

    this.state = {
      department: '',
      error: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/admin/departments/add',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        department: this.state.department,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Added') {
          sessionStorage.setItem(
            'admin-message',
            lang.admin.values.department.added_dept
          );
          return (window.location = '/admin/departments');
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
    document.title = 'Add Department - Admin';
  }

  render() {
    const { department, error } = this.state;
    return (
      <form className='container col-xl text-light' onSubmit={this.onSubmit}>
        {error ? <ErrorMessage message={error} /> : null}

        <div className='form-group'>
          <label htmlFor='department'>
            {lang.admin.values.department.enter_name}
          </label>
          <input
            type='text'
            name='department'
            id='department'
            className='form-control bg-dark border-dark text-light'
            value={department}
            onChange={this.onChange}
          />
        </div>
        <div className='form-group float-right'>
          <a href='/admin/departments' className='btn btn-danger'>
            {lang.global.cancel}
          </a>
          <button className='btn btn-primary ml-2' type='submit'>
            {lang.admin.values.department.add_dept}
          </button>
        </div>
      </form>
    );
  }
}

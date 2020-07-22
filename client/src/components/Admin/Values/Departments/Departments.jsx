import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import SuccessMessage from '../../../Partials/Messages/SuccessMessage';
import lang from '../../../../language.json';

export default class Departments extends Component {
  constructor() {
    super();
    this.state = {
      departments: [],
      message: sessionStorage.getItem('admin-message'),
    };
  }

  getDepartments = () => {
    Axios({
      url: backendURL + '/admin/departments',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.departments) {
          this.setState({
            departments: res.data.departments,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteDepartment = (id) => {
    Axios({
      url: backendURL + '/admin/departments/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.setItem(
            'admin-message',
            lang.admin.values.department.delete_dept
          );
          return (window.location = '/admin/departments');
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getDepartments();
    document.title = 'Departments - Admin';
  }

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  render() {
    const { departments, message } = this.state;

    return (
      <div className='text-light container col'>
        {message ? <SuccessMessage dismiss message={message} /> : null}
        <h3>
          {lang.admin.values.department.manage_dept} -{' '}
          <a href='/admin/departments/add'>+</a>
        </h3>

        <ul className='list-group mt-3'>
          {!departments[0] ? (
            <ErrorMessage message={lang.admin.values.department.no_dept} />
          ) : (
            departments.map((department, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item text-light bg-dark border-secondary'>
                  {++index} | {department.name}
                  <div className='float-right'>
                    <a
                      href={'/admin/departments/edit/' + department.id}
                      className='btn btn-success mr-2'>
                      {lang.global.edit}
                    </a>
                    <button
                      onClick={() => {
                        this.deleteDepartment(department.id);
                      }}
                      className='btn btn-danger'>
                      {lang.global.delete}
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}

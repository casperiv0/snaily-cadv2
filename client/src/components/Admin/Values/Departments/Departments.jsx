import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import AdminSuccessMessage from "../../AdminSuccessMessage";

export default class Departments extends Component {
  constructor() {
    super();
    this.state = {
      departments: [],
      message: sessionStorage.getItem("admin-message")
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
            'Successfully Deleted Department'
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
    const { departments,message } = this.state;
    
    return (
      <div className='container text-light col-md-9'>
          {
              message ? <AdminSuccessMessage message={message} /> : null 
          }
        <h3>
          Manage Departments - <a href='/admin/departments/add'>+</a>
        </h3>

        <ul className='list-group mt-3'>
          {!departments[0] ? (
            <ErrorMessage message="You Don't have any Departments, Add one by clicking the plus symbol above" />
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
                      Edit
                    </a>
                    <button
                      onClick={() => {
                        this.deleteDepartment(department.id);
                      }}
                      className='btn btn-danger'>
                      Delete
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

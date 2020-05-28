import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';

export default class CreateOfficer extends Component {
  constructor() {
    super();

    this.state = {
      officerName: '',
      department: '',
      departments: [],
    };
  }

  getDepartments = () => {
    Axios({
      url: backendURL + '/admin/departments',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          departments: res.data.departments,
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
    this.getDepartments();
    document.title = 'Create Officer - Police';
  }

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/officers/myofficers/add',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        officerName: this.state.officerName,
        officerDept: this.state.department,
      },
    }).then((res) => {
      if (res.data.msg === 'Added') {
        sessionStorage.setItem(
          'leo-message',
          'Successfully Added ' + this.state.officerName
        );
        return (window.location = '/leo/myofficers');
      }
    });
  };

  render() {
    const { departments, officerName, department } = this.state;
    return (
      <div className='container text-light mt-2'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='officerName'>Enter Officer Name</label>
            <input
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='officerName'
              id='officerName'
              value={officerName}
              onChange={this.onChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='department'>Select Department</label>
            <select
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='department'
              id='department'
              value={department}
              onChange={this.onChange}>
              <option>Select Department..</option>
              {!departments[0] ? (
                <option>There are no departments Found.</option>
              ) : (
                departments.map((department, index) => {
                  return (
                    <option key={index} value={department.name}>
                      {department.name}
                    </option>
                  );
                })
              )}
            </select>
          </div>
          <div className='form-group float-right'>
            <a className='btn btn-danger' href='/leo/myofficers'>
              Cancel
            </a>
            <button className='btn btn-primary ml-2' type='submit'>
              Create Officer
            </button>
          </div>
        </form>
      </div>
    );
  }
}

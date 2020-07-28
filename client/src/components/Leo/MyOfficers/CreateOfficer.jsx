import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import lang from "../../../language.json"

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
          `${lang.officers.create_officer_success} ${this.state.officerName}`
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
            <label htmlFor='officerName'>{lang.record.officer_name}</label>
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
            <label htmlFor='department'>{lang.officers.select_department}</label>
            <select
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='department'
              id='department'
              value={department}
              onChange={this.onChange}>
              <option>{lang.officers.select_department}..</option>
              {!departments[0] ? (
                <option>{lang.officers.no_departments}</option>
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
              {lang.global.cancel}
            </a>
            <button className='btn btn-primary ml-2' type='submit'>
              {lang.officers.create_officer}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

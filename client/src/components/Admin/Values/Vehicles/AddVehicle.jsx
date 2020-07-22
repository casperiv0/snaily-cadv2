import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import lang from '../../../../language.json';

export default class AddVehicle extends Component {
  constructor() {
    super();

    this.state = {
      vehicle: '',
      error: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/admin/vehicles/add',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        vehicle: this.state.vehicle,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Added') {
          sessionStorage.setItem(
            'admin-message',
            lang.admin.values.vehicle.added_veh
          );
          return (window.location = '/admin/vehicles');
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
    document.title = 'Add Vehicle - Admin';
  }

  render() {
    const { vehicle, error } = this.state;
    return (
      <form className='col-md-9 container text-light' onSubmit={this.onSubmit}>
        {error ? <ErrorMessage message={error} /> : null}

        <div className='form-group'>
          <label htmlFor='vehicle'>{lang.admin.values.vehicle.enter_name}</label>
          <input
            type='text'
            name='vehicle'
            id='vehicle'
            className='form-control bg-dark border-dark text-light'
            value={vehicle}
            onChange={this.onChange}
          />
        </div>
        <div className='form-group float-right'>
          <a href='/admin/vehicles' className='btn btn-danger'>
            {lang.global.cancel}
          </a>
          <button className='btn btn-primary ml-2' type='submit'>
            {lang.admin.values.vehicle.add_veh}
          </button>
        </div>
      </form>
    );
  }
}

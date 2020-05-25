import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';

export default class EditVehicle extends Component {
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
      url:
        backendURL +
        '/admin/vehicles/edit/' +
        this.props.match.params.id,
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        vehicle: this.state.vehicle,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem(
            'admin-message',
            'Successfully Updated Gender'
          );
          return (window.location = '/admin/vehicles');
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
      url: backendURL + '/admin/vehicles/edit/' + this.props.match.params.id,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        console.log(res.data);

        this.setState({
            vehicle: res.data.vehicle[0].cname,
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
    document.title = 'Edit Vehicle - Admin';
  }

  render() {
    const { vehicle, error } = this.state;
    return (
      <form className='col-md-9 container text-light' onSubmit={this.onSubmit}>
        {error ? <ErrorMessage message={error} /> : null}

        <div className='form-group'>
          <label htmlFor='vehicle'>Enter Gender Name</label>
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
            Cancel
          </a>
          <button className='btn btn-primary ml-2' type='submit'>
            Update Vehicle
          </button>
        </div>
      </form>
    );
  }
}

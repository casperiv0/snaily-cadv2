import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../Partials/Messages/ErrorMessage';

export default class CreateTruckLog extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      date: '',
      co_driver: '',
      start_time: '',
      plate: '',
      error: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/truck-logs/create',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        name: this.state.name,
        date: this.state.date,
        co_driver: this.state.co_driver,
        start_time: this.state.start_time,
        plate: this.state.plate,
      },
    }).then((res) => {
      if (res.data.msg === 'Created') {
        sessionStorage.setItem(
          'truck-message',
          'Successfully created truck log'
        );
        return (window.location = '/truck-logs');
      }

      this.setState({
        error: res.data.msg,
      });
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    document.title = 'Create Truck Log';
  }

  render() {
    const { name, date, co_driver, start_time, plate, error } = this.state;
    return (
      <div className='container text-light'>
        <form onSubmit={this.onSubmit}>
          {error ? <ErrorMessage message={error} dismiss /> : null}
          {/* Name */}
          <div className='form-group'>
            <label htmlFor='name'>Enter Trucker Name</label>
            <input
              type='text'
              name='name'
              id='name'
              onChange={this.onChange}
              value={name}
              className='form-control text-light bg-dark border-dark'
            />
          </div>

          {/* Co driver */}
          <div className='form-group'>
            <label htmlFor='name'>Enter Co-Driver Name</label>
            <input
              type='text'
              name='co_driver'
              id='co_driver'
              onChange={this.onChange}
              value={co_driver}
              className='form-control text-light bg-dark border-dark'
            />
          </div>

          {/* Date */}
          <div className='form-group'>
            <label htmlFor='date'>Enter Date</label>
            <input
              type='date'
              name='date'
              id='date'
              onChange={this.onChange}
              value={date}
              className='form-control text-light bg-dark border-dark'
            />
          </div>

          {/* Start Time */}
          <div className='form-group'>
            <label htmlFor='start_time'>Enter Starting time</label>
            <input
              type='text'
              name='start_time'
              id='start_time'
              onChange={this.onChange}
              value={start_time}
              className='form-control text-light bg-dark border-dark'
            />
          </div>

          {/* Plate */}
          <div className='form-group'>
            <label htmlFor='plate'>Enter Vehicle Plate</label>
            <input
              type='text'
              name='plate'
              id='plate'
              onChange={this.onChange}
              value={plate}
              className='form-control text-light bg-dark border-dark'
            />
          </div>

          <div className='form-group float-right'>
            <a className='btn btn-danger' href='/truck-logs'>
              Cancel
            </a>
            <button className='btn btn-primary ml-2' type='submit'>
              Create Truck Log
            </button>
          </div>
        </form>
      </div>
    );
  }
}

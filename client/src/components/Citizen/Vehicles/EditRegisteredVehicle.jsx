import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';

export default class EditRegisteredVehicle extends Component {
  constructor() {
    super();

    this.state = {
      current: [],
    };
  }

  getCurrentData = () => {
    Axios({
      url: backendURL + '/c/vehicles/' + this.props.match.params.vehicleId,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.msg === 'Vehicle Not Found') {
        sessionStorage.setItem('message', "Vehicle Wasn't found!");
        return (window.location = '/citizen');
      }

      if (res.data.vehicle) {
        this.setState({
          current: res.data.vehicle[0],
        });
      }
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.getCurrentData();
  }

  render() {
    const { current } = this.state;
    return (
      <form className='container text-light' onSubmit={this.updateVehicle}>
        <div className='form-group'>
          <label htmlFor='plate'>Plate</label>
          <input
            type='text'
            value={current.plate}
            disabled
            title='You are not able to edit the plate'
            className='form-control text-light bg-dark border-dark'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='plate'>Color</label>
          <input
            type='text'
            value={current.color}
            className='form-control text-light bg-dark border-dark'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='plate'>Status</label>
          {/* TODO. transform to list & add all statuses from db */}
          <input
            type='text'
            value={current.in_status}
            onChange={this.onChange}
            className='form-control text-light bg-dark border-dark'
          />
        </div>

        {/* TODO: able to change to company */}
      </form>
    );
  }
}

import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import LoadingArea from '../../Partials/LoadingArea';
import Cookies from 'js-cookie';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';
import lang from '../../../language.json';

export default class TransferVehicle extends Component {
  constructor() {
    super();

    this.state = {
      current: [],
      loading: true,
      newOwner: '',
      vehiclePlate: '',
      owners: [],
      error: '',
    };
  }

  getCurrentVehicle = () => {
    Axios({
      url: backendURL + '/c/vehicles/' + this.props.match.params.vehicleId,
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.vehicle) {
          return this.setState({
            vehiclePlate: res.data.vehicle[0].plate,
            current: res.data.vehicle,
            loading: false,
          });
        }

        this.setState({
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  getOwners = () => {
    Axios({
      url: backendURL + '/citizen/all',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        console.log(res.data);

        if (res.data.citizens) {
          this.setState({
            owners: res.data.citizens,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  onSubmit = (e) => {
    e.preventDefault();
    Axios({
      url:
        backendURL +
        '/c/vehicles/transfer/' +
        this.props.match.params.vehicleId,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        oldOwner: this.state.current[0].owner,
        newOwner: this.state.newOwner,
        plate: this.state.vehiclePlate,
      },
    }).then((res) => {
      if (res.data.msg === 'Transferred') {
        sessionStorage.setItem(
          'message',
          `${lang.citizen.vehicle.transferred} ${this.state.newOwner}`
        );
        return (window.location = '/citizen');
      }

      this.setState({
        error: res.data.msg,
      });
    });
  };

  componentDidMount() {
    document.title = 'Transfer Vehicle to new owner - Citizens';
    this.getOwners();
    this.getCurrentVehicle();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { loading, vehiclePlate, owners, newOwner, error } = this.state;
    if (loading) {
      return <LoadingArea />;
    }
    return (
      <div className='container mt-2 text-light'>
        <form onSubmit={this.onSubmit}>
          {error ? <ErrorMessage message={error} /> : null}
          <div className='form-group'>
            <label htmlFor='vehiclePlate'>{lang.global.plate}</label>
            <input
              type='text'
              className='form-control bg-secondary border-secondary text-light'
              name='vehiclePlate'
              id='vehiclePlate'
              onChange={this.onChange}
              value={vehiclePlate}
              maxLength='8'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='newOwner'>{lang.citizen.vehicle.transfer_to}</label>
            <input
              type='text'
              className='form-control bg-secondary border-secondary text-light'
              name='newOwner'
              id='newOwner'
              onChange={this.onChange}
              value={newOwner}
              list='owners'
            />
            <datalist id='owners'>
              {owners.map((owner, index) => {
                return (
                  <option key={index} value={owner.full_name}>
                    {owner.full_name}
                  </option>
                );
              })}
            </datalist>
          </div>
          <div className='form-group float-right'>
            <a className='btn btn-danger mr-2' href='/citizen'>
              {lang.global.cancel}
            </a>
            <button className='btn btn-primary' type='submit'>
              {lang.citizen.vehicle.transfer_veh}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

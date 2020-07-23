import React, { Component } from 'react';
import { backendURL } from '../../../config/config';
import Axios from 'axios';
import Cookies from 'js-cookie';
import LoadingArea from '../../Partials/LoadingArea';
import lang from '../../../language.json';

export default class RegisteredVehicles extends Component {
  constructor() {
    super();

    this.state = {
      vehicles: [],
      loading: true,
    };
  }

  getRegisteredVehicles = () => {
    Axios({
      url: backendURL + '/c/vehicles/all/' + this.props.citizenId,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.vehicles) {
          this.setState({
            vehicles: res.data.vehicles,
            loading: false,
          });
        } else {
          this.setState({
            vehicles: [],
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteVehicle = (vehicleId) => {
    Axios({
      url: backendURL + '/c/vehicles/' + vehicleId,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.setItem('message', lang.citizen.vehicle.deleted_veh);
          return (window.location = '/citizen');
        }
      })
      .catch((err) => console.log(err));
  };

  reportAsStolen = (vehicleId) => {
    Axios({
      url: backendURL + '/c/vehicles/report-stolen/' + vehicleId,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Reported') {
          sessionStorage.setItem(
            'message',
            lang.citizen.vehicle.reported_stolen
          );
          return (window.location = '/citizen');
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getRegisteredVehicles();
  }
  render() {
    const { vehicles, loading } = this.state;

    if (loading) {
      return (
        <div className='container'>
          <LoadingArea />
        </div>
      );
    }

    return (
      <div className='list-group-item list-group-item-action bg-dark text-light border-dark mt-1'>
        <h5 className='mb-1'>{lang.citizen.vehicle.reged_vehicle}:</h5>

        {!vehicles[0] ? (
          <li className='list-group-item bg-secondary border-secondary mt-2 d-flex justify-content-between'>
            {lang.citizen.vehicle.no_veh}
            <a href='/vehicles/register' className='btn btn-primary'>
              {lang.citizen.vehicle.reg_a_vehicle}
            </a>
          </li>
        ) : (
          <div>
            <button
              className='btn btn-secondary mt-2'
              type='button'
              data-toggle='collapse'
              data-target='#registeredVehicles'
              aria-expanded='false'
              aria-controls='collapseExample'>
              {lang.citizen.vehicle.toggle_veh}
            </button>
            <div className='collapse mt-2' id='registeredVehicles'>
              {vehicles.map((vehicle, index) => (
                <li
                  key={index}
                  className='list-group-item d-flex justify-content-between bg-secondary border-dark'>
                  <div>
                    {/* Vehicle */}
                    <span className='font-weight-bold'>{vehicle.vehicle}</span>
                    <br />
                    {/* Plate */}
                    <span className='font-weight-bold'>
                      {lang.global.plate}:{' '}
                    </span>
                    <span className='uppercase font-weight-normal'>
                      {vehicle.plate.toUpperCase()}
                    </span>
                    <br />
                    {/* Insurance */}
                    <span className='font-weight-bold'>
                      {lang.citizen.vehicle.status}:
                    </span>
                    <span> {vehicle.in_status}</span> <br />
                    {/* Color */}
                    <span className='font-weight-bold'>
                      {lang.global.color}:{' '}
                    </span>
                    {vehicle.color}
                    <br />
                    {/* VIN Number */}
                    <span className='font-weight-bold'>
                      {lang.citizen.vehicle.vin}:{' '}
                    </span>
                    {vehicle.vin_number} <br />
                    {/* Company */}
                    <span className='font-weight-bold'>
                      {lang.citizen.vehicle.company}:{' '}
                    </span>
                    {vehicle.company} <br />
                  </div>

                  {/* actions */}
                  <div>
                    <a
                      href={'/vehicles/transfer/' + vehicle.id}
                      className='btn btn-dark mr-2'>
                      {lang.citizen.vehicle.transfer}
                    </a>
                    {vehicle.in_status === 'Reported as stolen' ? null : (
                      <button
                        onClick={() => this.reportAsStolen(vehicle.id)}
                        className='btn btn-dark mr-2'>
                        {lang.citizen.vehicle.report_stolen}
                      </button>
                    )}
                    <a
                      href={'/vehicles/edit/' + vehicle.id}
                      className='btn btn-success'>
                      {lang.global.edit}
                    </a>
                    <button
                      href='#deleteVehicle'
                      onClick={() => this.deleteVehicle(vehicle.id)}
                      className='btn btn-danger ml-2'>
                      {lang.global.delete}
                    </button>
                  </div>
                </li>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

import React, { Component } from 'react';
import { backendURL } from '../../../config/config';
import Axios from 'axios';
import Cookies from 'js-cookie';

export default class RegisteredVehicles extends Component {
  constructor() {
    super();

    this.state = {
      vehicles: [],
    };
  }

  getRegisteredVehicles = () => {
    Axios({
      url: backendURL + '/c/vehicles',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.vehicles) {
          this.setState({
            vehicles: res.data.vehicles,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getRegisteredVehicles();
  }
  render() {
    const { vehicles } = this.state;
    return (
      <div className='list-group-item list-group-item-action bg-dark text-light border-dark mt-1'>
        <div className='d-flex'>
          <h5 className='mb-1'>Registered Vehicles:</h5>
        </div>

        {!vehicles[0] ? (
          <li className='list-group-item bg-secondary border-secondary mt-2 d-flex justify-content-between'>
            No Vehicles Registered
            <a
              href='/vehicles/register'
              className='btn btn-primary'>Register a Vehicle</a>
          </li>
        ) : (
          <>
            <button
              className='btn btn-primary mt-2'
              type='button'
              data-toggle='collapse'
              data-target='#collapseExample'
              aria-expanded='false'
              aria-controls='collapseExample'>
              Toggle Registered Vehicles
            </button>
            <div className='collapse mt-2' id='collapseExample'>
              {vehicles.map((vehicle, index) => (
                <li
                  key={index}
                  className='list-group-item  bg-secondary border-dark'>
                  <span className='font-weight-bold'>{vehicle.vehicle}</span>
                  <br />
                  <span className='font-weight-bold'>Plate: </span>
                  <span className='uppercase font-weight-normal'>
                    {vehicle.plate}
                  </span>
                  <br />
                  <span className='font-weight-bold'>Insurance Status:</span>
                  <span> {vehicle.in_status}</span> <br />
                  <span className='font-weight-bold'>Color: </span>
                  {vehicle.color}
                  <br />
                  <span className='font-weight-bold'>VIN: </span>
                  {vehicle.vin_number} <br />
                </li>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

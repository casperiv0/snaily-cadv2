import React, { Component } from 'react';
import LoadingArea from '../../../../Partials/LoadingArea';
import Cookies from 'js-cookie';
import Axios from 'axios';
import ErrorMessage from "../../../../Partials/Messages/ErrorMessage"

export default class CompanyVehicles extends Component {
  constructor() {
    super();

    this.state = {
      vehicles: [],
      loading: true,
    };
  }

  getVehicles = () => {
    const url = this.props.backendUrl + '/vehicles';
    Axios({
      url: url,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        vehicles: res.data.vehicles,
        loading: false,
      });
    });
  };

  componentDidMount() {
    this.getVehicles();
  }

  render() {
    const { loading, vehicles } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <ul className='list-group mt-2'>
        {!vehicles[0] ? (
          <ErrorMessage message='There were no vehicles found.' />
        ) : (
          vehicles.map((vehicle, index) => {
            return (
              <li
                key={index}
                className='list-group-item bg-dark border-secondary'>
                <div>
                  {++index} | {vehicle.vehicle}
                  <div>
                    <span className='font-weight-bold'>Plate: </span>
                    {vehicle.plate}
                  </div>
                  <div>
                    <span className='font-weight-bold'>Status: </span>
                    {vehicle.in_status}
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    );
  }
}

import React, { Component } from 'react';
import LoadingArea from '../../../../Partials/LoadingArea';
import Cookies from 'js-cookie';
import Axios from 'axios';
import ErrorMessage from "../../../../Partials/Messages/ErrorMessage"
import lang from "../../../../../language.json"
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
          <ErrorMessage message={lang.citizen.company.no_veh} />
        ) : (
          vehicles.map((vehicle, index) => {
            return (
              <li
                key={index}
                className='list-group-item bg-dark border-secondary'>
                <div>
                  {++index} | {vehicle.vehicle}
                  <div>
                    <span className='font-weight-bold'>{lang.global.plate}: </span>
                    {vehicle.plate.toUpperCase()}
                  </div>
                  <div>
                    <span className='font-weight-bold'>{lang.citizen.vehicle.status}: </span>
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

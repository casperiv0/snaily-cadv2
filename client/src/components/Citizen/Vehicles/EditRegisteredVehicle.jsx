import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../Partials/LoadingArea';
import lang from '../../../language.json';

export default class EditRegisteredVehicle extends Component {
  constructor() {
    super();

    this.state = {
      color: '',
      plate: '',
      status: '',
      company: '',
      statuses: [],
      companies: [],
      loading: true,
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
        sessionStorage.setItem('message', lang.citizen.vehicle.not_found);
        return (window.location = '/citizen');
      }

      if (res.data.vehicle) {
        const vehicle = res.data.vehicle[0];
        this.setState({
          plate: vehicle.plate.toUpperCase(),
          color: vehicle.color,
          company: vehicle.company,
          status: vehicle.in_status,
        });
      }
    });
  };

  getExtraData = () => {
    // Companies
    Axios({
      url: backendURL + '/company',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.companies) {
        this.setState({
          companies: res.data.companies,
        });
      } else {
        console.log(res.data.msg);
      }
    });

    // Get all statuses
    Axios({
      url: backendURL + '/admin/legal-statuses',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.statuses) {
          this.setState({
            statuses: res.data.statuses,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    document.title = 'Edit Registered Vehicle';
    this.getCurrentData();
    this.getExtraData();
  }

  updateVehicle = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/c/vehicles/' + this.props.match.params.vehicleId,
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        color: this.state.color,
        status: this.state.status,
        company: this.state.company,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem('message', lang.citizen.vehicle.updated_veh);
          window.location = '/citizen';
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      plate,
      color,
      status,
      company,
      statuses,
      companies,
      loading,
    } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <form className='container text-light' onSubmit={this.updateVehicle}>
        <div className='form-group'>
          <label htmlFor='plate'>{lang.citizen.vehicle.enter_plate}</label>
          <input
            type='text'
            value={plate}
            disabled
            title='You are not able to edit the plate'
            className='form-control text-light bg-dark border-dark'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='plate'>{lang.citizen.vehicle.enter_color}</label>
          <input
            type='text'
            value={color}
            name='color'
            onChange={this.onChange}
            className='form-control text-light bg-dark border-dark'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='plate'>{lang.citizen.vehicle.select_status}</label>
          <input
            type='text'
            list='statuses'
            value={status}
            onChange={this.onChange}
            name='status'
            id='insuranceStatus'
            className='form-control bg-dark border-dark text-light'
          />
          <datalist id='statuses'>
            {!statuses[0]
              ? ''
              : statuses.map((status, index) => {
                  return (
                    <option key={index} value={status.status}>
                      {status.status}
                    </option>
                  );
                })}
          </datalist>
        </div>

        <div className='form-group'>
          <label htmlFor='company'>{lang.citizen.vehicle.enter_company}</label>
          <input
            disabled={
              status.toLowerCase() !== 'Company'.toLowerCase() ? true : false
            }
            value={
              status.toLowerCase() !== 'Company'.toLowerCase() ? '' : company
            }
            onChange={this.onChange}
            name='company'
            id='company'
            list='companies'
            className='form-control bg-dark border-dark text-light'
          />
          <datalist id='companies'>
            {!companies[0]
              ? ''
              : companies.map((company, index) => {
                  return (
                    <option key={index} value={company.business_name}>
                      {company.business_name}
                    </option>
                  );
                })}
          </datalist>
        </div>
        <div className='form-group float-right'>
          <a href={'/citizen'} className='btn btn-danger'>
            {lang.global.cancel}
          </a>
          <button className='btn btn-primary ml-2' type='submit'>
            {lang.global.update}
          </button>
        </div>
      </form>
    );
  }
}

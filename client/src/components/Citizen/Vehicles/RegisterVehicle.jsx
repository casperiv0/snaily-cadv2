import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../Partials/LoadingArea';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';
import lang from '../../../language.json';

export default class RegisterVehicle extends Component {
  constructor() {
    super();

    this.state = {
      owners: [],
      companies: [],
      statuses: [],
      plate: '',
      color: '',
      vehicle: '',
      owner: '',
      insuranceStatus: '',
      company: '',
      error: '',
      nonDefaultVehicles: [],
      defaultVehicles: [],
      loading: true,
    };
  }

  register = (e) => {
    e.preventDefault();
    const {
      plate,
      color,
      vehicle,
      owner,
      insuranceStatus,
      company,
    } = this.state;
    Axios({
      url: backendURL + '/c/vehicles/register',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        plate: plate.toUpperCase(),
        owner,
        vehicle,
        status: insuranceStatus,
        color,
        company,
      },
    }).then((res) => {
      if (res.data.msg === 'Registered') {
        sessionStorage.setItem('message', lang.citizen.vehicle.added_veh);
        return (window.location = '/citizen');
      }

      this.setState({
        error: res.data.msg,
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getAllData = () => {
    //   Get all citizens linked to account
    Axios({
      url: backendURL + '/citizen',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.citizens) {
        this.setState({
          owners: res.data.citizens,
        });
      } else {
        console.log(res.data.msg);
      }
    });

    // Get Companies
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
          });
        }
      })
      .catch((err) => console.log(err));

    // Get all vehicles
    Axios({
      url: backendURL + '/admin/vehicles',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.defaultVehicles) {
          this.setState({
            defaultVehicles: res.data.defaultVehicles,
            nonDefaultVehicles: res.data.nonDefaultVehicles,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    document.title = 'Register A Vehicle';
    this.getAllData();
  }

  render() {
    const {
      plate,
      color,
      vehicle,
      owner,
      insuranceStatus,
      company,
      owners,
      statuses,
      error,
      companies,
      nonDefaultVehicles,
      defaultVehicles,
      loading,
    } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <form className='container text-light' onSubmit={this.register}>
        {error ? <ErrorMessage message={error} dismiss /> : null}

        <div className='form-row mt-4'>
          {/* Plate */}
          <div className='form-group col-md-4'>
            <label htmlFor='plate'>{lang.citizen.vehicle.enter_plate}</label>
            <input
              value={plate.toUpperCase()}
              onChange={this.handleChange}
              name='plate'
              id='plate'
              className='form-control bg-dark border-dark text-light'
              maxLength='8'
              minLength='1'
            />
          </div>

          {/* Color */}
          <div className='form-group col-md-4'>
            <label htmlFor='color'>{lang.citizen.vehicle.enter_color}</label>
            <input
              value={color}
              onChange={this.handleChange}
              name='color'
              id='color'
              className='form-control bg-dark border-dark text-light'
            />
          </div>

          {/* Vehicle */}
          <div className='form-group col-md-4'>
            <label htmlFor='vehicle'>
              {lang.citizen.vehicle.enter_vehicle}
            </label>
            <input
              value={vehicle}
              onChange={this.handleChange}
              name='vehicle'
              id='vehicle'
              className='form-control bg-dark border-dark text-light'
              list='vehiclesList'
            />
            <datalist id='vehiclesList'>
              {!nonDefaultVehicles[0]
                ? ''
                : nonDefaultVehicles.map((vehicle, index) => {
                    return (
                      <option key={index} value={vehicle.cname}>
                        {vehicle.cname}
                      </option>
                    );
                  })}
              {!defaultVehicles[0]
                ? ''
                : defaultVehicles.map((vehicle, index) => {
                    return (
                      <option key={index} value={vehicle.cname}>
                        {vehicle.cname}
                      </option>
                    );
                  })}
            </datalist>
          </div>

          {/* Owner */}
          <div className='form-group col-md-4'>
            <label htmlFor='owner'>{lang.citizen.vehicle.select_owner}</label>
            <input
              type='text'
              list='owners'
              value={owner}
              onChange={this.handleChange}
              name='owner'
              id='owner'
              className='form-control bg-dark border-dark text-light'
            />
            <datalist id='owners'>
              {!owners[0] ? (
                <option value={lang.citizen.no_owners}>
                  {lang.citizen.no_owners}
                </option>
              ) : (
                owners.map((owner, index) => {
                  return (
                    <option key={index} value={owner.full_name}>
                      {owner.full_name}
                    </option>
                  );
                })
              )}
            </datalist>
          </div>

          {/* In Status */}
          <div className='form-group col-md-4'>
            <label htmlFor='insuranceStatus'>
              {lang.citizen.vehicle.select_status}
            </label>
            <input
              type='text'
              list='statuses'
              value={insuranceStatus}
              onChange={this.handleChange}
              name='insuranceStatus'
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

          {/* Company */}
          <div className='form-group col-md-4'>
            <label htmlFor='company'>
              {lang.citizen.vehicle.enter_company}
            </label>
            <input
              disabled={
                insuranceStatus.toLowerCase() !== 'Company'.toLowerCase()
                  ? true
                  : false
              }
              value={company}
              onChange={this.handleChange}
              name='company'
              id='company'
              list='companies'
              className='form-control bg-dark border-dark text-light'
            />
            <small>{lang.citizen.vehicle.company_small}</small>
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
        </div>
        <div className='form-group float-right'>
          <a href='/citizen' className='btn btn-danger'>
            {lang.global.cancel}
          </a>
          <button onClick={this.register} className='ml-2 btn btn-primary'>
            {lang.citizen.vehicle.reg_vehicle}
          </button>
        </div>
      </form>
    );
  }
}

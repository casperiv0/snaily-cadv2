import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../Partials/Messages/ErrorMessage';

export default class AddCitizen extends Component {
  constructor() {
    super();

    this.state = {
      error: '',
      genders: [],
      ethnicities: [],
      statuses: [],
      fullName: '',
      birth: '',
      ethnicity: '',
      gender: '',
      hairColor: '',
      eyeColor: '',
      address: '',
      height: '',
      weight: '',
      dmv: '',
      pilotLicense: '',
      firearmsLicenses: '',
      ccw: '',
    };
  }

  componentDidMount() {
    // Set the title
    document.title = 'Create a new citizen';

    // Get all the data
    this.getGenders();
    this.getEthnicities();
    this.getStatuses();
  }

  getGenders = () => {
    axios({
      url: backendURL + '/admin/genders',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        genders: res.data.genders,
      });
    });
  };

  getEthnicities = () => {
    axios({
      url: backendURL + '/admin/ethnicities',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        ethnicities: res.data.ethnicities,
      });
    });
  };

  getStatuses = () => {
    axios({
      url: backendURL + '/admin/legal-statuses/',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      console.log(res.data.in_statuses);

      this.setState({
        statuses: res.data.in_statuses,
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createCitizen = (event) => {
    event.preventDefault();
    axios({
      url: backendURL + '/citizen/add',
      method: "POST",
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        fullName: this.state.fullName,
        birth: this.state.birth,
        gender: this.state.gender,
        ethnicity: this.state.ethnicity,
        hairColor: this.state.hairColor,
        eyeColor: this.state.eyeColor,
        address: this.state.address,
        height: this.state.height,
        weight: this.state.weight,
        dmv: this.state.dmv,
        fireLicense: this.state.firearmsLicenses,
        pilotLicense: this.state.pilotLicense,
        ccw: this.state.ccw,
      },
    }).then((res) => {
      if (res.data.msg === 'Citizen Created') {
        sessionStorage.setItem(
          'message',
          'Successfully Created ' + this.state.fullName
        );
        return window.location = '/citizen';
      }

      this.setState({
        error: res.data.msg
      });
    })
    .catch(err => console.log(err));
  };

  render() {
    const {
      fullName,
      birth,
      ethnicity,
      gender,
      genders,
      ethnicities,
      error,
      hairColor,
      eyeColor,
      address,
      height,
      weight,
      statuses,
      dmv,
      pilotLicense,
      firearmsLicense,
      ccw,
    } = this.state;
    return (
      <div className='container text-light'>
        {error ? <ErrorMessage message={error} /> : null}

        <form onSubmit={this.createCitizen}>
          {/* Full Name */}
          <div className='form-group'>
            <label htmlFor='fullName'>Enter Full Name</label>
            <input
              value={fullName}
              onChange={this.handleChange}
              name='fullName'
              id='fullName'
              className='form-control bg-secondary bg-secondary text-light'
            />
          </div>

          {/* Date of Birth */}
          <div className='form-group'>
            <label htmlFor='fullName'>Enter Date of Birth</label>
            <input
              value={birth}
              onChange={this.handleChange}
              name='birth'
              id='birth'
              className='form-control bg-secondary bg-secondary text-light'
            />
          </div>

          {/* Ethnicity */}
          <div className='form-group'>
            <label htmlFor='fullName'>Enter Ethnicity</label>
            <select
              name='ethnicity'
              value={ethnicity}
              className='form-control bg-secondary bg-secondary text-light'
              onChange={this.handleChange}>
              <option defaultChecked>Select Ethnicity..</option>
              {ethnicities.map((ethnicity, index) => (
                <option key={index} value={ethnicity.name}>
                  {ethnicity.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div className='form-group'>
            <label htmlFor='gender'>Enter Gender</label>
            <select
              name='gender'
              id='gender'
              className='form-control bg-secondary bg-secondary text-light'
              value={gender}
              onChange={this.handleChange}>
              <option defaultChecked>Select Gender..</option>
              {genders.map((gender, index) => (
                <option key={index} value={gender.name}>
                  {gender.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hair Color */}
          <div className='form-group'>
            <label htmlFor='hairColor'>Enter Hair Color</label>
            <input
              value={hairColor}
              name='hairColor'
              id='hairColor'
              className='form-control bg-secondary bg-secondary text-light'
              onChange={this.handleChange}
            />
          </div>

          {/* Eyes Color */}
          <div className='form-group'>
            <label htmlFor='eyeColor'>Enter Eye Color</label>
            <input
              value={eyeColor}
              name='eyeColor'
              id='eyeColor'
              className='form-control bg-secondary bg-secondary text-light'
              onChange={this.handleChange}
            />
          </div>

          {/* Address */}
          <div className='form-group'>
            <label htmlFor='address'>Enter Address</label>
            <input
              value={address}
              name='address'
              id='address'
              className='form-control bg-secondary bg-secondary text-light'
              onChange={this.handleChange}
            />
          </div>

          {/* Height */}
          <div className='form-group'>
            <label htmlFor='height'>Enter Height</label>
            <input
              value={height}
              name='height'
              id='height'
              className='form-control bg-secondary bg-secondary text-light'
              onChange={this.handleChange}
            />
          </div>

          {/* Weight */}
          <div className='form-group'>
            <label htmlFor='weight'>Enter Weight</label>
            <input
              value={weight}
              name='weight'
              id='weight'
              className='form-control bg-secondary bg-secondary text-light'
              onChange={this.handleChange}
            />
          </div>

          <h1 className='border-bottom'>Licenses</h1>

          <div className='form-row'>
            {/* DMV */}
            <div className='form-group col-md-3'>
              <label htmlFor='dmv'>Enter Drivers License</label>
              <select
                name='dmv'
                id='dmv'
                className='form-control bg-secondary bg-secondary text-light'
                value={dmv}
                onChange={this.handleChange}>
                <option defaultChecked>Select Licenses Status..</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>

            {/* Firearms License */}
            <div className='form-group col-md-3'>
              <label htmlFor='dmv'>Enter Firearms License</label>
              <select
                name='firearmsLicense'
                id='firearmsLicense'
                className='form-control bg-secondary bg-secondary text-light'
                value={firearmsLicense}
                onChange={this.handleChange}>
                <option defaultChecked>Select Licenses Status..</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>

            {/* Pilots License */}
            <div className='form-group col-md-3'>
              <label htmlFor='dmv'>Enter Pilots License</label>
              <select
                name='pilotLicense'
                id='pilotLicense'
                className='form-control bg-secondary bg-secondary text-light'
                value={pilotLicense}
                onChange={this.handleChange}>
                <option defaultChecked>Select Licenses Status..</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>

            {/* CCW  */}
            <div className='form-group col-md-3'>
              <label htmlFor='dmv'>Enter CCW</label>
              <select
                name='ccw'
                id='ccw'
                className='form-control bg-secondary bg-secondary text-light'
                value={ccw}
                onChange={this.handleChange}>
                <option defaultChecked>Select Licenses Status..</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='form-group float-right'>
            <a className='btn btn-danger mr-2' href='/citizen'>
              Cancel
            </a>
            <button className='btn btn-primary' type='submit'>
              Create Citizen
            </button>
          </div>
        </form>
      </div>
    );
  }
}

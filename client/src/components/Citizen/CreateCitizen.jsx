import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../Partials/Messages/ErrorMessage';
import lang from '../../language.json';

export default class CreateCitizen extends Component {
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
      firearmsLicense: '',
      ccw: '',
      image: '',
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
      this.setState({
        statuses: res.data.statuses,
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
    const url = `${backendURL}/citizen/add`;

    const fd = new FormData();
    if (this.state.image) {
      fd.append('image', this.state.image, this.state.image.name);
    }
    fd.append('fullName', this.state.fullName);
    fd.append('birth', this.state.birth);
    fd.append('gender', this.state.gender);
    fd.append('ethnicity', this.state.ethnicity);
    fd.append('hairColor', this.state.hairColor);
    fd.append('eyeColor', this.state.eyeColor);
    fd.append('address', this.state.address);
    fd.append('height', this.state.height);
    fd.append('weight', this.state.weight);
    fd.append('dmv', this.state.dmv);
    fd.append('fireLicense', this.state.firearmsLicense);
    fd.append('pilotLicense', this.state.pilotLicense);
    fd.append('ccw', this.state.ccw);

    axios
      .post(url, fd, {
        headers: {
          'x-auth-snailycad-token': Cookies.get('__session'),
        },
      })
      .then((res) => {
        if (res.data.msg === 'Citizen Created') {
          sessionStorage.setItem(
            'message',
            `${lang.citizen.created} ${this.state.fullName}`
          );
          return (window.location = '/citizen');
        }

        this.setState({
          error: res.data.msg,
        });
      })
      .catch((err) => console.log(err));
  };

  handleFileChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
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
          {/* Picture */}
          <div className='form-group'>
            <label htmlFor='image'>{lang.global.image}</label>
            <input
              type='file'
              onChange={this.handleFileChange}
              name='image'
              id='image'
              className='form-control-file text-light'
            />
          </div>

          {/* Full Name */}
          <div className='form-group'>
            <label htmlFor='fullName'>{lang.record.enter_full_name}</label>
            <input
              value={fullName}
              onChange={this.handleChange}
              name='fullName'
              id='fullName'
              className='form-control bg-dark border-dark text-light'
            />
          </div>

          {/* Date of Birth */}
          <div className='form-group'>
            <label htmlFor='fullName'>{lang.citizen.date_of_birth}</label>
            <input
              value={birth}
              onChange={this.handleChange}
              name='birth'
              id='birth'
              className='form-control bg-dark border-dark text-light'
            />
          </div>

          {/* Ethnicity */}
          <div className='form-group'>
            <label htmlFor='fullName'>{lang.citizen.ethnicity}</label>
            <select
              name='ethnicity'
              value={ethnicity}
              className='form-control bg-dark border-dark text-light'
              onChange={this.handleChange}>
              <option defaultChecked>{lang.citizen.select_ethnicity}</option>
              <option disabled>--------</option>
              {ethnicities.map((ethnicity, index) => (
                <option key={index} value={ethnicity.name}>
                  {ethnicity.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div className='form-group'>
            <label htmlFor='gender'>{lang.citizen.gender}</label>
            <select
              name='gender'
              id='gender'
              className='form-control bg-dark border-dark text-light'
              value={gender}
              onChange={this.handleChange}>
              <option defaultChecked>{lang.citizen.select_gender}</option>
              <option disabled>--------</option>

              {genders.map((gender, index) => (
                <option key={index} value={gender.name}>
                  {gender.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hair Color */}
          <div className='form-group'>
            <label htmlFor='hairColor'>{lang.citizen.hair_color}</label>
            <input
              value={hairColor}
              name='hairColor'
              id='hairColor'
              className='form-control bg-dark border-dark text-light'
              onChange={this.handleChange}
            />
          </div>

          {/* Eyes Color */}
          <div className='form-group'>
            <label htmlFor='eyeColor'>{lang.citizen.eye_color}</label>
            <input
              value={eyeColor}
              name='eyeColor'
              id='eyeColor'
              className='form-control bg-dark border-dark text-light'
              onChange={this.handleChange}
            />
          </div>

          {/* Address */}
          <div className='form-group'>
            <label htmlFor='address'>{lang.citizen.address}</label>
            <input
              value={address}
              name='address'
              id='address'
              className='form-control bg-dark border-dark text-light'
              onChange={this.handleChange}
            />
          </div>

          {/* Height */}
          <div className='form-group'>
            <label htmlFor='height'>{lang.citizen.height}</label>
            <input
              value={height}
              name='height'
              id='height'
              className='form-control bg-dark border-dark text-light'
              onChange={this.handleChange}
            />
          </div>

          {/* Weight */}
          <div className='form-group'>
            <label htmlFor='weight'>{lang.citizen.weight}</label>
            <input
              value={weight}
              name='weight'
              id='weight'
              className='form-control bg-dark border-dark text-light'
              onChange={this.handleChange}
            />
          </div>

          <h1 className='border-bottom'>{lang.citizen.licenses}</h1>

          <div className='form-row'>
            {/* DMV */}
            <div className='form-group col-md-3'>
              <label htmlFor='dmv'>{lang.citizen.drivers_license}</label>
              <select
                name='dmv'
                id='dmv'
                className='form-control bg-dark border-dark text-light'
                value={dmv}
                onChange={this.handleChange}>
                <option defaultChecked>{lang.citizen.select_license}</option>
                <option disabled>--------</option>
                {!statuses[0]
                  ? ''
                  : statuses.map((status, index) => (
                      <option key={index} value={status.status}>
                        {status.status}
                      </option>
                    ))}
              </select>
            </div>

            {/* Firearms License */}
            <div className='form-group col-md-3'>
              <label htmlFor='dmv'>{lang.citizen.firearms_license}</label>
              <select
                name='firearmsLicense'
                id='firearmsLicense'
                className='form-control bg-dark border-dark text-light'
                value={firearmsLicense}
                onChange={this.handleChange}>
                <option defaultChecked>{lang.citizen.select_license}</option>
                <option disabled>--------</option>

                {statuses.map((status, index) => (
                  <option key={index} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>

            {/* Pilots License */}
            <div className='form-group col-md-3'>
              <label htmlFor='dmv'>{lang.citizen.pilot_license}</label>
              <select
                name='pilotLicense'
                id='pilotLicense'
                className='form-control bg-dark border-dark text-light'
                value={pilotLicense}
                onChange={this.handleChange}>
                <option defaultChecked>{lang.citizen.select_license}</option>
                <option disabled>--------</option>

                {statuses.map((status, index) => (
                  <option key={index} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>

            {/* CCW  */}
            <div className='form-group col-md-3'>
              <label htmlFor='dmv'>{lang.citizen.ccw}</label>
              <select
                name='ccw'
                id='ccw'
                className='form-control bg-dark border-dark text-light'
                value={ccw}
                onChange={this.handleChange}>
                <option defaultChecked>{lang.citizen.select_license}</option>
                <option disabled>--------</option>
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
              {lang.global.cancel}
            </a>
            <button className='btn btn-primary' type='submit'>
              {lang.citizen.create_citizen}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

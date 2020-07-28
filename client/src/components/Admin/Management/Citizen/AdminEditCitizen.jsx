import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import lang from '../../../../language.json';

export default class AdminEditCitizen extends Component {
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
    };
  }

  getData = () => {
    const id = this.props.match.params.id;
    axios({
      url: backendURL + '/admin/citizens/edit/' + id,
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.citizen) {
          const citizen = res.data.citizen[0];
          this.setState({
            citizenId: citizen.id,
            address: citizen.address,
            birth: citizen.birth,
            employer: citizen.business,
            ccw: citizen.ccw,
            picture: citizen.citizen_picture,
            dmv: citizen.dmv,
            ethnicity: citizen.ethnicity,
            eyeColor: citizen.eye_color,
            firearmsLicense: citizen.fire_license,
            fullName: citizen.full_name,
            gender: citizen.gender,
            hairColor: citizen.hair_color,
            height: citizen.height,
            pilotLicense: citizen.pilot_license,
            weight: citizen.weight,
          });

          // Set the title
          document.title = 'Editing: ' + citizen.full_name;

          this.setState({
            genders: res.data.genders,
            ethnicities: res.data.ethnicities,
          });
        }

        this.setState({
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // Get all the data
    this.getData();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateCitizen = (event) => {
    const id = this.props.match.params.id;

    event.preventDefault();
    axios({
      url: backendURL + '/admin/citizens/edit/' + id,
      method: 'PUT',
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
      },
    })
      .then((res) => {
        if (res.data.msg === 'Updated Citizen') {
          sessionStorage.setItem(
            'admin-message',
            `${lang.citizen.update_success} ${this.state.fullName}`
          );
          return (window.location = '/admin/manage/citizens');
        }

        this.setState({
          error: res.data.msg,
        });
      })
      .catch((err) => console.log(err));
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
    } = this.state;
    return (
      <div className='container col text-light'>
        {error ? <ErrorMessage message={error} /> : null}

        <form onSubmit={this.updateCitizen}>
          {/* Full Name */}
          <div className='form-group'>
            <label htmlFor='fullName'>{lang.citizen.full_name}</label>
            <input
              disabled
              value={fullName}
              className='form-control bg-dark border-dark text-light'
              title='At this moment you are unable to change your name.'
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
              <option defaultChecked>{ethnicity}</option>
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
              <option defaultChecked> {gender} </option>
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

          <div className='form-group float-right'>
            <a className='btn btn-danger mr-2' href='/admin/manage/citizens'>
              {lang.global.cancel}
            </a>
            <button className='btn btn-primary' type='submit'>
              {lang.citizen.update_citizen}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

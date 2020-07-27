import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../Partials/Messages/ErrorMessage';
import LoadingArea from '../Partials/LoadingArea';
import lang from '../../language.json';

export default class PlateSearchModal extends Component {
  constructor() {
    super();

    this.state = {
      plate: '',
      plateResults: [],
      plateNotFound: false,
      loading: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
      plateNotFound: false,
      plateResults: [],
    });

    Axios({
      url: backendURL + '/officers/search/plate/' + this.state.plate,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.plate) {
        this.setState({
          plateResults: res.data.plate[0],
          plateNotFound: false,
          loading: false,
        });
      } else {
        this.setState({
          plateResults: [],
          plateNotFound: true,
          loading: false,
        });
      }
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  render() {
    const { plate, plateResults, plateNotFound, loading } = this.state;
    return (
      <div
        className='modal fade'
        id='plateSearchModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                {lang.global.plate_search}
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='plate'>{lang.global.plate}</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='plate'
                    id='plate'
                    value={plate}
                    maxLength='8'
                    required
                    onChange={this.onChange}
                  />
                </div>
                {/* results */}
                {loading ? <LoadingArea /> : null}
                {plateNotFound ? (
                  <ErrorMessage message={lang.record.no_plate} />
                ) : null}
                {!plateResults.plate ? null : (
                  <div className=' mt-3'>
                    <span className='font-weight-bold'>{lang.global.plate}: </span>{' '}
                    {plateResults.plate.toUpperCase()} <br />
                    <span className='font-weight-bold'>{lang.global.vehicle}: </span>{' '}
                    {plateResults.vehicle} <br />
                    <span className='font-weight-bold'>{lang.record.owner}: </span>{' '}
                    {plateResults.owner} <br />
                    <span className='font-weight-bold'>{lang.record.vin_number}: </span>{' '}
                    {plateResults.vin_number} <br />
                    <span className='font-weight-bold'>{lang.global.color}: </span>{' '}
                    {plateResults.color} <br />
                    <span className='font-weight-bold'>{lang.citizen.vehicle.status}: </span>
                    {plateResults.in_status} <br />
                    <span className='font-weight-bold'>{lang.citizen.weapon.company}: </span>{' '}
                    {plateResults.company} <br />
                  </div>
                )}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  {lang.global.close}
                </button>
                <button type='submit' className='btn btn-primary'>
                  {lang.global.search}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

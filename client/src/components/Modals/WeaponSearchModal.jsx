import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../Partials/Messages/ErrorMessage';
import lang from '../../language.json';

export default class WeaponSearchModal extends Component {
  constructor() {
    super();

    this.state = {
      serialNumber: '',
      results: [],
      notFound: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/officers/search/weapon/' + this.state.serialNumber,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.weapon) {
        this.setState({
          results: res.data.weapon[0],
          notFound: false,
        });
      } else {
        this.setState({
          results: [],
          notFound: true,
        });
      }
    });
  };

  render() {
    const { serialNumber, results, notFound } = this.state;
    return (
      <div
        className='modal fade'
        id='weaponSearchModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='weaponSearchModal'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='weaponSearchModal'>
                {lang.global.weapon_search}
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
                  <label htmlFor='weapon'>
                    {lang.citizen.weapon.serial_number}
                  </label>
                  <input
                    required
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='serialNumber'
                    id='serialNumber'
                    value={serialNumber}
                    onChange={this.onChange}
                  />
                </div>

                {/* Results */}
                {notFound ? (
                  <ErrorMessage message={lang.record.no_weapon} />
                ) : null}
                {!results.weapon ? null : (
                  <div className='mt-3'>
                    <span className='font-weight-bold'>{lang.global.weapon}: </span>
                    {results.weapon} <br />
                    <span className='font-weight-bold'>{lang.record.owner}: </span>
                    {results.owner} <br />
                    <span className='font-weight-bold'>{lang.citizen.weapon.serial_number}: </span>
                    {results.serial_number} <br />
                    <span className='font-weight-bold'>{lang.citizen.weapon.status}: </span>
                    {results.status} <br />
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

import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../Partials/Messages/ErrorMessage';
import lang from '../../language.json';

export default class AddressSearchModal extends Component {
  constructor() {
    super();

    this.state = {
      address: '',
      addresses: [],
      noneFound: false,
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
      url: backendURL + '/dispatch/address-search',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        address: this.state.address,
      },
    }).then((res) => {
      if (!res.data.citizens[0]) {
        this.setState({
          noneFound: true,
          addresses: [],
        });
      } else {
        this.setState({
          noneFound: false,
          addresses: res.data.citizens,
        });
      }
    });
  };

  render() {
    const { address, addresses, noneFound } = this.state;
    return (
      <div
        className='modal fade'
        id='addressSearchModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                {lang.global.address_search}
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
                  <label htmlFor='address'>{lang.dispatch.enter_address}</label>
                  <input
                    required
                    type='text'
                    name='address'
                    id='address'
                    value={address}
                    onChange={this.onChange}
                    className='form-control bg-secondary border-secondary text-light'
                  />
                </div>
                <div className='list-group'>
                  {noneFound ? (
                    <ErrorMessage message={lang.dispatch.add_not_found} />
                  ) : null}
                  {!addresses[0] ? (
                    <p></p>
                  ) : (
                    addresses.map((address, index) => {
                      return (
                        <li
                          key={index}
                          className='list-group-item bg-secondary border-dark d-flex justify-content-between'>
                          <div>
                            {address.address} |{' '}
                            <span className='font-weight-bold'>
                              {lang.record.owner}:{' '}
                            </span>{' '}
                            {address.full_name}
                          </div>
                        </li>
                      );
                    })
                  )}
                </div>
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

import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';
import lang from "../../../language.json"

export default class RegisterWeapon extends Component {
  constructor() {
    super();

    this.state = {
      owners: [],
      statuses: [],
      weapons: [],
      defaultWeapons: '',
      nonDefaultWeapons: '',
      owner: '',
      weaponStatus: '',
      error: '',
    };
  }

  register = (e) => {
    e.preventDefault();
    const { weapon, weaponStatus, owner } = this.state;
    Axios({
      url: backendURL + '/c/weapons/register',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        weapon,
        status: weaponStatus,
        owner,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Registered') {
          sessionStorage.setItem('message', lang.citizen.weapon.added_weapon);
          return (window.location = '/citizen');
        }

        this.setState({
          error: res.data.msg,
        });
      })
      .catch((err) => console.log(err));
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

    //   Get all weapons
    Axios({
      url: backendURL + '/admin/weapons',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          nonDefaultWeapons: res.data.nonDefaultWeapons,
          defaultWeapons: res.data.defaultWeapons,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    document.title = 'Register A Weapon';
    this.getAllData();
  }

  render() {
    const {
      defaultWeapons,
      nonDefaultWeapons,
      weaponStatus,
      owner,
      error,
      statuses,
      owners,
      weapon,
    } = this.state;

    return (
      <form className='container text-light' onSubmit={this.register}>
        {error ? <ErrorMessage message={error} dismiss /> : null}

        <div className='form-row mt-4'>
          {/* Weapon */}
          <div className='form-group col-md-4'>
            <label htmlFor='weapon'>{lang.citizen.weapon.enter_weapon}</label>
            <input
              value={weapon}
              onChange={this.handleChange}
              name='weapon'
              id='weapon'
              list='weapons'
              className='form-control bg-dark border-dark text-light'
            />
            <datalist id='weapons'>
              {!nonDefaultWeapons[0]
                ? ''
                : nonDefaultWeapons.map((weapon, index) => {
                    return (
                      <option key={index} value={weapon.name}>
                        {weapon.name}
                      </option>
                    );
                  })}
              {!defaultWeapons[0]
                ? ''
                : defaultWeapons.map((weapon, index) => {
                    return (
                      <option key={index} value={weapon.name}>
                        {weapon.name}
                      </option>
                    );
                  })}
            </datalist>
          </div>

          {/* Owner */}
          <div className='form-group col-md-4'>
            <label htmlFor='owner'>{lang.citizen.weapon.enter_owner}</label>
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
                <option value={lang.citizen.no_owners}>{lang.citizen.no_owners}</option>
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
            <label htmlFor='weaponStatus'>{lang.citizen.weapon.status}</label>
            <input
              type='text'
              list='statuses'
              value={weaponStatus}
              onChange={this.handleChange}
              name='weaponStatus'
              id='weaponStatus'
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
        </div>
        <div className='form-group float-right'>
          <a href='/citizen' className='btn btn-danger'>
            Cancel
          </a>
          <button onClick={this.register} className='ml-2 btn btn-primary'>
            Register Weapon
          </button>
        </div>
      </form>
    );
  }
}

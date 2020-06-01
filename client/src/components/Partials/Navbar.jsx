import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import { getSession, logOut } from '../Auth/getSession';
import { Avatar } from '@material-ui/core';

export default class NavigationBar extends Component {
  constructor() {
    super();

    this.state = {
      rank: '',
      cadName: '',
      loading: true,
    };
  }

  getRank = () => {
    Axios({
      url: backendURL + '/auth/user',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.user) {
        let rank = getSession() ? res.data.user[0].rank : 'No Rank';
        this.setState({
          rank: rank,
        });
      }
    });
  };

  getCadName = () => {
    Axios({
      url: backendURL + '/auth/cad-info',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.cadInfo) {
        this.setState({
          cadName: res.data.cadInfo[0].cad_name,
        });
      }

      this.setState({
        loading: false
      })
    });
  };

  componentDidMount() {
    this.getRank();
    this.getCadName();
  }

  render() {
    const { rank, cadName, loading } = this.state;
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-secondary sticky-top'>
        <a className='navbar-brand' href='/'>
          {loading ? null : cadName ? cadName : 'Home'}
        </a>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='/leo/dash'>
                Police Dept{' '}
                <img
                  style={{ maxHeight: '20px' }}
                  src='/icons/internal/Police_Dept.png'
                  alt='leo'
                />
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/dispatch'>
                Dispatch{' '}
                <img
                  style={{ maxHeight: '20px' }}
                  src='/icons/internal/Dispatch.png'
                  alt='dispatch'
                />
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/ems-fd'>
                EMS/FD{' '}
                <img
                  style={{ maxHeight: '20px' }}
                  src='/icons/internal/fire.png'
                  alt='ems/fd'
                />
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/citizen'>
                Citizen{' '}
                <img
                  style={{ maxHeight: '20px' }}
                  src='/icons/internal/citizen.png'
                  alt='citizen'
                />
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/tow'>
                Tow{' '}
                <img
                  style={{ maxHeight: '20px' }}
                  src='/icons/internal/tow.png'
                  alt='tow'
                />
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/bleeter'>
                Bleeter{' '}
                <img
                  style={{ maxHeight: '20px' }}
                  src='/icons/internal/bleeter.png'
                  alt='bleeter'
                />
              </a>
            </li>
            {rank === 'moderator' || rank === 'admin' || rank === 'owner' ? (
              <li className='nav-item'>
                <a className='nav-link' href='/admin'>
                  Admin{' '}
                  <img
                    style={{ maxHeight: '20px' }}
                    src='/icons/internal/gear.png'
                    alt='admin'
                  />
                </a>
              </li>
            ) : null}
          </ul>
          <ul className='nav navbar-nav' style={{ float: 'right' }}>
            <li className='nav-item'>
              <div className='dropdown'>
                <button
                  className='btn btn-secondary '
                  type='button'
                  id='dropdownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  <Avatar src='/citizen-pictures/default.svg' />
                </button>
                <div
                  className='dropdown-menu dropdown-menu-right bg-dark border-dark'
                  aria-labelledby='dropdownMenuButton'>
                  <a
                    className='dropdown-item bg-dark border-secondary text-light'
                    href='/account'>
                    Account
                  </a>
                  <div className='dropdown-divider bg-dark border-secondary'></div>
                  <button
                    onClick={logOut}
                    className='dropdown-item bg-dark border-secondary text-light'>
                    Logout
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

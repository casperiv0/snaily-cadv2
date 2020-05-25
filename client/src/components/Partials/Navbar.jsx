import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';

export default class NavigationBar extends Component {
  constructor() {
    super();

    this.state = {
      rank: '',
    };
  }

  getRank = () => {
    Axios({
      url: backendURL + '/auth/user',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.user[0]) {
        this.setState({
          rank: res.data.user[0].rank,
        });
      }
    });
  };

  componentDidMount() {
    this.getRank();
  }

  render() {
    const { rank } = this.state;
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-secondary sticky-top'>
        <a className='navbar-brand' href='/'>
          SnailyCAD
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
              <a className='nav-link' href='/officers/dash'>
                Police Dept
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/dispatch'>
                Dispatch
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/ems-fd'>
                EMS/FD
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/citizen'>
                Citizen
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/tow'>
                Tow
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/bleeter'>
                Bleeter
              </a>
            </li>
            {rank === 'moderator' || rank === 'admin' || rank === 'owner' ? (
              <li className='nav-item'>
                <a className='nav-link' href='/admin'>
                  Admin
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    );
  }
}

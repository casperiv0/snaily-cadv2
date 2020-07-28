import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import SuccessMessage from '../../../Partials/Messages/SuccessMessage';
import lang from '../../../../language.json';

export default class Weapons extends Component {
  constructor() {
    super();
    this.state = {
      weapons: [],
      message: sessionStorage.getItem('admin-message'),
    };
  }

  getWeapons = () => {
    Axios({
      url: backendURL + '/admin/weapons',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.weapons) {
          this.setState({
            weapons: res.data.weapons,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteWeapon = (id) => {
    Axios({
      url: backendURL + '/admin/weapons/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.setItem(
            'admin-message',
            lang.admin.values.weapon.delete_wea
          );
          return (window.location = '/admin/weapons');
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getWeapons();
    document.title = 'Weapons - Admin';
  }

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  render() {
    const { weapons, message } = this.state;

    return (
      <div className='container text-light col-md-9'>
        {message ? <SuccessMessage dismiss message={message} /> : null}
        <h3>
          {lang.admin.values.weapon.manage_wea} -{' '}
          <a href='/admin/weapons/add'>+</a>
        </h3>

        <ul className='list-group mt-3'>
          {!weapons[0] ? (
            <ErrorMessage message={lang.admin.values.weapon.no_wea} />
          ) : (
            weapons.map((weapon, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item text-light bg-dark border-secondary'>
                  {++index} | {weapon.name}
                  <div className='float-right'>
                    <a
                      href={'/admin/weapons/edit/' + weapon.id}
                      className='btn btn-success mr-2'>
                      {lang.global.edit}
                    </a>
                    <button
                      onClick={() => {
                        this.deleteWeapon(weapon.id);
                      }}
                      className='btn btn-danger'>
                      {lang.global.delete}
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}

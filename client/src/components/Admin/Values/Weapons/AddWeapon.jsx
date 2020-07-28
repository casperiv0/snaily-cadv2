import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import lang from '../../../../language.json';

export default class AddWeapon extends Component {
  constructor() {
    super();

    this.state = {
      weapon: '',
      error: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/admin/weapons/add',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        weapon: this.state.weapon,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Added') {
          sessionStorage.setItem(
            'admin-message',
            lang.admin.values.weapon.added_wea
          );
          return (window.location = '/admin/weapons');
        }

        this.setState({
          error: res.data.msg,
        });
      })
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    document.title = 'Add Weapon - Admin';
  }

  render() {
    const { weapon, error } = this.state;
    return (
      <form className='col-md-9 container text-light' onSubmit={this.onSubmit}>
        {error ? <ErrorMessage message={error} /> : null}

        <div className='form-group'>
          <label htmlFor='vehicle'>{lang.admin.values.weapon.enter_name}</label>
          <input
            type='text'
            name='weapon'
            id='weapon'
            className='form-control bg-dark border-dark text-light'
            value={weapon}
            onChange={this.onChange}
          />
        </div>
        <div className='form-group float-right'>
          <a href='/admin/weapons' className='btn btn-danger'>
            {lang.global.cancel}
          </a>
          <button className='btn btn-primary ml-2' type='submit'>
            {lang.admin.values.weapon.add_wea}
          </button>
        </div>
      </form>
    );
  }
}

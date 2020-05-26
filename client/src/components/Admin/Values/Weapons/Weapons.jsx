import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import SuccessMessage from '../../../Partials/Messages/SuccessMessage';

export default class Weapons extends Component {
  constructor() {
    super();
    this.state = {
      weapons: [],
      message: sessionStorage.getItem("admin-message")
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
            'Successfully Deleted Weapon'
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
    const { weapons,message } = this.state;
    
    return (
      <div className='container text-light col-md-9'>
          {
              message ? <SuccessMessage dismiss message={message} /> : null 
          }
        <h3>
          Manage Weapons - <a href='/admin/weapons/add'>+</a>
        </h3>

        <ul className='list-group mt-3'>
          {!weapons[0] ? (
            <ErrorMessage message="You Don't have any weapons, Add one by clicking the plus symbol above" />
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
                      Edit
                    </a>
                    <button
                      onClick={() => {
                        this.deleteWeapon(weapon.id);
                      }}
                      className='btn btn-danger'>
                      Delete
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

import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import SuccessMessage from '../../../Partials/Messages/SuccessMessage';
import lang from '../../../../language.json';

export default class Genders extends Component {
  constructor() {
    super();
    this.state = {
      genders: [],
      message: sessionStorage.getItem('admin-message'),
    };
  }

  getGenders = () => {
    Axios({
      url: backendURL + '/admin/genders',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.genders) {
          this.setState({
            genders: res.data.genders,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteGender = (id) => {
    Axios({
      url: backendURL + '/admin/genders/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.setItem(
            'admin-message',
            lang.admin.values.gender.delete_gen
          );
          return (window.location = '/admin/genders');
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getGenders();
    document.title = 'Genders - Admin';
  }

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  render() {
    const { genders, message } = this.state;

    return (
      <div className='container text-light col-md-9'>
        {message ? <SuccessMessage dismiss message={message} /> : null}
        <h3>
          {lang.admin.values.gender.manage_gen} - <a href='/admin/genders/add'>+</a>
        </h3>

        <ul className='list-group mt-3'>
          {!genders[0] ? (
            <ErrorMessage message={lang.admin.values.gender.no_gen} />
          ) : (
            genders.map((gender, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item text-light bg-dark border-secondary'>
                  {++index} | {gender.name}
                  <div className='float-right'>
                    <a
                      href={'/admin/genders/edit/' + gender.id}
                      className='btn btn-success mr-2'>
                      {lang.global.edit}
                    </a>
                    <button
                      onClick={() => {
                        this.deleteGender(gender.id);
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

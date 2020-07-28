import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import lang from '../../../language.json';

export default class MyDeputiesList extends Component {
  constructor() {
    super();

    this.state = {
      deputies: [],
    };
  }

  getEmsFdDeputies = () => {
    Axios({
      url: backendURL + '/ems-fd',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          deputies: res.data.deputies,
        });
      })
      .catch((err) => console.log(err));
  };

  deleteDeputy = (id, deputyName) => {
    Axios({
      url: backendURL + '/ems-fd/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.setItem(
            'ems-fd-message',
            `${lang.ems_fd.deleted_dept} ${deputyName}`
          );
          return (window.location = '/ems-fd/deputies');
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getEmsFdDeputies();
    document.title = 'EMS-FD - My Deputies';
  }

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('ems-fd-message')
    );
  }

  render() {
    const { deputies } = this.state;

    if (!deputies[0]) {
      return (
        <div className='list-group-item mt-2 text-light bg-dark border-dark'>
          {lang.ems_fd.no_ems}
        </div>
      );
    }

    return (
      <ul className='list-group mt-2'>
        {deputies.map((deputy, index) => {
          return (
            <li
              key={index}
              className='list-group-item mt-2 text-light bg-dark border-dark d-flex justify-content-between'>
              {deputy.name}
              <div>
                <button
                  className='btn btn-danger'
                  onClick={() => {
                    this.deleteDeputy(deputy.id, deputy.name);
                  }}
                  type='button'>
                  {lang.global.delete}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

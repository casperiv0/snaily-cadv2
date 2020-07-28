import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import SuccessMessage from '../../../Partials/Messages/SuccessMessage';
import lang from '../../../../language.json';

export default class Ethnicities extends Component {
  constructor() {
    super();
    this.state = {
      ethnicities: [],
      message: sessionStorage.getItem("admin-message")
    };
  }

  getEthnicities = () => {
    Axios({
      url: backendURL + '/admin/ethnicities',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.ethnicities) {
          this.setState({
            ethnicities: res.data.ethnicities,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteEthnicity = (id) => {
    Axios({
      url: backendURL + '/admin/ethnicities/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.setItem(
            'admin-message',
            lang.admin.values.ethnicity.delete_eth
          );
          return (window.location = '/admin/ethnicities');
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getEthnicities();
    document.title = 'Ethnicities - Admin';
  }

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  render() {
    const { ethnicities,message } = this.state;
    
    return (
      <div className='container text-light col-md-9'>
          {
              message ? <SuccessMessage dismiss message={message} /> : null 
          }
        <h3>
          {lang.admin.values.ethnicity.manage_eth} - <a href='/admin/ethnicities/add'>+</a>
        </h3>

        <ul className='list-group mt-3'>
          {!ethnicities[0] ? (
            <ErrorMessage message={lang.admin.values.ethnicity.no_eth} />
          ) : (
            ethnicities.map((ethnicity, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item text-light bg-dark border-secondary'>
                  {++index} | {ethnicity.name}
                  <div className='float-right'>
                    <a
                      href={'/admin/ethnicities/edit/' + ethnicity.id}
                      className='btn btn-success mr-2'>
                      {lang.global.edit}
                    </a>
                    <button
                      onClick={() => {
                        this.deleteEthnicity(ethnicity.id);
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

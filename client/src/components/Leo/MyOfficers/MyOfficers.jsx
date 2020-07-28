import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';
import SuccessMessage from '../../Partials/Messages/SuccessMessage';
import lang from "../../../language.json"

export default class MyOfficers extends Component {
  constructor() {
    super();

    this.state = {
      officers: [],
      message: sessionStorage.getItem('leo-message'),
    };
  }

  getOfficers = () => {
    Axios({
      url: backendURL + '/officers/myofficers',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          officers: res.data.officers,
        });
      })
      .catch((err) => console.log(err));
  };

  deleteOfficer = (id, officerName) => {
    Axios({
      url: backendURL + '/officers/myofficers/del/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.setItem(
            'leo-message',
            `${lang.officers.delete_officer_success} ${officerName}`
          );
          return (window.location = '/leo/myofficers');
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    document.title = 'My Officers - Police';
    this.getOfficers();

    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('leo-message')
    );
  }

  render() {
    const { officers, message } = this.state;
    return (
      <div className='container text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <h3>{lang.officers.my_officers}</h3>
        <a className='btn btn-primary container' href='/leo/dash'>
          {lang.global.back_to_dashboard}
        </a>
        <a
          className='btn btn-primary container mt-2 mb-2'
          href='/leo/myofficers/create'>
          {lang.officers.create_an_officer}
        </a>

        <ul className='list-group'>
          {!officers[0] ? (
            <ErrorMessage message="You don't have any officers." />
          ) : (
            officers.map((officer, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item bg-dark border-secondary text-light d-flex justify-content-between'>
                  <div>
                    {++index} | {officer.officer_dept} | {officer.officer_name}
                  </div>
                  <div>
                    <button
                      className='btn btn-danger'
                      onClick={() => {
                        this.deleteOfficer(officer.id, officer.officer_name);
                      }}>
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

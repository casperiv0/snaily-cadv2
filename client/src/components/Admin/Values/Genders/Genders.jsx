import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import AdminSuccessMessage from "../../AdminSuccessMessage";

export default class Genders extends Component {
  constructor() {
    super();
    this.state = {
      genders: [],
      message: sessionStorage.getItem("admin-message")
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
            'Successfully Deleted Gender'
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
    const { genders,message } = this.state;
    
    return (
      <div className='container text-light col-md-9'>
          {
              message ? <AdminSuccessMessage message={message} /> : null 
          }
        <h3>
          Manage Genders - <a href='/admin/genders/add'>+</a>
        </h3>

        <ul className='list-group mt-3'>
          {!genders[0] ? (
            <ErrorMessage message="You Don't have any genders, Add one by clicking the plus symbol above" />
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
                      Edit
                    </a>
                    <button
                      onClick={() => {
                        this.deleteGender(gender.id);
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

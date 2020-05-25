import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import AdminSuccessMessage from "../../AdminSuccessMessage";

export default class LegalStatuses extends Component {
  constructor() {
    super();
    this.state = {
      statuses: [],
      message: sessionStorage.getItem("admin-message")
    };
  }

  getLegalStatuses = () => {
    Axios({
      url: backendURL + '/admin/legal-statuses',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.statuses) {
          this.setState({
            statuses: res.data.statuses,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteLegalStatus = (id) => {
    Axios({
      url: backendURL + '/admin/legal-statuses/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.setItem(
            'admin-message',
            'Successfully Deleted Legal Status'
          );
          return (window.location = '/admin/legal-statuses');
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getLegalStatuses();
    document.title = 'Legal Statuses - Admin';
  }

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  render() {
    const { statuses,message } = this.state;
    
    return (
      <div className='container text-light col-md-9'>
          {
              message ? <AdminSuccessMessage message={message} /> : null 
          }
        <h3>
          Manage Legal Statuses - <a href='/admin/legal-statuses/add'>+</a>
        </h3>

        <ul className='list-group mt-3'>
          {!statuses[0] ? (
            <ErrorMessage message="You Don't have any legal statuses, Add one by clicking the plus symbol above" />
          ) : (
            statuses.map((status, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item text-light bg-dark border-secondary'>
                  {++index} | {status.status}
                  <div className='float-right'>
                    <a
                      href={'/admin/legal-statuses/edit/' + status.id}
                      className='btn btn-success mr-2'>
                      Edit
                    </a>
                    <button
                      onClick={() => {
                        this.deleteLegalStatus(status.id);
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

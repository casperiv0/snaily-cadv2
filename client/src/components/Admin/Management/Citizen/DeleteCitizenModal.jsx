import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import lang from '../../../../language.json';

export default class DeleteCitizenModal extends Component {
  deleteCitizen = () => {
    Axios({
      url: backendURL + '/admin/citizens/' + this.props.id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Citizen Deleted') {
          sessionStorage.setItem('admin-message', lang.citizen.deleted_citizen);
          return (window.location = '/admin/manage/citizens');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div
        className='modal fade'
        id={'deleteCitizen' + this.props.id}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                {lang.citizen.delete_citizen}?
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {lang.citizen.delete_citizen_msg}
              <span className='font-weight-bold'> {this.props.fullName}</span>?
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'>
                {lang.global.close}
              </button>
              <button
                type='button'
                onClick={this.deleteCitizen}
                className='btn btn-danger'>
                {lang.citizen.confirm_delete}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

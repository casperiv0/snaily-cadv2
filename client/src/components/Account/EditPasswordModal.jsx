import React, { Component } from 'react';
import ErrorMessage from '../Partials/Messages/ErrorMessage';
import { handleRequest } from '../../functions';
import { CircularProgress } from '@material-ui/core';
import lang from "../../language.json"
export default class EditAccountModal extends Component {
  constructor() {
    super();

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      error: '',
      loading: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updatePassword = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });

    handleRequest('/account/edit', 'PUT', {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      newPassword2: this.state.newPassword2,
    })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem(
            'account-message',
            'Successfully Updated Password'
          );
          return (window.location = '/account');
        }

        this.setState({
          error: res.data.msg,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      oldPassword,
      error,
      newPassword,
      newPassword2,
      loading,
    } = this.state;
    return (
      <div
        className='modal fade'
        id='editPassword'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                {lang.auth.account.edit_password}
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.updatePassword}>
              <div className='modal-body'>
                {error ? <ErrorMessage message={error} /> : null}
                <div className='form-group'>
                  <label htmlFor='oldPassword'>{lang.auth.enter_old_password}</label>
                  <input
                    type='password'
                    value={oldPassword}
                    onChange={this.onChange}
                    name='oldPassword'
                    id='OldPassword'
                    className='form-control bg-secondary border-secondary text-light'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='oldPassword'>{lang.auth.enter_password}</label>
                  <input
                    type='password'
                    value={newPassword}
                    onChange={this.onChange}
                    name='newPassword'
                    id='newPassword'
                    className='form-control bg-secondary border-secondary text-light'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='oldPassword'>{lang.auth.confirm_password}</label>
                  <input
                    type='password'
                    value={newPassword2}
                    onChange={this.onChange}
                    name='newPassword2'
                    id='newPassword2'
                    className='form-control bg-secondary border-secondary text-light'
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  {lang.global.close}
                </button>
                <div className='loading-wrapper'>
                  <button
                    disabled={loading}
                    type='submit'
                    className='btn btn-primary'>
                    {lang.auth.update_password}
                  </button>
                  {loading ? (
                    <CircularProgress
                      disableShrink
                      className='loader'
                      size={40}
                    />
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

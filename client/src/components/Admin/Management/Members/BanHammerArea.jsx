import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { backendURL } from '../../../../config/config';

export default class BanHammerArea extends Component {
  constructor() {
    super();

    this.state = {
      reason: '',
    };
  }

  banUser = () => {
    Axios({
      url: backendURL + '/admin/members/ban/' + this.props.id,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        banReason: this.state.reason,
      },
    }).then((res) => {
      if (res.data.msg === 'User Banned') {
        const message = this.state.reason ? this.state.reason : 'Not Specified';
        sessionStorage.setItem(
          'admin-message',
          'Successfully Banned User: ' +
            this.props.username +
            ', Reason: ' +
            message
        );
        return (window.location =
          '/admin/manage/members/edit/' + this.props.id);
      }
    });
  };

  unbanUser = () => {
    Axios({
      url: backendURL + '/admin/members/unban/' + this.props.id,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.msg === 'User Unbanned') {
        sessionStorage.setItem(
          'admin-message',
          'Successfully Unbanned User: ' + this.props.username
        );
        return (window.location =
          '/admin/manage/members/edit/' + this.props.id);
      }
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, currentUsername, banned, ban_reason, rank } = this.props;
    let message2 = '';

    if (rank === 'owner') {
      message2 = "You can't ban the owner!";
    } else if (username === currentUsername) {
      message2 = "You can't ban yourself!";
    }

    return (
      <div className='card bg-dark border-secondary'>
        <div className='card-header'>
          <h5>Use the ban hammer</h5>
        </div>
        {message2 ? (
          <h5 className="card-body"> {message2} </h5>
        ) : banned === 'true' ? (
          <div className='card-body'>
            <div className='card-title'>
              Unban this user. <br /> This user was banned for: {ban_reason}
            </div>
            <button
              onClick={this.unbanUser}
              className='btn btn-success mb-2 col'>
              Revoke Ban
            </button>
          </div>
        ) : (
          <div className='card-body'>
            <div className='form-group'>
              <label htmlFor='reason' className='text-light'>
                Enter Ban Reason
              </label>
              <input
                type='text'
                name='reason'
                placeholder='Reason'
                className='form-control bg-dark border-secondary text-light'
                maxLength='999'
                onChange={this.onChange}
              />
            </div>
            <button
              onClick={this.banUser}
              className='btn col btn-danger mb-2'>
              ban user
            </button>
          </div>
        )}
      </div>
    );
  }
}

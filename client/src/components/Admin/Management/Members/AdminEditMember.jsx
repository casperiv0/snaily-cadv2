import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { backendURL } from '../../../../config/config';
import BanHammerArea from './BanHammerArea';
import SuccessMessage from '../../../Partials/Messages/SuccessMessage';

export default class AdminEditMember extends Component {
  constructor() {
    super();

    this.state = {
      message: sessionStorage.getItem('admin-message'),
      rank: '',
      leo: '',
      dispatch: '',
      ems_fd: '',
      tow: '',
      cad: {},
      error: '',
      username: '',
      currentUsername: '',
      message2: '',
      banned: '',
      ban_reason: '',
      id: 0
    };
  }

  getData = () => {
    Axios({
      url: backendURL + '/admin/members/edit/' + this.props.match.params.id,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        const user = res.data.user[0];
        this.setState({
          rank: user.rank,
          leo: user.leo,
          dispatch: user.dispatch,
          ems_fd: user.ems_fd,
          tow: user.tow,
          username: user.username,
          currentUsername: res.data.current,
          banned: user.banned,
          ban_reason: user.ban_reason,
          id: user.id
        });
        document.title = 'Editing: ' + res.data.user[0].username;
      })
      .catch((err) => console.log(err));

    //  Check if cad is tow whitelisted
    Axios({
      url: backendURL + '/auth/cad-info',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          cad: res.data.cadInfo[0],
        });
      })
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/admin/members/edit/' + this.props.match.params.id,
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        rank: this.state.rank,
        leo: this.state.leo,
        ems_fd: this.state.ems_fd,
        dispatch: this.state.dispatch,
        tow: this.state.tow,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem(
            'admin-message',
            'Successfully Updated ' + this.state.username
          );
          return (window.location =
            '/admin/manage/members/edit/' + this.props.match.params.id);
        }

        this.setState({
          error: res.data.msg,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  render() {
    const {
      message,
      cad,
      rank,
      leo,
      ems_fd,
      dispatch,
      tow,
      username,
      currentUsername,
    } = this.state;

    let message2 = '';

    if (rank === 'owner') {
      message2 = "You can't modify the owners rank";
    } else if (username === currentUsername) {
      message2 = "You can't modify your own rank";
    }

    return (
      <div className='container-fluid col text-light'>
        {message ?  <SuccessMessage message={message} dismiss /> : null}

        <form onSubmit={this.onSubmit} className="pb-5">
          <div className='form-group'>
            <label htmlFor='rank'>User Rank</label>
            {/* Validate */}
            {message2 ? (
              <p> {message2} </p>
            ) : (
              <select
                name='rank'
                id='rank'
                className='form-control bg-dark text-light border-secondary'
                onChange={this.onChange}>
                <option value={rank}>{rank}</option>
                <option disabled value=''>
                  --------
                </option>
                <option value='No Rank'>Remove Rank</option>
                <option value='moderator'>Moderator</option>
                <option value='admin'>Admin</option>
              </select>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='leo'>Police Access</label>
            <select
              name='leo'
              id='leo'
              className='form-control bg-dark text-light border-secondary'
              onChange={this.onChange}>
              <option value={leo}>{leo}</option>
              <option disabled value=''>
                --------
              </option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='ems_fd'>EMS/FD Access</label>
            <select
              name='ems_fd'
              id='ems_fd'
              className='form-control bg-dark text-light border-secondary'
              onChange={this.onChange}>
              <option value={ems_fd}>{ems_fd}</option>
              <option disabled value=''>
                --------
              </option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='dispatch'>Dispatch Access</label>
            <select
              name='dispatch'
              id='dispatch'
              className='form-control bg-dark text-light border-secondary'
              onChange={this.onChange}>
              <option value={dispatch}>{dispatch}</option>
              <option disabled value=''>
                --------
              </option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </div>

          {cad.tow_whitelisted === 'false' ? null : (
            <div className='form-group'>
              <label htmlFor='tow'>Tow Access</label>
              <select
                name='tow'
                id='tow'
                className='form-control bg-dark text-light border-secondary'
                onChange={this.onChange}>
                <option value={tow}>{tow}</option>
                <option disabled value=''>
                  --------
                </option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
              </select>
            </div>
          )}

          <div className='form-group float-right'>
            <a className='btn btn-danger mr-2' href='/admin/manage/members'>
              Cancel
            </a>
            <button type='submit' className='btn btn-primary'>
              Update Permissions
            </button>
          </div>
        </form>

        {/* Ban Hammer Area */}
        <div className="mt-5">
        <BanHammerArea
          username={username}
          currentUsername={currentUsername}
          rank={rank}
          banned={this.state.banned}
          ban_reason={this.state.ban_reason}
          id={this.state.id}
        />
        </div>
      </div>
    );
  }
}

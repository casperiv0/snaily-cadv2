import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { backendURL } from '../../config/config';
import { Link } from 'react-router-dom';
import EditAccountModal from './EditAccountModal';

export default class Account extends Component {
  constructor() {
    super();

    this.state = {
      randomFact: '',
      account: {},
      message: sessionStorage.getItem('account-message'),
    };
  }

  getRandomFact = () => {
    Axios({
      url: 'https://uselessfacts.jsph.pl/random.json?language=en',
      method: 'GET',
    }).then((res) => {
      this.setState({
        randomFact: res.data.text,
      });
    });
  };

  componentDidMount() {
    document.title = 'Account';
    this.getRandomFact();
    this.getAccountData();
  }

  getAccountData = () => {
    Axios({
      url: backendURL + '/auth/user',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          account: res.data.user[0],
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('account-message')
    );
  }

  render() {
    const { message } = this.state;
    const { username, leo, dispatch, rank, ems_fd, tow } = this.state.account;
    return (
      <div className='container-fluid mt-2 text-light'>
        {message ? (
          <div className='alert alert-dismissible alert-success'>
            {message}
            <button
              type='button'
              className='close'
              data-dismiss='alert'
              aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        ) : null}
        <EditAccountModal />
        <div>
          <h4>Account Information</h4>
          <p>Random Fact: {this.state.randomFact}</p>
        </div>

        <div className='card bg-dark border-dark'>
          <div className='card-header d-flex justify-content-between'>
            <h3>{username}</h3>
            <Link
              data-toggle='modal'
              to='#editPassword'
              data-target='#editPassword'
              className='btn btn-primary'>
              Edit Password
            </Link>
          </div>
          <div className='card-body'>
            <span className='font-weight-bold'>Rank:</span> {rank} <br />
            <span className='font-weight-bold'>Police Access:</span> {leo}
            <br />
            <span className='font-weight-bold'>Dispatch Access:</span>{' '}
            {dispatch}
            <br />
            <span className='font-weight-bold'>EMS/FD Access:</span> {ems_fd}
            <br />
            <span className='font-weight-bold'>Tow Access:</span> {tow}
            <br />
          </div>
        </div>
      </div>
    );
  }
}

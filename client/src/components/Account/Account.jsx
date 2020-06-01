import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { backendURL } from '../../config/config';
import { Link } from 'react-router-dom';
import EditPasswordModal from './EditPasswordModal';
import LoadingArea from '../Partials/LoadingArea';
import SuccessMessage from '../Partials/Messages/SuccessMessage';

export default class Account extends Component {
  constructor() {
    super();

    this.state = {
      randomFact: '',
      account: [],
      message: sessionStorage.getItem('account-message'),
      loading: true,
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

  deleteAccount = () => {
    Axios({
      url: backendURL + '/auth/remove-account',
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.getItem(
            'home-message',
            'Successfully deleted your account'
          );
          return (window.location = '/');
        }

        console.log(res.data.msg);
      })
      .catch((err) => console.log(err));
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
          loading: false,
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
    const { message, loading } = this.state;
    const { username, leo, dispatch, rank, ems_fd, tow } = this.state.account;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <div className='container-fluid mt-2 text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <EditPasswordModal />
        <div>
          <h4>Account Information</h4>
          <p>Random Fact: {this.state.randomFact}</p>
        </div>

        <div className='card bg-dark border-dark'>
          <div className='card-header d-flex justify-content-between'>
            <h3>{username}</h3>
            <div>
              <Link
                data-toggle='modal'
                to='#editPassword'
                data-target='#editPassword'
                className='btn btn-primary'>
                Edit Password
              </Link>
              <button
                className='btn btn-danger ml-2'
                data-toggle='modal'
                data-target='#deleteAccount'>
                Delete My Account
              </button>
            </div>
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
          <div className='card-footer d-flex'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-secondary col-md-4 mr-1'
              href='https://github.com/Dev-CasperTheGhost/snaily-cadv2/blob/master/CHANGELOG.md'>
              See CAD Changelog
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-secondary col-md-4 mr-1'
              href='https://github.com/Dev-CasperTheGhost/snaily-cadv2/issues/new?assignees=&labels=&template=feature_request.md&title='>
              Request a new feature
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-secondary col-md-4'
              href='https://github.com/Dev-CasperTheGhost/snaily-cadv2/issues/new?assignees=&labels=&template=bug_report.md&title='>
              Report a bug
            </a>
          </div>
        </div>

        <div
          className='modal fade'
          id='deleteAccount'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='deleteAccount'
          aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content bg-dark border-dark text-light'>
              <div className='modal-header'>
                <h5 className='modal-title' id='deleteAccount'>
                  Delete My Account
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
                Are you sure you want to delete your account? All your data will
                be lost and removed and cannot be undone.
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={this.deleteAccount}
                  className='btn btn-danger'>
                  Yes, Delete my account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

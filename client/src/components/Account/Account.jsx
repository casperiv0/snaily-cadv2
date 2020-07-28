import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import EditPasswordModal from './EditPasswordModal';
import LoadingArea from '../Partials/LoadingArea';
import SuccessMessage from '../Partials/Messages/SuccessMessage';
import { handleRequest } from '../../functions';
import lang from "../../language.json"

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
    handleRequest('/auth/remove-account', 'DELETE')
      .then((res) => {
        Cookies.remove('__session');
        if (res.data.msg === 'Deleted') {
          sessionStorage.getItem(
            'home-message',
            lang.auth.account.delete_acc_success
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
    handleRequest('/auth/user', 'GET')
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
          <h4>{lang.auth.account.account_info}</h4>
          <p>{lang.auth.account.random_fact}: {this.state.randomFact}</p>
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
                {lang.auth.account.edit_password}
              </Link>
              <button
                className='btn btn-danger ml-2'
                data-toggle='modal'
                data-target='#deleteAccount'>
                {lang.auth.account.delete_acc}
              </button>
            </div>
          </div>
          <div className='card-body'>
            <span className='font-weight-bold'>{lang.global.rank}:</span> {rank} <br />
            <span className='font-weight-bold'>{lang.auth.account.police_access}:</span> {leo}
            <br />
            <span className='font-weight-bold'>{lang.auth.account.dispatch_access}:</span>{' '}
            {dispatch}
            <br />
            <span className='font-weight-bold'>{lang.auth.account.ems_fd_access}:</span> {ems_fd}
            <br />
            <span className='font-weight-bold'>{lang.auth.account.tow_access}:</span> {tow}
            <br />
          </div>
          <div className='card-footer d-flex'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-secondary col-md-4 mr-1'
              href='https://github.com/Dev-CasperTheGhost/snaily-cadv2/blob/master/CHANGELOG.md'>
              {lang.auth.account.changelog}
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-secondary col-md-4 mr-1'
              href='https://github.com/Dev-CasperTheGhost/snaily-cadv2/issues/new?assignees=&labels=&template=feature_request.md&title='>
              {lang.auth.account.new_feature}
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-secondary col-md-4'
              href='https://github.com/Dev-CasperTheGhost/snaily-cadv2/issues/new?assignees=&labels=&template=bug_report.md&title='>
              {lang.auth.account.report_a_bug}
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
                {lang.auth.account.delete_acc}
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
                {lang.auth.account.delete_acc_confirm}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  {lang.global.cancel}
                </button>
                <button
                  type='button'
                  onClick={this.deleteAccount}
                  className='btn btn-danger'>
                  {lang.auth.account.confirm_delete_acc}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

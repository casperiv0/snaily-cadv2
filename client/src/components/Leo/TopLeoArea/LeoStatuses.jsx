import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';

export default class LeoStatuses extends Component {
  constructor() {
    super();

    this.state = {
      status2: Cookies.get('status2'),
      currentStatus: '',
    };
  }

  updateStatus = (e) => {
    const officerId = Cookies.get('on-duty-officerId');

    Axios({
      url: backendURL + '/dispatch/update-officer/' + officerId,
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        status: 'on-duty',
        status2: e.target.value,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem('leo-message', 'Successfully Updated Status');
          window.location = '/leo/dash';
        }
      })
      .catch((err) => console.log(err));
  };

  getCurrentStatus = () => {
    const officerId = Cookies.get('on-duty-officerId');

    if (officerId === undefined) {
      return;
    }

    Axios({
      url: backendURL + '/officers/get-status/' + officerId,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.officer) {
          this.setState({
            currentStatus: res.data.officer.status2,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  onClick = (e) => {
    Cookies.set('status2', e.target.value);
    this.setState({
      status2: e.target.value,
    });
  };

  componentDidMount() {
    this.getCurrentStatus();
  }

  render() {
    const { currentStatus } = this.state;
    return (
      <div className='card-footer'>
        <button
          type='button'
          className={
            '10-8' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }
          data-toggle='modal'
          data-target='#selectOfficerModal'>
          10-8
        </button>
        <button
          disabled={!currentStatus}
          onClick={this.updateStatus}
          name='status2'
          value='10-7'
          className={
            '10-7' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-7
        </button>
        <button
          disabled={!currentStatus}
          onClick={this.updateStatus}
          name='status2'
          value='10-6'
          className={
            '10-6' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-6
        </button>
        <button
          disabled={!currentStatus}
          onClick={this.updateStatus}
          name='status2'
          value='10-5'
          className={
            '10-5' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-5
        </button>
        <button
          disabled={!currentStatus}
          onClick={this.updateStatus}
          name='status2'
          value='10-14'
          className={
            '10-14' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-14
        </button>
        <button
          disabled={!currentStatus}
          onClick={this.updateStatus}
          name='status2'
          value='10-15'
          className={
            '10-15' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-15
        </button>
        <button
          disabled={!currentStatus}
          onClick={this.updateStatus}
          name='status2'
          value='10-17'
          className={
            '10-17' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-17
        </button>
        <button
          disabled={!currentStatus}
          onClick={this.updateStatus}
          name='status2'
          value='10-97'
          className={
            '10-97' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-97
        </button>
        <button
          disabled={!currentStatus}
          onClick={this.updateStatus}
          name='status2'
          value='code 5'
          className={
            'code 5' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          Code 5
        </button>
        <button
          disabled={!currentStatus}
          onClick={this.updateStatus}
          name='status2'
          value='code 6'
          className={
            'code 6' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          Code 6
        </button>
      </div>
    );
  }
}

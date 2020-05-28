import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';

export default class EmsFdStatuses extends Component {
  constructor() {
    super();

    this.state = {
      status2: Cookies.get('ems-fd-status2'),
      currentStatus: '',
    };
  }

  updateStatus = (e) => {
    const deputyId = Cookies.get('on-duty-ems-fdId');

    Axios({
      url: backendURL + '/dispatch/update-ems-fd/' + deputyId,
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
          sessionStorage.setItem('ems-fd-message', 'Successfully Updated Status');
          window.location = '/ems-fd';
        }
      })
      .catch((err) => console.log(err));
  };

  getCurrentStatus = () => {
    const deputyId = Cookies.get('on-duty-ems-fdId');
    Axios({
      url: backendURL + '/ems-fd/get-status/' + deputyId,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.emsFd) {
          this.setState({
            currentStatus: res.data.emsFd.status2,
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
          data-target='#selectEmsFdModal'>
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
          value='10-97'
          className={
            '10-97' === currentStatus
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-97
        </button>
      </div>
    );
  }
}

import React, { Component } from 'react';
import LeoModalButtons from './LeoModalButtons';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../Partials/LoadingArea';
import LeoStatuses from './LeoStatuses';

export default class TopLeoArea extends Component {
  constructor() {
    super();

    this.state = {
      aop: '',
      loading: true,
    };
  }

  getCADInfo = () => {
    Axios({
      url: backendURL + '/auth/cad-info/',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.cadInfo) {
          this.setState({
            aop: res.data.cadInfo[0].AOP,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getCADInfo();

    setInterval(function () {
      let date = document.getElementById('leo-time');
      let d = new Date();
      let currentTime = d.toLocaleTimeString();
      let currentDate = d.toLocaleDateString();
      date.textContent = currentTime + ' - ' + currentDate;
    }, 1000);
  }

  render() {
    const { aop, loading } = this.state;

    if (loading) {
      return <LoadingArea />
    }

    return (
      <div className='card mt-3 bg-dark border-dark text-light'>
        <div className='card-header d-flex justify-content-between'>
          <h4>Utility Panel - AOP: {aop}</h4>
          <span id="leo-time"></span>
        </div>
        <div className='card-body'>
          <LeoModalButtons />
        </div>
        <LeoStatuses />
      </div>
    );
  }
}

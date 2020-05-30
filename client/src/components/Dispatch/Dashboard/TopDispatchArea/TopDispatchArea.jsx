import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../../Partials/LoadingArea';
import ModalButtons from './ModalButtons';

export default class TopDispatchArea extends Component {
  constructor() {
    super();

    this.state = {
      aop: '',
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
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getCADInfo();

    setInterval(function () {
      let date = document.getElementById('time');
      let d = new Date();
      let currentTime = d.toLocaleTimeString();
      let currentDate = d.toLocaleDateString();
      date.textContent = currentTime + ' - ' + currentDate;
    }, 1000);
  }

  render() {
    const { aop, loading } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <div className='text-light'>
        <div className='mt-4 card bg-dark border-dark'>
          <div className='card-header d-flex justify-content-between'>
            <h3>Utility Panel - AOP: {aop}</h3>
            <span id='time'></span>
          </div>
          <ModalButtons />
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { logOut } from '../Auth/getSession';
import { Link } from 'react-router-dom';
import CallTowModal from './CallTowModal';
import CallEmergencyServicesModal from '../Modals/CallEmergencyServicesModal';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';

export default class TopButtons extends Component {
  constructor() {
    super();

    this.state = {
      aop: '',
    };
  }

  getAOP = () => {
    Axios({
      url: backendURL + '/auth/cad-info',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        aop: res.data.cadInfo[0].AOP
      });
    });
  };

  componentDidMount() {
   this.getAOP()
  }

  render() {
    const { aop } = this.state;
    return (
      <div>
        <h3 className="text-light">Welcome - AOP: {aop}</h3>
        <div className='d-flex'>
          <button onClick={logOut} className='col btn btn-danger'>
            Logout
          </button>
          <Link
            to='/account'
            className='col ml-1 btn btn-primary'>
            Account
          </Link>
        </div>

        <div className='d-flex mt-1'>
          <Link to='/citizen/create' className='col btn btn-primary'>
            Create new Citizen
          </Link>
          <Link to='/vehicles/register' className='col ml-1 btn btn-primary'>
            Register a New Vehicle
          </Link>
          <Link to='/weapons/register' className='col ml-1 btn btn-primary'>
            Register a New Vehicle
          </Link>
        </div>

        <div className='d-flex mt-1'>
          <Link to='/manage-company-employment' className='col btn btn-primary'>
            Manage Employment Status
          </Link>
          <button
            data-toggle='modal'
            data-target='#callTow'
            className='col ml-1 btn btn-primary'>
            Call Tow Service
          </button>
          <button
            data-toggle='modal'
            data-target='#call911'
            className='col ml-1 btn btn-primary'>
            Call Emergency Services
          </button>
        </div>
        <CallTowModal />
        <CallEmergencyServicesModal to="/citizen"  messageType="message" />
      </div>
    );
  }
}

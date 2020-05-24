import React, { Component } from 'react';
import { logOut } from '../Auth/getSession';
import { Link } from 'react-router-dom';
import CallTowModal from "./CallTowModal";
import CallEmergencyServicesModal from "./CallEmergencyServicesModal"

export default class TopButtons extends Component {
  render() {
    return (
      <div>
        <div className='d-flex'>
          <button onClick={logOut} className='col btn btn-danger'>
            Logout
          </button>
          <Link to='/account/edit' className='col ml-1 btn btn-primary'>
            Edit Account
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
          <button data-toggle="modal" data-target="#callTow" className='col ml-1 btn btn-primary'>Call Tow Service</button>
          <button data-toggle="modal" data-target="#call911" className='col ml-1 btn btn-primary'>
            Call Emergency Services
          </button>
        </div>
        <CallTowModal />
        <CallEmergencyServicesModal />
      </div>
    );
  }
}

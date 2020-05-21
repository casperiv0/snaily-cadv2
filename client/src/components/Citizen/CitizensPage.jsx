import React, { Component } from 'react';
import { logOut } from '../Auth/getSession';
import { Link } from 'react-router-dom';

export default class CitizensPage extends Component {
  render() {
    return (
      <div className='container'>
        <div className="grid">
          <div className="row">
          <button onClick={logOut} className='col btn btn-danger'>Logout</button>
          <Link to="/account/edit" className='col ml-1 btn btn-primary'>Edit Account</Link>
          </div>

          <div className="row mt-1">
          <Link to="/citizen/create" className='col btn btn-primary'>Create new Citizen</Link>
          <Link to="/vehicles/register" className='col ml-1 btn btn-primary'>Register a New Vehicle</Link>
          <Link to="/weapons/register" className='col ml-1 btn btn-primary'>Register a New Vehicle</Link>
          </div>

          <div className="row mt-1">
          <Link to="/manage-company-employment" className='col btn btn-primary'>Manage Employment Status</Link>
          <button className='col ml-1 btn btn-primary'>Call Tow Service</button>
          <button className='col ml-1 btn btn-primary'>Call Emergency Services</button>
          </div>
        </div>
        Citizens page
      </div>
    );
  }
}

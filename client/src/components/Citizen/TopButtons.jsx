import React, { Component } from 'react';
import { logOut } from '../Auth/getSession';
import { Link } from 'react-router-dom';
import CallTowModal from './CallTowModal';
import CallEmergencyServicesModal from '../Modals/CallEmergencyServicesModal';
import { connect } from 'react-redux';
import { getAop } from '../../actions/otherActions';
import io from 'socket.io-client';
import { backendURL } from '../../config/config';
import lang from '../../language.json';
const socket = io(backendURL);

class TopButtons extends Component {
  componentDidMount() {
    this.props.getAop();

    socket.on('updateAop', () => {
      this.props.getAop();
    });
  }

  render() {
    const { aop } = this.props;

    return (
      <div>
        <h3 className='text-light'>
          {lang.auth.welcome} - AOP: {aop}
        </h3>
        <div className='d-flex'>
          <button onClick={logOut} className='col btn btn-danger'>
            {lang.auth.logout}
          </button>
          <Link to='/account' className='col ml-1 btn btn-primary'>
            Account
          </Link>
        </div>

        <div className='d-flex mt-1'>
          <Link to='/citizen/create' className='col btn btn-primary'>
            {lang.citizen.create_new_citizen}
          </Link>
          <Link to='/vehicles/register' className='col ml-1 btn btn-primary'>
            {lang.citizen.reg_new_vehicle}
          </Link>
          <Link to='/weapons/register' className='col ml-1 btn btn-primary'>
            {lang.citizen.reg_new_weapon}
          </Link>
        </div>

        <div className='d-flex mt-1'>
          <Link to='/manage-company-employment' className='col btn btn-primary'>
            {lang.citizen.employment_status}
          </Link>
          <button
            data-toggle='modal'
            data-target='#callTow'
            className='col ml-1 btn btn-primary'>
            {lang.citizen.call_tow}
          </button>
          <button
            data-toggle='modal'
            data-target='#call911'
            className='col ml-1 btn btn-primary'>
            {lang.citizen.call_911}
          </button>
        </div>
        <CallTowModal />
        <CallEmergencyServicesModal to='/citizen' messageType='message' />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  aop: state.aop.aop,
});

export default connect(mapStateToProps, { getAop })(TopButtons);

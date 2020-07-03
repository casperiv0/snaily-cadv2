import React, { Component } from 'react';
import TopDispatchArea from './TopDispatchArea/TopDispatchArea';
import ActiveUnits from './ActiveUnits';
import UpdateAop from './UpdateAop';
import SuccessMessage from '../../Partials/Messages/SuccessMessage';
import DispatchActiveCalls from './DispatchActiveCalls';
import ActiveBolos from '../../ActiveBolos';
import CreateBoloModal from '../../Modals/CreateBoloModal';
import CallEmergencyServicesModal from '../../Modals/CallEmergencyServicesModal';
import NotepadModal from '../../EMS-FD/EmsFdDashboard/NotepadModal';
import AddressSearchModal from '../../Modals/AddressSearchModal';
import NameSearchModal from '../../Modals/NameSearch/NameSearchModal';
import PlateSearchModal from '../../Modals/PlateSearchModal';
import WeaponSearchModal from '../../Modals/WeaponSearchModal';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { backendURL } from '../../../config/config';
const socket = io(backendURL);

class DispatchDashboard extends Component {
  constructor() {
    super();

    this.state = {
      panic: false,
      panicMessage: '',
    };
  }

  componentDidMount() {
    document.title = 'Dispatch Dashboard';

    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('dispatch-message')
    );

    socket.on('panicStart', (officer) => {
      this.setState({
        panic: true,
        panicMessage: `${officer.officerName.toUpperCase()} STARTED PANIC BUTTON`,
      });
    });
  }

  render() {
    const { panic, panicMessage } = this.state;
    const { message } = this.props;
    return (
      <div className='container-fluid text-light pb-5'>
        {message ? <SuccessMessage message={message} /> : null}
        {panic ? <SuccessMessage message={panicMessage} /> : null}
        <TopDispatchArea />
        <div className='row mt-3'>
          <ActiveUnits />
          <UpdateAop />
        </div>
        <DispatchActiveCalls />
        <ActiveBolos to='/dispatch' />

        {/* Modals */}
        <CreateBoloModal messageType='dispatch-message' to='/dispatch' />
        <CallEmergencyServicesModal
          to='/dispatch'
          messageType='dispatch-message'
        />
        <NotepadModal />

        <AddressSearchModal />
        <NameSearchModal />
        <PlateSearchModal />
        <WeaponSearchModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  message: state.message.content,
});

export default connect(mapStateToProps)(DispatchDashboard);

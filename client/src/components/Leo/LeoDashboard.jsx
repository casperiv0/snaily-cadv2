import React, { Component } from 'react';
import TopLeoArea from './TopLeoArea/TopLeoArea';
import SuccessMessage from '../Partials/Messages/SuccessMessage';
import PlateSearchModal from '../Modals/PlateSearchModal';
import WeaponSearchModal from '../Modals/WeaponSearchModal';
import NameSearchModal from '../Modals/NameSearch/NameSearchModal';
import CreateBoloModal from '../Modals/CreateBoloModal';
import NotepadModal from '../EMS-FD/EmsFdDashboard/NotepadModal';
import CreateWrittenWarningModal from './Modals/CreateWrittenWarningModal';
import CreateTicketModal from './Modals/CreateTicketModal';
import CreateArrestReportModal from './Modals/CreateArrestReportModal';
import Active911Calls from '../Active911Calls';
import CreateWarrant from './CreateWarrant';
import ActiveBolos from '../ActiveBolos';
import SelectOfficerModal from './Modals/SelectOfficerModal';

export default class LeoDashboard extends Component {
  constructor() {
    super();

    this.state = {
      message: sessionStorage.getItem('leo-message'),
    };
  }

  componentDidMount() {
    document.title = 'LEO Dashboard';

    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('leo-message')
    );
  }

  render() {
    const { message } = this.state;
    return (
      <div className='container-fluid text-light mt-3'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <TopLeoArea />

        <div className='row mt-3'>
          <div className='col-md-9'>
            <Active911Calls />
            <ActiveBolos to="/leo/dash" />
          </div>
          <CreateWarrant />
        </div>

        {/* Modals */}
        <NameSearchModal />
        <PlateSearchModal />
        <WeaponSearchModal />
        <CreateBoloModal messageType="leo-message" to="/leo/dash" />
        <NotepadModal />
        <CreateWrittenWarningModal />
        <CreateTicketModal />
        <CreateArrestReportModal />
        <SelectOfficerModal />
      </div>
    );
  }
}

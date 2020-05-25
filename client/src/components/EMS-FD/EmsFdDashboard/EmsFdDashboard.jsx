import React, { Component } from 'react';
import SearchMedicalRecordsModal from './SearchMedicalRecordModal';
import TopArea from './TopArea';
import NotepadModal from './NotepadModal';
import Active911Calls from '../../Active911Calls';

export default class EmsFdDashboard extends Component {

  componentDidMount() {
    document.title = "EMS-FD Dashboard"
  }

  render() {
    return (
      <div className='container-fluid mt-2'>
        <TopArea />
        <SearchMedicalRecordsModal />
        <NotepadModal />
        <Active911Calls />
      </div>
    );
  }
}

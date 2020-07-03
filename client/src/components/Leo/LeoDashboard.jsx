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
import Axios from 'axios';
import Cookies from 'js-cookie';
import { backendURL } from '../../config/config';
import { connect } from 'react-redux';
import { getAop } from '../../actions/otherActions';
import { removeMessage } from '../../actions/messageActions';

import io from 'socket.io-client';
const socket = io(backendURL);

class LeoDashboard extends Component {
  constructor() {
    super();

    this.state = {
      penalCodes: [],
      panic: false,
      panicMessage: '',
      aop: '',
    };
  }

  getPenalCodes = () => {
    Axios({
      url: backendURL + '/officers/penal-codes',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          penalCodes: res.data.penalCodes,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    document.title = 'LEO Dashboard';
    // Get penal codes
    this.getPenalCodes();
    // Get AOP
    this.props.getAop();

    document.addEventListener('beforeunload', this.props.removeMessage());

    // Listen for panic buttons
    socket.on('panicStart', (officer) => {
      this.setState({
        panic: true,
        panicMessage: `${officer.officerName.toUpperCase()} STARTED PANIC BUTTON`,
      });
    });

    // Listen for AOP update
    socket.on('updateAop', () => {
      this.props.getAop();
    });
  }

  render() {
    const { message } = this.props;
    const { panic, panicMessage } = this.state;

    return (
      <div className='container-fluid text-light mt-3'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        {panic ? <SuccessMessage message={panicMessage} dismiss /> : null}

        <TopLeoArea aop={this.props.aop} />

        <div className='row mt-3'>
          <div className='col-md-9'>
            <Active911Calls />
            <ActiveBolos to='/leo/dash' />
          </div>
          <CreateWarrant />
        </div>

        {/* Modals */}
        <NameSearchModal />
        <PlateSearchModal />
        <WeaponSearchModal />
        <CreateBoloModal messageType='leo-message' to='/leo/dash' />
        <NotepadModal />
        <CreateWrittenWarningModal penalCodes={this.state.penalCodes} />
        <CreateTicketModal penalCodes={this.state.penalCodes} />
        <CreateArrestReportModal penalCodes={this.state.penalCodes} />
        <SelectOfficerModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  message: state.message.content,
  aop: state.aop.aop,
});

export default connect(mapStateToProps, {
  getAop,
  removeMessage,
})(LeoDashboard);

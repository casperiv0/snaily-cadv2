import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAop } from '../../../actions/otherActions';
import EmsFdStatuses from './EmsFdStatuses';
import SelectEmsFdModal from './Modals/SelectEmsFdModal';
import SuccessMessage from '../../Partials/Messages/SuccessMessage';
import io from "socket.io-client";
import { backendURL } from '../../../config/config';
import lang from "../../../language.json";
const socket = io(backendURL);

class TopArea extends Component {
  componentDidMount() {
    this.props.getAop();

    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('ems-fd-message')
    );

    // Listen for AOP update
    socket.on("updateAop", this.props.getAop);
  }

  render() {
    const { aop, message } = this.props;
    return (
      <div>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <div className='card bg-dark mx-auto mb-4'>
          <div className='card-header text-light bolder d-flex justify-content-between'>
            <h3>{lang.global.utility_panel} - AOP: {aop}</h3>
            <button
              onClick={() => {
                document.location.reload();
              }}
              className='btn btn-secondary'>
              {lang.global.refresh}
            </button>
          </div>
          <div className='card-body row'>
            <a
              className='btn btn-primary bg-primary text-light mt-2'
              href='/ems-fd/deputies'>
              {lang.ems_fd.my_ems_fd}
            </a>

            <button
              className='btn btn-secondary bg-secondary text-light mt-2 ml-2'
              data-target='#searchMedicalRecords'
              data-toggle='modal'>
              {lang.global.medical_search}
            </button>

            <button
              className='btn text-light btn-secondary bg-secondary  ml-2 mt-2'
              data-target='#notepad'
              data-toggle='modal'>
              {lang.global.notepad}
            </button>
          </div>
          <EmsFdStatuses />
          <SelectEmsFdModal />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  aop: state.aop.aop,
  message: state.message.content,
});

export default connect(mapStateToProps, { getAop })(TopArea);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCurrentOfficerStatus,
  setOfficerStatus,
} from '../../../actions/officerActions';
import { setMessage } from '../../../actions/messageActions';
import Cookies from 'js-cookie';
import lang from "../../../language.json"

class LeoStatuses extends Component {
  updateStatus = (e) => {
    const officerId = Cookies.get('on-duty-officerId');

    this.props.setOfficerStatus(officerId, e.target.value);
    this.props.setMessage(`${lang.global.changed_status} ${e.target.value}`);
  };
  
  componentDidMount() {
    const officerId = Cookies.get('on-duty-officerId');
    this.props.getCurrentOfficerStatus(officerId);
  }

  render() {
    const { status, status2 } = this.props;
    
    return (
      <div className='card-footer'>
        <button
          type='button'
          className={
            '10-8' === status2
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }
          data-toggle='modal'
          data-target='#selectOfficerModal'>
          10-8
        </button>
        <button
          disabled={!status}
          onClick={this.updateStatus}
          name='status2'
          value='10-7'
          className={
            '10-7' === status2
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-7
        </button>
        <button
          disabled={!status}
          onClick={this.updateStatus}
          name='status2'
          value='10-6'
          className={
            '10-6' === status2
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-6
        </button>
        <button
          disabled={!status}
          onClick={this.updateStatus}
          name='status2'
          value='10-5'
          className={
            '10-5' === status2
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-5
        </button>
        <button
          disabled={!status}
          onClick={this.updateStatus}
          name='status2'
          value='10-14'
          className={
            '10-14' === status2
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-14
        </button>
        <button
          disabled={!status}
          onClick={this.updateStatus}
          name='status2'
          value='10-15'
          className={
            '10-15' === status2
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-15
        </button>
        <button
          disabled={!status}
          onClick={this.updateStatus}
          name='status2'
          value='10-17'
          className={
            '10-17' === status2
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-17
        </button>
        <button
          disabled={!status}
          onClick={this.updateStatus}
          name='status2'
          value='10-97'
          className={
            '10-97' === status2
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          10-97
        </button>
        <button
          disabled={!status}
          onClick={this.updateStatus}
          name='status2'
          value='code 5'
          className={
            'code 5' === status2
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          Code 5
        </button>
        <button
          disabled={!status}
          onClick={this.updateStatus}
          name='status2'
          value='code 6'
          className={
            'code 6' === status2
              ? 'btn col-sm-1 mr-2 btn-primary'
              : 'btn col-sm-1 mr-2 btn-secondary'
          }>
          Code 6
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.officer.status,
  status2: state.officer.status2,
});

export default connect(mapStateToProps, {
  getCurrentOfficerStatus,
  setOfficerStatus,
  setMessage,
})(LeoStatuses);

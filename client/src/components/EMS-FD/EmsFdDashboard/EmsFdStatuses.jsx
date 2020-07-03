import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { setEmsFdStatus, getEmsFdStatus } from '../../../actions/emsFdActions';

class EmsFdStatuses extends Component {
  constructor() {
    super();

    this.state = {
      status2: Cookies.get('ems-fd-status2'),
      currentStatus: '',
    };
  }

  updateStatus = (e) => {
    const deputyId = Cookies.get('on-duty-ems-fdId');

    this.props.setEmsFdStatus(deputyId, e.target.value)
  };

  getCurrentStatus = () => {
    const deputyId = Cookies.get('on-duty-ems-fdId');

    this.props.getEmsFdStatus(deputyId);
  };

  onClick = (e) => {
    Cookies.set('status2', e.target.value);
    this.setState({
      status2: e.target.value,
    });
  };

  componentDidMount() {
    this.getCurrentStatus();
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
          data-target='#selectEmsFdModal'>
          10-8
        </button>
        <button
          disabled={status === "off-duty" || !status}
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
          disabled={status === "off-duty" || !status}
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
          disabled={status === "off-duty" || !status}
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
          disabled={status === "off-duty" || !status}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.ems.status,
  status2: state.ems.status2,
});

export default connect(mapStateToProps, { getEmsFdStatus, setEmsFdStatus })(
  EmsFdStatuses
);

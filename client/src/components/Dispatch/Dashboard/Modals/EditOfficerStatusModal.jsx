import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import {
  getCurrentOfficerStatus,
  setOfficerStatus,
  setOffDuty,
} from '../../../../actions/officerActions';
import { getAllActiveUnits } from '../../../../actions/dispatchActions';
import { setMessage } from '../../../../actions/messageActions';

class EditOfficerStatusModal extends Component {
  constructor() {
    super();

    this.state = {
      status: '',
      status2: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { status, status2 } = this.state;
    console.log(status, status2);

    if (status.toLowerCase() === 'off-duty') {
      this.props.setOffDuty(this.props.id);
      Cookies.remove('on-duty-officerId');
    }

    if (status.toLowerCase() === 'on-duty') {
      this.props.setOfficerStatus(this.props.id, this.state.status2);
    }

    document.getElementById('closeEditStatusOfficer' + this.props.id).click();
    this.props.setMessage(
      `Successfully changed status for ${this.props.officerName}`
    );

    setTimeout(() => this.props.getAllActiveUnits(), 200);
  };

  componentDidMount() {
    this.setState({
      status: this.props.status,
      status2: this.props.status2,
    });
  }

  render() {
    const { id, status, status2 } = this.props;
    return (
      <td
        className='modal fade'
        id={'editStatusOfficer' + id}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Update Officer Status
              </h5>
              <button
                type='button'
                id={'closeEditStatusOfficer' + id}
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='status'>Set On-duty Or Off-duty</label>
                  <select
                    name='status'
                    id='status'
                    className='form-control bg-secondary border-secondary text-light'
                    onChange={this.onChange}>
                    <option value={status}>{status}</option>
                    <option disabled>--------</option>
                    <option value='on-duty'>On-duty</option>
                    <option value='off-duty'>Off-duty</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='status'>Update Global Status</label>
                  <select
                    name='status2'
                    id='status2'
                    className='form-control bg-secondary border-secondary text-light'
                    onChange={this.onChange}>
                    <option value={status2}>{status2}</option>
                    <option disabled>--------</option>
                    <option value='10-8'>10-8</option>
                    <option value='10-7'>10-7</option>
                    <option value='10-6'>10-6</option>
                    <option value='10-5'>10-5</option>
                    <option value='10-12'>10-12</option>
                    <option value='10-11'>10-11</option>
                    <option value='10-97'>10-97</option>
                    <option value='code 5'>code 5</option>
                  </select>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Cancel
                </button>
                <button type='submit' className='btn btn-primary'>
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      </td>
    );
  }
}

export default connect(null, {
  getCurrentOfficerStatus,
  setOfficerStatus,
  getAllActiveUnits,
  setMessage,
  setOffDuty,
})(EditOfficerStatusModal);

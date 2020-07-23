import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEmsFdStatus, setOffDuty } from './../../../../actions/emsFdActions';
import { setMessage } from './../../../../actions/messageActions';
import lang from '../../../../language.json';

class EditEmsFdStatusModal extends Component {
  constructor() {
    super();

    this.state = {
      emsStatus: '',
      emsStatus2: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { emsStatus, emsStatus2 } = this.state;

    if (emsStatus.toLowerCase() === 'off-duty') {
      this.props.setOffDuty(this.props.id);
    }

    if (emsStatus.toLowerCase() === 'on-duty') {
      this.props.setEmsFdStatus(this.props.id, emsStatus2);
    }

    this.props.setMessage(lang.dispatch.updated_status_2);
    document.getElementById('closeEditStatusEmsFd' + this.props.id).click();
  };

  componentDidMount() {
    this.setState({
      emsStatus: this.props.status,
      emsStatus2: this.props.status2,
    });
  }

  render() {
    const { id, status, status2 } = this.props;
    return (
      <td
        className='modal fade'
        id={'editStatusEmsFd' + id}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                {lang.dispatch.update_status}
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                id={'closeEditStatusEmsFd' + id}
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='status'>
                    {lang.dispatch.set_on_off_duty}
                  </label>
                  <select
                    name='emsStatus'
                    id='emsStatus'
                    className='form-control bg-secondary border-secondary text-light'
                    onChange={this.onChange}>
                    <option value={status}>{status}</option>
                    <option disabled>--------</option>
                    <option value='on-duty'>On-duty</option>
                    <option value='off-duty'>Off-duty</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='status'>{lang.dispatch.global_status}</label>
                  <select
                    name='emsStatus2'
                    id='emsStatus2'
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
                  </select>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  {lang.global.cancel}
                </button>
                <button type='submit' className='btn btn-primary'>
                  {lang.dispatch.update_status}
                </button>
              </div>
            </form>
          </div>
        </div>
      </td>
    );
  }
}

export default connect(null, { setEmsFdStatus, setOffDuty, setMessage })(
  EditEmsFdStatusModal
);

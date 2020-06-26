import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { setOnDuty } from '../../../actions/officerActions';
import { setMessage } from '../../../actions/messageActions';

class SelectOfficerModal extends Component {
  constructor() {
    super();

    this.state = {
      officers: [],
      selectedOfficer: '',
    };
  }

  getOfficers = () => {
    Axios({
      url: backendURL + '/officers/myofficers',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.officers) {
          this.setState({
            officers: res.data.officers,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  onSubmit = (e) => {
    e.preventDefault();

    const officerId = this.state.selectedOfficer;
    Cookies.set("on-duty-officerId", officerId);
    document.getElementById('closeSelectOfficerModal').click();
    this.props.setOnDuty(officerId);
    this.props.setMessage('Successfully set status to 10-8');
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.getOfficers();
  }

  render() {
    const { officers } = this.state;
    return (
      <div
        className='modal fade'
        id='selectOfficerModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='selectOfficerModal'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='selectOfficerModal'>
                Please select an officer before continuing
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                id='closeSelectOfficerModal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='selectedOfficer'>
                    Select an officer to go on-duty
                  </label>
                  <select
                    className='form-control bg-secondary border-secondary text-light'
                    name='selectedOfficer'
                    id='selectedOfficer'
                    onChange={this.onChange}>
                    <option value=''>Select Officer</option>
                    {!officers[0] ? (
                      <option>You don't have any officers.</option>
                    ) : (
                      officers.map((officer, index) => {
                        return (
                          <option key={index} value={officer.id}>
                            {officer.officer_name}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Close
                </button>
                {!officers[0] ? (
                  <a href='/leo/myofficers/create' className='btn btn-primary'>
                    Create an officer
                  </a>
                ) : (
                  <button type='submit' className='btn btn-primary'>
                    Go on-duty
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  setOnDuty,
  setMessage
})(SelectOfficerModal);

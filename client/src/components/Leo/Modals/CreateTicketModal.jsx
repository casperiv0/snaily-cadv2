import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';

export default class CreateTicketModal extends Component {
  constructor() {
    super();

    this.state = {
      name2: '',
      violations: '',
      officerName2: '',
      notes2: '',
      penalCodes: [],
      postal2: '',
      error: '',
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    Axios({
      url: backendURL + '/officers/create-ticket',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        name: this.state.name2,
        officer_name: this.state.officerName2,
        postal: this.state.postal2,
        notes: this.state.notes2,
        violations: this.state.violations,
      },
    }).then((res) => {
      if (res.data.msg === 'Added') {
        sessionStorage.setItem(
          'leo-message',
          'Successfully Created Ticket, Target Name: ' + this.state.name2
        );
        return (window.location = '/leo/dash');
      }

      this.setState({
        error: res.data.msg,
      });
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.setState({
      penalCodes: this.props.penalCodes,
    });
  }

  render() {
    const {
      name2,
      violations,
      officerName2,
      notes2,
      postal2,
      penalCodes,
      error,
    } = this.state;

    return (
      <div
        className='modal fade'
        id='createTicketModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='createTicketModal'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='createTicketModal'>
                Create Ticket
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                {error ? <ErrorMessage message={error} /> : null}
                <div className='form-group'>
                  <label htmlFor='name'>Enter Name</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='name2'
                    id='name2'
                    value={name2}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='officerName2'>Enter Officer Name</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='officerName2'
                    id='officerName2'
                    value={officerName2}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='violations'>Violations</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='violations'
                    id='violations'
                    value={violations}
                    onChange={this.onChange}
                    list='penalCodes'
                  />
                  <datalist id='penalCodes'>
                    {penalCodes.map((code, index) => {
                      return (
                        <option key={index} value={code.title}>
                          {code.title}
                        </option>
                      );
                    })}
                  </datalist>
                </div>
                <div className='form-group'>
                  <label htmlFor='postal2'>Nearest Postal</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='postal2'
                    id='postal2'
                    value={postal2}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='notes2'>Notes</label>
                  <textarea
                    rows='5'
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='notes2'
                    id='notes2'
                    value={notes2}
                    onChange={this.onChange}></textarea>
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
                  Create Written Warning
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';

export default class CallTowModal extends Component {
  constructor() {
    super();

    this.state = {
      description: '',
      caller: '',
      location: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  callEmergencyServices = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/global/create-911-call',
      headers: { 'x-auth-snailycad-token': Cookies.get('__session') },
      method: "POST",
      data: {
        description: this.state.description,
        caller: this.state.caller,
        location: this.state.location,
      },
    }).then((res) => {
      if (res.data.msg === '911 was called') {
        sessionStorage.setItem('message', 'Emergency Services Were Called!');
        window.location = '/citizen';
      }
    });
  };

  render() {
    const { description, location, caller } = this.state;
    return (
      <div
        className='modal fade'
        id='call911'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Call Emergency Services
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.callEmergencyServices}>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Call Description</label>
                  <textarea
                    name='description'
                    id='description'
                    cols='30'
                    rows='5'
                    value={description}
                    onChange={this.onChange}
                    placeholder='Description'
                    className='form-control bg-secondary border-secondary text-light'
                    required></textarea>
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Caller Name</label>
                  <input
                    type='text'
                    className='form-control bg-secondary border-secondary text-light'
                    id='caller'
                    aria-describedby='emailHelp'
                    value={caller}
                    onChange={this.onChange}
                    required
                    name='caller'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputPassword1'>Caller Location</label>
                  <input
                    required
                    type='text'
                    className='form-control bg-secondary border-secondary text-light'
                    id='location'
                    placeholder='Location'
                    name='location'
                    value={location}
                    onChange={this.onChange}
                  />
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'>
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    Call
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

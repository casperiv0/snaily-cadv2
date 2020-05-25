import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';

export default class CallTowModal extends Component {
  constructor() {
    super();

    this.state = {
      towDescription: '',
      towCaller: '',
      towLocation: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  callTow = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/global/create-tow-call',
      headers: { 'x-auth-snailycad-token': Cookies.get('__session') },
      method: "POST",
      data: {
        description: this.state.towDescription,
        caller: this.state.towCaller,
        location: this.state.towLocation,
      },
    }).then((res) => {
      if (res.data.msg === 'Tow Truckers Called') {
        sessionStorage.setItem('message', 'Tow Truckers Were Called!');
        window.location = '/citizen';
      }
    });
  };

  render() {
    const { towDescription, towLocation, towCaller } = this.state;
    return (
      <div
        className='modal fade'
        id='callTow'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Call Tow Service
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
              <form onSubmit={this.callTow}>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Call Description</label>
                  <textarea
                    name='towDescription'
                    id='towDescription'
                    cols='30'
                    rows='5'
                    value={towDescription}
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
                    id='towLocation'
                    aria-describedby='emailHelp'
                    value={towLocation}
                    onChange={this.onChange}
                    required
                    name='towLocation'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputPassword1'>Caller Location</label>
                  <input
                    required
                    type='text'
                    className='form-control bg-secondary border-secondary text-light'
                    id='towCaller'
                    placeholder='towCaller'
                    name='towCaller'
                    value={towCaller}
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

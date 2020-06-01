import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';

export default class CreateWrittenWarningModal extends Component {
  constructor() {
    super();

    this.state = {
      name3: '',
      infractions: '',
      officerName3: '',
      notes3: '',
      postal3: '',
      penalCodes: [],
      loading: true,
      error: '',
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    Axios({
      url: backendURL + '/officers/create-written-warning',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        name: this.state.name3,
        officer_name: this.state.officerName3,
        postal: this.state.postal3,
        notes: this.state.notes3,
        infractions: this.state.infractions,
      },
    }).then((res) => {
      if (res.data.msg === 'Added') {
        sessionStorage.setItem(
          'leo-message',
          'Successfully Created Written Warning, Target Name: ' +
            this.state.name3
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
      name3,
      infractions,
      officerName3,
      notes3,
      postal3,
      penalCodes,
      error,
    } = this.state;

    return (
      <div
        className='modal fade'
        id='createWarningModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Create Written Warning
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
                    name='name3'
                    id='name3'
                    value={name3}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='officerName3'>Enter Officer Name</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='officerName3'
                    id='officerName3'
                    value={officerName3}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='infractions'>Infractions</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='infractions'
                    id='infractions'
                    value={infractions}
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
                  <label htmlFor='postal3'>Nearest Postal</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='postal3'
                    id='postal3'
                    value={postal3}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='notes3'>Notes</label>
                  <textarea
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='notes3'
                    id='notes3'
                    value={notes3}
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

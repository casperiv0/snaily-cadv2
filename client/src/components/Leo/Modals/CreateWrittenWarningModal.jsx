import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../Partials/LoadingArea';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';

export default class CreateWrittenWarningModal extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      infractions: '',
      officerName: '',
      notes: '',
      postal: '',
      penalCodes: [],
      loading: true,
      error: '',
    };
  }
  onSubmit = (e) => {
      e.preventDefault();
    Axios({
      url: backendURL + '/officers/create-written-warning',
      method: "POST",
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        name: this.state.name,
        officer_name: this.state.officerName,
        postal: this.state.postal,
        notes: this.state.notes,
        infractions: this.state.infractions,
      },
    }).then((res) => {
      if (res.data.msg === 'Added') {
        sessionStorage.setItem(
          'leo-message',
          'Successfully Created Written Warning, Target Name: ' +
            this.state.name
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

  getPenalCodes = () => {
    Axios({
      url: backendURL + '/officers/penal-codes',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.penalCodes) {
          this.setState({
            loading: false,
            penalCodes: res.data.penalCodes,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getPenalCodes();
  }

  render() {
    const {
      name,
      infractions,
      officerName,
      notes,
      postal,
      penalCodes,
      loading,
      error,
    } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

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
                    name='name'
                    id='name'
                    value={name}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='officerName'>Enter Officer Name</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='officerName'
                    id='officerName'
                    value={officerName}
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
                  <label htmlFor='postal'>Nearest Postal</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='postal'
                    id='postal'
                    value={postal}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='notes'>Notes</label>
                  <textarea
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='notes'
                    id='notes'
                    value={notes}
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

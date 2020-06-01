import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../Partials/Messages/ErrorMessage';

export default class CreateBoloModal extends Component {
  constructor() {
    super();

    this.state = {
      type: 'person',
      name: '',
      plate: '',
      color: '',
      boloDescription: '',
      message: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/global/add-bolo',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        type: this.state.type,
        description: this.state.boloDescription,
        plate: this.state.plate,
        color: this.state.color,
        name: this.state.name,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Added') {
          sessionStorage.setItem(this.props.messageType, 'Successfully Added Bolo');
          return (window.location = this.props.to);
        }

        this.setState({
          message: res.data.msg,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { type, name, plate, color, boloDescription, message } = this.state;
    return (
      <div
        className='modal fade'
        id='createBoloModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Create Bolo
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
                {message ? <ErrorMessage message={message} dismiss /> : null}
                <div className='form-group'>
                  <label htmlFor='type'>Select Type</label>
                  <select
                    className='form-control bg-secondary border-secondary text-light'
                    name='type'
                    id='type'
                    onChange={this.onChange}>
                    <option value='person'>Person</option>
                    <option value='vehicle'>Vehicle</option>
                    <option value='other'>Other</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>Enter Description</label>
                  <textarea
                    type='text'
                    name='boloDescription'
                    id='boloDescription'
                    rows='5'
                    cols='30'
                    className='form-control bg-secondary border-secondary text-light'
                    onChange={this.onChange}
                    value={boloDescription}></textarea>
                </div>
                {type === 'person' ? (
                  <div className='form-group'>
                    <label htmlFor='name'>
                      Enter Person Name (If Possible)
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      className='form-control bg-secondary border-secondary text-light'
                      onChange={this.onChange}
                      value={name}
                    />
                  </div>
                ) : type === 'vehicle' ? (
                  <div>
                    <div className='form-group'>
                      <label htmlFor='plate'>
                        Enter Vehicle Plate (If Possible)
                      </label>
                      <input
                        type='text'
                        name='plate'
                        id='plate'
                        className='form-control bg-secondary border-secondary text-light'
                        onChange={this.onChange}
                        value={plate}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='color'>
                        Enter Vehicle Color (If Possible)
                      </label>
                      <input
                        type='text'
                        name='color'
                        id='color'
                        className='form-control bg-secondary border-secondary text-light'
                        onChange={this.onChange}
                        value={color}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Close
                </button>
                <button type='submit' disabled={boloDescription === ""} className='btn btn-primary'>
                  Create Bolo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

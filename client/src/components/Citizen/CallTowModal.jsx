import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTowCall } from '../../actions/towCallActions';
import lang from '../../language.json';

class CallTowModal extends Component {
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
    const data = {
      description: this.state.towDescription,
      caller: this.state.towCaller,
      location: this.state.towLocation,
    };
    document.getElementById('closeCallTow').click();
    this.props.createTowCall(data);
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
                {lang.calls.tow_service}
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                id='closeCallTow'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.callTow}>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>
                    {lang.global.description}
                  </label>
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
                  <label htmlFor='exampleInputEmail1'>
                    {lang.global.caller}
                  </label>
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
                  <label htmlFor='exampleInputPassword1'>
                    {lang.global.location}
                  </label>
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
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  {lang.global.close}
                </button>
                <button type='submit' className='btn btn-primary'>
                  {lang.calls.call}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createTowCall })(CallTowModal);

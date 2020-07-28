import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../actions/messageActions';
import { create911Call } from '../../actions/911CallsActions';
import lang from '../../language.json';

class callEmergencyServices extends Component {
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

  create911Call = (e) => {
    e.preventDefault();

    const data = {
      description: this.state.description,
      caller: this.state.caller,
      location: this.state.location,
    };
    this.props.create911Call(data);

    document.getElementById('closeCall911').click();

    this.props.setMessage(lang.citizen.call_created);

    this.setState({
      description: '',
      caller: '',
      location: '',
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
                {lang.citizen.call_911}
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                id='closeCall911'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.create911Call}>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>
                    {lang.dispatch.call_desc}
                  </label>
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
                  <label htmlFor='exampleInputEmail1'>
                    {lang.dispatch.caller_name}
                  </label>
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
                  <label htmlFor='exampleInputPassword1'>
                    {lang.dispatch.caller_location}
                  </label>
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
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  {lang.global.close}
                </button>
                <button type='submit' className='btn btn-primary'>
                  {lang.global.call}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { create911Call, setMessage })(
  callEmergencyServices
);

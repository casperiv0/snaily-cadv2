import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../actions/messageActions';
import { createWarrant } from '../../actions/recordActions';
import ErrorMessage from '../Partials/Messages/ErrorMessage';
import lang from "../../language.json"

class CreateWarrant extends Component {
  constructor() {
    super();

    this.state = {
      fullName: '',
      status: lang.record.active,
      details: '',
      error: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullName: this.state.fullName,
      status: this.state.status,
      details: this.state.details,
    };
    this.props.createWarrant(data);
    
    this.setState({
      fullName: '',
      status: lang.record.active,
      details: '',
    });
  };

  render() {
    const { status, fullName, details, error } = this.state;
    return (
      <div className='col-md-3 list-group'>
        <div className='list-group-item bg-secondary border-secondary text-light'>
          {lang.global.create_warrant}
        </div>
        <form
          className='list-group-item bg-dark border-dark'
          onSubmit={this.onSubmit}>
          {error ? <ErrorMessage message={error} /> : null}
          <div className='form-group'>
            <label htmlFor='fullName'>{lang.record.enter_full_name}</label>
            <input
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='fullName'
              id='fullName'
              value={fullName}
              onChange={this.onChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='status'>{lang.record.select_status}</label>
            <select
              className='form-control bg-secondary border-secondary text-light'
              value={status}
              name='status'
              id='status'
              onChange={this.onChange}>
              <option value='active'>{lang.record.active} </option>
              <option value='inactive'>{lang.record.inactive}</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='details'>{lang.record.enter_details}</label>
            <input
              className='form-control bg-secondary border-secondary text-light'
              type='text'
              name='details'
              id='details'
              value={details}
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-success container'>
              {lang.global.create_warrant}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { setMessage, createWarrant })(CreateWarrant);

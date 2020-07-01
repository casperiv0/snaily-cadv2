import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../actions/messageActions';
import { createWarrant } from '../../actions/recordActions';
import ErrorMessage from '../Partials/Messages/ErrorMessage';

class CreateWarrant extends Component {
  constructor() {
    super();

    this.state = {
      fullName: '',
      status: 'Active',
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

    this.props.setMessage(
      `Successfully created warrant, Target name: ${this.state.fullName}`
    );
  };

  render() {
    const { status, fullName, details, error } = this.state;
    return (
      <div className='col-md-3 list-group'>
        <div className='list-group-item bg-secondary border-secondary text-light'>
          Create Warrant
        </div>
        <form
          className='list-group-item bg-dark border-dark'
          onSubmit={this.onSubmit}>
          {error ? <ErrorMessage message={error} /> : null}
          <div className='form-group'>
            <label htmlFor='fullName'>Enter Full Name</label>
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
            <label htmlFor='status'>Select Status</label>
            <select
              className='form-control bg-secondary border-secondary text-light'
              value={status}
              name='status'
              id='status'
              onChange={this.onChange}>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='details'>Enter Details</label>
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
              Create Warrant
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { setMessage, createWarrant })(CreateWarrant);

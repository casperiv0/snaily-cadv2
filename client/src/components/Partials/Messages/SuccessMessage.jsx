import React, { Component } from 'react';

export default class SuccessMessage extends Component {
  render() {
    const message = sessionStorage.getItem('message');
    return (
      <div className='alert alert-dismissible alert-success'>
        {message}
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    );
  }
}

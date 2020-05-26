import React, { Component } from 'react';

export default class ErrorMessage extends Component {
  render() {
    return (
      <div className='alert alert-dismissible alert-warning'>
        {this.props.message}
        {
          this.props.dismiss ?   <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button> : null
        }
      </div>
    );
  }
}

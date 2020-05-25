import React, { Component } from 'react';

export default class SuccessMessage extends Component {
  dismiss = () => {
    sessionStorage.removeItem('admin-message');
  };

  render() {
    const { message } = this.props;
    return (
      <div className='alert alert-dismissible alert-success'>
        {message}
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          onClick={this.dismiss}
          aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    );
  }
}

import React, { Component } from 'react';

export default class ErrorMessage extends Component {
  render() {
    const { color, message, dismiss } = this.props;
    if (!message) {
      return new Error('prop message is required!');
    }
    const classes = color
      ? 'alert alert-dismissible alert-' + color
      : 'alert alert-dismissible alert-warning';
    return (
      <div className={classes}>
        {message}
        {dismiss ? (
          <button
            type='button'
            className='close'
            data-dismiss='alert'
            aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
        ) : null}
      </div>
    );
  }
}

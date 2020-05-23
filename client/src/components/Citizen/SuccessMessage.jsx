import React, { Component } from 'react';
import { Alert } from '@material-ui/lab';

export default class SuccessMessage extends Component {
  constructor() {
    super();

    this.state = {
      message: sessionStorage.getItem('message'),
    };
  }

  render() {
    return (
      <div className=''>
        <Alert variant='filled' severity='success' className='mb-2'>
          {this.state.message}
        </Alert>
      </div>
    );
  }
}

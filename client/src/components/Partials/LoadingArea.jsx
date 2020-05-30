import React, { Component } from 'react';
import Spinner from '@material-ui/core/CircularProgress';

export default class LoadingArea extends Component {
  render() {
    return (
      <div className='col d-flex justify-content-center' style={{ width: '100%' }}>
        <Spinner />
      </div>
    );
  }
}

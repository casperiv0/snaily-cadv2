import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NoCitizensMessage extends Component {
  render() {
    return (
      <div className='alert alert-dismissible alert-warning'>
        You don't have any citizens! Create one{' '}
        <Link to='/citizen/create'>Here</Link>
      </div>
    );
  }
}

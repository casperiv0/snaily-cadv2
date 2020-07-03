import React, { Component } from 'react';

export default class TowCallBox extends Component {
  cancelTowCall = () => {
    const id = this.props.id;
    this.props.cancelTowCall(id);
  };

  render() {
    const { caller, location, description } = this.props;
    return (
      <li className='list-group-item bg-dark border-secondary text-light'>
        <span className='font-weight-bold'>Description:</span> {description}{' '}
        <br />
        <span className='font-weight-bold'>Location:</span> {location} <br />
        <span className='font-weight-bold'>Caller:</span> {caller} <br />
        <div className='float-right'>
          <button onClick={this.cancelTowCall} className='btn btn-success'>
            End Call
          </button>
        </div>
      </li>
    );
  }
}

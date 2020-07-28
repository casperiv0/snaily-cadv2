import React, { Component } from 'react';
import lang from '../../language.json';


export default class TowCallBox extends Component {
  cancelTowCall = () => {
    const id = this.props.id;
    this.props.cancelTowCall(id);
  };

  render() {
    const { caller, location, description } = this.props;
    return (
      <li className='list-group-item bg-dark border-secondary text-light'>
        <span className='font-weight-bold'>{lang.global.description}:</span> {description}{' '}
        <br />
        <span className='font-weight-bold'>{lang.global.location}:</span> {location} <br />
        <span className='font-weight-bold'>{lang.global.caller}:</span> {caller} <br />
        <div className='float-right'>
          <button onClick={this.cancelTowCall} className='btn btn-success'>
            {lang.tow.end_call}
          </button>
        </div>
      </li>
    );
  }
}

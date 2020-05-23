import React, { Component } from 'react';

export default class componentName extends Component {
  render() {
    const { dmv, ccw, pilotLicense, firearmsLicense } = this.props;
    return (
      <div className='card bg-dark border-dark mt-3 text-light'>
        <div className='card-header'>
          <h3>
            Licenses
            <a
              href={`/licenses/edit/${this.props.citizenId}`}
              className='btn btn-primary float-right'>
              Edit Licenses
            </a>
          </h3>
        </div>

        <div className='card-body'>
          <span className='font-weight-bold'>Driver License:</span>
          <span id='dmv'> {dmv}</span> <br />
          <span className='font-weight-bold'> Firearms License: </span> {firearmsLicense}
          <br />
          <span className='font-weight-bold'>Pilot License: </span> {pilotLicense} <br />
          <span className='font-weight-bold'> CCW License:</span> {ccw} <br />
        </div>
      </div>
    );
  }
}

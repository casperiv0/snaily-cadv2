import React, { Component } from 'react';
import lang from '../../../language.json';

export default class componentName extends Component {
  render() {
    const { dmv, ccw, pilotLicense, firearmsLicense } = this.props;
    return (
      <div className='card bg-dark border-dark mt-3 text-light'>
        <div className='card-header'>
          <h3>
            {lang.citizen.licenses}
            <a
              href={`/licenses/edit/${this.props.citizenId}`}
              className='btn btn-primary float-right'>
              {lang.citizen.license.edit}
            </a>
          </h3>
        </div>

        <div className='card-body'>
          <span className='font-weight-bold'>{lang.citizen.license.dmv}:</span>
          <span id='dmv'> {dmv}</span> <br />
          <span className='font-weight-bold'>{lang.citizen.license.firearms}: </span>{' '}
          {firearmsLicense}
          <br />
          <span className='font-weight-bold'>{lang.citizen.license.pilot}: </span>{' '}
          {pilotLicense} <br />
          <span className='font-weight-bold'>{lang.citizen.license.ccw}:</span> {ccw} <br />
        </div>
      </div>
    );
  }
}

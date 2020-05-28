import React, { Component } from 'react';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';
import { backendURL } from '../../../config/config';

export default class NamSearchResults extends Component {
  render() {
    const {
      tickets,
      warnings,
      arrestReports,
      warrants,
      generalInfo,
      registeredVehicles,
      registeredWeapons,
    } = this.props;
    return (
      <div className=''>
        {!warrants[0] ? null : (
          <ErrorMessage
            color='danger'
            message='WARNING: Person has 1 or more warrants'
          />
        )}
        <div className='row'>
          <div className='col-md-6'>
            <h5 className='card-title bolder text-light'>
              General Information
            </h5>
            <div id='generalInformation' className='text-light list-group'>
              <div>
                <span className='font-weight-bold'>Full Name:</span>{' '}
                {generalInfo.full_name}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>Date Of Birth:</span>{' '}
                {generalInfo.birth}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>Gender:</span>{' '}
                {generalInfo.gender}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>Ethnicity:</span>{' '}
                {generalInfo.ethnicity}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>Hair Color:</span>{' '}
                {generalInfo.hair_color}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>Eye Color:</span>{' '}
                {generalInfo.eye_color}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>Address:</span>{' '}
                {generalInfo.address}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>Height / Weight:</span>{' '}
                {generalInfo.height} / {generalInfo.weight} <br />
              </div>
              <div>
                <span className='font-weight-bold'>Employer:</span>{' '}
                {generalInfo.business} <br />
              </div>
              <img className="rounded mt-2" style={{width: "140px"}} src={backendURL+"/citizen-pictures/"+generalInfo.citizen_picture} alt=""/>
            </div>
          </div>
          <div className='col-md-6'>
            <h5 className='card-title bolder text-light'>Licenses</h5>
            <div id='generalInformation' className='list-group'>
              <div>
                <span className='font-weight-bold'>Drivers License: </span>
                {generalInfo.dmv}
              </div>
              <div>
                <span className='font-weight-bold'>Firearms License: </span>
                {generalInfo.fire_license}
              </div>
              <div>
                <span className='font-weight-bold'>Pilots License: </span>
                {generalInfo.pilot_license}
              </div>
              <div>
                <span className='font-weight-bold'>CCW: </span>
                {generalInfo.ccw}
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <button
            className='btn btn-primary col-md-6 mt-3'
            type='button'
            data-toggle='collapse'
            data-target='#record'
            aria-expanded='false'
            aria-controls='record'>
            Toggle Record
          </button>
          <button
            className='btn btn-primary col-md-6 ml-2 mt-3'
            type='button'
            data-toggle='collapse'
            data-target='#registered'
            aria-expanded='false'
            aria-controls='registered'>
            Toggle Registered Vehicles & Weapons
          </button>
        </div>
        <div className='collapse' id='record'>
          <div className='row mt-3'>
            <div className='col'>
              <h5 className='card-title bolder text-light'>
                Written Warnings ({warnings.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '18rem' }}>
                {!warnings[0] ? (
                  <div className='list-group-item  border-dark text-dark'>
                    Person Doesn't have any written warnings.
                  </div>
                ) : (
                  warnings.map((warning, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>Infractions: </span>{' '}
                        {warning.infractions}
                        <br />
                        <span className='font-weight-bold'>Given On: </span>
                        {warning.date}
                        <br />
                        <span className='font-weight-bold'>Given By: </span>
                        {warning.officer_name}
                        <br />
                        <span className='font-weight-bold'>
                          Nearest Postal:{' '}
                        </span>
                        {warning.postal}
                        <br />
                        <span className='font-weight-bold'>Notes: </span>
                        {warning.notes}
                        <br />
                      </li>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col'>
              <h5 className='card-title bolder text-light'>
                Tickets ({tickets.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '18rem' }}>
                {!tickets[0] ? (
                  <div className='list-group-item border-dark text-dark'>
                    Person Doesn't have any tickets.
                  </div>
                ) : (
                  tickets.map((ticket, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>Violations: </span>
                        {ticket.violations}
                        <br />
                        <span className='font-weight-bold'>Given On: </span>
                        {ticket.date}
                        <br />
                        <span className='font-weight-bold'>Given By: </span>
                        {ticket.officer_name}
                        <br />
                        <span className='font-weight-bold'>
                          Nearest Postal:{' '}
                        </span>
                        {ticket.postal}
                        <br />
                        <span className='font-weight-bold'>Notes: </span>
                        {ticket.notes}
                        <br />
                      </li>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col'>
              <h5 className='card-title bolder text-light'>
                Arrest Reports ({arrestReports.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '18rem' }}>
                {!arrestReports[0] ? (
                  <div className='list-group-item border-dark text-dark'>
                    Person Doesn't have any arrest reports.
                  </div>
                ) : (
                  arrestReports.map((report, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>Charges: </span>
                        {report.charges} <br />
                        <span className='font-weight-bold'>Given On: </span>
                        {report.date}
                        <br />
                        <span className='font-weight-bold'>Given By: </span>
                        {report.officer_name}
                        <br />
                        <span className='font-weight-bold'>
                          Nearest Postal:{' '}
                        </span>
                        {report.postal}
                        <br />
                        <span className='font-weight-bold'>Notes: </span>
                        {report.notes}
                        <br />
                      </li>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col'>
              <h5 className='card-title bolder text-light'>
                Warrants ({warrants.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '18rem' }}>
                {!warrants[0] ? (
                  <div className='list-group-item border-dark text-dark'>
                    Person Doesn't have any warrants.
                  </div>
                ) : (
                  warrants.map((warrant, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>Warrant: </span>
                        {warrant.reason} <br />
                        <span className='font-weight-bold'>Status: </span>
                        {warrant.status}
                      </li>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='collapse' id='registered'>
          <div className='row mt-3'>
            <div className='col'>
              <h5 className='card-title bolder text-light'>
                Registered Vehicles ({registeredVehicles.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '25rem' }}>
                {!registeredVehicles[0] ? (
                  <div className='list-group-item border-dark text-dark'>
                    Person Doesn't have any registered vehicles.
                  </div>
                ) : (
                  registeredVehicles.map((vehicle, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>Vehicle: </span>
                        {vehicle.vehicle} <br />
                        <span className='font-weight-bold'>Owner: </span>
                        {vehicle.owner} <br />
                        <span className='font-weight-bold'>VIN Number: </span>
                        {vehicle.vin_number} <br />
                        <span className='font-weight-bold'>Status: </span>
                        {vehicle.in_status} <br />
                        <span className='font-weight-bold'>Plate: </span>
                        {vehicle.plate} <br />
                        <span className='font-weight-bold'>Color: </span>
                        {vehicle.color}
                      </li>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col'>
              <h5 className='card-title bolder text-light'>
                Registered Weapons ({registeredWeapons.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '25rem' }}>
                {!registeredWeapons[0] ? (
                  <div className='list-group-item border-dark text-dark'>
                    Person Doesn't have any registered weapons.
                  </div>
                ) : (
                  registeredWeapons.map((weapon, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>Weapon: </span>
                        {weapon.weapon} <br />
                        <span className='font-weight-bold'>Owner: </span>
                        {weapon.owner} <br />
                        <span className='font-weight-bold'>Serial Number: </span>
                        {weapon.serial_number} <br />
                        <span className='font-weight-bold'>Status: </span>
                        {weapon.status} <br />
                      </li>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
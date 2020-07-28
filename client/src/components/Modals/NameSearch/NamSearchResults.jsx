import React, { Component } from 'react';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';
import { backendURL } from '../../../config/config';
import lang from '../../../language.json';

export default class NamSearchResults extends Component {
  updateWarrantStatus = (warrantId) => {
    this.props.updateWarrantStatus(warrantId);
  };

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
          <ErrorMessage color='danger' message={lang.record.has_warrant} />
        )}
        <div className='row'>
          <div className='col-md-6'>
            <h5 className='card-title bolder text-light'>
              {lang.admin.cad_settings.general_info}
            </h5>
            <div id='generalInformation' className='text-light list-group'>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.full_name}:
                </span>{' '}
                {generalInfo.full_name}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.date_of_birth}:
                </span>{' '}
                {generalInfo.birth}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>{lang.citizen.gender}:</span>{' '}
                {generalInfo.gender}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.ethnicity}:
                </span>{' '}
                {generalInfo.ethnicity}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.hair_color}:
                </span>{' '}
                {generalInfo.hair_color}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.eye_color}:
                </span>{' '}
                {generalInfo.eye_color}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.address}:
                </span>{' '}
                {generalInfo.address}
                <br />
              </div>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.hei_wei}:
                </span>{' '}
                {generalInfo.height} / {generalInfo.weight} <br />
              </div>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.employer}:
                </span>{' '}
                {generalInfo.business} <br />
              </div>
              <img
                className='rounded mt-2'
                style={{ width: '140px' }}
                src={
                  backendURL +
                  '/citizen-pictures/' +
                  generalInfo.citizen_picture
                }
                alt=''
              />
            </div>
          </div>
          <div className='col-md-6'>
            <h5 className='card-title bolder text-light'>
              {lang.citizen.licenses}
            </h5>
            <div id='generalInformation' className='list-group'>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.license.dmv}:{' '}
                </span>
                {generalInfo.dmv}
              </div>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.license.firearms}:{' '}
                </span>
                {generalInfo.fire_license}
              </div>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.license.pilot}:{' '}
                </span>
                {generalInfo.pilot_license}
              </div>
              <div>
                <span className='font-weight-bold'>
                  {lang.citizen.license.ccw}:{' '}
                </span>
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
            {lang.citizen.toggle_record}
          </button>
          <button
            className='btn btn-primary col-md-6 ml-2 mt-3'
            type='button'
            data-toggle='collapse'
            data-target='#registered'
            aria-expanded='false'
            aria-controls='registered'>
            {lang.citizen.toggle_veh_wea}
          </button>
        </div>
        <div className='collapse' id='record'>
          <div className='row mt-3'>
            <div className='col'>
              <h5 className='card-title bolder text-light'>
                {lang.record.warnings} ({warnings.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '18rem' }}>
                {!warnings[0] ? (
                  <div className='list-group-item  border-dark text-dark'>
                    {lang.record.no_war}
                  </div>
                ) : (
                  warnings.map((warning, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>
                          {lang.record.infractions}:{' '}
                        </span>{' '}
                        {warning.infractions}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.record.given_on}:{' '}
                        </span>
                        {warning.date}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.record.given_by}:{' '}
                        </span>
                        {warning.officer_name}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.record.postal}:{' '}
                        </span>
                        {warning.postal}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.global.notes}:{' '}
                        </span>
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
                    {lang.record.no_tick}
                  </div>
                ) : (
                  tickets.map((ticket, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>
                          {lang.record.violations}:{' '}
                        </span>
                        {ticket.violations}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.record.given_on}:{' '}
                        </span>
                        {ticket.date}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.record.given_by}:{' '}
                        </span>
                        {ticket.officer_name}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.record.postal}:{' '}
                        </span>
                        {ticket.postal}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.global.notes}:{' '}
                        </span>
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
                {lang.record.arr_rep} ({arrestReports.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '18rem' }}>
                {!arrestReports[0] ? (
                  <div className='list-group-item border-dark text-dark'>
                    {lang.record.no_arr_rep}
                  </div>
                ) : (
                  arrestReports.map((report, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>
                          {lang.record.charges}:{' '}
                        </span>
                        {report.charges} <br />
                        <span className='font-weight-bold'>
                          {lang.record.given_on}:{' '}
                        </span>
                        {report.date}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.record.given_by}:{' '}
                        </span>
                        {report.officer_name}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.record.postal}:{' '}
                        </span>
                        {report.postal}
                        <br />
                        <span className='font-weight-bold'>
                          {lang.global.notes}:{' '}
                        </span>
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
                {lang.record.warrants} ({warrants.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '18rem' }}>
                {!warrants[0] ? (
                  <div className='list-group-item border-dark text-dark'>
                    {lang.record.no_warrants}
                  </div>
                ) : (
                  warrants.map((warrant, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark d-flex justify-content-between'>
                        <div>
                          <span className='font-weight-bold'>Warrant: </span>
                          {warrant.reason} <br />
                          <span className='font-weight-bold'>
                            {lang.dispatch.status}:{' '}
                          </span>
                          {warrant.status}
                        </div>
                        <button
                          onClick={() => {
                            this.updateWarrantStatus(warrant.id);
                          }}
                          className='btn btn-primary'>
                          {lang.record.change_status}
                        </button>
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
                {lang.citizen.vehicle.reged_vehicle} (
                {registeredVehicles.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '25rem' }}>
                {!registeredVehicles[0] ? (
                  <div className='list-group-item border-dark text-dark'>
                    {lang.record.no_vehicles}
                  </div>
                ) : (
                  registeredVehicles.map((vehicle, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>{lang.record.vehicle}: </span>
                        {vehicle.vehicle} <br />
                        <span className='font-weight-bold'>{lang.record.owner}: </span>
                        {vehicle.owner} <br />
                        <span className='font-weight-bold'>{lang.record.vin_number}: </span>
                        {vehicle.vin_number} <br />
                        <span className='font-weight-bold'>{lang.dispatch.status}: </span>
                        {vehicle.in_status} <br />
                        <span className='font-weight-bold'>{lang.global.plate}: </span>
                        {vehicle.plate.toUpperCase()} <br />
                        <span className='font-weight-bold'>{lang.global.color}: </span>
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
                {lang.citizen.weapon.reged_weapons} ({registeredWeapons.length})
              </h5>
              <div
                className='list-group scroll-bar overflow-auto'
                style={{ maxHeight: '25rem' }}>
                {!registeredWeapons[0] ? (
                  <div className='list-group-item border-dark text-dark'>
                    {lang.record.no_weapons}
                  </div>
                ) : (
                  registeredWeapons.map((weapon, index) => {
                    return (
                      <li
                        key={index}
                        className='list-group-item border-dark text-dark'>
                        <span className='font-weight-bold'>{lang.record.weapon}: </span>
                        {weapon.weapon} <br />
                        <span className='font-weight-bold'>{lang.record.owner}: </span>
                        {weapon.owner} <br />
                        <span className='font-weight-bold'>
                          {lang.citizen.weapon.serial_number}:{' '}
                        </span>
                        {weapon.serial_number} <br />
                        <span className='font-weight-bold'>{lang.dispatch.status}: </span>
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
}

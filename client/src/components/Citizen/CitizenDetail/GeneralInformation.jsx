import React, { Component } from 'react';
import { backendURL } from '../../../config/config';
import { connect } from 'react-redux';
import { deleteCitizenById } from '../../../actions/citizenActions';
import lang from '../../../language.json';

class GeneralInformation extends Component {
  deleteCitizen = () => {
    this.props.deleteCitizenById(this.props.id);
  };

  render() {
    return (
      <div className='card bg-dark border-dark text-light'>
        <div className='card-header text-light'>
          <h3>
            {lang.admin.cad_settings.general_info}
            <div className='float-right'>
              <a
                href={'/citizen/' + this.props.id + '/edit'}
                className='btn btn-success mr-2'>
                {lang.citizen.edit_citizen}
              </a>
              <button
                data-toggle='modal'
                data-target='#deleteCitizen'
                className='btn btn-danger'>
                {lang.citizen.delete_citizen}
              </button>
            </div>
          </h3>
        </div>

        <div className='card-body'>
          <div className='row ml-4 mt-2 mb-2'>
            <img
              src={backendURL + '/citizen-pictures/' + this.props.picture}
              alt={this.props.picture}
              className='rounded-circle'
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className='ml-5'>
              {/* full Name */}
              <span className='font-weight-bold'>
                {lang.citizen.full_name}:{' '}
              </span>
              {this.props.fullName} <br />
              {/* Date of birth */}
              <span className='font-weight-bold'>
                {lang.citizen.full_name}:{' '}
              </span>
              {this.props.birth} <br />
              {/* gender */}
              <span className='font-weight-bold'>{lang.citizen.gender}: </span>
              {this.props.gender} <br />
              {/* Ethnicity */}
              <span className='font-weight-bold'>
                {lang.citizen.ethnicity}:{' '}
              </span>
              {this.props.ethnicity} <br />
              {/* Hair Color */}
              <span className='font-weight-bold'>
                {lang.citizen.hair_color}:{' '}
              </span>
              {this.props.hairColor} <br />
            </div>
            <div className='ml-3'>
              {/* Eye Color */}
              <span className='font-weight-bold'>
                {lang.citizen.eye_color}:{' '}
              </span>
              {this.props.eyeColor} <br />
              {/* Address */}
              <span className='font-weight-bold'>{lang.citizen.address}: </span>
              {this.props.address} <br />
              {/* Height */}
              <span className='font-weight-bold'>{lang.citizen.height}: </span>
              {this.props.height} <br />
              {/* Weight */}
              <span className='font-weight-bold'>{lang.citizen.weight}: </span>
              {this.props.weight} <br />
              {/* Employer */}
              {this.props.employer === 'Not Working Anywhere' ? (
                <div>
                  <span className='font-weight-bold'>
                    {lang.citizen.employer}:{' '}
                  </span>
                  {lang.citizen.not_working}
                </div>
              ) : (
                <div>
                  <span className='font-weight-bold'>
                    {lang.citizen.employer}:{' '}
                  </span>
                  <a href={`/company/${this.props.id}/${this.props.employer}`}>
                    {this.props.employer}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete citizen modal */}
        <div
          className='modal fade'
          id='deleteCitizen'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content bg-dark border-dark'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  {lang.global.delete} {this.props.fullName}
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                {lang.citizen.delete_citizen_msg} {this.props.fullName}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-dark'
                  data-dismiss='modal'>
                  Cancel
                </button>
                <button
                  onClick={this.deleteCitizen}
                  type='button'
                  className='btn btn-danger'>
                  {lang.citizen.confirm_delete}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteCitizenById })(GeneralInformation);

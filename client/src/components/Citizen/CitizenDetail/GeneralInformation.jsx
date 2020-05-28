import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';

export default class GeneralInformation extends Component {
  deleteCitizen = () => {
    Axios({
      url: backendURL + '/citizen/' + this.props.id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.setItem('message', 'Successfully Deleted citizen');
          return (window.location = '/citizen');
        } else {
          console.log('There was an error deleting your citizen');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className='card bg-dark border-dark text-light'>
        <div className='card-header text-light'>
          <h3>General Information
          <div className='float-right'>
            <a
              href={'/citizen/' + this.props.id + '/edit'}
              className='btn btn-success mr-2'>
              Edit Citizen
            </a>
            <button
              data-toggle='modal'
              data-target='#deleteCitizen'
              className='btn btn-danger'>
              Delete Citizen
            </button>
          </div>
          </h3>
        </div>

        <div className='card-body'>
          <div className='row ml-4 mt-2 mb-2'>
            <img
              src={backendURL+'/citizen-pictures/' + this.props.picture}
              alt={this.props.picture}
              className='rounded-circle'
              style={{ width: '100px', height: '100px' }}
            />
            <div className='ml-5'>

              {/* full Name */}
              <span className='font-weight-bold'>Full Name: </span>
              {this.props.fullName} <br />

              {/* Date of birth */}
              <span className='font-weight-bold'>Date of Birth: </span>
              {this.props.birth} <br />

              {/* gender */}
              <span className='font-weight-bold'>Gender: </span>
              {this.props.gender} <br />

              {/* Ethnicity */}
              <span className='font-weight-bold'>Ethnicity: </span>
              {this.props.ethnicity} <br />

              {/* Hair Color */}
              <span className='font-weight-bold'>Hair Color: </span>
              {this.props.hairColor} <br />
            </div>
            <div className='ml-3'>
              {/* Eye Color */}
              
              <span className='font-weight-bold'>Eye Color: </span>
              {this.props.eyeColor} <br />

              {/* Address */}
              <span className='font-weight-bold'>Address: </span>
              {this.props.address} <br />

              {/* Height */}
              <span className='font-weight-bold'>Height: </span>
              {this.props.height} <br />

              {/* Weight */}
              <span className='font-weight-bold'>Weight: </span>
              {this.props.weight} <br />

              {/* Employer */}
              {this.props.employer === 'Not Working Anywhere' ? (
                <p>
                  <span className='font-weight-bold'>
                    Employer: Not Working Anywhere
                  </span>
                </p>
              ) : (
                <p>
                  <span className='font-weight-bold'>Employer: </span>
                  <a href={`/company/${this.props.id}/${this.props.employer}`}>
                    {this.props.employer}
                  </a>
                </p>
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
                  Delete {this.props.fullName}
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
                Are you sure you want to delete this citizen?
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
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

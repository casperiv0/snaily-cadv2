import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';

export default class CreateCompanyModal extends Component {
  constructor() {
    super();

    this.state = {
      companyName: '',
      companyOwner: '',
      whitelisted: 'false',
      loading: true,
      error:""
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
      e.preventDefault();

      axios({
        url: backendURL + '/company/create',
        method: 'POST',
        headers: {
          'x-auth-snailycad-token': Cookies.get('__session'),
        },
        data: {
            companyName: this.state.companyName,
            owner: this.state.companyOwner,
            whitelistStatus: this.state.whitelisted,
        }
      }).then(res => {
          console.log(res.data);
          
          if (res.data.msg==="Company Created") {
              sessionStorage.setItem("message", "Successfully Created Company: "+this.state.companyName);
              return window.location = "/citizen";
          }

          this.setState({
              error: res.data.msg
          })
      })
  };

  render() {
    const { companyName, companyOwners,error } = this.state;
    return (
      <div
        className='modal fade'
        id='createCompanyModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='createCompanyModal'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='createCompanyModal'>
                Create Company
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                  {error ? <ErrorMessage message={error} /> : null}
                <div className='form-group'>
                  <label htmlFor='companyName'>Enter Company Name</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='companyName'
                    id='companyName'
                    value={companyName}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='companyName'>Select Company Owner</label>
                  <select
                    className='form-control bg-secondary border-secondary text-light'
                    name='companyOwner'
                    onChange={this.onChange}
                    id='companyOwner'>
                    <option>Select Owner..</option>
                    {!this.props.owners[0] ? (
                      <option>You don't have any citizens!</option>
                    ) : (
                      this.props.owners.map((owner, index) => {
                        return (
                          <option key={index} value={owner.full_name}>
                            {owner.full_name}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='whitelisted'>Company Whitelisted</label>
                  <select
                    className='form-control bg-secondary border-secondary text-light'
                    name='whitelisted'
                    id='whitelisted'
                    onChange={this.onChange}>
                    <option value='false'>No</option>
                    <option value='true'>Yes</option>
                  </select>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Cancel
                </button>
                <button type='submit' className='btn btn-primary'>
                  Create Company
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

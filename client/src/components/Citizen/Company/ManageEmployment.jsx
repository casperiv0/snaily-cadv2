import React, { Component } from 'react';
import JoinCompanyModal from './Modals/JoinCompanyModal';
import CreateCompanyModal from './Modals/CreateCompanyModal';

export default class ManageEmployment extends Component {
  componentDidMount() {
    document.title = 'Manage Employment';
  }

  render() {
    return (
      <div className='container'>
        <button
          type='button'
          className='btn btn-secondary container mb-2'
          data-toggle='modal'
          data-target='#joinCompanyModal'>
          Join Company
        </button>
        <button
          type='button'
          className='btn btn-secondary container'
          data-toggle='modal'
          data-target='#createCompanyModal'>
          Create Company
        </button>

        <JoinCompanyModal />
        <CreateCompanyModal />
      </div>
    );
  }
}

import React, { Component } from 'react';
import Employees from './Employees/Employees';
import { backendURL } from '../../../../../config/config';
import CompanyVehicles from './CompanyVehicles';
import CompanyPending from './CompanyPending';
import SuccessMessage from "../../../../Partials/Messages/SuccessMessage"
import EditCompany from "./EditCompany"
import lang from "../../../../../language.json"

export default class ManageCompany extends Component {
  constructor() {
    super();

    this.state = {
      message: sessionStorage.getItem('company-message'),
    };
  }

  componentDidMount() {
    document.title = 'Manage Company';

    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('company-message')
    );
  }

  render() {
    const backendUrl = `${backendURL}/company/${this.props.match.params.citizenId}/${this.props.match.params.company}`;
    const companyURL = `/company/${this.props.match.params.citizenId}/${this.props.match.params.company}`;
    const { message } = this.state;
    return (
      <div className='container text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <h3>{lang.citizen.company.manage_company}</h3>

        <ul className='nav nav-tabs mt-3' id='myTab' role='tablist'>
          <li className='nav-item mr-1' role='presentation'>
            <a
              className='nav-link bg-dark border-dark text-light'
              id='home-tab'
              data-toggle='tab'
              href='#companyEmployees'
              role='tab'
              aria-controls='home'
              aria-selected='true'>
              {lang.citizen.company.employees}
            </a>
          </li>
          <li className='nav-item mr-1' role='presentation'>
            <a
              className='nav-link bg-dark border-dark text-light'
              id='profile-tab'
              data-toggle='tab'
              href='#companyVehicles'
              role='tab'
              aria-controls='profile'
              aria-selected='false'>
              {lang.admin.values.vehicles}
            </a>
          </li>
          <li className='nav-item mr-1' role='presentation'>
            <a
              className='nav-link bg-dark border-dark text-light'
              id='contact-tab'
              data-toggle='tab'
              href='#pendingCitizens'
              role='tab'
              aria-controls='contact'
              aria-selected='false'>
              {lang.citizen.company.pending}
            </a>
          </li>
          <li className='nav-item mr-1' role='presentation'>
            <a
              className='nav-link bg-dark border-dark text-light'
              id='contact-tab'
              data-toggle='tab'
              href='#editCompany'
              role='tab'
              aria-controls='contact'
              aria-selected='false'>
              {lang.citizen.company.edit_company}
            </a>
          </li>
        </ul>

        <div className='tab-content' id='myTabContent'>
          <div
            className='tab-pane fade show active'
            id='companyEmployees'
            role='tabpanel'
            aria-labelledby='home-tab'>
            <Employees backendUrl={backendUrl} companyURL={companyURL} />
          </div>
          <div
            className='tab-pane fade'
            id='companyVehicles'
            role='tabpanel'
            aria-labelledby='profile-tab'>
            <CompanyVehicles backendUrl={backendUrl} />
          </div>
          <div
            className='tab-pane fade'
            id='pendingCitizens'
            role='tabpanel'
            aria-labelledby='contact-tab'>
            <CompanyPending backendUrl={backendUrl} companyURL={companyURL} />
          </div>
          <div
            className='tab-pane fade'
            id='editCompany'
            role='tabpanel'
            aria-labelledby='contact-tab'>
            <EditCompany backendUrl={backendUrl} companyURL={companyURL} />
          </div>
        </div>
      </div>
    );
  }
}

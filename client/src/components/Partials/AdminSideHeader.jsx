import React, { Component } from 'react';

export default class AdminSideHeader extends Component {
  render() {
    return (
      <div className='col-md-3 bg-dark admin-header'>
        <div className='admin-header-icon mt-3'>
          <h3 className="text-light">Management</h3>
        </div>
        <div className='drawer-content'>
          <a className="text-light text-decoration-none" href='/admin/audit-logs'>Audit Logs</a>
          <a className="text-light text-decoration-none" href='/admin/manage/members'>Member Management</a>
          <a className="text-light text-decoration-none" href='/admin/manage/citizens'>Citizen Management</a>
          <a className="text-light text-decoration-none" href='/admin/manage/companies'>Company Management</a>
          <a className="text-light text-decoration-none" href='/admin/cad-settings'>CAD Settings</a>
        </div>
        <div className='admin-header-icon mt-3'>
          <h3 className="text-light">Values</h3>
        </div>
        <div className='drawer-content'>
          <a className="text-light text-decoration-none" href='/admin/departments'>Departments</a>
          <a className="text-light text-decoration-none" href='/admin/ethnicities'>Ethnicities</a>
          <a className="text-light text-decoration-none" href='/admin/genders'>Genders</a>
          <a className="text-light text-decoration-none" href='/admin/legal-statuses'>Legal Statuses</a>
          <a className="text-light text-decoration-none" href='/admin/vehicles'>Vehicles</a>
          <a className="text-light text-decoration-none" href='/admin/weapons'>Weapons</a>
        </div>
      </div>
    );
  }
}

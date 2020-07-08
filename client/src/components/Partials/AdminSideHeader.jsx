import React, { Component } from 'react';
import lang from "../../language.json";

export default class AdminSideHeader extends Component {
  render() {
    return (
      <div className='col-md-3 bg-dark admin-header'>
        <div className='admin-header-icon mt-3'>
          <h3 className="text-light">{lang.admin.management}</h3>
        </div>
        <div className='drawer-content'>
          <a className="text-light text-decoration-none" href='/admin/audit-logs'>{lang.admin.audit_logs}</a>
          <a className="text-light text-decoration-none" href='/admin/manage/members'>{lang.admin.member_management}</a>
          <a className="text-light text-decoration-none" href='/admin/manage/citizens'>{lang.admin.citizen_management}</a>
          <a className="text-light text-decoration-none" href='/admin/manage/companies'>{lang.admin.company_management}</a>
          <a className="text-light text-decoration-none" href='/admin/cad-settings'>{lang.admin.cad_settings.cad_settings}</a>
        </div>
        <div className='admin-header-icon mt-3'>
          <h3 className="text-light">{lang.admin.values.values}</h3>
        </div>
        <div className='drawer-content'>
          <a className="text-light text-decoration-none" href='/admin/departments'>{lang.admin.values.departments}</a>
          <a className="text-light text-decoration-none" href='/admin/ethnicities'>{lang.admin.values.ethnicities}</a>
          <a className="text-light text-decoration-none" href='/admin/genders'>{lang.admin.values.genders}</a>
          <a className="text-light text-decoration-none" href='/admin/legal-statuses'>{lang.admin.values.legal_status}</a>
          <a className="text-light text-decoration-none" href='/admin/vehicles'>{lang.admin.values.vehicles}</a>
          <a className="text-light text-decoration-none" href='/admin/weapons'>{lang.admin.values.weapons}</a>
        </div>
      </div>
    );
  }
}

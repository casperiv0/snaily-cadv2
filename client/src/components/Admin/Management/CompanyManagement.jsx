import React, { Component } from 'react';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';
import LoadingArea from '../../Partials/LoadingArea';
import SuccessMessage from '../../Partials/Messages/SuccessMessage';
import { handleRequest } from '../../../functions';
import lang from '../../../language.json';

export default class CompanyManagement extends Component {
  constructor() {
    super();

    this.state = {
      companies: [],
      filteredCompanies: [],
      loading: true,
      message: sessionStorage.getItem('admin-message'),
    };
  }

  handleSearch = (e) => {
    // Thanks to: https://codepen.io/iamtimsmith/pen/zJPzwN?editors=1010
    let currentList = [];
    let newList = [];

    if (e.target.value === '') {
      newList = this.state.companies;
    } else {
      currentList = this.state.companies;

      newList = currentList.filter((item) => {
        const lc = item.business_name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    }

    this.setState({
      filteredCompanies: newList,
    });
  };

  deleteCompany = (id) => {
    handleRequest('/admin/companies/' + id, 'DELETE')
      .then((res) => {
        if (res.data.msg === 'Company Deleted') {
          sessionStorage.setItem(
            'admin-message',
            `${lang.admin.company.delete_success}`
          );
          return (window.location = '/admin/manage/companies');
        }
      })
      .catch((err) => console.log(err));
  };

  getCompanies = () => {
    handleRequest('/company', 'GET')
      .then((res) => {
        if (res.data.companies) {
          this.setState({
            companies: res.data.companies,
            filteredCompanies: res.data.companies,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.getCompanies();
    document.title = 'Company Management - Admin';
  }

  render() {
    const { companies, filteredCompanies, loading, message } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <div className='col container text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <h3>{lang.admin.company_management}</h3>
        <div className='form-group'>
          <label htmlFor='search'>{lang.admin.filter_by_name}</label>
          <input
            className='form-control bg-dark border-secondary text-light'
            type='search'
            name='search'
            id='search'
            onChange={this.handleSearch}
          />
        </div>

        <ul className='list-group'>
          {!companies[0] ? (
            <ErrorMessage message={lang.admin.company.no_companies} />
          ) : !filteredCompanies[0] ? (
            <ErrorMessage message={lang.admin.company.no_companies_by_name} />
          ) : (
            filteredCompanies.map((company, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item bg-dark border-secondary d-flex justify-content-between'>
                  <div>
                    {++index} | {company.business_name}
                    <div className='mt-2'>
                      <span className='font-weight-bold'>
                        {lang.admin.company.name}:{' '}
                      </span>{' '}
                      {company.business_name} <br />
                      <span className='font-weight-bold'>
                        {lang.admin.company.owner}:{' '}
                      </span>{' '}
                      {company.business_owner}
                    </div>
                  </div>
                  <div>
                    <button
                      className='btn btn-danger ml-2'
                      type='button'
                      onClick={() => {
                        this.deleteCompany(company.id);
                      }}>
                      {lang.admin.company.delete_company}
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}

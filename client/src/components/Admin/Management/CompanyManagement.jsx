import React, { Component } from 'react';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';
import LoadingArea from '../../Partials/LoadingArea';
import SuccessMessage from '../../Partials/Messages/SuccessMessage';
import { handleRequest } from '../../../functions';

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

  deleteCompany = (id, companyName) => {
    handleRequest('/admin/companies/' + id, 'DELETE')
      .then((res) => {
        if (res.data.msg === 'Company Deleted') {
          sessionStorage.setItem(
            'admin-message',
            'Successfully Deleted Company: ' + companyName
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
        <h3>Company Management</h3>
        <div className='form-group'>
          <label htmlFor='search'>Filter by company name</label>
          <input
            className='form-control bg-dark border-secondary text-light'
            type='search'
            name='search'
            id='search'
            placeholder='Enter Company Name..'
            onChange={this.handleSearch}
          />
        </div>

        <ul className='list-group'>
          {!companies[0] ? (
            <ErrorMessage message='No Companies were found for this CAD.' />
          ) : !filteredCompanies[0] ? (
            <ErrorMessage message='No Company Found with that name' />
          ) : (
            filteredCompanies.map((company, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item bg-dark border-secondary d-flex justify-content-between'>
                  <div>
                    {++index} | {company.business_name}
                    <div className='mt-2'>
                      <span className='font-weight-bold'>Company Name: </span>{' '}
                      {company.business_name} <br />
                      <span className='font-weight-bold'>
                        Company Owner:{' '}
                      </span>{' '}
                      {company.business_owner}
                    </div>
                  </div>
                  <div>
                    <button
                      className='btn btn-danger ml-2'
                      type='button'
                      onClick={() => {
                        this.deleteCompany(company.id, company.business_name);
                      }}>
                      Delete Company
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

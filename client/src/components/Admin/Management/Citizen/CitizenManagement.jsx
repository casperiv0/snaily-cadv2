import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import LoadingArea from '../../../Partials/LoadingArea';
import SuccessMessage from '../../../Partials/Messages/SuccessMessage';
import DeleteCitizenModal from './DeleteCitizenModal';
import lang from "../../../../language.json"

export default class CitizenManagement extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      searchValue: '',
      citizens: [],
      filteredCitizens: [],
      message: sessionStorage.getItem('admin-message'),
    };
  }

  getCitizens = () => {
    Axios({
      url: backendURL + '/admin/citizens',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.citizens) {
          this.setState({
            citizens: res.data.citizens,
            filteredCitizens: res.data.citizens,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  handleSearch = (e) => {
    // Thanks to: https://codepen.io/iamtimsmith/pen/zJPzwN?editors=1010
    let currentList = [];
    let newList = [];

    if (e.target.value === '') {
      newList = this.state.citizens;
    } else {
      currentList = this.state.citizens;

      newList = currentList.filter((item) => {
        const lc = item.full_name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    }

    this.setState({
      filteredCitizens: newList,
    });
  };

  componentDidMount() {
    document.title = 'Citizen Management - Admin';
    this.getCitizens();
  }

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  render() {
    const { filteredCitizens, citizens, loading, message } = this.state;
    if (loading) {
      return <LoadingArea />;
    }
    return (
      <div className='container col text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
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
          {!citizens[0] ? (
            <ErrorMessage message={lang.citizen.no_citizens_cad} />
          ) : null}
          {!filteredCitizens[0] ? (
            <ErrorMessage message={lang.citizen.citizen_not_found_by_name} />
          ) : (
            filteredCitizens.map((citizen, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item bg-dark border-secondary d-flex justify-content-between'>
                  <div>
                    <h5 className='font-weight-bold'>
                      {++index} | {citizen.full_name}
                    </h5>
                    <span className='font-weight-bold'>{lang.citizen.linked_to}: </span>
                    {citizen.linked_to}
                    <div className='collapse' id={'citizenInfo' + citizen.id}>
                      <span className='font-weight-bold'>{lang.citizen.full_name}:</span>{' '}
                      {citizen.full_name} <br />
                      <span className='font-weight-bold'>
                        Date of Birth:
                      </span>{' '}
                      {citizen.birth} <br />
                      <span className='font-weight-bold'>{lang.citizen.gender}:</span>{' '}
                      {citizen.gender} <br />
                      <span className='font-weight-bold'>{lang.citizen.ethnicity}:</span>{' '}
                      {citizen.ethnicity} <br />
                      <span className='font-weight-bold'>{lang.citizen.hair_color}:</span>{' '}
                      {citizen.hair_color} <br />
                      <span className='font-weight-bold'>{lang.citizen.eye_color}:</span>{' '}
                      {citizen.eye_color} <br />
                      <span className='font-weight-bold'>{lang.citizen.address}:</span>{' '}
                      {citizen.address} <br />
                      <span className='font-weight-bold'>{lang.citizen.height}:</span>{' '}
                      {citizen.height} <br />
                      <span className='font-weight-bold'>{lang.citizen.weight}:</span>{' '}
                      {citizen.weight} <br />
                      <span className='font-weight-bold'>{lang.citizen.employer}:</span>{' '}
                      {citizen.business} <br />
                      <div className='d-flex mt-2'>
                        <a
                          href={'/admin/manage/citizens/edit/' + citizen.id}
                          className='btn btn-primary mr-2'>
                          {lang.citizen.edit_info}
                        </a>
                        <button
                          type='button'
                          className='btn btn-danger'
                          data-toggle='modal'
                          data-target={'#deleteCitizen'+citizen.id}>
                          {lang.citizen.delete_citizen}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className='btn btn-primary'
                      type='button'
                      data-toggle='collapse'
                      data-target={'#citizenInfo' + citizen.id}
                      aria-expanded='false'
                      aria-controls={'citizenInfo' + citizen.id}>
                      {lang.admin.toggle_info}
                    </button>
                    <DeleteCitizenModal id={citizen.id} fullName={citizen.full_name} />
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

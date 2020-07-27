import React, { Component } from 'react';
import JoinCompanyModal from './Modals/JoinCompanyModal';
import CreateCompanyModal from './Modals/CreateCompanyModal';
import axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../Partials/LoadingArea';
import lang from '../../../language.json';

export default class ManageEmployment extends Component {
  constructor() {
    super();

    this.state = {
      citizens: [],
      companies: [],
      loading: true,
      companyWhitelisted: '',
    };
  }

  componentDidMount() {
    this.getData();
    document.title = 'Manage Employment';
  }

  getData = () => {
    // get citizens
    axios({
      url: backendURL + '/citizen',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          citizens: res.data.citizens,
        });
      })
      .catch((err) => console.log(err));

    //   get companies
    axios({
      url: backendURL + '/company',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          companies: res.data.companies,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.loading) {
      return <LoadingArea />;
    }
    return (
      <div className='container'>
        <button
          type='button'
          className='btn btn-secondary container mb-2'
          data-toggle='modal'
          data-target='#joinCompanyModal'>
          {lang.citizen.company.join}
        </button>
        <button
          type='button'
          className='btn btn-secondary container'
          data-toggle='modal'
          data-target='#createCompanyModal'>
          {lang.citizen.company.create}
        </button>

        <JoinCompanyModal
          citizens={this.state.citizens}
          companies={this.state.companies}
        />
        <CreateCompanyModal owners={this.state.citizens} />
      </div>
    );
  }
}

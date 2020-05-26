import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../../Partials/LoadingArea';

export default class TopArea extends Component {
  constructor() {
    super();

    this.state = {
      aop: '',
      loading: true,
    };
  }

  getCadData = () => {
    Axios({
      url: backendURL + '/auth/cad-info',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          aop: res.data.cadInfo[0].AOP,
        });
      })
      .catch((err) => console.log(err));

    this.setState({
      loading: false,
    });
  };

  componentDidMount() {
    this.getCadData();
  }

  render() {
    const { aop, loading } = this.state;
    if (loading) {
      return <LoadingArea />;
    }
    return (
      <div>
        <h3 className='card-title text-light'>EMS/FD - AOP: {aop}</h3>
        <div className='card bg-dark mx-auto mb-4'>
          <div className='card-header text-light bolder d-flex justify-content-between'>
            <h4>Utility Panel</h4>
            <button
              onClick={() => {
                document.location.reload();
              }}
              className='btn btn-secondary'>
              Refresh
            </button>
          </div>
          <div className='card-body row'>
            <a
              className='btn btn-primary bg-primary text-light mt-2'
              href='/ems-fd/deputies'>
              My EMS/FD Deputies
            </a>

            <button
              className='btn btn-secondary bg-secondary text-light mt-2 ml-2'
              data-target='#searchMedicalRecords'
              data-toggle='modal'>
              Search Person Medial Record
            </button>

            <button
              className='btn text-light btn-secondary bg-secondary  ml-2 mt-2'
              data-target='#notepad'
              data-toggle='modal'>
              Notepad
            </button>
          </div>
        </div>
      </div>
    );
  }
}

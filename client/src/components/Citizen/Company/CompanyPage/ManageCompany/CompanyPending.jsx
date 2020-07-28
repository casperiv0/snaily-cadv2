import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import LoadingArea from '../../../../Partials/LoadingArea';
import ErrorMessage from '../../../../Partials/Messages/ErrorMessage';
import lang from '../../../../../language.json';

export default class CompanyPending extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      pendingCitizens: [],
    };
  }

  getPendingCitizens = () => {
    Axios({
      url: this.props.backendUrl + '/pending-citizens',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.citizens) {
          this.setState({
            pendingCitizens: res.data.citizens,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  acceptCitizen = (employeeId, employeeName) => {
    Axios({
      url: this.props.backendUrl + '/accept/' + employeeId,
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data.msg === 'Accepted') {
        sessionStorage.setItem(
          'company-message',
          `${lang.citizen.company.accepted} ${employeeName}`
        );
        window.location = this.props.companyURL + '/manage';
      }
    });
  };

  declineCitizen = (employeeId, employeeName) => {
    Axios({
      url: this.props.backendUrl + '/decline/' + employeeId,
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      console.log(res.data);

      if (res.data.msg === 'Declined') {
        sessionStorage.setItem(
          'company-message',
          `${lang.citizen.company.declined} ${employeeName}`
        );
        window.location = this.props.companyURL + '/manage';
      }
    });
  };

  componentDidMount() {
    this.getPendingCitizens();
  }

  render() {
    const { loading, pendingCitizens } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <ul className='list-group mt-2'>
        {!pendingCitizens[0] ? (
          <ErrorMessage message={lang.citizen.company.no_cit_pen} />
        ) : (
          pendingCitizens.map((citizen, index) => {
            return (
              <li
                key={index}
                className='list-group-item bg-dark border-secondary text-light d-flex justify-content-between'>
                <div>
                  {++index} | {citizen.full_name}
                </div>
                <div>
                  <button
                    className='btn btn-danger'
                    onClick={() => {
                      this.declineCitizen(citizen.id, citizen.full_name);
                    }}>
                    {lang.global.decline}
                  </button>
                  <button
                    className='btn btn-success ml-2'
                    onClick={() => {
                      this.acceptCitizen(citizen.id, citizen.full_name);
                    }}>
                    {lang.global.accept}
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    );
  }
}

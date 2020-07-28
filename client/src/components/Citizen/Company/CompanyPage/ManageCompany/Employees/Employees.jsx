import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import LoadingArea from '../../../../../Partials/LoadingArea';
import lang from '../../../../../../language.json';

export default class Employees extends Component {
  constructor() {
    super();

    this.state = {
      employees: [],
      loading: true,
    };
  }

  getEmployees = () => {
    const url = this.props.backendUrl + '/employees';
    Axios({
      url: url,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        employees: res.data.employees,
        loading: false,
      });
    });
  };

  fireEmployee = (id, employeeName) => {
    const url = this.props.backendUrl + '/fire/' + id;
    Axios({
      url: url,
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.data.msg === 'Fired') {
        sessionStorage.setItem(
          'company-message',
          'Successfully fired ' + employeeName
        );
        return (window.location = this.props.companyURL + '/manage');
      }

      console.log(res.data);
    });
  };

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    const { loading, employees } = this.state;

    if (loading) {
      return <LoadingArea />;
    }
    return (
      <ul className='list-group mt-2'>
        {!employees[0] ? (
          <p>{lang.citizen.company.no_em}</p>
        ) : (
          employees.map((employee, index) => {
            return (
              <li
                key={index}
                className='list-group-item bg-dark border-secondary d-flex justify-content-between'>
                <div>
                  {++index} | {employee.full_name}
                  <div>
                    <span className='font-weight-bold'>
                      {lang.global.rank}:{' '}
                    </span>
                    {employee.rank}
                  </div>
                  <div>
                    <span className='font-weight-bold'>
                      {lang.citizen.company.can_reg_veh}:{' '}
                    </span>
                    {employee.vehicle_reg}
                  </div>
                  <div>
                    <span className='font-weight-bold'>
                      {lang.citizen.company.can_create_post}:{' '}
                    </span>
                    {employee.posts}
                  </div>
                </div>
                <div>
                  <a
                    className='btn btn-success '
                    href={this.props.companyURL + '/manage/' + employee.id}>
                    {lang.citizen.company.manage_em}
                  </a>
                  {employee.rank === 'employee' ? (
                    <button
                      type='button'
                      className='btn btn-danger ml-2'
                      onClick={() => {
                        this.fireEmployee(employee.id, employee.full_name);
                      }}>
                      {lang.citizen.company.fire_em}
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })
        )}
      </ul>
    );
  }
}

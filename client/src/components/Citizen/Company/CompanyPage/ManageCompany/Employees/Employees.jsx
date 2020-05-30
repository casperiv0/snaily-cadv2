import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import LoadingArea from '../../../../../Partials/LoadingArea';

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
          <p>No Employees Found</p>
        ) : (
          employees.map((employee, index) => {
            return (
              <li
                key={index}
                className='list-group-item bg-dark border-secondary d-flex justify-content-between'>
                <div>
                  {++index} | {employee.full_name}
                  <div>
                    <span className='font-weight-bold'>Rank: </span>
                    {employee.rank}
                  </div>
                  <div>
                    <span className='font-weight-bold'>
                      Can Register Company Vehicles:{' '}
                    </span>
                    {employee.vehicle_reg}
                  </div>
                  <div>
                    <span className='font-weight-bold'>
                      Can Create Company Posts:{' '}
                    </span>
                    {employee.posts}
                  </div>
                </div>
                <div>
                  <a
                    className='btn btn-success '
                    href={this.props.companyURL + '/manage/' + employee.id}>
                    Manage Employee
                  </a>
                </div>
              </li>
            );
          })
        )}
      </ul>
    );
  }
}

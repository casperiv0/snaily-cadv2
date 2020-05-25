import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../../Partials/Messages/ErrorMessage';
import AdminSuccessMessage from '../../AdminSuccessMessage';
import LoadingArea from '../../../Partials/LoadingArea';

export default class Vehicles extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      defaultVehicles: [],
      nonDefaultVehicles: [],
      search: '',
      message: sessionStorage.getItem('admin-message'),
    };
  }

  getVehicles = () => {
    Axios({
      url: backendURL + '/admin/vehicles',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          defaultVehicles: res.data.defaultVehicles,
          nonDefaultVehicles: res.data.nonDefaultVehicles,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  deleteVehicle = (id) => {
    Axios({
      url: backendURL + '/admin/vehicles/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          sessionStorage.setItem(
            'admin-message',
            'Successfully Deleted Gender'
          );
          return (window.location = '/admin/vehicles');
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getVehicles();
    document.title = 'Vehicles - Admin';
  }

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  render() {
    const {
      nonDefaultVehicles,
      defaultVehicles,
      message,
      loading,
    } = this.state;

    if (loading) {
      return (
        <div className='container col-md-9'>
          <LoadingArea />
        </div>
      );
    }

    return (
      <div className='container text-light col-md-9'>
        {message ? <AdminSuccessMessage message={message} /> : null}
        <h3>
          Manage Vehicles - <a href='/admin/vehicles/add'>+</a>
        </h3>

        <div className='mt-3'>
          <h5>Default Vehicles ({defaultVehicles.length}) </h5>
          <button
            className='btn btn-primary container mb-2'
            type='button'
            data-toggle='collapse'
            data-target='#collapseExample'
            aria-expanded='false'
            aria-controls='collapseExample'>
            Show Vehicles
          </button>
          <div className='collapse' id='collapseExample'>
            {defaultVehicles.map((vehicle, index) => {
              return (
                <li
                  key={index}
                  className='list-group-item text-light bg-dark border-secondary'>
                  {++index} | {vehicle.cname}
                  <div className='float-right'></div>
                </li>
              );
            })}
          </div>
        </div>

        <div className='mt-5'>
          <h5>Custom Added Vehicles ({nonDefaultVehicles.length})</h5>
          <ul className='list-group mt-3' id='nonDefaultVehicles'>
            {!nonDefaultVehicles[0] ? (
              <ErrorMessage message="You Don't have any vehicles, Add one by clicking the plus symbol above" />
            ) : (
              nonDefaultVehicles.map((vehicle, index) => {
                return (
                  <li
                    key={index}
                    className='list-group-item d-flex justify-content-between text-light bg-dark border-secondary'>
                    <p>
                      {++index} | {vehicle.cname}
                    </p>
                    <div>
                      <a
                        href={'/admin/vehicles/edit/' + vehicle.id}
                        className='btn btn-success mr-2'>
                        Edit
                      </a>
                      <button
                        onClick={() => {
                          this.deleteVehicle(vehicle.id);
                        }}
                        className='btn btn-danger'>
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    );
  }
}

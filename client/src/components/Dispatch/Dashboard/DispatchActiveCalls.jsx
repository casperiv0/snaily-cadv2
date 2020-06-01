import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import Update911Call from './Modals/Update911Call';

export default class DispatchActiveCalls extends Component {
  constructor() {
    super();

    this.state = {
      calls: [],
      activeOfficers: [],
    };
  }

  get911Calls = () => {
    Axios({
      url: backendURL + '/global/911calls',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        calls: res.data.calls,
      });
    });
  };

  getActiveOfficers = () => {
    Axios({
      url: backendURL + '/dispatch',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          activeOfficers: res.data.onDutyOfficers,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.get911Calls();
    this.getActiveOfficers();
  }

  render() {
    const { calls, activeOfficers } = this.state;
    return (
      <ul
        className='list-group scroll-bar overflow-auto mt-3'
        style={{ maxHeight: '25rem' }}>
        <div className='bg-secondary border-secondary list-group-item text-light sticky-top'>
          Active 911 Calls
        </div>
        {!calls[0] ? (
          <li className='list-group-item bg-dark text-light'>
            There're no active calls.
          </li>
        ) : (
          <table className='table table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Caller Name</th>
                <th scope='col'>Caller Location</th>
                <th scope='col'>Call Description</th>
                <th scope='col'>Status</th>
                <th scope='col'>Assigned Units</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call, index) => {
                return (
                  <tr key={index}>
                    <th scope='row'>{++index}</th>
                    <td>{call.name}</td>
                    <td>{call.location}</td>
                    <td>{call.description}</td>
                    <td>{call.status}</td>
                    <td>{call.assigned_unit}</td>
                    <td>
                      <button
                        type='button'
                        className='btn btn-primary'
                        data-toggle='modal'
                        data-target={'#update911Call' + call.id}>
                        Update Call
                      </button>
                    </td>
                    <Update911Call
                      id={call.id}
                      callLocation={call.location}
                      callDescription={call.description}
                      assignedUnits={call.assigned_unit}
                      activeOfficers={activeOfficers}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </ul>
    );
  }
}

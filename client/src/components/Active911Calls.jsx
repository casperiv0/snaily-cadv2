import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../config/config';
import Cookies from 'js-cookie';

export default class Active911Calls extends Component {
  constructor() {
    super();

    this.state = {
      calls: [],
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

  componentDidMount() {
    this.get911Calls();
  }

  render() {
    const { calls } = this.state;
    return (
      <ul
        className='list-group scroll-bar overflow-auto'
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

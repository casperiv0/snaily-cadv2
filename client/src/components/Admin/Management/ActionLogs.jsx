import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';

export default class ActionLogs extends Component {
  constructor() {
    super();

    this.state = {
      logs: [],
    };
  }

  getActionLogs = () => {
    Axios({
      url: backendURL + '/admin/action-logs/',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.action_logs) {
          this.setState({
            logs: res.data.action_logs,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    document.title = "Action Logs - Admin"
    this.getActionLogs();
  }

  render() {
    const { logs } = this.state;
    return (
      <div className='col'>
        <table className='table table-dark'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Title</th>
              <th scope='col'>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              return (
                <tr key={index}>
                  <th scope='row'> {++index} </th>
                  <td>{log.action_title}</td>
                  <td> {log.date} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

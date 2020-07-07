import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../Partials/LoadingArea';
import ErrorMessage from '../Partials/Messages/ErrorMessage';
import SuccessMessage from '../Partials/Messages/SuccessMessage';
import lang from '../../language.json';

export default class TruckerLogs extends Component {
  constructor() {
    super();

    this.state = {
      logs: [],
      loading: true,
      message: sessionStorage.getItem('truck-message'),
    };
  }

  getTruckLogs = () => {
    Axios({
      url: backendURL + '/truck-logs/',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.logs) {
          this.setState({
            logs: res.data.logs,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteTruckLog = (id) => {
    Axios({
      url: backendURL + '/truck-logs/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Deleted') {
          this.getTruckLogs();
          this.setState({
            message: lang.truck_logs.deleted_truck_log,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    document.title = 'Trucker Logs';
    this.getTruckLogs();

    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('truck-message')
    );
  }

  render() {
    const { loading, logs, message } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <div className='container-fluid text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <div className='d-flex justify-content-between mb-3'>
          <h3>{lang.nav.trucklogs}</h3>
          <a className='btn btn-secondary' href='/truck-logs/create'>
            {lang.truck_logs.create_truck_log}
          </a>
        </div>

        {!logs[0] ? (
          <ErrorMessage message="You don't have any truck logs!" />
        ) : (
          <table class='table table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>{lang.global.name}</th>
                <th scope='col'>{lang.truck_logs.co_driver}</th>
                <th scope='col'>{lang.truck_logs.date}</th>
                <th scope='col'>{lang.truck_logs.start_time}</th>
                <th scope='col'>{lang.truck_logs.vehicle_plate}</th>
                <th scope='col'>{lang.global.actions}</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => {
                return (
                  <tr>
                    <th scope='row'>{++index}</th>
                    <td>{log.name}</td>
                    <td>{log.co_driver}</td>
                    <td>{log.timestamp}</td>
                    <td>{log.start_time}</td>
                    <td>{log.plate}</td>
                    <td>
                      <button
                        onClick={() => {
                          this.deleteTruckLog(log.id);
                        }}
                        className='btn btn-danger'>
                        {lang.global.delete}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

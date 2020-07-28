import React, { Component } from 'react';
import LoadingArea from '../../Partials/LoadingArea';
import { handleRequest } from '../../../functions';
import lang from "../../../language.json"

export default class AuditLogs extends Component {
  constructor() {
    super();

    this.state = {
      logs: [],
      loading: true,
    };
  }

  getAuditLogs = () => {
    handleRequest('/admin/action-logs', 'GET')
      .then((res) => {
        if (res.data.action_logs) {
          this.setState({
            logs: res.data.action_logs,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    document.title = 'Audit Logs - Admin';
    this.getAuditLogs();
  }

  render() {
    const { logs, loading } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <div className='col text-light'>
        <h3>{lang.admin.audit_logs}</h3>
        <table className='table table-dark mt-3'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>{lang.global.title}</th>
              <th scope='col'>{lang.global.timestamp}</th>
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

import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import EditOfficerStatusModal from './Modals/EditOfficerStatusModal';
import EditEmsFdStatusModal from './Modals/EditEmsFdStatusModal';
import LoadingArea from '../../Partials/LoadingArea';

export default class ActiveUnits extends Component {
  constructor() {
    super();

    this.state = {
      activeEmsFd: [],
      activeOfficers: [],
      loading: true
    };
  }

  getActiveUnits = () => {
    Axios({
      url: backendURL + '/dispatch',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        activeEmsFd: res.data.onDutyEMS_FD,
        activeOfficers: res.data.onDutyOfficers,
          loading: false
      });
    });
  };

  componentDidMount() {
    this.getActiveUnits();
  }

  render() {
    const { activeOfficers, activeEmsFd, loading } = this.state;
   
    if (loading) {
      return <LoadingArea />
    }

    return (
      <div className='col-md-8'>
        <div className='list-group'>
          <div className='list-group-item bg-secondary border-secondary'>
            <h5>Active Police Officers</h5>
          </div>
          {!activeOfficers[0] ? (
            <li className='list-group-item bg-dark border-dark mb-3'>No Active Officers</li>
          ) : (
            <table className='table table-dark'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Officer Name</th>
                  <th scope='col'>Officer Department</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeOfficers.map((officer, index) => {
                  return (
                    <tr key={index}>
                      <th scope='row'>{++index}</th>
                      <td>{officer.officer_name}</td>
                      <td>{officer.officer_dept}</td>
                      <td>{officer.status2}</td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-primary'
                          data-toggle='modal'
                          data-target={'#editStatusOfficer' + officer.id}>
                          Edit Status
                        </button>
                      </td>
                      <EditOfficerStatusModal id={officer.id} status={officer.status} status2={officer.status2} />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className='list-group'>
          <div className='list-group-item bg-secondary border-secondary'>
            <h5>Active EMS/FD Deputies</h5>
          </div>
          {!activeEmsFd[0] ? (
            <li className='list-group-item bg-dark border-dark'>
              No Active EMS/FD Deputies
            </li>
          ) : (
            <table className='table table-dark'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Deputy Name</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeEmsFd.map((ems_fd, index) => {
                  return (
                    <tr key={index}>
                      <th scope='row'>{++index}</th>
                      <td>{ems_fd.name}</td>
                      <td>{ems_fd.status2}</td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-primary'
                          data-toggle='modal'
                          data-target={'#editStatusEmsFd' + ems_fd.id}>
                          Edit Status
                        </button>
                      </td>
                      <EditEmsFdStatusModal id={ems_fd.id} status={ems_fd.status} status2={ems_fd.status2} />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditOfficerStatusModal from './Modals/EditOfficerStatusModal';
import EditEmsFdStatusModal from './Modals/EditEmsFdStatusModal';
import { getAllActiveUnits } from '../../../actions/dispatchActions';
import io from "socket.io-client";
import { backendURL } from '../../../config/config';
import lang from "../../../language.json"
const socket = io(backendURL);

class ActiveUnits extends Component {
  componentDidMount() {
    this.props.getAllActiveUnits();

    socket.on("updateActiveUnits", () => this.props.getAllActiveUnits());
  }

  render() {
    const { activeOfficers, activeEmsFd } = this.props;

    return (
      <div className='col-md-8'>
        <div
          className='list-group overflow-auto'
          style={{ maxHeight: '20rem' }}>
          <div className='list-group-item bg-secondary border-secondary sticky-top'>
            <h5>{lang.global.active_officers}</h5>
          </div>
          {!activeOfficers[0] ? (
            <li className='list-group-item bg-dark border-dark mb-3'>
              {lang.global.no_officers}
            </li>
          ) : (
            <table className='table table-dark'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>{lang.dispatch.officer_name}</th>
                  <th scope='col'>{lang.dispatch.officer_dept}</th>
                  <th scope='col'>{lang.dispatch.status}</th>
                  <th scope='col'>{lang.global.actions}</th>
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
                          {lang.dispatch.edit_status}
                        </button>
                      </td>
                      <EditOfficerStatusModal
                        id={officer.id}
                        status={officer.status}
                        status2={officer.status2}
                        officerName={officer.officer_name}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div
          className='list-group overflow-auto mt-3'
          style={{ maxHeight: '20rem' }}>
          <div className='list-group-item bg-secondary border-secondary sticky-top'>
            <h5>{lang.global.active_ems_fd}</h5>
          </div>
          {!activeEmsFd[0] ? (
            <li className='list-group-item bg-dark border-dark'>
              {lang.global.no_ems_fd}
            </li>
          ) : (
            <table className='table table-dark'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>{lang.dispatch.dept_name}</th>
                  <th scope='col'>{lang.dispatch.status}</th>
                  <th scope='col'>{lang.global.actions}</th>
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
                          {lang.dispatch.edit_status}
                        </button>
                      </td>
                      <EditEmsFdStatusModal
                        id={ems_fd.id}
                        status={ems_fd.status}
                        status2={ems_fd.status2}
                      />
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

const mapStateToProps = (state) => ({
  activeEmsFd: state.dispatch.activeEmsFd,
  activeOfficers: state.dispatch.activeOfficers,
});

export default connect(mapStateToProps, {
  getAllActiveUnits,
})(ActiveUnits);

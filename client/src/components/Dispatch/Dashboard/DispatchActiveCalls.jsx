import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import Update911Call from './Modals/Update911Call';
import { get911Calls } from '../../../actions/911CallsActions';
import lang from '../../../language.json';
import io from 'socket.io-client';
const socket = io(backendURL);

class DispatchActiveCalls extends Component {
  constructor() {
    super();

    this.state = {
      calls: [],
      activeOfficers: [],
    };
  }

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
    this.props.get911Calls();
    this.getActiveOfficers();

    socket.on('update911Calls', () => this.props.get911Calls());
    socket.on('new911Call', () => {
      const audio = new Audio('/sounds/new-call.mp3');
      audio.play();
    });
  }

  render() {
    const { activeOfficers } = this.state;
    const { calls } = this.props;

    return (
      <ul
        className='list-group scroll-bar overflow-auto mt-3'
        style={{ maxHeight: '25rem' }}>
        <div className='bg-secondary border-secondary list-group-item text-light sticky-top'>
          {lang.global.active_erm_calls}
        </div>
        {!calls[0] ? (
          <li className='list-group-item bg-dark text-light'>
            {lang.global.no_calls}
          </li>
        ) : (
          <table className='table table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>{lang.dispatch.caller_name}</th>
                <th scope='col'>{lang.dispatch.caller_location}</th>
                <th scope='col'>{lang.dispatch.call_desc}</th>
                <th scope='col'>{lang.dispatch.status}</th>
                <th scope='col'>{lang.dispatch.assigned_unit}</th>
                <th scope='col'>{lang.global.actions}</th>
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
                        {lang.dispatch.update_call}
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

const mapStateToProps = (state) => ({
  calls: state.calls.calls,
});

export default connect(mapStateToProps, { get911Calls })(DispatchActiveCalls);

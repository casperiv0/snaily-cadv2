import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get911Calls } from '../actions/911CallsActions';
import io from 'socket.io-client';
import { backendURL } from '../config/config';
import language from '../language.json';
const socket = io(backendURL);

class Active911Calls extends Component {
  componentDidMount() {
    this.props.get911Calls();

    socket.on('update911Calls', () => this.props.get911Calls());

    socket.on('new911Call', () => {
      const audio = new Audio('/sounds/new-call.mp3');
      audio.play();
    });
  }

  render() {
    const { calls } = this.props;
    return (
      <ul
        className='list-group scroll-bar overflow-auto'
        style={{ maxHeight: '25rem' }}>
        <div className='bg-secondary border-secondary list-group-item text-light sticky-top'>
          {language.global.active_erm_calls}
        </div>
        {!calls[0] ? (
          <li className='list-group-item bg-dark text-light'>
            {language.global.no_calls}
          </li>
        ) : (
          <table className='table table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>{language.dispatch.caller_name}</th>
                <th scope='col'>{language.dispatch.caller_location}</th>
                <th scope='col'>{language.dispatch.call_desc}</th>
                <th scope='col'>{language.dispatch.status}</th>
                <th scope='col'>{language.dispatch.assigned_unit}</th>
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

const mapStateToProps = (state) => ({
  calls: state.calls.calls,
});

export default connect(mapStateToProps, { get911Calls })(Active911Calls);

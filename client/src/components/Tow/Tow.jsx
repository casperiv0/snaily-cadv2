import React, { Component } from 'react';
import { getAop } from '../../actions/otherActions';
import { connect } from 'react-redux';
import { getTowCalls, endTowCall } from '../../actions/towCallActions';
import { getMessage } from '../../actions/messageActions';
import TopTowArea from './TopTowArea';
import TowCallBox from './TowCallBox';
import SuccessMessage from '../Partials/Messages/SuccessMessage';
import io from 'socket.io-client';
import { backendURL } from '../../config/config';
const socket = io(backendURL);

class Tow extends Component {
  componentDidMount() {
    document.title = 'Tow Truckers';
    this.props.getTowCalls();

    socket.on('updateTowCalls', this.props.getTowCalls);
  }

  cancelTowCall = (id) => {
    this.props.endTowCall(id);
  };

  render() {
    const { aop, towCalls, message } = this.props;

    return (
      <div className='container-fluid text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <h2>Tow Dashboard - AOP: {aop} </h2>
        <ul className='list-group'>
          <TopTowArea>
            {!towCalls[0] ? (
              <li className='list-group-item bg-dark border-secondary'>
                No Active Calls
              </li>
            ) : (
              towCalls.map((call, index) => (
                <TowCallBox
                  key={index}
                  id={call.id}
                  index={index}
                  caller={call.name}
                  location={call.location}
                  description={call.description}
                  cancelTowCall={this.cancelTowCall}
                />
              ))
            )}
          </TopTowArea>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  aop: state.aop.aop,
  message: state.message.content,
  towCalls: state.towCalls.calls,
});

export default connect(mapStateToProps, {
  getAop,
  getMessage,
  getTowCalls,
  endTowCall,
})(Tow);

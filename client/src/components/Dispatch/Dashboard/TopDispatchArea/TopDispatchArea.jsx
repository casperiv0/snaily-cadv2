import React, { Component } from 'react';
import ModalButtons from './ModalButtons';
import { connect } from 'react-redux';
import { getAop } from '../../../../actions/otherActions';
import io from 'socket.io-client';
import { backendURL } from '../../../../config/config';
import lang from '../../../../language.json';
const socket = io(backendURL);

class TopDispatchArea extends Component {
  componentDidMount() {
    this.props.getAop();

    setInterval(function () {
      let date = document.getElementById('time');
      let d = new Date();
      let currentTime = d.toLocaleTimeString();
      let currentDate = d.toLocaleDateString();
      date.textContent = currentTime + ' - ' + currentDate;
    }, 1000);

    socket.on('updateAop', this.props.getAop);
  }

  render() {
    const { aop } = this.props;

    return (
      <div className='text-light'>
        <div className='mt-4 card bg-dark border-dark'>
          <div className='card-header d-flex justify-content-between'>
            <h3>{lang.global.utility_panel} - AOP: {aop}</h3>
            <span id='time'></span>
          </div>
          <ModalButtons />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  aop: state.aop.aop,
});

export default connect(mapStateToProps, { getAop })(TopDispatchArea);

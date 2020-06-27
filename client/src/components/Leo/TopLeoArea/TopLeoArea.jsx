import React, { Component } from 'react';
import LeoModalButtons from './LeoModalButtons';
import LeoStatuses from './LeoStatuses';

class TopLeoArea extends Component {
  componentDidMount() {
    setInterval(function () {
      let date = document.getElementById('leo-time');
      let d = new Date();
      let currentTime = d.toLocaleTimeString();
      let currentDate = d.toLocaleDateString();
      date.textContent = currentTime + ' - ' + currentDate;
    }, 1000);
  }

  render() {
    const { aop } = this.props;

    return (
      <div className='card mt-3 bg-dark border-dark text-light'>
        <div className='card-header d-flex justify-content-between'>
          <h4>Utility Panel - AOP: {aop}</h4>
          <span id='leo-time'></span>
        </div>
        <div className='card-body'>
          <LeoModalButtons />
        </div>
        <LeoStatuses />
      </div>
    );
  }
}

export default TopLeoArea;

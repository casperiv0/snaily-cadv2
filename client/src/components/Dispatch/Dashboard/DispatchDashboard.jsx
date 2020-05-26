import React, { Component } from 'react';
import TopDispatchArea from './TopDispatchArea/TopDispatchArea';
import ActiveUnits from './ActiveUnits';
import UpdateAop from './UpdateAop';
import SuccessMessage from '../../Partials/Messages/SuccessMessage';
import DispatchActiveCalls from './DispatchActiveCalls';

export default class DispatchDashboard extends Component {
  constructor() {
    super();

    this.state = {
      message: sessionStorage.getItem('dispatch-message'),
    };
  }

  componentDidMount() {
    document.title = 'Dispatch Dashboard';

    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('dispatch-message')
    );
  }

  render() {
    const { message } = this.state;
    return (
      <div className='container-fluid text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <TopDispatchArea />
        <div className='row mt-3'>
          <ActiveUnits />
          <UpdateAop />
        </div>
        <DispatchActiveCalls />
      </div>
    );
  }
}

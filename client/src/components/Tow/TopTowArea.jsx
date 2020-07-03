import React, { Component } from 'react';
import NotepadModal from '../EMS-FD/EmsFdDashboard/NotepadModal';

export default class TopTowArea extends Component {
  refresh = () => {
    this.props.refresh();
  };
  render() {
    const { children } = this.props;
    return (
      <ul className='list-group'>
        <div className='list-group-item bg-secondary border-secondary'>
          <div>
            Active Calls
            <div className='float-right'>
              <button
                data-toggle='modal'
                data-target='#notepad'
                className='btn btn-success'>
                Notepad
              </button>
              <button className='ml-2 btn btn-success' onClick={this.refresh}>
                Refresh
              </button>
            </div>
          </div>
        </div>
        {children}

        {/* Modal */}
        <NotepadModal />
      </ul>
    );
  }
}

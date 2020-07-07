import React, { Component } from 'react';
import NotepadModal from '../EMS-FD/EmsFdDashboard/NotepadModal';
import lang from '../../language.json';

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
            {lang.tow.active_tow_calls}
            <div className='float-right'>
              <button
                data-toggle='modal'
                data-target='#notepad'
                className='btn btn-success'>
                {lang.global.notepad}
              </button>
              <button className='ml-2 btn btn-success' onClick={this.refresh}>
                {lang.global.refresh}
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

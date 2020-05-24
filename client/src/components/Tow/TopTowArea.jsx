import React, { Component } from 'react';

export default class TopTowArea extends Component {
  constructor() {
    super();

    this.state = {
      notepad: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  refresh = () => {
    document.location.reload();
  };
  render() {
    const { notepad } = this.state;
    const { children } = this.props;
    return (
      <ul className='list-group'>
        <div className='list-group-item active'>
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
        <div
          className='modal fade'
          id='notepad'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content  bg-secondary'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  Notepad
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <textarea
                  className='form-control bg-dark border-dark text-light'
                  cols='30'
                  rows='10'
                  onChange={this.onChange}
                  value={notepad}
                  name='notepad'>
                  {notepad}
                </textarea>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='container btn btn-dark'
                  data-dismiss='modal'>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </ul>
    );
  }
}

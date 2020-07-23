import React, { Component } from 'react'
import lang from "../../../language.json"

export default class NotepadModal extends Component {

    constructor() {
        super()

        this.state ={
            notepad: ""
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {notepad}= this.state;
        return (
            <div
            className='modal fade'
            id='notepad'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog' role='document'>
              <div className='modal-content  bg-dark border-dark text-light'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    {lang.ems_fd.notepad}
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
                    className='form-control bg-secondary border-secondary text-light'
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
                    className='container btn btn-secondary'
                    data-dismiss='modal'>
                    {lang.global.close}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

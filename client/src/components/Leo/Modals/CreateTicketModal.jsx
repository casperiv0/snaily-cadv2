import React, { Component } from 'react';
import { createTicket } from '../../../actions/recordActions';
import { setMessage } from '../../../actions/messageActions';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';
import { connect } from 'react-redux';
import lang from '../../../language.json';

class CreateTicketModal extends Component {
  constructor() {
    super();

    this.state = {
      name2: '',
      violations: '',
      officerName2: '',
      notes2: '',
      penalCodes: [],
      postal2: '',
      error: '',
    };
  }
  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: this.state.name2,
      officer_name: this.state.officerName2,
      postal: this.state.postal2,
      notes: this.state.notes2,
      violations: this.state.violations,
    };
    document.getElementById('closeCreateTicket').click();
    this.props.setMessage(
      `${lang.record.created_ticket} ${this.state.name2}`
    );
    this.props.createTicket(data);

    this.setState({
      name2: '',
      officerName2: '',
      postal2: '',
      notes2: '',
      violations: '',
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.setState({
      penalCodes: this.props.penalCodes,
    });
  }

  render() {
    const {
      name2,
      violations,
      officerName2,
      notes2,
      postal2,
      penalCodes,
      error,
    } = this.state;

    return (
      <div
        className='modal fade'
        id='createTicketModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='createTicketModal'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='createTicketModal'>
                {lang.global.create_ticket}
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                id='closeCreateTicket'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                {error ? <ErrorMessage message={error} /> : null}
                <div className='form-group'>
                  <label htmlFor='name'>{lang.record.enter_full_name}</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='name2'
                    id='name2'
                    value={name2}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='officerName2'>
                    {lang.record.officer_name}
                  </label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='officerName2'
                    id='officerName2'
                    value={officerName2}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='violations'>{lang.record.violations}</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='violations'
                    id='violations'
                    value={violations}
                    onChange={this.onChange}
                    list='penalCodes'
                  />
                  <datalist id='penalCodes'>
                    {penalCodes.map((code, index) => {
                      return (
                        <option key={index} value={code.title}>
                          {code.title}
                        </option>
                      );
                    })}
                  </datalist>
                </div>
                <div className='form-group'>
                  <label htmlFor='postal2'>{lang.record.postal}</label>
                  <input
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='postal2'
                    id='postal2'
                    value={postal2}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='notes2'>{lang.global.notes}</label>
                  <textarea
                    rows='5'
                    className='form-control bg-secondary border-secondary text-light'
                    type='text'
                    name='notes2'
                    id='notes2'
                    value={notes2}
                    onChange={this.onChange}></textarea>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  {lang.global.cancel}
                </button>
                <button type='submit' className='btn btn-primary'>
                  {lang.global.create_ticket}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createTicket, setMessage })(CreateTicketModal);

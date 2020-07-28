import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBolos, createBolo } from '../../actions/boloActions';
import ErrorMessage from '../Partials/Messages/ErrorMessage';
import { setMessage } from '../../actions/messageActions';
import lang from '../../language.json';

class CreateBoloModal extends Component {
  constructor() {
    super();

    this.state = {
      type: 'person',
      name: '',
      plate: '',
      color: '',
      boloDescription: '',
      message: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      type: this.state.type,
      name: this.state.name,
      plate: this.state.plate,
      color: this.state.color,
      boloDescription: this.state.boloDescription,
    };
    this.props.createBolo(data);
    this.props.setMessage('Successfully Created BOLO');
    this.props.getBolos();
    this.clearModal();
  };

  clearModal = () => {
    this.setState({
      type: 'person',
      name: '',
      plate: '',
      color: '',
      boloDescription: '',
    });
    document.getElementById('closeCreateBoloModal').click();
  };

  render() {
    const { type, name, plate, color, boloDescription, message } = this.state;
    return (
      <div
        className='modal fade'
        id='createBoloModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                {lang.global.create_bolo}
              </h5>
              <button
                id='closeCreateBoloModal'
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                {message ? <ErrorMessage message={message} dismiss /> : null}
                <div className='form-group'>
                  <label htmlFor='type'>{lang.citizen.medical.type}</label>
                  <select
                    className='form-control bg-secondary border-secondary text-light'
                    name='type'
                    id='type'
                    onChange={this.onChange}>
                    <option value='person'>{lang.global.person}</option>
                    <option value='vehicle'>{lang.global.vehicle}</option>
                    <option value='other'>{lang.global.other}</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>{lang.global.description}</label>
                  <textarea
                    type='text'
                    name='boloDescription'
                    id='boloDescription'
                    rows='5'
                    cols='30'
                    className='form-control bg-secondary border-secondary text-light'
                    onChange={this.onChange}
                    value={boloDescription}></textarea>
                </div>
                {type === 'person' ? (
                  <div className='form-group'>
                    <label htmlFor='name'>
                      {lang.record.enter_per_name}
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      className='form-control bg-secondary border-secondary text-light'
                      onChange={this.onChange}
                      value={name}
                    />
                  </div>
                ) : type === 'vehicle' ? (
                  <div>
                    <div className='form-group'>
                      <label htmlFor='plate'>
                        {lang.record.enter_plate}
                      </label>
                      <input
                        type='text'
                        name='plate'
                        id='plate'
                        className='form-control bg-secondary border-secondary text-light'
                        onChange={this.onChange}
                        value={plate}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='color'>
                        {lang.record.enter_color}
                      </label>
                      <input
                        type='text'
                        name='color'
                        id='color'
                        className='form-control bg-secondary border-secondary text-light'
                        onChange={this.onChange}
                        value={color}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  {lang.global.close}
                </button>
                <button
                  type='submit'
                  disabled={boloDescription === ''}
                  className='btn btn-primary'>
                  {lang.global.create_bolo}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bolos: state.bolos.items,
  createBolo: state.bolos.items,
});

export default connect(mapStateToProps, { getBolos, createBolo, setMessage })(
  CreateBoloModal
);

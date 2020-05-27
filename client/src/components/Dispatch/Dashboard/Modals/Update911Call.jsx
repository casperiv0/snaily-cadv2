import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';

export default class Update911Call extends Component {
  constructor() {
    super();

    this.state = {
      location: '',
      callDescription: '',
      assignedUnits: [],
      activeOfficers: [],
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.setState({
      location: this.props.location,
      callDescription: this.props.description,
      activeOfficers: this.props.activeOfficers,
    });
  }

  handleSelect = (e) => {
    this.setState({
      assignedUnits: [...this.state.assignedUnits, e.target.value],
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/global/911calls/' + this.props.id,
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        location: this.state.location,
        description: this.state.callDescription,
        assigned_unit: this.state.assignedUnits,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem(
            'dispatch-message',
            'Successfully Updated 911 call'
          );
          return (window.location = '/dispatch');
        }
      })
      .catch((err) => console.log(err));
  };

  cancelCall = (e) => {
    Axios({
      url: backendURL + '/global/911calls/' + this.props.id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
    .then(res => {
      if (res.data.msg === "Canceled") {
        sessionStorage.setItem("dispatch-message", "Successfully Canceled 911 Call");
        return window.location = "/dispatch"
      }
    })
  }

  render() {
    const { id, location, callDescription, activeOfficers } = this.props;
    return (
      <td
        className='modal fade'
        id={'update911Call' + id}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Update 911 Call
              </h5>
              <button
                type='button'
                className='close text-light'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='status'>Location</label>
                  <input
                    name='location'
                    id='location'
                    value={location}
                    className='form-control bg-secondary border-secondary text-light'
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='status'>Description</label>
                  <input
                    name='callDescription'
                    id='callDescription'
                    value={callDescription}
                    className='form-control bg-secondary border-secondary text-light'
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='status'>Assigned Units</label>
                  {!activeOfficers[0] ? <p>There are no officers active</p> :
                   activeOfficers.map((officer, index) => {
                    return (
                      <div key={index} className='form-group'>
                        <input
                          type='checkbox'
                          name='assigned_unit'
                          className='form-control-input'
                          value={officer.officer_name}
                          onClick={this.handleSelect}
                        />
                        <label className=''>{officer.officer_name}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='modal-footer'>
              <button
              onClick={this.cancelCall}
                  type='button'
                  className='btn btn-danger'>
                  End 911 Call
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Cancel
                </button>
                <button type='submit' className='btn btn-primary'>
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      </td>
    );
  }
}

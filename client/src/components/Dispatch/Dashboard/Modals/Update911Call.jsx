import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';

export default class Update911Call extends Component {
  constructor() {
    super();

    this.state = {
      location: '',
      description: '',
      assignedUnits: '',
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
      description: this.props.description,
      assignedUnits: this.props.assignedUnits,
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


  };

  render() {
    const { id, location, description, activeOfficers } = this.props;
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
                    name='description'
                    id='description'
                    value={description}
                    className='form-control bg-secondary border-secondary text-light'
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='status'>Assigned Units</label>
                  <select
                    multiple
                    name='assignedUnits'
                    id='assignedUnits'
                    onChange={this.handleSelect}
                    className='form-control'>
                    {activeOfficers.map((officer, index) => {
                      return (
                        <option key={index} value={officer.officer_name}>
                          {officer.officer_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className='modal-footer'>
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

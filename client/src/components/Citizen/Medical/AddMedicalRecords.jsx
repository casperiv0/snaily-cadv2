import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import ErrorMessage from '../../Partials/Messages/ErrorMessage';

export default class AddMedicalRecords extends Component {
  constructor() {
    super();

    this.state = {
      type: '',
      shortInfo: '',
      error: ""
    };
  }

  addMedicalRecord = (e) => {
    e.preventDefault();

    Axios({
      url: `${backendURL}/medical/${this.props.match.params.citizenId}-${this.props.match.params.fullName}/add`,
      method: "POST",
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        type: this.state.type,
        shortInfo: this.state.shortInfo,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Record Added') {
          sessionStorage.setItem(
            'message',
            'Successfully Added Medical Record'
          );
          return window.location = '/citizen';
        }

        this.setState({
            error: res.data.msg
        })
      })
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { shortInfo, error } = this.state;
    return (
      <form
        onSubmit={this.addMedicalRecord}
        className='container mt-3 text-light'>
            {
                error ?
                <ErrorMessage message={error} /> : null
            }
        <div className='form-group'>
          <label htmlFor='type'>Select Type</label>
          <select
            name='type'
            className='form-control bg-secondary border-secondary text-light'
            onChange={this.onChange}>
            <option value=''>Select Type...</option>
            <option value='Allergy'>
              Allergy
            </option>
            <option value='Medication'>Medication</option>
            <option value='Health Problem'>Health Problem</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='shortInfo'>Enter Short Description</label>
          <textarea
            name='shortInfo'
            onChange={this.onChange}
            className='form-control bg-secondary border-secondary text-light'
            value={shortInfo}
            id='shortInfo'
            cols='30'
            rows='5'></textarea>
        </div>

        <div className="form-group float-right">
            <a href={"/citizen/"+this.props.match.params.citizenId} className="btn btn-danger">Cancel</a>
            <button type="submit" className="btn btn-primary ml-2">Add Medical Record</button>
        </div>
      </form>
    );
  }
}

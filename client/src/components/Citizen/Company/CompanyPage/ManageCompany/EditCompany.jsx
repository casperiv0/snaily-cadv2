import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

export default class EditCompany extends Component {
  constructor() {
    super();

    this.state = {
      current: [],
      whitelisted: '',
    };
  }

  getCurrentCompany = () => {
    Axios({
      url: this.props.backendUrl,
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        whitelisted: res.data.company[0].whitelisted,
        current: res.data.company[0],
      });
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: this.props.backendUrl + '/edit',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        whitelisted: this.state.whitelisted,
      },
    }).then((res) => {
      if (res.data.msg === 'Updated') {
        sessionStorage.setItem(
          'company-message',
          'Successfully Updated Company'
        );
        return (window.location = this.props.companyURL + '/manage');
      }
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.getCurrentCompany();
  }

  render() {
    const { current } = this.state;
    return (
      <form className='mt-2' onSubmit={this.onSubmit}>
        <div className='form-group'>
          <label htmlFor='whitelisted'>Company whitelisted</label>
          <select
            onChange={this.onChange}
            className='form-control bg-secondary border-secondary text-light'
            name='whitelisted'
            id='whitelisted'>
            <option value={current.whitelisted}>{current.whitelisted}</option>
            <option disabled>--------</option>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
        <div className='form-group float-right'>
          <button className='btn btn-primary' type='submit'>
            Update Company
          </button>
        </div>
      </form>
    );
  }
}

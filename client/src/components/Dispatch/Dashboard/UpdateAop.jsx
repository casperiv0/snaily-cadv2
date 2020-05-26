import React, { Component } from 'react';
import { backendURL } from '../../../config/config';
import Axios from 'axios';
import Cookies from 'js-cookie';

export default class UpdateAop extends Component {
  constructor() {
    super();

    this.state = {
      aop: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/dispatch/update-aop',
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        newAop: this.state.aop,
      },
    })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem(
            'dispatch-message',
            'Successfully Updated AOP'
          );
          return (window.location = '/dispatch');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className='col-md-4'>
        <div className='card bg-dark border-dark'>
          <div className='card-header bg-secondary border-secondaryctive'>
            <h5>Update AOP</h5>
          </div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='aop'>Enter New AOP</label>
                <input
                  className='form-control bg-dark border-secondary text-light'
                  type='text'
                  name='aop'
                  id='aop'
                  onChange={this.onChange}
                  placeholder='Enter new Area of Roleplay'
                  required
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-success container' type='submit'>
                  Update Aop
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

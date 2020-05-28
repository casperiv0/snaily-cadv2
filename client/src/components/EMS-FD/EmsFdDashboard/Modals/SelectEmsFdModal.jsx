import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../../config/config';
import Cookies from 'js-cookie';

export default class SelectEmsFdModal extends Component {
  constructor() {
    super();

    this.state = {
      deputy: '',
      deputies: [],
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getEmsFdDeputies = () => {
    Axios({
      url: backendURL + '/ems-fd',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          deputies: res.data.deputies,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getEmsFdDeputies();
  }

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url:
        backendURL + '/dispatch/update-ems-fd/' + this.state.deputy,
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        status: 'on-duty',
        status2: '10-8',
      },
    })
      .then((res) => {
        if (res.data.msg === 'Updated') {
          sessionStorage.setItem('ems-fd-message', 'Updated Status to: 10-8');
          Cookies.set('on-duty-ems-fdId', this.state.deputy);
          return (window.location = '/ems-fd');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { deputies } = this.state;
    return (
      <div
        className='modal fade'
        id='selectEmsFdModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='selectEmsFdModal'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content bg-dark border-dark text-light'>
            <div className='modal-header'>
              <h5 className='modal-title' id='selectEmsFdModal'>
                Please select a EMS/FD Deputy before continuing
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
                <label htmlFor='deputy'>Select EMS/FD Deputy</label>
                <select
                  name='deputy'
                  id='deputy'
                  className='form-control bg-secondary border-secondary text-light'
                  onChange={this.onChange}>
                      <option>Select Deputy..</option>
                  {!deputies[0] ? (
                    <option>You don't have any deputies!</option>
                  ) : (
                    deputies.map((deputy, index) => {
                      return (
                        <option key={index} value={deputy.id}>
                          {deputy.name}
                        </option>
                      );
                    })
                  )}
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
              {!deputies[0] ? (
                <a
                  href='/ems-fd/deputies/create-deputy'
                  className='btn btn-primary'>
                  Create a deputy
                </a>
              ) : (
                <button type='submit' className='btn btn-primary'>
                  Go on-duty
                </button>
              )}
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

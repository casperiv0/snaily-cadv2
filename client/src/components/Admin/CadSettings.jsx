import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import SuccessMessage from "../Partials/Messages/SuccessMessage"
import ErrorMessage from '../Partials/Messages/ErrorMessage';

export default class CadSettings extends Component {
  constructor() {
    super();

    this.state = {
      message: sessionStorage.getItem('admin-message'),
      cadName: '',
      aop: '',
      towWhitelisted: '',
      cadWhitelisted: '',
      error: "",
    };
  }

  getCurrentCadInfo = () => {
    Axios({
      url: backendURL + '/auth/cad-info',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          cadName: res.data.cadInfo[0].cad_name,
          aop: res.data.cadInfo[0].AOP,
          cadWhitelisted: res.data.cadInfo[0].whitelisted,
          towWhitelisted: res.data.cadInfo[0].tow_whitelisted,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getCurrentCadInfo();
    document.title = 'CAD Settings - Admin';

    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('admin-message')
    );
  }

  onSubmit = (e) => {
    e.preventDefault();

    Axios({
      url: backendURL + '/admin/edit-cad',
      method: 'PUT',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
      data: {
        cadName: this.state.cadName,
        newAop: this.state.aop,
        whitelist: this.state.cadWhitelisted,
        towWhitelist: this.state.towWhitelisted,
      },
    })
      .then((res) => {
        if (res.data.msg === 'CAD Updated') {
          sessionStorage.setItem('admin-message', 'Successfully Updated CAD');
          return (window.location = '/admin/cad-settings');
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
    const { cadName, aop, cadWhitelisted, towWhitelisted, message, error } = this.state;

    return (
      <div className='col text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        {error ? <ErrorMessage message={error} dismiss /> : null}
        <h3>CAD Settings</h3>

        <div className='card bg-dark border-dark mt-3'>
          <h4 className='card-header'>Available Downloads</h4>
          <div className='card-body'>
            <a
              download
              href='/downloads/snailyCAD-towservice.zip'
              className='ml-2 mb-2 mr-2 btn btn-primary'>
              FiveM call tow service integration (/calltow)
            </a>
            <a
              download
              href='/downloads/snailyCAD-911service.zip'
              className='ml-2 mb-2 mr-2 btn btn-primary'>
              FiveM call 911 service integration (/call911)
            </a>
          </div>
        </div>

        <div className='card bg-dark border-dark mt-3'>
          <h4 className='card-header'>General Information</h4>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='cadName'>Update CAD Name</label>
                <input
                  className='form-control bg-secondary border-secondary text-light'
                  type='text'
                  name='cadName'
                  id='cadName'
                  value={cadName}
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='aop'>Update AOP</label>
                <input
                  className='form-control bg-secondary border-secondary text-light'
                  type='text'
                  name='aop'
                  id='aop'
                  value={aop}
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='cadWhitelisted'>CAD whitelisted</label>
                <select
                  className='form-control bg-secondary border-secondary text-light'
                  name='cadWhitelisted'
                  id='cadWhitelisted'
                  onChange={this.onChange}>
                  <option
                    value={
                      cadWhitelisted
                        ? 'CAD is whitelisted'
                        : 'CAD is not whitelisted'
                    }>
                    {cadWhitelisted === 'true'
                      ? 'CAD is whitelisted'
                      : 'CAD is not whitelisted'}
                  </option>
                  <option disabled>--------</option>
                  <option value='true'>CAD is whitelisted</option>
                  <option value='false'>CAD is not whitelisted</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='towWhitelisted'>CAD Tow whitelisted</label>
                <select
                  className='form-control bg-secondary border-secondary text-light'
                  name='towWhitelisted'
                  id='towWhitelisted'
                  onChange={this.onChange}>
                  <option
                    value={
                      towWhitelisted
                        ? 'Tow Is whitelisted'
                        : 'Tow is not whitelisted'
                    }>
                    {towWhitelisted
                      ? 'Tow Is whitelisted'
                      : 'Tow is not whitelisted'}
                  </option>
                  <option disabled>--------</option>
                  <option value='true'>Tow is whitelisted</option>
                  <option value='false'>Tow is not whitelisted</option>
                </select>
              </div>
              <div className='form-group'>
                <button className='btn btn-primary col' type='submit'>
                  Update CAD
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

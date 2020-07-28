import React, { Component } from 'react';
import axios from 'axios';
import {
  Input,
  FormControl,
  InputLabel,
  Avatar,
  Button,
  Link,
  CircularProgress,
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import { logIn } from './getSession';
import { backendURL } from '../../config/config';
import lang from '../../language.json';

export default class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      password2: '',
      error: '',
      loading: false,
    };
  }

  onSubmit = (e) => {
    this.setState({
      loading: true,
    });
    e.preventDefault();

    const { username, password, password2 } = this.state;

    axios({
      url: backendURL + '/auth/register',
      method: 'POST',
      data: {
        username: username,
        password: password,
        password2: password2,
      },
    }).then((res) => {
      const { msg } = res.data;
      if (msg === 'User Created') {
        sessionStorage.setItem('message', 'Successfully Logged In!');
        sessionStorage.setItem('token', res.data.token);
        logIn();
        return (window.location = '/citizen');
      }

      if (msg === 'Owner Created') {
        sessionStorage.setItem('admin-message', 'Successfully Logged In.');
        sessionStorage.setItem('token', res.data.token);
        logIn();
        return (window.location = '/admin/cad-settings');
      }

      if (msg === 'Pending') {
        sessionStorage.setItem(
          'home-message',
          lang.auth.still_pending
        );
        return (window.location = '/citizen');
      }

      this.setState({
        loading: false,
        password: '',
        password2: '',
        error: msg,
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    document.title = 'Create An Account';
  }

  render() {
    const { username, password, password2, error, loading } = this.state;
    return (
      <form className='login-box' onSubmit={this.onSubmit}>
        {/* avatar */}
        <div>
          <Avatar style={{ transform: 'scale(1)' }} />
        </div>
        <h1>{lang.auth.create_account}</h1>

        {error ? (
          <Alert className='alert-box' variant='filled' severity='warning'>
            {error}
          </Alert>
        ) : null}

        {/* Username */}
        <FormControl fullWidth style={{ marginTop: '40px' }}>
          <InputLabel htmlFor='username'>{lang.auth.enter_username}</InputLabel>
          <Input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={this.handleChange}
          />
        </FormControl>

        {/* Password */}
        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel htmlFor='password'>{lang.auth.enter_password}</InputLabel>
          <Input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={this.handleChange}
          />
        </FormControl>

        {/* Password */}
        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel htmlFor='password2'>
            {lang.auth.confirm_password}
          </InputLabel>
          <Input
            type='password'
            id='password2'
            name='password2'
            value={password2}
            onChange={this.handleChange}
          />
          <div style={{ marginTop: '5px' }}>
           {lang.auth.has_acc}{' '}
            <Link href='/auth/login' color='primary'>
              {lang.auth.login}
            </Link>
          </div>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <div className='loading-wrapper'>
            <Button
              fullWidth
              disabled={loading}
              type='submit'
              variant='contained'
              color='primary'>
              {lang.auth.create_account}
            </Button>
            {loading ? <CircularProgress className='loader' size={24} /> : null}
          </div>
        </FormControl>
      </form>
    );
  }
}

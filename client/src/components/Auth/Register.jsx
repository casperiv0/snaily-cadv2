import React, { Component } from 'react';
import axios from 'axios';
import {
  Input,
  FormControl,
  InputLabel,
  Avatar,
  Button,
  Link,
  CircularProgress
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import { logIn } from './getSession';
import {backendURL} from "../../config/config";


export default class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      password2: '',
      error: '',
      loading: false
    };
  }

  onSubmit = (e) => {
    this.setState({
      loading: true
    })
    e.preventDefault();

    const { username, password, password2 } = this.state;

    axios({
      url: backendURL+"/auth/register",
      method: 'POST',
      data: {
        username: username,
        password: password,
        password2: password2
      },
    }).then((res) => {
      const { msg } = res.data;
      if (msg === 'User Created') {
        sessionStorage.setItem('message', 'Successfully Logged In!');
        sessionStorage.setItem('token', res.data.token);
        logIn();
        return (window.location = '/citizen');
      }

      if (msg === "Owner Created") {
        sessionStorage.setItem('admin-message', 'Successfully Logged In.');
        sessionStorage.setItem('token', res.data.token);
        logIn();
        return (window.location = '/admin/cad-settings');
      }

      if (msg === "Pending") {
        sessionStorage.setItem('home-message', 'Successfully Created Account, This account is currently pending access');
        return (window.location = '/citizen');
      }

      this.setState({
        loading: false,
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
    document.title = "Create An Account"
  }

  render() {
    const { username, password, password2, error, loading } = this.state;
    return (
      <form className='login-box' onSubmit={this.onSubmit}>
        {/* avatar */}
        <div>
          <Avatar style={{ transform: 'scale(1)' }} />
        </div>
        <h1>Create an account</h1>

        {error ? (
          <Alert className="alert-box" variant='filled' severity='warning'>
            {error}
          </Alert>
        ) : null}

        {/* Username */}
        <FormControl fullWidth style={{ marginTop: '40px' }}>
          <InputLabel htmlFor='username'>Please Enter your username</InputLabel>
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
          <InputLabel htmlFor='password'>Please Enter your password</InputLabel>
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
            Please Confirm your password
          </InputLabel>
          <Input
            type='password'
            id='password2'
            name='password2'
            value={password2}
            onChange={this.handleChange}
          />
           <div style={{ marginTop: '5px' }}>
            Already have an account?{' '}
            <Link href='/auth/login' color='primary'>
              Login Here
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
                Create Account
            </Button>
            {loading ? <CircularProgress className='loader' size={24} /> : null}
          </div>
        </FormControl>
      </form>
    );
  }
}
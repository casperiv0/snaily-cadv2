import React, { Component } from 'react';
import axios from 'axios';
import {
  FormControl,
  Input,
  InputLabel,
  Avatar,
  Button,
  Link,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './Auth.css';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      error: '',
      token: sessionStorage.getItem('token'),
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({
      error: '',
    });
    const { username, password } = this.state;
    axios({
      url: 'http://localhost:3001/auth/login',
      method: 'POST',
      data: {
        username: username,
        password: password,
      },
    }).then((res) => {
      if (res.data.msg === 'LoggedIn') {
        sessionStorage.setItem('token', res.data.token);
        return (window.location = '/citizen');
      }

      this.setState({
        error: res.data.msg,
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  render() {
    const { username, password, error } = this.state;
    return (
        <form className='login-box' onSubmit={this.onSubmit}>
          {/* avatar */}
          <div>
            <Avatar style={{ transform: 'scale(1)' }} />
          </div>
          <h1>Please Login</h1>

          {error ? (
            <Alert className='alert-box' variant='filled' severity='warning'>
              {error}
            </Alert>
          ) : null}

          {/* Username */}
          <FormControl fullWidth style={{ marginTop: '40px' }}>
            <InputLabel htmlFor='username'>
              Please Enter your username
            </InputLabel>
            <Input
              type='text'
              id='username'
              value={username}
              name="username"
              onChange={this.handleChange}
            />
          </FormControl>

          {/* Password */}
          <FormControl fullWidth style={{ marginTop: '20px' }}>
            <InputLabel htmlFor='password'>
              Please Enter your password
            </InputLabel>
            <Input
              type='password'
              id='password'
              value={password}
              name="password"
              onChange={this.handleChange}
            />
            <div style={{ marginTop: '5px' }}>
              Don't have an account?{' '}
              <Link href='/auth/register' color='primary'>
                Register Here
              </Link>
            </div>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: '20px' }}>
            <Button type='submit' variant='contained' color='primary'>
              Log In
            </Button>
          </FormControl>
        </form>
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios';
import {
  FormControl,
  Input,
  InputLabel,
  Avatar,
  Button,
  Link,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './Auth.css';
import { logIn } from './getSession';
import { backendURL } from '../../config/config';
import lang from '../../language.json';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      error: '',
      loading: false,
      token: sessionStorage.getItem('token'),
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({
      error: '',
      loading: true,
    });
    const { username, password } = this.state;
    axios({
      url: backendURL + '/auth/login',
      method: 'POST',
      data: {
        username: username,
        password: password,
      },
    }).then((res) => {
      if (res.data.msg === 'LoggedIn') {
        sessionStorage.setItem('token', res.data.token);
        logIn();
        // check if there's a "from" state, ifso redirect to that path
        return (window.location = !this.props.location.state
          ? '/citizen'
          : this.props.location.state.from.pathname);
      }

      this.setState({
        loading: false,
        error: res.data.msg,
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    document.title = 'Please Login';
  }

  render() {
    const { username, password, error, loading } = this.state;
    return (
      <form className='login-box' onSubmit={this.onSubmit}>
        {/* avatar */}
        <div>
          <Avatar style={{ transform: 'scale(1)' }} />
        </div>
        <h1>{lang.auth.login}</h1>

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
            value={username}
            name='username'
            onChange={this.handleChange}
          />
        </FormControl>

        {/* Password */}
        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel htmlFor='password'>{lang.auth.enter_password}</InputLabel>
          <Input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={this.handleChange}
          />
          <div style={{ marginTop: '5px' }}>
            {lang.auth.no_acc}{" "}
            <Link href='/auth/register' color='primary'>
               {lang.auth.register}
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
              {lang.auth.login}
            </Button>
            {loading ? <CircularProgress className='loader' size={24} /> : null}
          </div>
        </FormControl>
      </form>
    );
  }
}

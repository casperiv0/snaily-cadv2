import React, { Component, useState, useEffect } from 'react';
import { getSession } from '../Auth/getSession';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendURL } from '../../config/config';

export default class HomePage extends Component {
  render() {
    return getSession() ? <LoggedInSection /> : <NotLoggedInSection />;
  }
}

const LoggedInSection = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axios({
      url: backendURL + '/auth/user',
      headers: {
        'x-auth-snailycad-token': sessionStorage.getItem('token'),
      },
    }).then(res => {
      if (!res.data.user) {
        window.location = "/auth/login"
      } else {
        setUsername(res.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className='container mt-3 text-light'>
      <h2>Welcome Back {username}!</h2>
      <Link
        className='btn btn-primary mb-2'
        style={{ width: '100%' }}
        to='/citizen'>
        Citizens Page
      </Link>
      <div className="mt-5">
      </div>
    </div>
  );
};

const NotLoggedInSection = () => {
  return (
    <div className='container mt-3 text-light'>
      <h2>Welcome Back!</h2>
      <Link
        className='btn btn-primary mb-2'
        style={{ width: '100%' }}
        to='/auth/login'>
        Login
      </Link>
      <Link
        className='btn btn-primary'
        style={{ width: '100%' }}
        to='/auth/register'>
        Register
      </Link>
    </div>
  );
};

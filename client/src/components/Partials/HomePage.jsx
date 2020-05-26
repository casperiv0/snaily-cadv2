import React, { Component, useState, useEffect } from 'react';
import { getSession } from '../Auth/getSession';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendURL } from '../../config/config';

export default class HomePage extends Component {
  componentDidMount() {
    document.title = "Home - SnailyCAD"
  }
  render() {
    return getSession() ? (<div><LoggedInSection /><Credits /></div>) : <NotLoggedInSection />;
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


const Credits = () => {
  return (
    <div className="fixed-bottom text-light bg-dark border-dark pl-2 pt-2">
      <p>Feel Free to support me <a href="https://www.paypal.me/caspertheghosty">here</a></p>
      <p><a href="https://dev-caspertheghost.github.io/">CasperTheGhost</a> | Thanks for choosing SnailyCAD!</p>
    </div>
  )
}
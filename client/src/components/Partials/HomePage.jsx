import React, { Component, useState, useEffect } from 'react';
import { getSession } from '../Auth/getSession';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendURL } from '../../config/config';
import SuccessMessage from './Messages/SuccessMessage';
import Cookies from 'js-cookie';
import lang from "../../language.json";

export default class HomePage extends Component {
  componentDidMount() {
    document.title = 'Home - SnailyCAD';
  }
  render() {
    return getSession() ? (
      <div>
        <LoggedInSection />
        <Credits />
      </div>
    ) : (
      <NotLoggedInSection />
    );
  }
}

const LoggedInSection = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axios({
      url: backendURL + '/auth/user',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (!res.data.user) {
        setUsername(null)
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
      <div className='mt-5'></div>
    </div>
  );
};

const NotLoggedInSection = () => {
  const message = sessionStorage.getItem('home-message');
  useEffect(() => {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('home-message')
    );
  });
  return (
    <div className='container mt-3 text-light'>
      {message ? <SuccessMessage message={message} dismiss /> : null}
      <h2>{lang.auth.welcome}!</h2>
      <Link
        className='btn btn-primary mb-2'
        style={{ width: '100%' }}
        to='/auth/login'>
        {lang.auth.login}
      </Link>
      <Link
        className='btn btn-primary'
        style={{ width: '100%' }}
        to='/auth/register'>
        {lang.auth.register}
      </Link>
    </div>
  );
};

const Credits = () => {
  return (
    <div className='fixed-bottom text-light bg-dark border-dark pl-2 pt-2'>
      <p>
        Feel Free to support me{' '}
        <a href='https://www.paypal.me/caspertheghosty'>here</a>
      </p>
      <p>
        <a href='https://caspertheghost.me'>CasperTheGhost</a> |
        Thanks for choosing SnailyCAD!
      </p>
    </div>
  );
};

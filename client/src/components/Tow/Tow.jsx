import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import LoadingArea from '../Partials/LoadingArea';
import TopTowArea from './TopTowArea';
import TowCallBox from './TowCallBox';
import SuccessMessage from '../Partials/Messages/SuccessMessage';

export default class Tow extends Component {
  constructor() {
    super();

    this.state = {
      towCalls: [{}],
      aop: '',
      loading: true,
      message: sessionStorage.getItem('tow-message'),
    };
  }

  getData = () => {
    // Get all Tow calls
    axios({
      url: backendURL + '/global/tow-calls',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          towCalls: res.data.towCalls,
          loading: false,
        });
      }
    });

    // Get AOP
    axios({
      url: backendURL + '/auth/cad-info',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          aop: res.data.cadInfo[0].AOP,
        });
      }
    });
  };

  componentDidMount() {
    document.title = 'Tow Truckers';
    this.getData();
  }

  cancelTowCall = (id, index) => {
    console.log(index);

    axios({
      url: backendURL + '/global/tow-calls/' + id,
      method: 'DELETE',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Canceled') {
          sessionStorage.setItem('tow-message', 'Successfully ended the call');
          return (window.location = '/tow');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { aop, loading, towCalls, message } = this.state;

    if (loading) return <LoadingArea />;

    return (
      <div className='container-fluid text-light'>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <h2>Tow Dashboard - AOP: {aop} </h2>
        <ul className='list-group'>
          <TopTowArea>
            {!towCalls[0] ? (
              <li className='list-group-item bg-dark border-secondary'>
                No Active Calls
              </li>
            ) : (
              towCalls.map((call, index) => (
                <TowCallBox
                  key={index}
                  id={call.id}
                  index={index}
                  caller={call.name}
                  location={call.location}
                  description={call.description}
                  cancelTowCall={this.cancelTowCall}
                />
              ))
            )}
          </TopTowArea>
        </ul>
      </div>
    );
  }
}

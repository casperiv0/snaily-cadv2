import React, { Component } from 'react';
import TopButtons from './TopButtons';
import axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import NoCitizensMessage from '../Partials/Messages/NoCitizensMessage';
import CitizenBox from './CitizenBox';
import SuccessMessage from "../Partials/Messages/SuccessMessage";

export default class CitizensPage extends Component {
  constructor() {
    super();

    this.state = {
      citizens: [],
      message: sessionStorage.getItem('message'),
    };
  }

  componentDidMount() {
    document.title = 'Citizens - All your citizens';
    this.getCitizens();
  }

  getCitizens = () => {
    axios({
      url: backendURL + '/citizen',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        citizens: res.data.citizens,
      });
    });
  };

  componentDidUpdate() {
    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('message')
    );
  }

  render() {
    const { citizens } = this.state;
    return (
      <div className='container pb-5'>
        {this.state.message ? <SuccessMessage /> : null}
        <TopButtons />

        <ul className='list-group mt-2'>
          {!citizens[0] ? (
            <NoCitizensMessage />
          ) : (
            citizens.map((citizen, index) => {
              return (
                <CitizenBox
                  id={citizen.id}
                  key={index}
                  index={index}
                  fullName={citizen.full_name}
                />
              );
            })
          )}
        </ul>
      </div>
    );
  }
}

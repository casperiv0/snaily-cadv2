import React, { Component } from 'react';
import TopButtons from './TopButtons';
import axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import NoCitizensMessage from '../Partials/Messages/NoCitizensMessage';
import CitizenBox from './CitizenBox';

export default class CitizensPage extends Component {
  constructor() {
    super();

    this.state = {
      citizens: [],
    };
  }

  componentDidMount() {
    document.title = "Citizens - See all your citizens"
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

  render() {
    const { citizens } = this.state;
    return (
      <div className='container'>
        <TopButtons />

        <ul className='list-group mt-5'>
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

import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';

export default class MyDeputiesList extends Component {
  constructor() {
    super();

    this.state = {
      deputies: [],
    };
  }

  getEmsFdDeputies = () => {
    Axios({
      url: backendURL + '/ems-fd',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {        
      this.setState({
        deputies: res.data.deputies,
      });
    });
  };

  componentDidMount() {
      this.getEmsFdDeputies()
  }

  render() {
    const { deputies } = this.state;

    if (!deputies[0]) {
      return (
        <div className='list-group-item mt-2 text-light bg-dark border-dark'>
          You Don't have any EMS deputies. Create one{' '}
          <a href='/ems-fd/deputies/add-deputy'>here</a>
        </div>
      );
    }

    return (
      <div className='mt-2'>
        {deputies.map((deputy, index) => {
          return (
            <li key={index} className='list-group-item mt-2 text-light bg-dark border-dark'>
              qsd
            </li>
          );
        })}
      </div>
    );
  }
}

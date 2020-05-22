import React, { Component } from 'react';
import Axios from 'axios';
import { backendURL } from '../../config/config';
import Cookies from 'js-cookie';
import BleetBox from './BleetBox';

export default class Bleeter extends Component {
  constructor() {
    super();

    this.state = {
      bleets: [],
      loading: false,
    };
  }

  getBleets = () => {
    Axios({
      url: backendURL + '/bleeter',
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        this.setState({
          bleets: res.data.bleets,
          loading: true,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getBleets();
  }

  render() {
    const { bleets, loading } = this.state;
    return (
      <div className="container">
        {!bleets[0] ? (
          <h1>No bleets found</h1>
        ) : (
          bleets.map((bleet, index) => (
            <BleetBox key={index} title={bleet.title} />
          ))
        )}{' '}
      </div>
    );
  }
}
